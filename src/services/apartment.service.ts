import { Injectable, Logger } from '@nestjs/common';
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
        const { price, platformId, floor, rooms, district } = apartment;

        users.forEach(async (user) => {
          const {
            chatId,
            minFloorFilter,
            maxFloorFilter,
            maxPriceFilter,
            districtsFilter,
            roomsFilter,
            sendedApartments,
          } = user;

          if (
            floor >= minFloorFilter &&
            floor <= maxFloorFilter &&
            price <= maxPriceFilter &&
            this.filterByRooms(roomsFilter, rooms) &&
            this.filterByDistrict(districtsFilter, district) &&
            !sendedApartments.includes(platformId)
          ) {
            await this.telegramService.sendApartment(chatId, apartment);
          }
        });
      });
    } catch (error) {
      this.logger.error(error);
      return { success: false, error };
    }
  }

  private filterByRooms(roomsFilterJSON: string, rooms?: number | string) {
    if (!rooms && rooms !== 0) return false;

    const roomsFilter = JSON.parse(roomsFilterJSON || 'null');

    if (!roomsFilter) return true;

    const filterKey =
      rooms > 5 ? '5' : this.getKeyByValue(roomsFilter, rooms || 'студия');

    if (roomsFilter[filterKey]) {
      return true;
    }

    return false;
  }

  private filterByDistrict(districtsFilterJSON: string, district?: string) {
    if (!district) return false;

    const districtsFilter = JSON.parse(districtsFilterJSON || 'null');

    if (!districtsFilter) return true;

    const filterKey = this.getKeyByValue(districtsFilter, district);

    if (districtsFilter[filterKey]) {
      return true;
    }

    return false;
  }

  private getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
}
