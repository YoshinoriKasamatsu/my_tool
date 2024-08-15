use std::time::Instant;
use azure_devops_rust_lib::{data_loader, resources, extract_data};
use azure_devops_rust_lib;
use azure_devops_rust_lib::models::config::Config;
use chrono::{DateTime, Duration, Utc, Local, TimeZone};


pub async fn load_data(root_path: &String, config: &Config ) {

    let start = Instant::now();
    println!("load start");

    // メタデータ取得
    tokio::join!(
        data_loader::wit::load_fields(&root_path, &config),
        data_loader::wit::load_categories(&root_path, &config),
        data_loader::wit::load_work_item_states(&root_path ,&config),
        data_loader::wit::load_classification_nodes(&root_path ,&config),
        data_loader::wit::load_work_item_types(&root_path ,&config),
        data_loader::projects::load_projects(&root_path ,&config)
    );

    if let Some(project_id) = extract_data::projects::get_project_id(&root_path, &config.project).await{
        data_loader::projects::load_project(&root_path ,&config, &project_id).await;
        if let Some(process_id) = extract_data::projects::get_process_id(&root_path).await {
            data_loader::processes::load_processes(&root_path,&config, &process_id).await;
        }
    }

    // WorkItems
    let mut ids: Vec<u32>;
    if let Some(start_date_str) = extract_data::wit::get_work_items_latest_update(&root_path).await {
        // 既存データがある場合
        let start_date_fixed_offset = DateTime::parse_from_rfc3339(&start_date_str).expect("日付変換失敗");
        let start_date = start_date_fixed_offset.with_timezone(&Utc);
        ids = resources::wit::get_work_items_ids_by_from_change_date(&config, &start_date).await;
    }else if &config.start_date.len() > &0 {
        // 開始日時が指定されている場合
        let start_date = Utc.datetime_from_str(&config.start_date, "%Y/%m/%d %H:%M:%S").expect("日付変換失敗");
        ids = resources::wit::get_work_items_ids_by_from_change_date(&config, &start_date).await;
    }else if &config.duration_days > &0 {
        // 過去何日の設定がされている場合
        let start_date = Utc::now() - Duration::days(config.duration_days);
        ids = resources::wit::get_work_items_ids_by_from_change_date(&config, &start_date).await;
    }else {
        // 既存データなく、開始日の設定がない場合
        ids = resources::wit::get_work_items_ids(&config).await;
    }

    if ids.len() > 0 {
        data_loader::wit::load_work_items(&root_path ,&config, &ids).await;
    }

    // Pull Requests取得
    data_loader::git::load_pull_requests(&root_path, &config).await;

    let end = Instant::now();
    println!("load complete: {:?}", end.duration_since(start));

}
