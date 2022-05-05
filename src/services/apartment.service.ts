import { Injectable, Logger } from '@nestjs/common';
import { DISTRICTS_NAMES } from 'src/enities/DistrictsFilter';
import { IApartment } from 'src/interfaces/IApartment';
import { TelegramService } from './telegram.service';
import { UserService } from './user.service';

@Injectable()
export class ApartmentService {
  private logger = new Logger();

  constructor(
    private userService: UserService,
    private telegramService: TelegramService
  ) {}

  async filterApartments(
    apartments: IApartment[]
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const users = await this.userService.findAll({
        isSearchActive: true,
      });

      apartments.forEach(async (apartment) => {
        const { price, platformId, floor, square, rooms, district } = apartment;

        users.forEach(async (user) => {
          const {
            minFloorFilter,
            maxFloorFilter,
            minSquareFilter,
            maxSquareFilter,
            maxPriceFilter,
            districtsFilter,
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
            !sendedApartments.includes(platformId)
          ) {
            await this.telegramService.sendApartment(user, apartment);
          }
        });
      });
    } catch (error) {
      this.logger.error(error);
      return { success: false, error };
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

    const filterKey = rooms > 5 ? '5' : `${rooms}`;

    return roomsFilter[filterKey];
  }

  private filterByDistrict(districtsFilterJSON: string, district?: string) {
    if (!district) return false;

    const districtsFilter = JSON.parse(districtsFilterJSON || 'null');

    if (!districtsFilter) return true;

    const filterKey = this.getKeyByValue(DISTRICTS_NAMES, district);

    return districtsFilter[filterKey];
  }

  private getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
}
