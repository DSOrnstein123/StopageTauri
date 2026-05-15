use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use sqlx::{prelude::FromRow, types::Json};

use crate::domain::models::{
    icon_data::IconData,
    node::{NodeDetail, NodeKind, NodeMetadata},
};

#[derive(Debug, Serialize, FromRow)]
#[serde(rename_all = "camelCase")]
pub struct DbNodeMetadata {
    pub id: String,
    pub parent_id: Option<String>,
    pub icon: Json<IconData>,
    pub name: String,
    pub kind: NodeKind,
    #[serde(rename = "type")]
    pub node_type: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
    pub is_trashed: bool,
}

impl From<DbNodeMetadata> for NodeMetadata {
    fn from(db: DbNodeMetadata) -> Self {
        Self {
            id: db.id,
            parent_id: db.parent_id,
            icon: db.icon.0,
            name: db.name,
            kind: db.kind,
            node_type: db.node_type,
            is_trashed: db.is_trashed,
            created_at: db.created_at,
            updated_at: db.updated_at,
        }
    }
}

#[derive(Debug, Serialize, FromRow)]
#[serde(rename_all = "camelCase")]
pub struct DbNodeDetail {
    pub id: String,
    pub parent_id: Option<String>,
    pub icon: Json<IconData>,
    pub name: String,
    pub kind: NodeKind,
    #[serde(rename = "type")]
    pub node_type: String,
    pub content: Json<Value>,
    pub properties: Json<Value>,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
    pub is_trashed: bool,
}

impl From<DbNodeDetail> for NodeDetail {
    fn from(db: DbNodeDetail) -> Self {
        Self {
            metadata: NodeMetadata {
                id: db.id,
                parent_id: db.parent_id,
                icon: db.icon.0,
                name: db.name,
                kind: db.kind,
                node_type: db.node_type,
                created_at: db.created_at,
                updated_at: db.updated_at,
                is_trashed: db.is_trashed,
            },
            content: db.content.0,
            properties: db.properties.0,
        }
    }
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DbNodeFilterOptions {
    pub include_kinds: Option<Vec<String>>,
    pub include_types: Option<Vec<String>>,
    pub exclude_kinds: Option<Vec<String>>,
    pub exclude_types: Option<Vec<String>>,
}
