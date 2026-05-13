use anyhow::{Error, Ok};
use sqlx::{QueryBuilder, Sqlite, SqlitePool, query, query_as};

use crate::infrastructure::node::models::{IconData, Node, NodeDetail, NodeFilterOptions};
use serde_json::Value;
use sqlx::types::Json;

pub async fn get_node_detail(pool: &SqlitePool, id: String) -> Result<NodeDetail, Error> {
    let node = query_as!(
        NodeDetail,
        r#"
            SELECT 
              id as "id!: String",
              parent_id,
              icon as "icon: Json<IconData>",
              name,
              kind,
              type as node_type,
              content as "content: Json<Value>",
              properties as "properties: Json<Value>",
              created_at,
              updated_at,
              is_trashed
            FROM nodes
            WHERE id = ? AND is_trashed = 0
        "#,
        id
    )
    .fetch_one(pool)
    .await?;

    Ok(node)
}

pub async fn get_nodes(
    pool: &SqlitePool,
    options: Option<NodeFilterOptions>,
) -> Result<Vec<Node>, Error> {
    let mut builder: QueryBuilder<Sqlite> = QueryBuilder::new(
        r#"
        SELECT 
            id,
            parent_id,
            icon,
            name,
            kind,
            type as node_type,
            is_readonly,
            is_trashed,
            created_at,
            updated_at
        FROM nodes
        WHERE is_trashed = 0
        "#,
    );

    if let Some(opts) = options {
        if let Some(kinds) = opts.include_kinds {
            if !kinds.is_empty() {
                builder.push(" AND kind IN (");
                let mut separated = builder.separated(", ");
                for k in kinds {
                    separated.push_bind(k);
                }
                separated.push_unseparated(")");
            }
        }

        if let Some(kinds) = opts.exclude_kinds {
            if !kinds.is_empty() {
                builder.push(" AND kind NOT IN (");
                let mut separated = builder.separated(", ");
                for k in kinds {
                    separated.push_bind(k);
                }
                separated.push_unseparated(")");
            }
        }

        if let Some(types) = opts.include_types {
            if !types.is_empty() {
                builder.push(" AND type IN (");
                let mut separated = builder.separated(", ");
                for t in types {
                    separated.push_bind(t);
                }
                separated.push_unseparated(")");
            }
        }

        if let Some(types) = opts.exclude_types {
            if !types.is_empty() {
                builder.push(" AND type NOT IN (");
                let mut separated = builder.separated(", ");
                for t in types {
                    separated.push_bind(t);
                }
                separated.push_unseparated(")");
            }
        }
    }

    let nodes = builder.build_query_as::<Node>().fetch_all(pool).await?;

    Ok(nodes)
}

pub async fn update_node_name(
    pool: &SqlitePool,
    id: String,
    new_name: String,
) -> Result<(), Error> {
    query!(
        r#"
            UPDATE nodes
            SET name = ?
            WHERE id = ? 
        "#,
        new_name,
        id,
    )
    .execute(pool)
    .await?;

    Ok(())
}
