import * as Path from 'path';
import * as fs from 'fs';
import { LOG_DIR } from "../const-definitions";

export class Logger {
    private filePath: string = '';
    private static instance: Logger;
    private constructor(filePath: string) {
        // シングルトン
        this.filePath = filePath;
    }
    static getInstance() {
        if (!this.instance) {
            // ログファイルはyyyy-mm-dd.logとする
            const logFilePath = Path.join(LOG_DIR, `${new Date().toISOString().split('T')[0]}.log`);
            // ログのディレクトリが存在しない場合は作成する
            if (!fs.existsSync(LOG_DIR)) {
                fs.mkdirSync(LOG_DIR, { recursive: true });
            }
            // ログファイルが存在しない場合は作成する
            if (!fs.existsSync(logFilePath)) {
                fs.writeFileSync(logFilePath, '', 'utf8');
            }

            this.instance = new Logger(logFilePath);
        }
        return this.instance;
    }
    info(message: string) {
        console.log(`[INFO] ${message}`);
        // ログファイルに出力
        this.write(message);
    }
    error(message: string) {
        console.log(`[ERROR] ${message}`);
        // ログファイルに出力
        this.write(message);
    }
    warn(message: string) {
        console.log(`[WARN] ${message}`);
        // ログファイルに出力
        this.write(message);
    }
    debug(message: string) {
        console.log(`[DEBUG] ${message}`);
        // ログファイルに出力
        this.write(message);
    }

    // ログファイルへの書き込み関数。日時(yyyy-MM-dd_HH:MM:ss.fff形式)付きで出力する
    write(message: string) {
        const now = new Date();
        const logMessage = `[${now.toISOString()}] ${message}`;
        console.log(logMessage);
        // ログファイルに出力
        fs.appendFileSync(this.filePath, `${logMessage}\n`, 'utf8');
    }
    
}   