use std::collections::HashMap;

use serde::{Deserialize, Serialize};
use sqlx::types::Json;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Document {
    pub id: String,
    pub title: String,
    pub created_at: String,
}

#[derive(Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DocumentContent {
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
