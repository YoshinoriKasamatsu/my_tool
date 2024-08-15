use tokio::fs;
use tokio::fs::File;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::time::Instant;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use serde_json;


pub async fn load_work_items() {

    // この関数の処理時間の計測を開始する
    let start = Instant::now();


    let mut work_items: Vec<Value> = Vec::new();
    let data_path = "./../data/work_items/";
    // let data_path = "./data/";

    // data_pathディレクトリ内のjsonファイルをフルパスで取得
    let mut paths = fs::read_dir(data_path).await.unwrap();
    // ファイルをpolarsのDataFrameに変換する
    // let mut df = DataFrame::new();
    while let Some(path) = paths.next_entry().await.unwrap() {

        let file_path = path.path().to_string_lossy().into_owned();
        let mut file = File::open(file_path).await.unwrap();
        // ファイルの内容を文字列に読み込みます
        let mut contents = String::new();
        file.read_to_string(&mut contents).await.unwrap();
        let json: Value = serde_json::from_str(&contents).unwrap();
        // println!("{:?}", contents);
        work_items.push(json);
    }
    println!("{}", work_items.len());

    let mut file = File::create("work_items_all.json").await.unwrap();
    let json_text: String = serde_json::to_string(&work_items).expect("JSON変換に失敗");;
    let result = file.write_all(json_text.as_bytes()).await.unwrap();

    // この関数の処理時間の計測を終了する
    let end = Instant::now();
    println!("load_work_items: {:?}", end.duration_since(start));
}

pub async fn load_work_items_all() {
    // この関数の処理時間の計測を開始する
    let start = Instant::now();
    let mut file = File::open("work_items_all.json").await.unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).await.unwrap();
    let value: Value = serde_json::from_str(&contents).unwrap();
    let work_items = value.as_array();
    println!("{:}", work_items.unwrap().len());
    // この関数の処理時間の計測を終了する
    let end = Instant::now();
    println!("load_work_items: {:?}", end.duration_since(start));
}