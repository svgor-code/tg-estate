import cheerio from 'cheerio';
import { PythonShell } from 'python-shell';

import { Injectable, Logger } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import path from 'path';
import { IApartment } from 'src/interfaces/IApartment';

@Injectable()
export class ParserService {
  private readonly logger = new Logger(ParserService.name);

  private avitoUrls = {
    owner: path.join(__dirname, '../../src/parsers/avitoOwners.py'),
    all: path.join(__dirname, '../../src/parsers/avitoAll.py'),
  };

  private sellerType: keyof typeof this.avitoUrls = 'owner';

  constructor(private apartmentService: ApartmentService) {}

  async parseAvitoCatalog(): Promise<{
    apartments: any[];
    status: boolean;
    error?: Error;
  }> {
    try {
      this.logger.log(`avito catalog parser started ${this.sellerType}`);

      const path = this.avitoUrls[this.sellerType];
      const currentSellerType: '0' | '1' = this.sellerType === 'owner' ? '0' : '1';
      this.sellerType = this.sellerType === 'all' ? 'owner' : 'all';

      const html = await this.startParserScript(path);
      const parsedHtml = html.replace('200 ', '');

      const $ = cheerio.load(parsedHtml);

      const catalog = $('div[data-marker=catalog-serp]');

      const items = catalog.find('div[data-marker=item]').map((_, item) => {
        try {
          const elementTitle = $(item).find('a[data-marker=item-title]');

          const platformId = $(item).attr('data-item-id');
          const title: string = elementTitle.find('h3').text() || '';
          const href = `https://www.avito.ru${elementTitle.attr('href')}`;

          console.log(title)

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
          const district =
            $(item).find('[class*=geo-georeferences-]').text() || '';
          const house = address.split(',')[1]?.trim();
          const square = Number.parseFloat(
            title.split(', ')[1].split(' ')[0].split(',').join('.')
          );

          const roomsData = title.split(',')[0].toLowerCase();

          let rooms: number = 0;

          if (roomsData.includes('-к.')) {
            rooms = Number.parseInt(roomsData.split('-')[0]);
          } else if (roomsData.includes('студия')) {
            rooms = 0;
          } else {
            Number.parseInt(roomsData);
          }

          const floor = Number.parseInt(title.split(', ')[2].split('/')[0]);
          const pricePerMeter = Math.floor(price / square);

          return {
            platformId,
            title,
            href,
            price,
            pricePerMeter,
            house,
            rooms: rooms || 0,
            square,
            floor,
            address,
            district: district.split(' ')[1] || '',
            sellerType: currentSellerType,
          };
        } catch (error) {
          this.logger.error(error);
        }
      });

      const itemsToAdd = Array.from(items);
      const apartments: IApartment[] = Array.from(itemsToAdd) || [];

      await this.apartmentService.filterApartments(itemsToAdd || []);
      await this.apartmentService.saveTempApartments(itemsToAdd || []);

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

  private async startParserScript(path: string): Promise<any> {
    return new Promise((resolve) => {
      PythonShell.run(path, null, function (err, result) {
        if (err) {
          console.error(err);
          return '';
        };
        resolve(result.join(''));
      });
    });
  }
}
