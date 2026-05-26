use thiserror::Error;

#[derive(Debug, Error)]
pub enum NodeError {
    #[error("Invalid node kind: {0}")]
    InvalidKind(String),

    #[error("Node name cannot be empty")]
    EmptyName,

    #[error("Parent node not found: {0}")]
    ParentNotFound(String),

    #[error("Node not found: {0}")]
    NotFound(String),

    #[error("Invalid JSON in field '{0}'")]
    InvalidJson(String),

    #[error("Database error: {0}")]
    Database(String),
}
