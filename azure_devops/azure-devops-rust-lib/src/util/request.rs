use crate::models::config::Config;
use std::error::Error;
use base64::{engine::general_purpose, Engine as _};

pub async fn get(config: &Config, url: &String) -> Result<String, Box<dyn Error>> {
    let client = reqwest::Client::new();
    let response = client.get(url)
        .header("Authorization", format!("Basic {}", general_purpose::STANDARD.encode(format!(":{}",
                                                                                              config.pat))))
        .header("Content-Type", "application/json")
        .send()
        .await?;

    let body = response.text().await?;
    Ok(body)
}

pub async fn post(config: &Config, url: &String, body: &str) -> Result<String, Box<dyn Error>> {
    let client = reqwest::Client::new();
    let response = client.post(url)
        .header("Authorization", format!("Basic {}", general_purpose::STANDARD.encode(format!(":{}",
                                                                                              config.pat))))
        .header("Content-Type", "application/json")
        .body(body.to_string())
        .send()
        .await?;

    let body = response.text().await?;
    Ok(body)
}
