use crate::models::config;
use crate::paths;
use crate::util::request;
use chrono::{DateTime, Utc};

pub async fn get_work_items_ids_by_from_change_date(config: &config::Config, from_changed_date: &DateTime<Utc>) -> Vec<u32> {

    let date_time_str = from_changed_date.format("%Y-%m-%d %H:%M:%S%.3f").to_string();
    // Work Item Query Language (WIQL) クエリ
    let query = r#"{
        "query": "
        SELECT
            [System.Id], [System.Title], [System.WorkItemType]
        FROM
            workitems
        WHERE
            [System.TeamProject] = '@project' AND [System.ChangedDate] > '@now_utc'
        ORDER BY
            [System.Id]"
    }"#.replace("@project", &config.project).replace("@now_utc", &date_time_str);

    let json_text = get_work_item_ids(&config, &query).await.unwrap();

    let json: serde_json::Value = serde_json::from_str(&json_text).unwrap();
    let work_items = json["workItems"].as_array().unwrap();

    let mut ids = Vec::new();
    for work_item in work_items {
        let id: u32 = work_item["id"].as_u64().unwrap() as u32;
        ids.push(id);
    }
    ids
}

pub async fn get_work_items_ids(config: &config::Config) -> Vec<u32> {

    // Work Item Query Language (WIQL) クエリ
    let query = r#"{
        "query": "
        SELECT
            [System.Id], [System.Title], [System.WorkItemType]
        FROM
            workitems
        WHERE
            [System.TeamProject] = '@project' 
        ORDER BY
            [System.Id]"
    }"#.replace("@project", &config.project);

    let json_text = crate::resources::wit::get_work_item_ids(&config, &query).await.unwrap();

    let json: serde_json::Value = serde_json::from_str(&json_text).unwrap();
    let work_items = json["workItems"].as_array().unwrap();

    let mut ids = Vec::new();
    for work_item in work_items {
        let id: u32 = work_item["id"].as_u64().unwrap() as u32;
        ids.push(id);
    }
    ids
}



/*
    クエリを指定して、ワークアイテムの一覧を取得する
*/
pub async fn get_work_item_ids(config: &config::Config, query: &str) -> Result<String, Box<dyn std::error::Error>>{

    let url = paths::wit::create_url(&config.organization, &config.project, 100000);
    let body = request::post(config, &url, query).await?;
    Ok(String::from(&body))
}

/*
    IDを指定して、ワークアイテムの一覧を取得する
*/
pub async fn get_work_items(config: &config::Config, ids: Vec<u32>) -> Result<String, Box<dyn std::error::Error>>{

    let url = paths::wit::create_work_items_url(&config.organization, &config.project, ids);
    let body = request::get(config, &url).await?;
    Ok(String::from(&body))
}

/*
    IDを指定して、ワークアイテムの履歴を取得する
*/
pub async fn get_workitem_revisions(config: &config::Config, id: u32) -> Result<String, Box<dyn std::error::Error>>{

    let url = paths::wit::create_revisions_url(&config.organization, &config.project, id);
    let body = request::get(config, &url).await?;
    Ok(String::from(&body))
}

/*
    wit/fields/list
    フィールド一覧を取得する
*/
pub async fn get_fields(config: &config::Config) -> Result<String, Box<dyn std::error::Error>>{

    let url = paths::wit::create_fields_url(&config.organization, &config.project);
    let body = request::get(config, &url).await?;
    Ok(String::from(&body))
}

/*
    wit/work-item-type-categories/list
    ワークアイテムの種類のカテゴリ一覧を取得する
*/
pub async fn get_work_item_type_categories(config: &config::Config) -> Result<String, Box<dyn std::error::Error>>{

    let url = paths::wit::create_work_item_type_categories_url(&config.organization, &config.project);
    let body = request::get(config, &url).await?;
    Ok(String::from(&body))
}

/*
    wit/classification-nodes/get-root-nodes
    ワークアイテムの種類のカテゴリ一覧を取得する
*/
pub async fn get_classification_nodes(config: &config::Config, depth: u32) -> Result<String, Box<dyn std::error::Error>>{

    let url = paths::wit::create_classification_nodes_url(&config.organization, &config.project, depth);
    let body = request::get(config, &url).await?;
    Ok(String::from(&body))
}

/*
    wit/work-item-type-states/list
    ワークアイテムの種類の状態一覧を取得する
*/
pub async fn get_work_item_type_states(config: &config::Config, work_item_type: &str) -> Result<String, Box<dyn std::error::Error>>{

    let url = paths::wit::create_work_item_type_states_url(&config.organization, &config.project, work_item_type);
    let body = request::get(config, &url).await?;
    Ok(String::from(&body))
}

/*
    wit/workitemtypes
    ワークアイテムの種類一覧を取得する
*/
pub async fn get_work_item_types(config: &config::Config) -> Result<String, Box<dyn std::error::Error>>{

    let url = paths::wit::create_work_item_types_url(&config.organization, &config.project);
    let body = request::get(config, &url).await?;
    Ok(String::from(&body))
}

/*
    wit/workitemtypes/{}/fields
    ワークアイテムの種類のフィールド一覧を取得する
*/
pub async fn get_work_item_types_field(config: &config::Config, work_item_type: &str) -> Result<String, Box<dyn std::error::Error>>{

    let url = paths::wit::create_work_item_types_field_url(&config.organization, &config.project, work_item_type);
    let body = request::get(config, &url).await?;
    Ok(String::from(&body))
}







