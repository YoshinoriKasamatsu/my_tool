use crate::models::dialog::Dialog;
use crate::models::resource_block::ResourceBlock;
use crate::models::resource_file::ResourceFile;
use crate::models::resource_type::ResourceType;
use crate::models::string_table::StringTable;
use crate::models::control::Control;
use crate::models::font::Font;
use crate::models::rect::Rect;

pub fn read_resource_files(rc_files: glob::Paths) -> Vec<ResourceFile> {
    let mut resource_files = Vec::new();

    // リソースファイルの列挙
    for rc_file in rc_files {

        // ファイルのパスを取得
        let rc_file: Option<std::path::PathBuf> = rc_file.ok();
        let rc_file_path = rc_file.as_ref().unwrap();

        let utf16_text = crate::file_reader::read_utf16_file(rc_file_path);
        // \r\nを\nに変換、\rを\nに変換
        let rc_text = utf16_text.replace("\r\n", "\n").replace("\r", "\n");
        // \nで分割
        let rc_lines = rc_text.split("\n");

        // リソースブロック作成
        let lines = rc_lines.clone();
        let resource_blocks = create_resource_blocks(rc_lines);
        // StringTableデータ作成
        let string_tables = create_string_tables(&resource_blocks.clone());
        // Dialogデータ作成
        let dialogs = create_dialogs(&resource_blocks.clone());
        let resource_file = ResourceFile{
            path: rc_file_path.to_str().unwrap().to_string(),
            lines: lines.map(|s| s.to_string()).collect(),
            resource_blocks: resource_blocks,
            dialogs: dialogs,
            string_tables: string_tables,
        };

        resource_files.push(resource_file);
    }
    resource_files
}

fn create_dialogs(resource_blocks: &Vec<ResourceBlock>) -> Vec<Dialog> {
    let mut dialogs = Vec::new();
    for resource_block in resource_blocks {
        if resource_block.resource_type == ResourceType::DIALOG {
            let mut idd = String::new();
            let mut rect = Rect::new();
            let mut styles = Vec::new();
            let mut caption = String::new();
            let mut font: Font = Font {
                size: 0,
                name: String::new(),
            };
            let mut controls: Vec<Control> = Vec::new();
            let mut is_begin = false;

            for line in &resource_block.lines {

                // ENDが見つかったらフラグを下げる
                if line.contains("END") {
                    let dialog = Dialog::create(idd, styles, caption, font, rect, controls, Vec::new(), Vec::new());
                    dialogs.push(dialog);

                    idd = String::new();
                    rect = Rect::create(0,0,0,0);
                    styles = Vec::new();
                    caption = String::new();
                    font = Font::new();
                    controls = Vec::new();
                    is_begin = false;
                }

                // line内にDIALOGもしくはDIALOGEXを含む行かをチェック
                if line.contains("DIALOG") || line.contains("DIALOGEX") {
                    // DIALOGのIDを取得
                    // lineの最初のスペースの位置を検索して、その場所より前と後ろに分割する
                    let space_pos = line.find(" ");
                    if space_pos.is_none() {
                        continue;
                    }
                    let space_pos = space_pos.unwrap();
                    let id = &line[0..space_pos];
                    let rect_text = (&line[space_pos..]).trim();
                    let space_pos2 = rect_text.find(" ");
                    let rect_text = &rect_text[space_pos2.unwrap()..].trim();
                    idd = id.to_string();
                    // rectの取得
                    rect = Rect::from_text(rect_text);
                    continue;
                }

                // CAPTION
                if line.starts_with("CAPTION") {
                    // lineをスペースで分割
                    let mut fields = line.split(" ");
                    // CAPTIONを取得
                    caption = String::from(fields.nth(1).unwrap());
                    continue;
                }

                // FONT
                if line.starts_with("FONT") {
                    let space_pos = line.find(" ").unwrap();
                    let font_text = (&line[space_pos..]).trim();
                    let mut font_info = font_text.split(",");
                    let font_size = font_info.nth(0).unwrap().parse::<i32>().unwrap();                    
                    let font_name = font_info.nth(0).unwrap();
                    font = Font {
                        size: font_size,
                        name: String::from(font_name),
                    };
                    continue;
                }
                
                // BEGINが見つかったらフラグを立てる
                if line.contains("BEGIN") {
                    is_begin = true;
                    continue;
                }

                // STYLE
                if !is_begin && idd.len() > 0 {
                    let styles_array = line.split("|");
                    for style in styles_array {
                        styles.push(String::from(style.trim()));
                    }
                }
                
                // CONTROL
                if is_begin {
                    let line = line.trim();
                    let space_pos = line.find(" ").unwrap();

                    // コントロールタイプ
                    let control_type = &line[0..space_pos];

                    // コントロール情報
                    let control_info_text = line[space_pos..].trim();

                    let mut control_info = control_info_text.split(",");
                    // コントロールリソース
                    let control_resource = control_info.nth(0).unwrap().trim();

                    // コントロールID
                    let control_id = control_info.nth(0).unwrap().trim();

                    // コントロールのRect
                    let control_x = control_info.nth(0).unwrap().parse::<i32>().unwrap();
                    let control_y = control_info.nth(0).unwrap().parse::<i32>().unwrap();
                    let control_witdh = control_info.nth(0).unwrap().parse::<i32>().unwrap();
                    let control_height = control_info.nth(0).unwrap().parse::<i32>().unwrap();
                    let control = Control{
                        id: String::from(control_id),
                        class: String::from(control_type),
                        text: String::from(control_resource),
                        x: control_x,
                        y: control_y,
                        width: control_witdh,
                        height: control_height,
                    };
                    controls.push(control.clone())
                }
            }
        }
    }
    dialogs
}

fn create_string_tables(resource_blocks: &Vec<ResourceBlock>) -> Vec<StringTable> {
    // STRINGTABLESの作成
    let mut string_tables = Vec::new();

    for resource_block in resource_blocks {
        if resource_block.resource_type == ResourceType::STRING {
            // resouce_block.lines内のBEGINとENDを除去する
            let mut lines = resource_block.lines.clone();
            lines.retain(|line| !line.contains("BEGIN") && !line.contains("END"));
            for line in &lines {
                let line = line.trim();
                // lineの最初のスペースの位置を検索して、その場所より前と後ろに分割する
                let space_pos = line.find(" ");
                if space_pos.is_none() {
                    continue;
                }
                let space_pos = space_pos.unwrap();
                let id = &line[0..space_pos];
                let text = (&line[space_pos..]).trim();
                let string_table = StringTable {
                    id: String::from(id),
                    text: String::from(text),
                };

                string_tables.push(string_table);
            }
        }
    }
    string_tables
}

pub fn create_resource_blocks(rc_lines: std::str::Split<'_, &str>) -> Vec<ResourceBlock>{
    let mut resource_blocks = Vec::new();
    let mut resource_type = ResourceType::UNKNOWN;
    let mut resource_block: ResourceBlock = ResourceBlock{
        resource_type: ResourceType::UNKNOWN,
        lines: Vec::new(),
    };
    for line in rc_lines {
        // DIALOGの検出
        if line.contains(" DIALOG ") || line.contains(" DIALOGEX "){
            resource_type = ResourceType::DIALOG;
            resource_block.resource_type = ResourceType::DIALOG;
        }
        // STRINGTABLEの検出
        if line.contains("STRINGTABLE") {
            resource_type = ResourceType::STRING;
            resource_block.resource_type = ResourceType::STRING;
            continue;
        }

        // END検出でリソースタイプをUNKNOWNに戻す
        if line.contains("END") {
            if resource_type != ResourceType::UNKNOWN {
                resource_block.lines.push(String::from(line));
                resource_blocks.push(resource_block.clone());
            }
            resource_block = ResourceBlock{
                resource_type: ResourceType::UNKNOWN,
                lines: Vec::new(),
            };
            resource_type = ResourceType::UNKNOWN;
            continue;
        }

        // リソースブロックの追加
        if resource_type != ResourceType::UNKNOWN {
            resource_block.lines.push(String::from(line));
        }
    }
    resource_blocks
}
