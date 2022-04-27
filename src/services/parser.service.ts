import got from 'got';
import cheerio from 'cheerio';
import { Injectable, Logger } from '@nestjs/common';
import { ApartmentService } from './apartment.service';

@Injectable()
export class ParserService {
  private readonly logger = new Logger(ParserService.name);

  constructor(private apartmentService: ApartmentService) {}

  async parseAvitoCatalog(): Promise<{
    apartments: any[];
    status: boolean;
    error?: Error;
  }> {
    try {
      this.logger.log('avito catalog parser started');

      const response = await got.get(
        'https://www.avito.ru/ulyanovsk/kvartiry/prodam/vtorichka-ASgBAQICAUSSA8YQAUDmBxSMUg?s=104',
        {
          http2: true,
          headers: {
            'user-agent':
              'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36',
          },
        }
      );

      const $ = cheerio.load(response.body);

      const catalog = $('div[data-marker=catalog-serp]');

      const items = catalog.find('div[data-marker=item]').map((_, item) => {
        const elementTitle = $(item).find('a[data-marker=item-title]');

        const platformId = $(item).attr('data-item-id');
        const title = elementTitle.find('h3').text();
        const href = `https://www.avito.ru${elementTitle.attr('href')}`;

        const price = Number.parseFloat(
          $(item)
            .find('span[data-marker=item-price]')
            .find('span')
            .text()
            .replace('₽₽', '')
            .split('\xa0')
            .join('')
        );

        const address = $(item).find('[class*=geo-address-]').text();
        const district = $(item).find('[class*=geo-georeferences-]').text() || '';
        const house = address.split(',')[1]?.trim();
        const square = Number.parseFloat(
          title.split(', ')[1].split(' ')[0].split(',').join('.')
        );
        const roomsData = title.split(',')[0];
        const rooms = Number.parseInt(
          roomsData.includes('-к.') ? roomsData.split('-')[0] : roomsData
        );
        const floor = Number.parseInt(title.split(', ')[2].split('/')[0]);
        const pricePerMeter = Math.floor(price / square);

        return {
          platformId,
          title,
          href,
          price,
          pricePerMeter,
          house,
          rooms: rooms || 1,
          square,
          floor,
          address,
          district,
        };
      });

      const apartments = Array.from(items) || [];

      await this.apartmentService.filterApartments(apartments)

      return {
        apartments,
        status: true,
      };
    } catch (error) {
      this.logger.error(error);

      return {
        apartments: [],
        status: false,
        error,
      };
    }
  }
}
