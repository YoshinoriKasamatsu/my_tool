use tokio::fs;
use crate::models::config::Config;

pub async fn load_processes(root_path: &String, config: &Config, process_id: &str) {
    let process_expand: Vec<&str> = vec!["behaviros", "layout","state"];
    println!("process_expand: {:?}", &process_expand);
    // PROCESS_EXPANDでループする
    for expand in process_expand {
        let output_path = format!("{}/{}/{}", &root_path, "meta_data", "processes");
        fs::create_dir_all(&output_path).await.unwrap();
        let file_path = format!("{}/{}.json", &output_path, expand);
    
        let json_text = crate::resources::processes::get_processes(&config, &process_id, expand).await.unwrap();
        fs::write(file_path, json_text).await.unwrap();
    }
}

pub async fn load_process(root_path: &String, config: &Config, project_id: &str, process_id: &str) {
    let process_expand: Vec<&str> = vec!["behaviros", "layout","state"];

    for expand in process_expand {
        let output_path = format!("{}/{}/{}", &root_path, "meta_data", "process");
        fs::create_dir_all(&output_path).await.unwrap();
        let file_path = format!("{}/{}.json", &output_path, expand);
        let json_text = crate::resources::processes::get_process(&config, &project_id, process_id, expand).await.unwrap();
        fs::write(file_path, json_text).await.unwrap();
    }

}