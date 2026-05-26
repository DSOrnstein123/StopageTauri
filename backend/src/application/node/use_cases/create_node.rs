use crate::{
    application::node::dtos::CreateNodeInput,
    domain::{
        errors::node::NodeError,
        models::node::{Node, NodeDetail},
        ports::node_repository::NodeRepository,
    },
};

pub struct CreateNodeUseCase<'a, R: NodeRepository> {
    repo: &'a R,
}

impl<'a, R: NodeRepository> CreateNodeUseCase<'a, R> {
    pub fn new(repo: &'a R) -> Self {
        Self { repo: repo }
    }

    pub async fn execute(&self, input: CreateNodeInput) -> Result<NodeDetail, NodeError> {
        let node = Node::create(
            input.parent_id,
            input.name,
            input.kind,
            input.node_type,
            input.content,
            input.properties,
        )?;

        self.repo.create(&node).await
    }
}
