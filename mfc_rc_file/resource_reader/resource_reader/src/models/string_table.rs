use serde::{Deserialize, Serialize};

// コントロール
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct StringTable {
    pub id: String,
    pub text: String,
}
