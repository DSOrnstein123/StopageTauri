use backend::{
    application::node::{dtos::CreateNodeInput, use_cases::create_node::CreateNodeUseCase},
    database::connect::connect,
    domain::models::node::NodeKind,
    infrastructure::node::repo::SqliteNodeRepository,
};
use clap::{Parser, Subcommand};
use serde_json::json;

#[derive(Parser)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    Node {
        #[command(subcommand)]
        command: NodeCommands,
    },
}

#[derive(Subcommand)]
enum NodeCommands {
    Add { name: String },
}

#[tokio::main]
async fn main() {
    let cli = Cli::parse();

    match cli.command {
        Commands::Node { command } => match command {
            NodeCommands::Add { name } => {
                let pool = connect().await;
                let repo = SqliteNodeRepository::new(pool);

                let use_case = CreateNodeUseCase::new(&repo);

                let input = CreateNodeInput {
                    parent_id: None,
                    name,
                    kind: NodeKind::File,
                    node_type: "document".to_string(),
                    data: Some(json!({})),
                    properties: Some(json!({})),
                };

                match use_case.execute(input).await {
                    Ok(node) => {
                        print!("Created node: {}", node.metadata.id);
                    }
                    Err(error) => {
                        eprint!("Failed to create node: {error}");
                    }
                };
            }
        },
    }
}
