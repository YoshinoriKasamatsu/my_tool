use serde::{Deserialize, Serialize};

// 位置とサイズを保持する構造体
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Rect {
    pub x: i32,
    pub y: i32,
    pub width: i32,
    pub height: i32,
}

impl Rect {
    pub fn create(x: i32, y: i32, width: i32, height: i32) -> Rect {
        Rect {
            x: x,
            y: y,
            width: width,
            height: height,
        }
    }
}

// Rectに関する関数を定義する
impl Rect {
    pub fn from_text(text: &str) -> Rect {
        let v: Vec<&str> = text.split(',').collect();
        Rect {
            x: v[0].trim().parse().unwrap(),
            y: v[1].trim().parse().unwrap(),
            width: v[2].trim().parse().unwrap(),
            height: v[3].trim().parse().unwrap(),
        }
    }

    pub fn new() -> Rect {
        Rect {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }
    }
}
