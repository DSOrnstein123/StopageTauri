use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

use crate::domain::models::icon::IconData;

#[derive(Debug, Serialize, Deserialize)]
pub struct TemplateFile {
    pub id: String,
    pub name: String,
    pub file_type: String,
    pub icon: IconData,
    pub content: Option<String>,
    pub is_template: bool,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}
