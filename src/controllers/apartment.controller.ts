import { Body, Controller, Param, Post } from '@nestjs/common';
import { IApartment } from 'src/interfaces/IApartment';
import { ApartmentService } from 'src/services/apartment.service';

@Controller('apartments')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Post()
  async filterApartments(
    @Body() apartments: IApartment[]
  ): Promise<{ success: boolean; error?: string }> {
    return await this.apartmentService.filterApartments(apartments);
  }
}
