use serde::{Deserialize, Serialize};
use crate::models::control::Control;
use crate::models::rect::Rect;

use super::font::Font;
use super::resource_file::CodeInfo;
use super::string_table::StringTable;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Dialog {
    pub id: String,
    pub styles: Vec<String>,
    pub text: String,
    pub font: Font,
    pub rect: Rect,
    pub controls: Vec<Control>,
    pub code_infos: Vec<CodeInfo>,
    pub header_files: Vec<String>,
    pub reference_string_table_ids: Vec<StringTable>,
}

impl Dialog {
    pub fn create(id: String, styles: Vec<String>, text: String, font: Font, rect: Rect, controls: Vec<Control>, code_info: Vec<CodeInfo>, header_files: Vec<String>) -> Dialog {
        Dialog {
            id: id,
            styles: styles,
            text: text,
            font: font,
            rect: rect,
            controls: controls,
            code_infos: code_info,
            header_files: header_files,
            reference_string_table_ids: Vec::new(),
        }
    }
}