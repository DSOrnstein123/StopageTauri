use backend::domain::models::node::{NodeDetail, NodeKind, NodeMetadata};
use serde::Serialize;
use serde_json::Value;

use crate::dtos::icon::IconDataDto;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct NodeMetadataDto {
    pub id: String,
    pub parent_id: Option<String>,
    pub icon: IconDataDto,
    pub name: String,
    pub kind: NodeKind,
    #[serde(rename = "type")]
    pub node_type: String,
    pub created_at: String,
    pub updated_at: String,
    pub is_trashed: bool,
}

impl From<NodeMetadata> for NodeMetadataDto {
    fn from(domain: NodeMetadata) -> Self {
        Self {
            id: domain.id,
            parent_id: domain.parent_id,
            icon: domain.icon.into(),
            name: domain.name,
            kind: domain.kind,
            node_type: domain.node_type,
            created_at: domain.created_at.to_string(),
            updated_at: domain.updated_at.to_string(),
            is_trashed: domain.is_trashed,
        }
    }
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct NodeDetailDto {
    #[serde(flatten)]
    pub metadata: NodeMetadataDto,
    pub content: Value,
    pub properties: Value,
}

impl From<NodeDetail> for NodeDetailDto {
    fn from(domain: NodeDetail) -> Self {
        Self {
            metadata: domain.metadata.into(),
            content: domain.content,
            properties: domain.properties,
        }
    }
}
