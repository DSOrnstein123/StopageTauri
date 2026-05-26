use serde_json::Value;

use crate::domain::{errors::node::NodeError, ports::node_repository::NodeRepository};

pub struct UpdateNodeContentUseCase<'a, R: NodeRepository> {
    repo: &'a R,
}

impl<'a, R: NodeRepository> UpdateNodeContentUseCase<'a, R> {
    pub fn new(repo: &'a R) -> Self {
        Self { repo: repo }
    }

    pub async fn execute(&self, id: &str, new_content: Value) -> Result<(), NodeError> {
        self.repo.update_content(id, new_content).await
    }
}
