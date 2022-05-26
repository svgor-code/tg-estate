import { Payment } from '@a2seven/yoo-checkout';
import moment from 'moment';
import { DISTRICTS_NAMES } from 'src/enities/DistrictsFilter';
import { ROOMS_NAMES } from 'src/enities/RoomsFilter';
import { SELLER_TYPES } from 'src/enities/SellerTypeFilter';
import { IApartment } from 'src/interfaces/IApartment';
import { CreatedSubscription } from 'src/interfaces/Subscription';

export type AllFiltersValues = {
  maxprice: string | null;
  floor: string | null;
  rooms: string | null;
  district: string | null;
  square: string | null;
  seller: string | null;
};

export const MESSAGE_START = (isActiveInitialSub: boolean) =>
  `Здравствуйте! Я бот для поиска квартир. \n\nКак я работаю: \n\n - 24/7 анализирую вторичные квартиры на Авито; \n - Обновляю базу 1 раз в минуту \n - Даю возможность настроить сигналы под себя с помощью фильтров прямо внутри бота \n - Присылаю ссылки на подходящие вам квартиры сразу после публикации объявления 🔥${
    isActiveInitialSub
      ? '\n\nАктивировал вам бесплатный пробный период на 3 дня 🎁'
      : ''
  }`;

export const MESSAGE_START_2 =
  '📹 Смотрите подробную видео инструкцию о том как начать работу с ботом 👇';

export const MESSAGE_START_3 =
  'Для начала работы с ботом нажмите ➡️ /menu и настройте параметры в разделе ⚙️ Мои фильтры, затем запустите оповещения в разделе ✉️ Оповещения\n\nПосле первого запуска бота вы получите ссылки на недавно опубликованные объявления, подходящие под ваши фильтры';

export const MESSAGE_CURRENT_FILTERS =
  'Выберите одну из опций, для настройки фильтров:';

export const MESSAGE_ROOMS_FILTER = 'Выберите количество комнат:';
export const MESSAGE_DISTRICTS_FILTER = 'Выберите районы:';
export const MESSAGE_SELLER_TYPES_FILTER = 'Выберите тип продавца:';

export const MESSAGE_SUCCESSFULLY_UPDATE = (isSearchActive: boolean) =>
  `Успешно сохранено! \n\n${
    !isSearchActive
      ? 'Для включения оповещений перейдите в Меню ➡️ /menu, а затем в раздел ✉️ Оповещения'
      : ''
  }`;
export const MESSAGE_SEARCH_ON = 'Оповещения включены';
export const MESSAGE_SEARCH_OFF = 'Оповещения остановлены';

export const MESSAGE_MAXPRICE_FILTER =
  'Введите максимальную цену квартиры, по которой будут приходить сигналы \n\nПример сообщения: \n<strong>3000000</strong>';

export const MESSAGE_FLOOR_FILTER =
  'Введите диапазон этажей, по которому будут приходить сигналы, через дефис. \n\nПример сообщения: <strong>2-24</strong>';

export const MESSAGE_SQUARE_FILTER =
  'Введите через дефис диапазон площади, по которому будут приходить сигналы: \n\nПример сообщения: <strong>45-67</strong>';

export const MESSAGE_TG_MENU_MENU = `📋 Меню`;
export const MESSAGE_TG_MENU_FILTERS = `⚙️ Мои фильтры`;
export const MESSAGE_TG_MENU_SUPPORT = `📧 Поддержка`;
export const MESSAGE_TG_MENU_SUBSCRIPTION = `⭐ Моя подписка`;
export const MESSAGE_TG_MENU_TARIFFS = `🚀 Тарифы`;

export const MESSAGE_HEADER_FILTERS = `⚙️ Текущие параметры фильтров`;
export const MESSAGE_HEADER_FILTER_FlOOR = `⚙️ Этаж квартиры`;
export const MESSAGE_HEADER_FILTER_DISTRICTS = `⚙️ Районы`;
export const MESSAGE_HEADER_FILTER_ROOMS = `⚙️ Количество комнат`;
export const MESSAGE_HEADER_FILTER_MAXPRICE = `⚙️ Цена объекта`;
export const MESSAGE_HEADER_FILTER_SQUARE = `⚙️ Площадь`;
export const MESSAGE_HEADER_FILTER_SELLER_TYPES = `⚙️ Продавец`;

export const MESSAGE_HEADER_MAIN_MENU = `📋 <strong>Меню</strong>`;
export const MESSAGE_HEADER_SEARCH = `✉️ <strong>Оповещения</strong>`;
export const MESSAGE_HEADER_ABOUT = `🤖 <strong>Инструкция</strong>`;
export const MESSAGE_HEADER_SUPPORT = `📧 <strong>Поддержка</strong>`;
export const MESSAGE_HEADER_SUBSCRIPTION = `⭐ <strong>Моя подписка</strong>`;
export const MESSAGE_HEADER_TARIFFS = `🚀 <strong>Тарифы</strong>`;
export const MESSAGE_HEADER_PAY_SUBSCRIPTION = `💳 <strong>Оплата подписки</strong>`;

export const MESSAGE_BODY_SUPPORT =
  'Нашли ошибку в работе бота? Пишите сюда: @peschanik23';
export const MESSAGE_BODY_ABOUT =
  'Бот ищет новые объявления на Авито, по категории <strong>Вторичное жилье</strong>. \n\nКаждое объявление проходит пользовательские фильтры. Если объявление прошло фильтры, бот отправляет вам сообщение с ним. \n\nДля начала работы настройте параметры в разделе <strong>⚙️ Мои фильтры</strong> и запустите оповещения в разделе <strong>✉️ Оповещения</strong>';

export const MESSAGE_INACTIVE_SUBSCRIPTION_INFO = `На данный момент у вас нет активных подписок.`;

export const MESSAGE_INITIAL_SUBSCRIPTION_SUCCESS =
  'Активирован пробный период на 3 дня';

export const MESSAGE_DISABLE_SUBSCRIPTION_INFO = `Истек срок вашей подписки. Оповещения недоступны. Для получения оповещений оплатите подписку и включите оповещения.`;

export const MESSAGE_DISCOUNTS_INFO = `Нотифик также доступен по групповому тарифу👥\n\nЧем больше группа, тем дешевле:\n\nОт 3 человек - скидка 15% 😮\nОт 5 человек - скидка 25% 😲\nОт 10 человек - скидка 50% 🤩\n\nСкидка действует на все тарифы. Для получения групповых бонусов пишите в поддержку -> @peschanik23`;

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

export const MESSAGE_SUBSCRIPTION_ERROR = `Не удалось осуществить подписку, пожалуйста, обратитесь в поддержку. Платеж отменен.`;

export const MESSAGE_CURRENT_DISTRICTS_FILTER = (activeDistricts) => {
  const districtsList = activeDistricts
    .map((districtIndex) => DISTRICTS_NAMES[districtIndex])
    .join(', ');

  return `<strong>${districtsList}</strong>`;
};

export const MESSAGE_CURRENT_SELLER_TYPES_FILTER = (activeSellers) => {
  const sellersList = activeSellers
    .map((sellerIndex) => SELLER_TYPES[sellerIndex])
    .join(', ');

  return `<strong>${sellersList}</strong>`;
};

export const TEMPLATE_SEARCH_VALUE = (
  header: string,
  currentValue: boolean,
  isSubscriptionActive: boolean
) => {
  return `${header} \n\nТекущее значение: ${
    currentValue ? 'Включены' : 'Остановлены'
  }${
    !isSubscriptionActive
      ? '\n\nОповещения недоступны, так как у вас нет активной подписки. Оплатить подписку можно кликнув на кнопку "Оплатить подписку" 👇'
      : ''
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
  } \n\n - Продавец: ${filters.seller} \n\n${body ? body : ''}`;
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

export const TEMPLATE_SUBSCRIPTION_MESSAGE = (
  subscriptionName: string,
  endedAt: string
) => {
  return `<strong>Тариф: </strong>${subscriptionName}\n<strong>Истекает: ${endedAt}</strong>`;
};

export const TEMPLATE_TARIFFS_MESSAGE = (
  subscriptions: CreatedSubscription[]
) => {
  const tariffsText = subscriptions
    .map((sub) => `<strong>${sub.name}:</strong> ${sub.priceString}`)
    .join('\n');

  return `${MESSAGE_HEADER_TARIFFS}\n\nНотифик доступен по подписке в ${subscriptions.length} тарифах.\n\n${tariffsText}\n\nДля всех новых пользователей первые <strong>3 ДНЯ БЕСЛАТНО</strong>.\n\nОплатить подписку можно прямо в боте по истечении пробного периода. Оплатить можно картой.\n\nО статусе текущей подписки можно узнать по команде /subscription.`;
};

export const TEMPLATE_PAY_SUBSCRIPTION_MESSAGE = () => {
  return `${MESSAGE_HEADER_PAY_SUBSCRIPTION}\n\nОплатите подписку картой прямо в боте.`;
};

export const TEMPLATE_INVOICE_SUBSCRIPTION_DESCRIPTION = (
  subscription: CreatedSubscription,
  payment: Payment
) => {
  return `<strong>Ваш счет на оплату сформирован: </strong>\n<strong>ID платежа: </strong>${payment.id}\n<strong>Платежная система: </strong>ЮKassa\n<strong>Детали: </strong>${subscription.priceString}\n\nДля завершения процесса оплаты нажмите на кнопку 💰 Оплатить. После оплаты подписка будет активирована в течение нескольких минут \n\nЕсли хотите оплатить другим способом, напишите в поддержку -> @peschanik23`;
};

export const TEMPLATE_INVOICE_SUBSCRIPTION_DESCRIPTION_WAIT = (
  payment: Payment
) => {
  return `<strong>Ваш платеж за подписку ${payment.description} ожидает подтверждения</strong>`;
};

export const TEMPLATE_INVOICE_SUBSCRIPTION_DESCRIPTION_SUCCESS = (
  payment: Payment
) => {
  return `<strong>Ваш платеж за подписку ${payment.description} подтвержден</strong>`;
};

export const TEMPLATE_INVOICE_SUBSCRIPTION_DESCRIPTION_CANCELED = (
  payment: Payment
) => {
  return `<strong>Ваш платеж за подписку ${payment.description} отменен</strong>`;
};

export const TEMPLATE_ACTIVE_SUBSCRIPTION_INFO = (
  subscription: CreatedSubscription,
  endedAt: Date
) => {
  return `Ваша активная подписка: <strong>${
    subscription.name
  }</strong>\nПодписка действительна до: ${moment(endedAt).format(
    'DD-MM-YYYY'
  )}`;
};

export const TEMPLATE_SUBSCRIPTION_SUCCESS_MESSAGE = (
  subscription: CreatedSubscription,
  endedAt: Date
) => {
  return `Вы успешно активировали подписку: <strong>${
    subscription.name
  }</strong>\n\nПодписка действительна до: ${moment(endedAt).format(
    'DD-MM-YYYY'
  )}`;
};

export const TEMPLATE_ALREADY_ACTIVE_SUBSCRIPTION_MESSAGE = (
  subscription: CreatedSubscription,
  endedAt: Date
) => {
  return `У вас уже есть активная подписка.\n\n${TEMPLATE_ACTIVE_SUBSCRIPTION_INFO(
    subscription,
    endedAt
  )}`;
};
