use std::collections::HashMap;

use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::types::Json;

use crate::entities::file::models::IconData;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Document {
    pub id: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DocumentFile {
    pub id: String,
    pub name: String,
    #[serde(rename = "type")]
    pub file_type: String,
    pub icon: Json<IconData>,
    pub collection_id: Option<String>,
    pub content_id: String,
    pub content: Option<String>,
    pub property: Json<HashMap<String, serde_json::Value>>,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DocumentDetail {
    pub collection_id: Option<String>,
    pub content: Option<String>,
    pub property: Json<HashMap<String, serde_json::Value>>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Collection {
    pub id: String,
    pub name: String,
    pub schema: Vec<Property>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Property {
    pub id: String,
    pub name: String,
    pub r#type: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DocumentInCollection {
    pub id: String,
    pub collection_id: String,
    pub title: String,
    pub property: Json<HashMap<String, serde_json::Value>>,
}
