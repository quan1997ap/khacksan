export const LAYOUT_CONFIG = {
    STICKY_SPACE: 60,  // = 2 * PADDING_PAGE ( 30px )
    DEFAULT_PAGE_MARGIN_TOP: 64, // for sticky header
    PADDING_PAGE: 30
}

// export const IS_FIXED_PAGINATION = window.innerWidth < 1220 ? false : true;
export const IS_FIXED_PAGINATION = false;

// https://github.com/Juris-M/citeproc-js/issues/4
export const LIST_LOCALES: { [wp: string]: string | boolean } = {
    'vi': 'vi-VN',
    'en_AU': 'en-US',
    'en_CA': 'en-US',
    'en_GB': 'en-GB',
    'en_NZ': 'en-US',
    'en_US': 'en-US',
    'en_ZA': 'en-US',
}