use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use sqlx::{prelude::FromRow, types::Json};

#[derive(Debug, Serialize, FromRow)]
#[serde(rename_all = "camelCase")]
pub struct Node {
    pub id: String,
    pub parent_id: Option<String>,
    pub icon: Json<IconData>,
    pub name: String,
    pub kind: String,
    #[serde(rename = "type")]
    pub node_type: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
    pub is_trashed: bool,
}

#[derive(Debug, Serialize, FromRow)]
#[serde(rename_all = "camelCase")]
pub struct NodeDetail {
    pub id: String,
    pub parent_id: Option<String>,
    pub icon: Json<IconData>,
    pub name: String,
    pub kind: String,
    #[serde(rename = "type")]
    pub node_type: String,
    pub content: Json<Value>,
    pub properties: Json<Value>,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
    pub is_trashed: bool,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NodeFilterOptions {
    pub include_kinds: Option<Vec<String>>,
    pub include_types: Option<Vec<String>>,
    pub exclude_kinds: Option<Vec<String>>,
    pub exclude_types: Option<Vec<String>>,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct IconData {
    #[serde(rename = "type")]
    pub icon_type: String,
    pub value: String,
}
