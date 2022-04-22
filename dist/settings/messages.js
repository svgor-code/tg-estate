"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_APARTMENT_MESSAGE = exports.TEMPLATE_INFO_MESSAGE = exports.TEMPLATE_FILTER_VALUE = exports.TEMPLATE_ALL_FILTERS_VALUE = exports.TEMPLATE_SEARCH_VALUE = exports.MESSAGE_CURRENT_DISTRICTS_FILTER = exports.MESSAGE_CURRENT_ROOMS_FILTER = exports.MESSAGE_CURRENT_MAXPRICE_FILTER = exports.MESSAGE_CURRENT_FLOOR_FILTER = exports.MESSAGE_BODY_ABOUT = exports.MESSAGE_BODY_SUPPORT = exports.MESSAGE_HEADER_SUPPORT = exports.MESSAGE_HEADER_ABOUT = exports.MESSAGE_HEADER_SEARCH = exports.MESSAGE_HEADER_MAIN_MENU = exports.MESSAGE_HEADER_FILTER_MAXPRICE = exports.MESSAGE_HEADER_FILTER_ROOMS = exports.MESSAGE_HEADER_FILTER_DISTRICTS = exports.MESSAGE_HEADER_FILTER_FlOOR = exports.MESSAGE_HEADER_FILTERS = exports.MESSAGE_TG_MENU_SUPPORT = exports.MESSAGE_TG_MENU_FILTERS = exports.MESSAGE_TG_MENU_MENU = exports.MESSAGE_FLOOR_FILTER = exports.MESSAGE_MAXPRICE_FILTER = exports.MESSAGE_SEARCH_OFF = exports.MESSAGE_SEARCH_ON = exports.MESSAGE_SUCCESSFULLY_UPDATE = exports.MESSAGE_DISTRICTS_FILTER = exports.MESSAGE_ROOMS_FILTER = exports.MESSAGE_CURRENT_FILTERS = exports.MESSAGE_START = void 0;
const DistrictsFilter_1 = require("../enities/DistrictsFilter");
const RoomsFilter_1 = require("../enities/RoomsFilter");
exports.MESSAGE_START = 'Здравствуйте! Я бот для поиска квартир. \n\n Как я работаю: \n\n - 24/7 анализирую вторичные квартиры на Авито; \n - Обновляю базу 1 раз в минуту \n - Даю возможность настроить сигналы под себя с помощью фильтров прямо внутри бота \n\n Для начала работы с ботом введите /menu';
exports.MESSAGE_CURRENT_FILTERS = 'Выберите одну из опций, для настройки поиска:';
exports.MESSAGE_ROOMS_FILTER = 'Выберите количество комнат:';
exports.MESSAGE_DISTRICTS_FILTER = 'Выберите районы:';
exports.MESSAGE_SUCCESSFULLY_UPDATE = 'Успешно сохранено!';
exports.MESSAGE_SEARCH_ON = 'Поиск включен';
exports.MESSAGE_SEARCH_OFF = 'Поиск остановлен';
exports.MESSAGE_MAXPRICE_FILTER = 'Введите максимальную цену квартиры, по которой будут приходить сигналы в млн. руб. \n\n Пример сообщения: \n <strong>3</strong>';
exports.MESSAGE_FLOOR_FILTER = 'Введите диапазон этажей, в котором показывать недооцененные квартиры, через дефис. \n\n Пример сообщения: <strong>2-24</strong>';
exports.MESSAGE_TG_MENU_MENU = `📋 Меню`;
exports.MESSAGE_TG_MENU_FILTERS = `⚙️ Мои фильтры`;
exports.MESSAGE_TG_MENU_SUPPORT = `📧 Поддержка`;
exports.MESSAGE_HEADER_FILTERS = `⚙️ Текущие параметры фильтров`;
exports.MESSAGE_HEADER_FILTER_FlOOR = `⚙️ Этаж квартиры`;
exports.MESSAGE_HEADER_FILTER_DISTRICTS = `⚙️ Районы`;
exports.MESSAGE_HEADER_FILTER_ROOMS = `⚙️ Количество комнат`;
exports.MESSAGE_HEADER_FILTER_MAXPRICE = `⚙️ Цена объекта`;
exports.MESSAGE_HEADER_MAIN_MENU = `📋 <strong>Меню</strong>`;
exports.MESSAGE_HEADER_SEARCH = `🔎 <strong>Поиск</strong>`;
exports.MESSAGE_HEADER_ABOUT = `🤖 <strong>О боте</strong>`;
exports.MESSAGE_HEADER_SUPPORT = `📧 <strong>Поддержка</strong>`;
exports.MESSAGE_BODY_SUPPORT = 'Нашли ошибку в работе бота? Пишите сюда: @svg_or \n\n Для вопросов о подписке и предложений пишите сюда: @peschanik23';
exports.MESSAGE_BODY_ABOUT = 'Бот ищет новые объявления на Авито, по категории <strong>Вторичное жилье</strong>. \n\nКаждое объявление проходит пользовательские фильтры. Если объявление прошло фильтры, бот отправляет вам сообщение с ним.';
const MESSAGE_CURRENT_FLOOR_FILTER = (minFloorFilter, maxFloorFilter) => `<strong>на ${minFloorFilter}-${maxFloorFilter} этажах</strong>`;
exports.MESSAGE_CURRENT_FLOOR_FILTER = MESSAGE_CURRENT_FLOOR_FILTER;
const MESSAGE_CURRENT_MAXPRICE_FILTER = (maxPriceFilter) => {
    const price = maxPriceFilter / 1000000;
    if (price < 1) {
        return `<strong>до ${price * 1000} тыс. руб.</strong>`;
    }
    return `<strong>до ${price} млн. руб.</strong>`;
};
exports.MESSAGE_CURRENT_MAXPRICE_FILTER = MESSAGE_CURRENT_MAXPRICE_FILTER;
const MESSAGE_CURRENT_ROOMS_FILTER = (activeRooms) => {
    const roomsList = activeRooms.map((room) => RoomsFilter_1.ROOMS_NAMES[room]).join(', ');
    return `<strong>${roomsList}</strong>`;
};
exports.MESSAGE_CURRENT_ROOMS_FILTER = MESSAGE_CURRENT_ROOMS_FILTER;
const MESSAGE_CURRENT_DISTRICTS_FILTER = (activeDistricts) => {
    const districtsList = activeDistricts
        .map((room) => DistrictsFilter_1.DISTRICTS_NAMES[room])
        .join(', ');
    return `<strong>${districtsList}</strong>`;
};
exports.MESSAGE_CURRENT_DISTRICTS_FILTER = MESSAGE_CURRENT_DISTRICTS_FILTER;
const TEMPLATE_SEARCH_VALUE = (header, currentValue) => {
    return `${header} \n\n Текущее значение: ${currentValue ? 'Включен' : 'Остановлен'}`;
};
exports.TEMPLATE_SEARCH_VALUE = TEMPLATE_SEARCH_VALUE;
const TEMPLATE_ALL_FILTERS_VALUE = (header = '', filters, body) => {
    return `${header ? `${header} \n\n` : ''} - Цена квартиры на Авито: ${filters.maxprice || '-'} \n\n - Районы: ${filters.district || '-'} \n\n - Этаж квартиры: ${filters.floor || '-'} \n\n - Количество комнат: ${filters.rooms || '-'} \n\n ${body ? body : ''}`;
};
exports.TEMPLATE_ALL_FILTERS_VALUE = TEMPLATE_ALL_FILTERS_VALUE;
const TEMPLATE_FILTER_VALUE = (header, currentValue, body) => {
    return `${header} \n\n ${currentValue ? `Текущее значение: ${currentValue}` : ''} \n\n ${body}`;
};
exports.TEMPLATE_FILTER_VALUE = TEMPLATE_FILTER_VALUE;
const TEMPLATE_INFO_MESSAGE = (header, body) => {
    return `${header} \n\n ${body}`;
};
exports.TEMPLATE_INFO_MESSAGE = TEMPLATE_INFO_MESSAGE;
const TEMPLATE_APARTMENT_MESSAGE = (apartment) => {
    const { title, address, price, pricePerMeter, href } = apartment;
    return `${title} \nАдрес: ${address} \nЦена: ${price} рублей (${pricePerMeter} руб. за кв.м.) \nСсылка: ${href}`;
};
exports.TEMPLATE_APARTMENT_MESSAGE = TEMPLATE_APARTMENT_MESSAGE;
//# sourceMappingURL=messages.js.map