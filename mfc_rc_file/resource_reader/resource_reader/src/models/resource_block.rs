use serde::{Deserialize, Serialize};
use crate::models::resource_type::ResourceType;

// リソースブロック
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ResourceBlock {
    pub resource_type: ResourceType,
    pub lines: Vec<String>,
}
