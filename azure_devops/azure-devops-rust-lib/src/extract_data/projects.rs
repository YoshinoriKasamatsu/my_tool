use serde_json::Value;
use tokio::{fs::{self, File}, io::AsyncReadExt};

pub async fn get_project_id(root_path: &String, project_name: &str) -> Option<String> {
    let output_path = format!("{}/{}", &root_path, "meta_data");
    // ディレクトリの存在確認
    if !fs::metadata(&output_path).await.is_ok() {
        return None;
    }
    let file_path = format!("{}/{}", &output_path, "projects.json");
    // ファイルの存在確認
    if !fs::metadata(&file_path).await.is_ok() {
        return None;
    }

    let mut file = File::open(file_path).await.unwrap();
    // ファイルの内容を文字列に読み込み
    let mut contents = String::new();
    file.read_to_string(&mut contents).await.unwrap();
    let json: Value = serde_json::from_str(&contents).unwrap();

    // 最終更新日時の取得
    for project in json["value"].as_array().unwrap() {
        let project_name_value = project["name"].as_str().unwrap();
        if project_name_value == project_name {
            return Some(String::from(project["id"].as_str().unwrap()));
        }
    }
    None
}

pub async fn get_process_id(root_path: &String) -> Option<String> {
    let output_path = format!("{}/{}", &root_path, "meta_data");
    // ディレクトリの存在確認
    if !fs::metadata(&output_path).await.is_ok() {
        return None;
    }
    let file_path = format!("{}/{}", &output_path, "project.json");
    // ファイルの存在確認
    if !fs::metadata(&file_path).await.is_ok() {
        return None;
    }

    let mut file = File::open(file_path).await.unwrap();
    // ファイルの内容を文字列に読み込み
    let mut contents = String::new();
    file.read_to_string(&mut contents).await.unwrap();
    let json: Value = serde_json::from_str(&contents).unwrap();

    // 最終更新日時の取得
    for value in json["value"].as_array().unwrap() {
        let key = value["name"].as_str().unwrap();
        if key == "System.CurrentProcessTemplateId" {
            return Some(String::from(value["value"].as_str().unwrap()));
        }
    }
    None
}