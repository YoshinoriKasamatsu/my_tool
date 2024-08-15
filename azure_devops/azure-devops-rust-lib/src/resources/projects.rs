use crate::paths;
use crate::util::request;
use crate::models::config;

/*
    プロジェクトの一覧を取得する
*/
pub async fn get_projects(config: &config::Config) -> Result<String, Box<dyn std::error::Error>>{

    let url = paths::projects::create_projects_url(&config.organization);
    let body = request::get(config, &url).await?;
    Ok(String::from(&body))
}

/*
    プロジェクトの情報を取得する
*/
pub async fn get_project(config: &config::Config, project_id: &str) -> Result<String, Box<dyn std::error::Error>>{

    let url = paths::projects::create_project_url(&config.organization, &project_id);
    let body = request::get(config, &url).await?;
    Ok(String::from(&body))
}