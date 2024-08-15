use serde::{Deserialize, Serialize};

// FontサイズとFont名を保持する構造体
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Font {
    pub size: i32,
    pub name: String,
}

impl Font {
    pub fn new() -> Font {
        Font {
            size: 0,
            name: String::new(),
        }
    }
    
}