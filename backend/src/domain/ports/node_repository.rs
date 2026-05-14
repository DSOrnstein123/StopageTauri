use crate::domain::models::node::{NodeDetail, NodeFilterOptions, NodeMetadata};
use async_trait::async_trait;

#[async_trait]
pub trait NodeRepository: Send + Sync {
    async fn get_list(
        &self,
        options: Option<NodeFilterOptions>,
    ) -> Result<Vec<NodeMetadata>, String>;

    async fn get_detail(&self, id: &str) -> Result<NodeDetail, String>;

    async fn create(&self, node: &NodeDetail) -> Result<(), String>;
}
