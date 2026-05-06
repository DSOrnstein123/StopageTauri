use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::types::Json;

use crate::infrastructure::file::models::IconData;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DocumentFile {
    pub id: String,
    pub name: String,
    #[serde(rename = "type")]
    pub file_type: String,
    pub icon: Json<IconData>,
    pub content: Option<String>,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}
