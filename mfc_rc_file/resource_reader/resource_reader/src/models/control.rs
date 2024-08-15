use serde::{Deserialize, Serialize};

// コントロール
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Control {
    pub id: String,
    pub class: String,
    pub text: String,
    pub x: i32,
    pub y: i32,
    pub width: i32,
    pub height: i32,
}