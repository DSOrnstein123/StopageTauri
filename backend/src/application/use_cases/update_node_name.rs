use crate::domain::ports::node_repository::NodeRepository;
use anyhow::Error;

pub struct UpdateNodeNameUseCase<'a, R: NodeRepository> {
    repo: &'a R,
}

impl<'a, R: NodeRepository> UpdateNodeNameUseCase<'a, R> {
    pub fn new(repo: &'a R) -> Self {
        Self { repo: repo }
    }

    pub async fn execute(&self, id: &str, new_name: &str) -> Result<(), Error> {
        self.repo.update_name(id, new_name).await
    }
}
