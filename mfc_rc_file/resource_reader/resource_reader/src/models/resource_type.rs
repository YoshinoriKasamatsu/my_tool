use serde::{Deserialize, Serialize};

// リソースタイプの列挙型
#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub enum ResourceType {
    DIALOG,
    MENU,
    STRING,
    ACCELERATORS,
    CURSOR,
    ICON,
    BITMAP,
    HTML,
    MANIFEST,
    VERSION,
    UNKNOWN,
}
