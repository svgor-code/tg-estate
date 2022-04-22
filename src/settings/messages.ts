import { DISTRICTS_NAMES } from 'src/enities/DistrictsFilter';
import { ROOMS_NAMES } from 'src/enities/RoomsFilter';
import { IApartment } from 'src/interfaces/IApartment';

export type AllFiltersValues = {
  maxprice: string | null;
  floor: string | null;
  rooms: string | null;
  district: string | null;
};

export const MESSAGE_START =
  'Здравствуйте! Я бот для поиска квартир. \n\n Как я работаю: \n\n - 24/7 анализирую вторичные квартиры на Авито; \n - Обновляю базу 1 раз в минуту \n - Даю возможность настроить сигналы под себя с помощью фильтров прямо внутри бота \n\n Для начала работы с ботом введите /menu';

export const MESSAGE_CURRENT_FILTERS =
  'Выберите одну из опций, для настройки поиска:';

export const MESSAGE_ROOMS_FILTER = 'Выберите количество комнат:';
export const MESSAGE_DISTRICTS_FILTER = 'Выберите районы:';

export const MESSAGE_SUCCESSFULLY_UPDATE = 'Успешно сохранено!';
export const MESSAGE_SEARCH_ON = 'Поиск включен';
export const MESSAGE_SEARCH_OFF = 'Поиск остановлен';

export const MESSAGE_MAXPRICE_FILTER =
  'Введите максимальную цену квартиры, по которой будут приходить сигналы в млн. руб. \n\n Пример сообщения: \n <strong>3</strong>';

export const MESSAGE_FLOOR_FILTER =
  'Введите диапазон этажей, в котором показывать недооцененные квартиры, через дефис. \n\n Пример сообщения: <strong>2-24</strong>';

export const MESSAGE_TG_MENU_MENU = `📋 Меню`;
export const MESSAGE_TG_MENU_FILTERS = `⚙️ Мои фильтры`;
export const MESSAGE_TG_MENU_SUPPORT = `📧 Поддержка`;

export const MESSAGE_HEADER_FILTERS = `⚙️ Текущие параметры фильтров`;
export const MESSAGE_HEADER_FILTER_FlOOR = `⚙️ Этаж квартиры`;
export const MESSAGE_HEADER_FILTER_DISTRICTS = `⚙️ Районы`;
export const MESSAGE_HEADER_FILTER_ROOMS = `⚙️ Количество комнат`;
export const MESSAGE_HEADER_FILTER_MAXPRICE = `⚙️ Цена объекта`;

export const MESSAGE_HEADER_MAIN_MENU = `📋 <strong>Меню</strong>`;
export const MESSAGE_HEADER_SEARCH = `🔎 <strong>Поиск</strong>`;
export const MESSAGE_HEADER_ABOUT = `🤖 <strong>О боте</strong>`;
export const MESSAGE_HEADER_SUPPORT = `📧 <strong>Поддержка</strong>`;

export const MESSAGE_BODY_SUPPORT =
  'Нашли ошибку в работе бота? Пишите сюда: @svg_or \n\n Для вопросов о подписке и предложений пишите сюда: @peschanik23';
export const MESSAGE_BODY_ABOUT =
  'Бот ищет новые объявления на Авито, по категории <strong>Вторичное жилье</strong>. \n\nКаждое объявление проходит пользовательские фильтры. Если объявление прошло фильтры, бот отправляет вам сообщение с ним.';

export const MESSAGE_CURRENT_FLOOR_FILTER = (minFloorFilter, maxFloorFilter) =>
  `<strong>на ${minFloorFilter}-${maxFloorFilter} этажах</strong>`;

export const MESSAGE_CURRENT_MAXPRICE_FILTER = (maxPriceFilter) => {
  const price = maxPriceFilter / 1000000;

  if (price < 1) {
    return `<strong>до ${price * 1000} тыс. руб.</strong>`;
  }

  return `<strong>до ${price} млн. руб.</strong>`;
};

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
  return `${header} \n\n Текущее значение: ${
    currentValue ? 'Включен' : 'Остановлен'
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
  } \n\n - Количество комнат: ${filters.rooms || '-'} \n\n ${body ? body : ''}`;
};

export const TEMPLATE_FILTER_VALUE = (
  header: string,
  currentValue: string,
  body: string
) => {
  return `${header} \n\n ${
    currentValue ? `Текущее значение: ${currentValue}` : ''
  } \n\n ${body}`;
};

export const TEMPLATE_INFO_MESSAGE = (header: string, body: string) => {
  return `${header} \n\n ${body}`;
};

export const TEMPLATE_APARTMENT_MESSAGE = (apartment: IApartment) => {
  const { title, address, price, pricePerMeter, href } = apartment;

  return `${title} \nАдрес: ${address} \nЦена: ${price} рублей (${pricePerMeter} руб. за кв.м.) \nСсылка: ${href}`;
};
