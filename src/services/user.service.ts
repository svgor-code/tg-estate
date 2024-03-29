import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/dto/user/CreateUserDto';
import { IRoomsFilter } from 'src/interfaces/IRoomsFilter';
import { CreatedUser, UserFilters } from 'src/interfaces/User';
import { IDistrictsFilter } from 'src/interfaces/IDistrictsFilter';
import { IApartment } from 'src/interfaces/IApartment';
import { UpdateUserDto } from 'src/dto/user/UpdateUserDto';
import { ISellerTypesFilter } from 'src/interfaces/ISellerTypesFilter';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<CreatedUser> {
    const createdStreet = await this.userModel.create(createUserDto);

    return createdStreet.save();
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto
  ): Promise<CreatedUser> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        userId,
        {
          $set: {
            ...updateUserDto,
          },
        },
        {
          new: true,
        }
      );

      return updatedUser;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findAll(filter: Partial<UserFilters>): Promise<CreatedUser[]> {
    const users = await this.userModel.find({ ...filter }).exec();
    return users;
  }

  async getUserById(id: string): Promise<CreatedUser> {
    return await this.userModel.findById(id).exec();
  }

  async getUserByChatId(chatId: number): Promise<CreatedUser> {
    return await this.userModel
      .findOne({
        chatId,
      })
      .exec();
  }

  async getUserByTelegramId(tgUserId: number): Promise<CreatedUser> {
    return await this.userModel
      .findOne({
        tgUserId,
      })
      .exec();
  }

  async addNewSendedApartment(
    chatId: number,
    apartment: IApartment
  ): Promise<CreatedUser> {
    const { platformId } = apartment;
    const { _id, sendedApartments } = await this.getUserByChatId(chatId);
    const newSendedApartments = [...(sendedApartments || []), platformId];

    const updatedUser = await this.userModel.findByIdAndUpdate(
      _id,
      {
        $set: {
          sendedApartments: newSendedApartments,
        },
      },
      {
        new: true,
      }
    );

    return updatedUser;
  }

  async switchSearch(
    userId: string,
    isSearchActive: boolean
  ): Promise<CreatedUser> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          isSearchActive,
        },
      },
      {
        new: true,
      }
    );

    return updatedUser;
  }

  async updateRoomsFilter(
    userId: string,
    roomsFilter: IRoomsFilter
  ): Promise<CreatedUser> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          roomsFilter: JSON.stringify(roomsFilter),
        },
      },
      {
        new: true,
      }
    );

    return updatedUser;
  }

  async updateDistrictsFilter(
    userId: string,
    districtsFilter: IDistrictsFilter
  ): Promise<CreatedUser> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          districtsFilter: JSON.stringify(districtsFilter),
        },
      },
      {
        new: true,
      }
    );

    return updatedUser;
  }

  async updateSellerTypesFilter(
    userId: string,
    sellerTypesFilter: ISellerTypesFilter
  ): Promise<CreatedUser> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          sellerTypesFilter: JSON.stringify(sellerTypesFilter),
        },
      },
      {
        new: true,
      }
    );

    return updatedUser;
  }

  async updateMaxPriceFilter(
    userId: string,
    maxPrice: number
  ): Promise<CreatedUser> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          maxPriceFilter: maxPrice,
        },
      },
      {
        new: true,
      }
    );

    return updatedUser;
  }

  async updateFloorFilter(
    userId: string,
    minFloorFilter: number,
    maxFloorFilter: number
  ): Promise<CreatedUser> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          minFloorFilter,
          maxFloorFilter,
        },
      },
      {
        new: true,
      }
    );

    return updatedUser;
  }

  async updateSquareFilter(
    userId: string,
    minSquareFilter: number,
    maxSquareFilter: number
  ): Promise<CreatedUser> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          minSquareFilter,
          maxSquareFilter,
        },
      },
      {
        new: true,
      }
    );

    return updatedUser;
  }
}
