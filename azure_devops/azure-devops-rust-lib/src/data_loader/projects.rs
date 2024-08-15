use tokio::fs;
use crate::models::config::Config;

pub async fn load_projects(root_path: &String, config: &Config) {
    // /core/projects/list
    let output_path = format!("{}/{}", &root_path, "meta_data");
    fs::create_dir_all(&output_path).await.unwrap();
    let file_path = format!("{}/{}", &output_path, "projects.json");

    if let Ok(json_text) = crate::resources::projects::get_projects(&config).await{
        fs::write(file_path, json_text).await.unwrap();
    }else{
        println!("Error: load_projects");
        panic!("Error: load_projects");
    }
}

pub async fn load_project(root_path: &String, config: &Config, project_id: &str) {
    // /core/project
    let output_path = format!("{}/{}", &root_path, "meta_data");
    fs::create_dir_all(&output_path).await.unwrap();
    let file_path = format!("{}/{}", &output_path, "project.json");

    let json_text = crate::resources::projects::get_project(&config, &project_id).await.unwrap();
    fs::write(file_path, json_text).await.unwrap();
}