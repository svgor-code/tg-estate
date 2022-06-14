import cheerio from 'cheerio';
import got from 'got';

import { Injectable, Logger } from '@nestjs/common';
import { ApartmentService } from './apartment.service';

// const { got } = Got;

@Injectable()
export class ParserService {
  private readonly logger = new Logger(ParserService.name);

  private avitoUrls = {
    owner:
      'https://www.avito.ru/ulyanovsk/kvartiry/prodam/vtorichka-ASgBAQICAUSSA8YQAUDmBxSMUg?f=ASgBAQICAUSSA8YQA0DmBxSMUpC~DRSWrjWO3g4UAg&s=104',
    all: 'https://www.avito.ru/ulyanovsk/kvartiry/prodam/vtorichka-ASgBAQICAUSSA8YQAUDmBxSMUg?f=ASgBAQICAUSSA8YQAkDmBxSMUo7eDhQC&s=104',
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

      const url = this.avitoUrls[this.sellerType];
      this.sellerType = this.sellerType === 'all' ? 'owner' : 'all';

      const response = await got.get(url, {
        http2: true,
        headers: {
          // ':authority': 'www.avito.ru',
          // ':scheme': 'https',
          // ':path':
          //   '/ulyanovsk/kvartiry/prodam/vtorichka-ASgBAQICAUSSA8YQAUDmBxSMUg?f=ASgBAQICAUSSA8YQA0DmBxSMUpC~DRSWrjWO3g4UAg&s=104',
          accept:
            '*/*',
          'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
          'accept-encoding': 'gzip, deflate, br',
          'cache-control': 'max-age=0',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Linux"',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-user': '?1',
          'upgrade-insecure-requests': '1',
          'user-agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
          cookie:
            'u=2t7nqny5.aedbdt.1w402ys5w2h00; buyer_location_id=659880; buyer_laas_location=659880; _gcl_au=1.1.263049390.1648470402; lastViewingTime=1648470405476; _ym_uid=1648470405189439315; _ym_d=1648470405; tmr_lvid=a0e6683d7090162d91f5d1500e7887d8; tmr_lvidTS=1648470417009; uxs_uid=78a99d10-ae93-11ec-bad5-bd8809fcc801; sessid=e4cdb7e6b5e088ac1370e33d00f820cd.1648765607; auth=1; isCriteoSetNew=true; showedStoryIds=159-158-156-155-147-146-144-143-142-133-135-124-129-134-132-131-128-121-122-120-116-115-112-104-99-94; luri=ulyanovsk; abp=1; _gid=GA1.2.241439480.1655211622; _ym_isad=1; f=5.0c4f4b6d233fb90636b4dd61b04726f11eccd97b390632d8c20a33b8e4f349ed58be5175b053b08bc372824dc536c237968e6fdb7397767447389c084fe43167aecb54a12f32f4101eccd97b390632d871d48616ed55cd7e0df103df0c26013a8b1472fe2f9ba6b90df103df0c26013a0df103df0c26013adc5322845a0cba1ac4a09f0a9f7c107cb0649cfd39ab26f3ad59ae6628fbf800915ac1de0d034112897baa7410138ead3de19da9ed218fe23de19da9ed218fe23de19da9ed218fe23de19da9ed218fe23de19da9ed218fe23de19da9ed218fe23de19da9ed218fe23de19da9ed218fe23de19da9ed218fe23de19da9ed218fe23de19da9ed218fe2d69b45fdf9045113f1cc8f457244b1a81ac794a8d120d7dcd8790107c5605b8198427b5ac12f8ff65d3d12014bda85a4c078b9a44a65a0ae8d0e5d1a00547552a8160af174a6e0f6da81b7df107d81e971e7cb57bbcb8e0f0df103df0c26013a0df103df0c26013aafbc9dcfc006bed9fc1167f57e463df6a9946a0380b1720e3de19da9ed218fe23de19da9ed218fe2d6fdecb021a45a316eb2849c61a033c723d93b9e71c31aad; ft="yMwPuAt76Utg65xxToyBBTNsObZV5KaVrf9A3V5wvW+B371Insace1O63SQSOV6Y0ASAVQC45wQnv3CmYrTkyapST5vehBuID25sI8VFrr0UOa2Wo7GP8NnA8T97KaBp2PuOZ0KHKjF1niZ/x9ndZz1icClOUpVMh+ND9it4PHe3ZLYUD4Hy6uWU7a/WxHTL"; SEARCH_HISTORY_IDS=1,4; _ym_visorc=b; v=1655228414; dfp_group=5; isLegalPerson=0; _dc_gtm_UA-2546784-1=1; _ga_9E363E7BES=GS1.1.1655225829.79.1.1655228424.52; _ga=GA1.1.814211348.1648470402; cto_bundle=71ZggF9MY29Pc2tRTHVnNzlTcjl0ckRnckFHS0t4UGY1VWhBMldnajgyNThGTWZLY1FaZkVzRndFb0dtTktEMkRNTzhSWDE0djBySUNyQTl6Vm85JTJGb2tobVRvOEk5dXJvUEpsME4lMkJwTTZzSHM3MVRreHBpTmRkdHE4QVExMEU5d05tbUk4WHBSJTJGOXU1d2d3MHJUWUswQ0klMkJDQSUzRCUzRA; sx=H4sIAAAAAAAC/wTAUQ6CMAwG4Lv8zz5ss+vIbgO2TeTFJQ2CJbu73w1tmpKZEVMqRi1LsbaSCi1V1xeh3/ii4zf2t7uPT+xhtm0ccV6HC5/XED/wgKJnrvWZaSl1zn8AAAD//1tZ7d5bAAAA; tmr_detect=0|1655228427753; tmr_reqNum=872',
          'sec-ch-ua':
            '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
          Host: 'www.avito.ru',
        },
      });

      const $ = cheerio.load(response.body);

      const catalog = $('div[data-marker=catalog-serp]');

      const items = catalog.find('div[data-marker=item]').map((_, item) => {
        try {
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
          const district =
            $(item).find('[class*=geo-georeferences-]').text() || '';
          const house = address.split(',')[1]?.trim();
          const square = Number.parseFloat(
            title.split(', ')[1].split(' ')[0].split(',').join('.')
          );

          const roomsData = title.split(',')[0].toLowerCase();

          let rooms;

          if (roomsData.includes('-к.')) {
            rooms = Number.parseInt(roomsData.split('-')[0]);
          } else if (roomsData.includes('студия')) {
            rooms = 0;
          } else {
            Number.parseInt(roomsData);
          }

          const floor = Number.parseInt(title.split(', ')[2].split('/')[0]);
          const pricePerMeter = Math.floor(price / square);

          const sellerType: '0' | '1' = this.sellerType === 'owner' ? '0' : '1';

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
            sellerType,
          };
        } catch (error) {
          this.logger.error(error);
        }
      });

      const itemsToAdd = Array.from(items).filter(
        (item) => item.price && item.price > 100000 && item.square
      );

      const apartments = Array.from(itemsToAdd) || [];

      await this.apartmentService.filterApartments(apartments);

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
