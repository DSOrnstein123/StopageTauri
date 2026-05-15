use crate::domain::models::node::{NodeDetail, NodeFilterOptions, NodeMetadata};
use anyhow::Error;
use async_trait::async_trait;

#[async_trait]
pub trait NodeRepository: Send + Sync {
    async fn get_list(
        &self,
        options: Option<NodeFilterOptions>,
    ) -> Result<Vec<NodeMetadata>, Error>;
    async fn get_detail(&self, id: &str) -> Result<NodeDetail, Error>;
    // async fn create(&self, node: &NodeDetail) -> Result<(), Error>;
    async fn update_name(&self, id: &str, new_name: &str) -> Result<(), Error>;
}
