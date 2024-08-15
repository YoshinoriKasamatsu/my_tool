
use actix_web::{App, http::header::ContentType, HttpResponse, HttpServer, middleware::Logger, web, };
use crate::repositories;

pub async fn get_fields() -> HttpResponse {

    let values = repositories::get_fields().await;
    let json_text = serde_json::to_string(&values).unwrap();
    HttpResponse::Ok()
        .content_type(ContentType::json())
        .body(json_text)
}

pub async fn get_categories() -> HttpResponse {

    let categories = repositories::get_categories().await;
    let json_text = serde_json::to_string(&categories).unwrap();
    HttpResponse::Ok()
        .content_type(ContentType::json())
        .body(json_text)
}

pub async fn get_work_item_types() -> HttpResponse {

    let values = repositories::get_work_item_types().await;
    let json_text = serde_json::to_string(&values).unwrap();
    HttpResponse::Ok()
        .content_type(ContentType::json())
        .body(json_text)
}

pub async fn get_classification() -> HttpResponse {

    let values = repositories::get_classification().await;
    let json_text = serde_json::to_string(&values).unwrap();
    HttpResponse::Ok()
        .content_type(ContentType::json())
        .body(json_text)
}

pub async fn get_states() -> HttpResponse {

    let values = repositories::get_states().await;
    let json_text = serde_json::to_string(&values).unwrap();
    HttpResponse::Ok()
        .content_type(ContentType::json())
        .body(json_text)
}

pub async fn get_processes_layout() -> HttpResponse {

    let values = repositories::get_processes_layout().await;
    let json_text = serde_json::to_string(&values).unwrap();
    HttpResponse::Ok()
        .content_type(ContentType::json())
        .body(json_text)
}