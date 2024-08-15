use serde_json::Value;
use tokio::{fs::{self, File}, time::Instant, io::{AsyncReadExt, AsyncWriteExt}};
use crate::models::config::Config;


pub async fn load_fields(root_path: &String, config: &Config) {
    // /wit/fields
    let output_path = format!("{}/{}", &root_path, "meta_data");
    fs::create_dir_all(&output_path).await.unwrap();
    let file_path = format!("{}/{}", &output_path, "fields.json");

    let json_text = crate::resources::wit::get_fields(&config).await.unwrap();
    fs::write(file_path, json_text).await.unwrap();
}

pub async fn load_work_item_types(root_path: &String, config: &Config) {
    // wit/workitemtypes
    // ワーク項目タイプ一覧の取得
    let output_path = format!("{}/{}", &root_path, "meta_data");
    fs::create_dir_all(&output_path).await.unwrap();
    let file_path = format!("{}/{}", &output_path, "work_item_types.json");

    let json_text = crate::resources::wit::get_work_item_types(&config).await.unwrap();
    fs::write(file_path, json_text).await.unwrap(); 
}

pub async fn load_categories(root_path: &String, config: &Config) {
    // /wit/workitemtypecategories
    // カテゴリー一覧の取得
    let output_path = format!("{}/{}", &root_path, "meta_data");
    fs::create_dir_all(&output_path).await.unwrap();
    let file_path = format!("{}/{}", &output_path, "categories.json");

    let json_text = crate::resources::wit::get_work_item_type_categories(&config).await.unwrap();
    fs::write(file_path, json_text).await.unwrap();   
}

pub async fn load_work_item_states(root_path: &String, config: &Config) {
    // /wit/workitemtypes/{type}/states
    // ワーク項目ステート一覧の取得
    let output_path = format!("{}/{}", &root_path, "meta_data");
    fs::create_dir_all(&output_path).await.unwrap();
    let file_path = format!("{}/{}", &output_path, "work_item_states.json");
    
    // TODO: Bug以外の状態も取得する
    let json_text = crate::resources::wit::get_work_item_type_states(&config, "Bug").await.unwrap();
    fs::write(file_path, json_text).await.unwrap();
}

pub async fn load_classification_nodes(root_path: &String, config: &Config) {
    // /wit/classificationnodes
    // WorkItemの選択肢の一覧を取得する
    let output_path = format!("{}/{}", &root_path, "meta_data");
    fs::create_dir_all(&output_path).await.unwrap();
    let file_path = format!("{}/{}", &output_path, "work_item_classification_nodes.json");

    let json_text = crate::resources::wit::get_classification_nodes(&config, 5).await.unwrap();
    fs::write(file_path, json_text).await.unwrap();
}

pub async fn load_work_items(root_path: &String, config: &Config, ids: &Vec<u32>) {
    // /wit/workitems
    // この関数の処理時間の計測を開始する
    let start = Instant::now();

    let output_path = format!("{}/{}", &root_path, "work_items");
    fs::create_dir_all(&output_path).await.unwrap();
    
    let work_item_json_text_list = get_work_items(&config, ids.clone()).await;
    for json_text in work_item_json_text_list {
        let json: serde_json::Value = serde_json::from_str(&json_text).unwrap();
        let id = json["id"].as_u64().unwrap();
        let file_name = format!("{}.json", id);
        let file_path = format!("{}/{}", &output_path, file_name);
        fs::write(file_path, json_text).await.unwrap();
    }

    // この関数の処理時間の計測を終了する
    let end = Instant::now();
    println!("load_work_items: {:?}", end.duration_since(start));

    merge_work_items(root_path).await;
}

pub async fn load_work_items_revisions(root_path: &String, config: &Config, ids: &Vec<u32>) {
    let revisions_json_text_list = get_revisions(&config, ids.clone()).await;
    let output_path = format!("{}/{}", &root_path, "work_items_revisions");
    fs::create_dir_all(&output_path).await.unwrap();
    for (id, revisions_json_text) in revisions_json_text_list {
        let file_name = format!("{}.json", id);
        let file_path = format!("{}/{}", &output_path, file_name);
        fs::write(file_path, revisions_json_text).await.unwrap();
    }
}


async fn get_work_items(config: &Config, ids: Vec<u32>) -> Vec<String> {
    // idsを100個ずつのVec<u32>に分割してループ処理する
    let mut ids_vec = Vec::new();

    let mut i = 0;
    let mut vec_index = 0;
    ids_vec.push(Vec::new());
    for id in ids {
        ids_vec[vec_index].push(id);
        i += 1;

        if i == 100 {
            i = 0;
            ids_vec.push(Vec::new());
            vec_index += 1;
        }
    }

    let mut work_item_json_text_list = Vec::new();

    // 時間の計測開始
    let start = Instant::now();
    // 100件毎に経過時間を計測して出力するためのカウンター宣言
    let mut counter = 0;

    // ids_vecでループ処理
    for ids in ids_vec {
        if ids.len() == 0 {
            continue;
        }
        let json_text = crate::resources::wit::get_work_items(&config, ids).await.unwrap();
        let json: serde_json::Value = serde_json::from_str(&json_text).unwrap();
        let work_items = json["value"].as_array().unwrap();

        // work_itemsでループ
        for work_item in work_items {
            // Value型からString型に変換する
            let json_text = serde_json::to_string(&work_item).unwrap();
            work_item_json_text_list.push(json_text);
        }
        counter += work_items.len();
        let end = Instant::now();
        println!("get_work_items: {} {:?}", counter, end.duration_since(start));
    }
    work_item_json_text_list
}

pub async fn merge_work_items(root_path: &String) {

    let load_path = format!("{}/{}", &root_path, "work_items");

    let output_path = format!("{}/{}", &root_path, "work_items_all");
    fs::create_dir_all(&output_path).await.unwrap();
    let file_path = format!("{}/{}", &output_path, "work_items_all.json");

    let mut work_items: Vec<Value> = Vec::new();

    // data_pathディレクトリ内のjsonファイルをフルパスで取得
    let mut paths = fs::read_dir(load_path).await.unwrap();
    while let Some(path) = paths.next_entry().await.unwrap() {

        let file_path = path.path().to_string_lossy().into_owned();
        let mut file = File::open(file_path).await.unwrap();
        // ファイルの内容を文字列に読み込みます
        let mut contents = String::new();
        file.read_to_string(&mut contents).await.unwrap();
        let json: Value = serde_json::from_str(&contents).unwrap();
        work_items.push(json);
    }

    let mut file = File::create(file_path).await.unwrap();
    let json_text: String = serde_json::to_string(&work_items).expect("JSON変換に失敗");
    file.write_all(json_text.as_bytes()).await.unwrap();
}

async fn get_revisions(config: &Config, ids: Vec<u32>) -> Vec<(u32, String)> {

    let mut revisions_json_text_list: Vec<(u32, String)> = Vec::new();

    // 時間の計測開始
    let start = Instant::now();
    // 100件毎に経過時間を計測して出力するためのカウンター宣言
    let mut counter = 0;
    let mut total_counter = 0;
    for id in ids {
        let json_text = crate::resources::wit::get_workitem_revisions(&config, id).await.unwrap();
        revisions_json_text_list.push((id, json_text));
        // 100件毎に経過時間を計測して出力する
        counter += 1;
        total_counter += 1;
        if counter == 100 {
            let end = Instant::now();
            // get_revisionsの処理時間を出力する取得件数と処理時間を出力する
            println!("get_revisions: {} {:?}", total_counter, end.duration_since(start));
            counter = 0;
        }
    }
    revisions_json_text_list
}