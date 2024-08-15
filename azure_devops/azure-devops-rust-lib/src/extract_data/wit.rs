use serde_json::Value;
use tokio::{fs::{self, File}, io::AsyncReadExt};

pub async fn get_work_items_latest_update(root_path: &String) -> Option<String> {
    let output_path = format!("{}/{}", &root_path, "work_items_all");
    let default_lastest_update = Some(String::from("2000-01-01T00:00:00Z"));
    // ディレクトリの存在確認
    if !fs::metadata(&output_path).await.is_ok() {
        return default_lastest_update;
    }
    let file_path = format!("{}/{}", &output_path, "work_items_all.json");
    // ファイルの存在確認
    if !fs::metadata(&file_path).await.is_ok() {
        return default_lastest_update;
    }

    let mut file = File::open(file_path).await.unwrap();
    // ファイルの内容を文字列に読み込み
    let mut contents = String::new();
    file.read_to_string(&mut contents).await.unwrap();
    let json: Value = serde_json::from_str(&contents).unwrap();
    if json.as_array().unwrap().len() == 0 {
        return default_lastest_update;
    }

    // 最終更新日時の取得
    let mut latest_update = "";
    for work_item in json.as_array().unwrap() {
        let fields = work_item["fields"].as_object().unwrap();
        let updated_date = fields["System.ChangedDate"].as_str().unwrap();
        if updated_date > latest_update {
            latest_update = updated_date;
        }
    }
    Some(String::from(latest_update))

}