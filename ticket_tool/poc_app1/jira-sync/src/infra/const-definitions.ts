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

export const FIELDS_FILE_PATH = Path.join(DATA_DIR, 'fields.json');