import moment from 'moment';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DISTRICTS_NAMES } from 'src/enities/DistrictsFilter';
import { IApartment } from 'src/interfaces/IApartment';
import { Apartment, ApartmentDocument } from 'src/schemas/apartment.schema';
import { TelegramService } from './telegram.service';
import { UserService } from './user.service';
import { CreatedUser } from 'src/interfaces/User';

@Injectable()
export class ApartmentService {
  private logger = new Logger();

  constructor(
    private userService: UserService,
    private telegramService: TelegramService,
    @InjectModel(Apartment.name)
    private apartmentModel: Model<ApartmentDocument>
  ) {}

  async filterApartments(
    apartments: IApartment[]
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const users = await this.userService.findAll({
        isSearchActive: true,
      });

      apartments.forEach(async (apartment) => {
        users.forEach(async (user) => {
          if (this.checkApartmentByUserFilters(apartment, user)) {
            await this.telegramService.sendApartment(user, apartment);
          }
        });
      });
    } catch (error) {
      this.logger.error(error);
      return { success: false, error };
    }
  }

  private checkApartmentByUserFilters(
    apartment: IApartment,
    user: CreatedUser
  ) {
    const { price, platformId, floor, square, rooms, district, sellerType } =
      apartment;

    const {
      minFloorFilter,
      maxFloorFilter,
      minSquareFilter,
      maxSquareFilter,
      maxPriceFilter,
      districtsFilter,
      sellerTypesFilter,
      roomsFilter,
      sendedApartments,
    } = user;

    if (
      this.filterByPrimitive(floor, minFloorFilter, 'gte') &&
      this.filterByPrimitive(floor, maxFloorFilter, 'lte') &&
      this.filterByPrimitive(square, minSquareFilter, 'gte') &&
      this.filterByPrimitive(square, maxSquareFilter, 'lte') &&
      this.filterByPrimitive(price, maxPriceFilter, 'lte') &&
      this.filterByRooms(roomsFilter, rooms) &&
      this.filterByDistrict(districtsFilter, district) &&
      this.filterBySellerTypes(sellerTypesFilter, sellerType) &&
      !sendedApartments.includes(platformId)
    ) {
      return true;
    }

    return false;
  }

  async saveTempApartments(apartments: IApartment[]) {
    try {
      await this.removeExpiredTempApartments();

      const existedApartments = await this.apartmentModel.find().exec();
      const filteredApartments = apartments.filter((apartment) => {
        const existApartmentsClones = existedApartments.filter(
          (i) => i.platformId === apartment.platformId
        );

        const isExistCloneWithSellerType = existApartmentsClones.find(
          (clone) => clone.sellerType === apartment.sellerType
        );

        if (
          !existApartmentsClones.length ||
          !isExistCloneWithSellerType
        ) {
          return true;
        }

        return false;
      });

      await this.apartmentModel.insertMany(filteredApartments);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async sendTempApartments() {
    try {
      const apartments = await this.apartmentModel.find().exec();
      const users = await this.userService.findAll({
        isSearchActive: true,
      });

      const userApartmentsMap = new Map<CreatedUser, IApartment[]>();

      console.log(apartments.length);

      users.forEach((user) => {
        apartments.forEach((apartment) => {
          if (this.checkApartmentByUserFilters(apartment as IApartment, user)) {
            const existedApartments = userApartmentsMap.get(user) || [];

            if (existedApartments.length === 7) {
              return;
            }

            userApartmentsMap.set(user, [
              ...existedApartments,
              apartment as IApartment,
            ]);
          }
        });
      });

      userApartmentsMap.forEach(async (apartments, user) => {
        apartments.forEach(async (apartment) => {
          await this.telegramService.sendApartment(user, apartment);
        });
      });
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }

  private async removeExpiredTempApartments() {
    try {
      await this.apartmentModel.deleteMany({
        createdAt: {
          $lte: moment().subtract(3, 'days').toDate(),
        },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  private filterByPrimitive(
    value: number,
    filterValue: number,
    option: 'lte' | 'gte'
  ) {
    if (!filterValue && filterValue !== 0) {
      return true;
    }

    switch (option) {
      case 'gte':
        return value >= filterValue;
      case 'lte':
        return value <= filterValue;

      default:
        return false;
    }
  }

  private filterByRooms(roomsFilterJSON: string, rooms?: number | string) {
    if (!rooms && rooms !== 0) return false;

    const roomsFilter = JSON.parse(roomsFilterJSON || 'null');

    if (!roomsFilter) return true;

    if (!Object.values(roomsFilter).includes(true)) {
      return true;
    }

    const filterKey = rooms > 5 ? '5' : `${rooms}`;

    return roomsFilter[filterKey];
  }

  private filterByDistrict(districtsFilterJSON: string, district?: string) {
    if (!district) return false;

    const districtsFilter = JSON.parse(districtsFilterJSON || 'null');

    if (!districtsFilter) return true;

    if (!Object.values(districtsFilter).includes(true)) {
      return true;
    }

    const filterKey = this.getKeyByValue(DISTRICTS_NAMES, district);

    return districtsFilter[filterKey];
  }

  private filterBySellerTypes(
    sellerTypesFilterJSON: string,
    sellerType?: '0' | '1'
  ) {
    if (!sellerType) return false;

    const sellerTypesFilter = JSON.parse(sellerTypesFilterJSON || 'null');

    if (!sellerTypesFilter) return true;

    if (!Object.values(sellerTypesFilter).includes(true)) {
      return true;
    }

    return sellerTypesFilter[sellerType];
  }

  private getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
}
