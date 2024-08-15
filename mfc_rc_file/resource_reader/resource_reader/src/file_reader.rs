use std::path::{Path, PathBuf};
use std::fs::read;

pub fn read_utf16_file(rc_file_path: &PathBuf) -> String {
    // ファイルをUTF16で開く
    let path = Path::new(rc_file_path);
    let contents = read(path).expect("Failed to read file");
    let mut wchars = Vec::new();
    for i in 0..contents.len() / 2 {
        let c = u16::from_le_bytes([contents[i * 2], contents[i * 2 + 1]]);
        wchars.push(c);
    }
    let utf16_text = String::from_utf16(&wchars).unwrap();
    utf16_text
}
