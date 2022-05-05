import { DISTRICTS_NAMES } from 'src/enities/DistrictsFilter';
import { ROOMS_NAMES } from 'src/enities/RoomsFilter';
import { IApartment } from 'src/interfaces/IApartment';

export type AllFiltersValues = {
  maxprice: string | null;
  floor: string | null;
  rooms: string | null;
  district: string | null;
  square: string | null;
};

export const MESSAGE_START =
  'Здравствуйте! Я бот для поиска квартир. \n\nКак я работаю: \n\n - 24/7 анализирую вторичные квартиры на Авито; \n - Обновляю базу 1 раз в минуту \n - Даю возможность настроить сигналы под себя с помощью фильтров прямо внутри бота \n\nДля начала работы с ботом нажмите ➡️ /menu и настройте параметры в разделе <strong>⚙️ Мои фильтры</strong>, затем запустите оповещения в разделе <strong>✉️ Оповещения</strong> \n\nПосле первого запуска бота вы получите ссылки на недавно опубликованные объявления, подходящие под ваши фильтры';

export const MESSAGE_CURRENT_FILTERS =
  'Выберите одну из опций, для настройки фильтров:';

export const MESSAGE_ROOMS_FILTER = 'Выберите количество комнат:';
export const MESSAGE_DISTRICTS_FILTER = 'Выберите районы:';

export const MESSAGE_SUCCESSFULLY_UPDATE = (isSearchActive: boolean) =>
  `Успешно сохранено! \n\n${
    !isSearchActive ?
    'Для включения оповещений перейдите в Меню ➡️ /menu, а затем в раздел ✉️ Оповещения' : ''
  }`;
export const MESSAGE_SEARCH_ON = 'Оповещения включены';
export const MESSAGE_SEARCH_OFF = 'Оповещения остановлены';

export const MESSAGE_MAXPRICE_FILTER =
  'Введите максимальную цену квартиры, по которой будут приходить сигналы \n\nПример сообщения: \n<strong>3000000</strong>';

export const MESSAGE_FLOOR_FILTER =
  'Введите диапазон этажей, по которому будут приходить сигналы, через дефис. \n\nПример сообщения: <strong>2-24</strong>';

export const MESSAGE_SQUARE_FILTER =
  'Введите диапазон площади, по которому будут приходить сигналы, через дефис. \n\nПример сообщения: <strong>45-67</strong>';

export const MESSAGE_TG_MENU_MENU = `📋 Меню`;
export const MESSAGE_TG_MENU_FILTERS = `⚙️ Мои фильтры`;
export const MESSAGE_TG_MENU_SUPPORT = `📧 Поддержка`;

export const MESSAGE_HEADER_FILTERS = `⚙️ Текущие параметры фильтров`;
export const MESSAGE_HEADER_FILTER_FlOOR = `⚙️ Этаж квартиры`;
export const MESSAGE_HEADER_FILTER_DISTRICTS = `⚙️ Районы`;
export const MESSAGE_HEADER_FILTER_ROOMS = `⚙️ Количество комнат`;
export const MESSAGE_HEADER_FILTER_MAXPRICE = `⚙️ Цена объекта`;
export const MESSAGE_HEADER_FILTER_SQUARE = `⚙️ Площадь`;

export const MESSAGE_HEADER_MAIN_MENU = `📋 <strong>Меню</strong>`;
export const MESSAGE_HEADER_SEARCH = `✉️ <strong>Оповещения</strong>`;
export const MESSAGE_HEADER_ABOUT = `🤖 <strong>Инструкция</strong>`;
export const MESSAGE_HEADER_SUPPORT = `📧 <strong>Поддержка</strong>`;

export const MESSAGE_BODY_SUPPORT =
  'Нашли ошибку в работе бота? Пишите сюда: @peschanik23';
export const MESSAGE_BODY_ABOUT =
  'Бот ищет новые объявления на Авито, по категории <strong>Вторичное жилье</strong>. \n\nКаждое объявление проходит пользовательские фильтры. Если объявление прошло фильтры, бот отправляет вам сообщение с ним. \n\nДля начала работы настройте параметры в разделе <strong>⚙️ Мои фильтры</strong> и запустите оповещения в разделе <strong>✉️ Оповещения</strong>';

export const MESSAGE_CURRENT_FLOOR_FILTER = (minFloorFilter, maxFloorFilter) =>
  `<strong>на ${minFloorFilter}-${maxFloorFilter} этажах</strong>`;

export const MESSAGE_CURRENT_MAXPRICE_FILTER = (maxPriceFilter) => {
  return `<strong>до ${maxPriceFilter.toLocaleString('ru')} руб.</strong>`;
};

export const MESSAGE_CURRENT_SQUARE_FILTER = (
  minSquareFilter,
  maxSquareFilter
) => `<strong>${minSquareFilter}-${maxSquareFilter} м²</strong>`;

export const MESSAGE_CURRENT_ROOMS_FILTER = (activeRooms) => {
  const roomsList = activeRooms.map((room) => ROOMS_NAMES[room]).join(', ');

  return `<strong>${roomsList}</strong>`;
};

export const MESSAGE_CURRENT_DISTRICTS_FILTER = (activeDistricts) => {
  const districtsList = activeDistricts
    .map((room) => DISTRICTS_NAMES[room])
    .join(', ');

  return `<strong>${districtsList}</strong>`;
};

export const TEMPLATE_SEARCH_VALUE = (
  header: string,
  currentValue: boolean
) => {
  return `${header} \n\nТекущее значение: ${
    currentValue ? 'Включены' : 'Остановлены'
  }`;
};

export const TEMPLATE_ALL_FILTERS_VALUE = (
  header: string = '',
  filters: AllFiltersValues,
  body: string
) => {
  return `${header ? `${header} \n\n` : ''} - Цена квартиры на Авито: ${
    filters.maxprice || '-'
  } \n\n - Районы: ${filters.district || '-'} \n\n - Этаж квартиры: ${
    filters.floor || '-'
  } \n\n - Количество комнат: ${filters.rooms || '-'} \n\n - Площадь: ${
    filters.square || '-'
  } \n\n${body ? body : ''}`;
};

export const TEMPLATE_FILTER_VALUE = (
  header: string,
  currentValue: string,
  body: string
) => {
  return `${header} \n\n${
    currentValue ? `Текущее значение: ${currentValue}\n\n` : ''
  }${body}`;
};

export const TEMPLATE_INFO_MESSAGE = (header: string, body: string) => {
  return `${header} \n\n${body}`;
};

export const TEMPLATE_APARTMENT_MESSAGE = (apartment: IApartment) => {
  const { title, address, price, pricePerMeter, href } = apartment;

  return `${title} \nАдрес: ${address} \nЦена: ${price} рублей (${pricePerMeter} руб. за кв.м.) \nСсылка: ${href}`;
};
