use crate::domain::models::node::{NodeDetail, NodeFilterOptions, NodeMetadata};
use crate::domain::ports::node_repository::NodeRepository;
use anyhow::Error;

pub struct NodeQuery<'a, R: NodeRepository> {
    repo: &'a R,
}

impl<'a, R: NodeRepository> NodeQuery<'a, R> {
    pub fn new(repo: &'a R) -> Self {
        Self { repo }
    }

    pub async fn get_nodes(
        &self,
        options: Option<NodeFilterOptions>,
    ) -> Result<Vec<NodeMetadata>, Error> {
        self.repo.get_list(options).await
    }

    pub async fn get_node_detail(&self, id: &str) -> Result<NodeDetail, Error> {
        self.repo.get_detail(id).await
    }
}
