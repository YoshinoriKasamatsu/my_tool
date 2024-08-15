
use serde::{Deserialize, Serialize};
use crate::models::dialog::Dialog;
use crate::models::resource_block::ResourceBlock;
use crate::models::string_table::StringTable;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CodeInfo {
    pub header_file_path: String,
    pub header_file_lines: Vec<String>,
    pub code_file_path: String,
    pub code_file_lines: Vec<String>,
    pub reference_string_table_ids: Vec<StringTable>,
}

// シリアル化用の構造体
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ResourceFile {
    pub path: String,
    pub lines: Vec<String>,
    pub resource_blocks: Vec<ResourceBlock>,
    pub dialogs: Vec<Dialog>,
    pub string_tables: Vec<StringTable>,
}
