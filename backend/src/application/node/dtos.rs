use serde::Deserialize;
use serde_json::Value;

use crate::domain::models::node::NodeKind;

#[derive(Deserialize)]
pub struct CreateNodeInput {
    pub parent_id: Option<String>,
    pub name: String,
    pub kind: NodeKind,
    pub node_type: String,
    pub data: Option<Value>,
    pub properties: Option<Value>,
}
