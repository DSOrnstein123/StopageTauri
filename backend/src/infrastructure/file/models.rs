use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use sqlx::types::Json;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct File {
    pub id: String,
    pub parent_id: Option<String>,
    pub icon: Json<IconData>,
    pub name: String,
    #[serde(rename = "type")]
    pub file_type: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct FileDetail {
    pub id: String,
    pub parent_id: Option<String>,
    pub icon: Json<IconData>,
    pub name: String,
    #[serde(rename = "type")]
    pub file_type: String,
    pub content: Json<Value>,
    pub properties: Json<Value>,
    pub is_template: bool,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
    pub is_trashed: bool,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct IconData {
    #[serde(rename = "type")]
    pub icon_type: String,
    pub value: String,
}
