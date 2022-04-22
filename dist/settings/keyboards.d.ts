import { IDistrictsFilter } from 'src/interfaces/IDistrictsFilter';
import { IRoomsFilter } from 'src/interfaces/IRoomsFilter';
export declare const KEYBOARD_BACK_TO_MENU: {
    inline_keyboard: {
        text: string;
        callback_data: string;
    }[][];
};
export declare const KEYBOARD_BACK_TO_FILTER: {
    inline_keyboard: {
        text: string;
        callback_data: string;
    }[][];
};
export declare const KEYBOARD_FILTERS_START: {
    inline_keyboard: {
        text: string;
        callback_data: string;
    }[][];
};
export declare const KEYBOARD_ROOMS_FILTER: (rooms: IRoomsFilter) => {
    inline_keyboard: {
        text: string;
        callback_data: string;
    }[][];
};
export declare const KEYBOARD_DISTRICTS_FILTER: (districts: IDistrictsFilter) => {
    inline_keyboard: {
        text: string;
        callback_data: string;
    }[][];
};
export declare const KEYBOARD_SEARCH_MENU: {
    inline_keyboard: {
        text: string;
        callback_data: string;
    }[][];
};
export declare const KEYBOARD_MAIN_MENU: {
    inline_keyboard: {
        text: string;
        callback_data: string;
    }[][];
};
