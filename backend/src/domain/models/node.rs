use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use serde_json::Value;

use crate::domain::models::icon_data::IconData;

#[derive(Debug, Serialize, Deserialize)]
pub enum NodeKind {
    Folder,
    File,
    Template,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NodeMetadata {
    pub id: String,
    pub parent_id: Option<String>,
    pub icon: IconData,
    pub name: String,
    pub kind: NodeKind,
    pub node_type: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
    pub is_trashed: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NodeDetail {
    pub metadata: NodeMetadata,
    pub content: Value,
    pub properties: Value,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NodeFilterOptions {
    pub include_kinds: Option<Vec<String>>,
    pub include_types: Option<Vec<String>>,
    pub exclude_kinds: Option<Vec<String>>,
    pub exclude_types: Option<Vec<String>>,
}
