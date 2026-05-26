use crate::domain::{errors::node::NodeError, ports::node_repository::NodeRepository};

pub struct UpdateNodeNameUseCase<'a, R: NodeRepository> {
    repo: &'a R,
}

impl<'a, R: NodeRepository> UpdateNodeNameUseCase<'a, R> {
    pub fn new(repo: &'a R) -> Self {
        Self { repo: repo }
    }

    pub async fn execute(&self, id: &str, new_name: &str) -> Result<(), NodeError> {
        self.repo.update_name(id, new_name).await
    }
}
