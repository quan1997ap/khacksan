// app.config.js overwrite  API_URL_OVERWRITE;
declare let API_URL_OVERWRITE: any;
export const API_URL = API_URL_OVERWRITE;

export const EXPORT_TIMEOUT = 180000;
export const REQUEST_TIMEOUT = 60000;
export const AUTO_LOGOUT_TIME = 5; // minutes

export const DEFAULT_SORT = 'asc';  // 'desc'
export const ITEMS_PER_PAGE = [10, 20, 50];
export const UPLOAD_IMG_TYPES = [ ".jpg", ".jpeg", ".gif", ".png"  ]
export const DEFAULT_LOCALE = "vi-VN";

export const SEPARATOR_LIMIT = 100000000000000;
