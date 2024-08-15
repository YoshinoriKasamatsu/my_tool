pub fn create_url(organization: &str, project: &str, top: u32) -> String {
    let request_url = format!("https://dev.azure.com/{}/{}/_apis/wit/wiql?timePrecision=true&$top={}&api-version=7.0", organization, project, top);
    request_url
}

pub fn create_work_items_url(organization: &str, project: &str, ids: Vec<u32>) -> String {
    let ids_string = ids.iter().map(|id| id.to_string()).collect::<Vec<String>>().join(",");
    let request_url = format!("https://dev.azure.com/{}/{}/_apis/wit/workitems?ids={}&$expand=all&api-version=7.0", organization, project, ids_string);
    request_url
}

/*
    IDを指定して、ワークアイテムの履歴を取得する
*/
pub fn create_revisions_url(organization: &str, project: &str, id: u32) -> String {
    let id_string = id.to_string();
    let request_url = format!("https://dev.azure.com/{}/{}/_apis/wit/workitems/{}/revisions?$expand=all&api-version=7.0", organization, project, id_string);
    request_url
}

/*
    /wit/fields
    フィールド一覧を取得する
*/
pub fn create_fields_url(organization: &str, project: &str) -> String {
    let request_url = format!("https://dev.azure.com/{}/{}/_apis/wit/fields?$expand=extensionFields&api-version=7.0", organization, project);
    request_url
}

/*
    /wit/workitemtypes
    WorkItemの種類ごとの項目一覧
*/
pub fn create_work_item_types_url(organization: &str, project: &str) -> String {
    let request_url = format!("https://dev.azure.com/{}/{}/_apis/wit/workitemtypes?api-version=7.0", organization, project);
    request_url
}

/*
    /wit/workitemtypecategories
    WorkItemのカテゴリ一覧を取得する
*/
pub fn create_work_item_type_categories_url(organization: &str, project: &str) -> String {
    let request_url = format!("https://dev.azure.com/{}/{}/_apis/wit/workitemtypecategories?api-version=7.0", organization, project);
    request_url
}

/*
    /wit/workitemtypes/{type}/fields
    WorkItemのフィールド一覧をBug/Taskなどを指定して取得
*/
pub fn create_work_item_types_field_url(organization: &str, project: &str, work_item_type: &str) -> String {
    let request_url = format!("https://dev.azure.com/{}/{}/_apis/wit/workitemtypes/{}/fields?$expand=all&api-version=7.0", organization, project, work_item_type);
    request_url
}

/*
    /wit/workitemtypes/{type}/states
    WorkItemをカテゴリを指定して状態一覧を取得する
*/
pub fn create_work_item_type_states_url(organization: &str, project: &str, work_item_type: &str) -> String {
    let request_url = format!("https://dev.azure.com/{}/{}/_apis/wit/workitemtypes/{}/states?api-version=7.0", organization, project, work_item_type);
    request_url
}

/*
    wit/classificationnodes
    WorkItemの選択肢の一覧を取得する
*/
pub fn create_classification_nodes_url(organization: &str, project: &str, depth: u32) -> String {
    let request_url = format!("https://dev.azure.com/{}/{}/_apis/wit/classificationnodes?$depth={}&api-version=7.0", organization, project, depth);
    request_url
}