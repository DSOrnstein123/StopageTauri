use serde_json::Value;

use crate::domain::{errors::node::NodeError, ports::node_repository::NodeRepository};

pub struct UpdateNodeDataUseCase<'a, R: NodeRepository> {
    repo: &'a R,
}

impl<'a, R: NodeRepository> UpdateNodeDataUseCase<'a, R> {
    pub fn new(repo: &'a R) -> Self {
        Self { repo: repo }
    }

    pub async fn execute(&self, id: &str, new_data: Value) -> Result<(), NodeError> {
        self.repo.update_data(id, new_data).await
    }
}
