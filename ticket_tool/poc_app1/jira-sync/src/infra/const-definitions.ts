import * as Path from 'path';

// 設定ファイル名の定義
export const CONFIG_FILE_NAME = 'config.json';
export const SYNC_DATA_FILE_NAME = 'sync.json';

// データの出力先
export const OUTPUT_DIR = './output';
// 設定ファイルパス
export const CONFIG_FILE_PATH = `${OUTPUT_DIR}/${CONFIG_FILE_NAME}`;
export const SYNC_FILE_PATH = `${OUTPUT_DIR}/${SYNC_DATA_FILE_NAME}`;

export const DATA_DIR = Path.join(OUTPUT_DIR, 'data');

export const LOG_DIR = Path.join(OUTPUT_DIR, 'log');

export const FIELDS_FILE_PATH = Path.join(DATA_DIR, 'fields.json');
export const ISSUE_TYPE_FILE_PATH = Path.join(DATA_DIR, 'issuetypes.json');
export const PRIORITY_FILE_PATH = Path.join(DATA_DIR, 'priorities.json');
export const PROJECT_FILE_PATH = Path.join(DATA_DIR, 'projects.json');
export const STATUS_FILE_PATH = Path.join(DATA_DIR, 'statuscategory.json');
export const USER_FILE_PATH = Path.join(DATA_DIR, 'users.json');
export const USER_FILE_PATH2 = Path.join(DATA_DIR, 'users2.json');
export const USER_FILE_PATH3 = Path.join(DATA_DIR, 'users3.json');
export const USER_FILE_PATH4 = Path.join(DATA_DIR, 'users4.json');
export const USER_FILE_PATH5 = Path.join(DATA_DIR, 'users5.json');