use crate::models::config;
use crate::paths;
use crate::util::request;

/*
    pullrequestの一覧を取得する
*/
pub async fn get_pull_requests(
    config: &config::Config, 
    repository_id: &str, 
    skip: Option<u32>, 
    top: Option<u32>,
    creator_id: Option<&str>,
    reviewer_id: Option<&str>,
    source_ref_name: Option<&str>,
    target_ref_name: Option<&str>,
    status: Option<&str>,
) -> Result<String, Box<dyn std::error::Error>>{
    let url = paths::git::create_url(&config.organization, &config.project, repository_id, skip, top, creator_id, reviewer_id, source_ref_name, target_ref_name, status);
    let body = request::get(config, &url).await?;
    Ok(String::from(&body))
}