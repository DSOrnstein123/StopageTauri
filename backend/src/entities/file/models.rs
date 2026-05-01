use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::types::Json;

use crate::features::document::models::DocumentFile;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct File {
    pub id: String,
    pub name: String,
    pub icon: Json<IconData>,
    #[serde(rename = "type")]
    pub file_type: String,
    pub content_id: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum FileDetail {
    Document(DocumentFile),
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct IconData {
    #[serde(rename = "type")]
    pub icon_type: String,
    pub value: String,
}
