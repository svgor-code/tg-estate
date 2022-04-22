"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEYBOARD_MAIN_MENU = exports.KEYBOARD_SEARCH_MENU = exports.KEYBOARD_DISTRICTS_FILTER = exports.KEYBOARD_ROOMS_FILTER = exports.KEYBOARD_FILTERS_START = exports.KEYBOARD_BACK_TO_FILTER = exports.KEYBOARD_BACK_TO_MENU = void 0;
const DistrictsFilter_1 = require("../enities/DistrictsFilter");
const RoomsFilter_1 = require("../enities/RoomsFilter");
exports.KEYBOARD_BACK_TO_MENU = {
    inline_keyboard: [[{ text: '⤴️ Меню', callback_data: '/menu' }]],
};
exports.KEYBOARD_BACK_TO_FILTER = {
    inline_keyboard: [[{ text: '⤴️ Фильтры', callback_data: '/filters' }]],
};
exports.KEYBOARD_FILTERS_START = {
    inline_keyboard: [
        [
            { text: '🏷️ Цена объекта', callback_data: '/filter-maxprice' },
            { text: '🛁 Комнатность', callback_data: '/filter-rooms' },
        ],
        [
            { text: '🌇 Район', callback_data: '/filter-districts' },
            { text: '🪜 Этаж', callback_data: '/filter-floors' },
        ],
        [{ text: '⤴️ Меню', callback_data: '/menu' }],
    ],
};
const KEYBOARD_ROOMS_FILTER = (rooms) => {
    return {
        inline_keyboard: [
            [
                {
                    text: `${rooms[0] ? '✅' : ''} ${RoomsFilter_1.ROOMS_NAMES[0]}`,
                    callback_data: '/filter-rooms-0',
                },
                {
                    text: `${rooms[1] ? '✅' : ''} ${RoomsFilter_1.ROOMS_NAMES[1]}`,
                    callback_data: '/filter-rooms-1',
                },
                {
                    text: `${rooms[2] ? '✅' : ''} ${RoomsFilter_1.ROOMS_NAMES[2]}`,
                    callback_data: '/filter-rooms-2',
                },
            ],
            [
                {
                    text: `${rooms[3] ? '✅' : ''} ${RoomsFilter_1.ROOMS_NAMES[3]}`,
                    callback_data: '/filter-rooms-3',
                },
                {
                    text: `${rooms[4] ? '✅' : ''} ${RoomsFilter_1.ROOMS_NAMES[4]}`,
                    callback_data: '/filter-rooms-4',
                },
                {
                    text: `${rooms[5] ? '✅' : ''} ${RoomsFilter_1.ROOMS_NAMES[5]}`,
                    callback_data: '/filter-rooms-5',
                },
            ],
            [{ text: 'Готово', callback_data: '/filter-rooms-save' }],
        ],
    };
};
exports.KEYBOARD_ROOMS_FILTER = KEYBOARD_ROOMS_FILTER;
const KEYBOARD_DISTRICTS_FILTER = (districts) => {
    return {
        inline_keyboard: [
            [
                {
                    text: `${districts[0] ? '✅' : ''} ${DistrictsFilter_1.DISTRICTS_NAMES[0]}`,
                    callback_data: '/filter-districts-0',
                },
            ],
            [
                {
                    text: `${districts[1] ? '✅' : ''} ${DistrictsFilter_1.DISTRICTS_NAMES[1]}`,
                    callback_data: '/filter-districts-1',
                },
            ],
            [
                {
                    text: `${districts[2] ? '✅' : ''} ${DistrictsFilter_1.DISTRICTS_NAMES[2]}`,
                    callback_data: '/filter-districts-2',
                },
            ],
            [
                {
                    text: `${districts[3] ? '✅' : ''} ${DistrictsFilter_1.DISTRICTS_NAMES[3]}`,
                    callback_data: '/filter-districts-3',
                },
            ],
            [{ text: 'Готово', callback_data: '/filter-districts-save' }],
        ],
    };
};
exports.KEYBOARD_DISTRICTS_FILTER = KEYBOARD_DISTRICTS_FILTER;
exports.KEYBOARD_SEARCH_MENU = {
    inline_keyboard: [
        [
            { text: '✅ Включить', callback_data: '/search-start' },
            { text: '🚫 Остановить', callback_data: '/search-stop' },
        ],
        [{ text: '⤴️ Меню', callback_data: '/menu' }],
    ],
};
exports.KEYBOARD_MAIN_MENU = {
    inline_keyboard: [
        [
            { text: '⚙️ Мои фильтры', callback_data: '/filters' },
            { text: '🔎 Поиск', callback_data: '/search' },
        ],
        [
            { text: '🤖 О боте', callback_data: '/about' },
            { text: '📧 Поддержка', callback_data: '/support' },
        ],
    ],
};
//# sourceMappingURL=keyboards.js.map