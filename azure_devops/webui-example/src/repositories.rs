use core::panic;

use serde_json::Value;
use tokio::fs::File;
use tokio::io::AsyncReadExt;


// dataのパスを定数として定義
const DATA_PATH: &str = "./data";

pub async fn get_categories() -> Value {

    let categories_path = format!("{}/{}", DATA_PATH, "meta_data");
    let categories_file_path = format!("{}/{}", &categories_path, "categories.json");

    let mut file = File::open(categories_file_path).await.unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).await.unwrap();
    let value: Value = serde_json::from_str(&contents).unwrap();
    value.clone()
}

pub async fn get_fields() -> Value {

    let path = format!("{}/{}", DATA_PATH, "meta_data");
    let file_path = format!("{}/{}", &path, "fields.json");

    let mut file = File::open(file_path).await.unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).await.unwrap();
    let value: Value = serde_json::from_str(&contents).unwrap();
    value.clone()
}

pub async fn get_work_item_types() -> Value {

    let path = format!("{}/{}", DATA_PATH, "meta_data");
    let file_path = format!("{}/{}", &path, "work_item_types.json");

    let mut file = File::open(file_path).await.unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).await.unwrap();
    let value: Value = serde_json::from_str(&contents).unwrap();
    value.clone()
}

pub async fn get_classification() -> Value {

    let path = format!("{}/{}", DATA_PATH, "meta_data");
    let file_path = format!("{}/{}", &path, "work_item_classification_nodes.json");

    let mut file = File::open(file_path).await.unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).await.unwrap();
    let value: Value = serde_json::from_str(&contents).unwrap();
    value.clone()
}

pub async fn get_states() -> Value {

    let path = format!("{}/{}", DATA_PATH, "meta_data");
    let file_path = format!("{}/{}", &path, "work_item_states.json");

    let mut file = File::open(file_path).await.unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).await.unwrap();
    let value: Value = serde_json::from_str(&contents).unwrap();
    value.clone()
}

pub async fn get_work_items() -> Value {
    let path = format!("{}/{}", DATA_PATH, "work_items_all");
    let file_path = format!("{}/{}", &path, "work_items_all.json");

    let mut contents = String::new();
    if let Ok(mut file) = File::open(&file_path).await{
        file.read_to_string(&mut contents).await.unwrap();
    }else{
        println!("{}", file_path);
        panic!("Error: get_work_items");
    }
    let value: Value = serde_json::from_str(&contents).unwrap();
    value.clone()
}

pub async fn get_processes_layout() -> Value {
    let path = format!("{}/{}/{}", DATA_PATH, "meta_data", "processes");
    let file_path = format!("{}/{}", &path, "layout.json");
    let mut contents = String::new();

    if let Ok(mut file) = File::open(&file_path).await{
        file.read_to_string(&mut contents).await.unwrap();
    }else{
        println!("{}", file_path);
        panic!("Error: get_processes_layout");
    }
    let value: Value = serde_json::from_str(&contents).unwrap();
    value.clone()
}