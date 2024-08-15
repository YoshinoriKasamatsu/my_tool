use crate::paths;
use crate::util::request;
use crate::models::config;

/*
    Work Item Types Lit
*/
pub async fn get_processes(config: &config::Config, process_id: &str, expand: &str) -> Result<String, Box<dyn std::error::Error>>{

    let url = paths::processes::create_processes_url(&config.organization, process_id, expand);
    let body = request::get(config, &url).await?;
    Ok(String::from(&body))
}

/*
    Work Item Type
*/
pub async fn get_process(config: &config::Config, project_id: &str, process_id: &str, expand: &str) -> Result<String, Box<dyn std::error::Error>>{

    let url = paths::processes::create_process_url(&config.organization, &project_id, process_id, expand);
    let body = request::get(config, &url).await?;
    Ok(String::from(&body))
}