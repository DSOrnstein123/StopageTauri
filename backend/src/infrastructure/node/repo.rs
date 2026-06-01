use crate::domain::errors::node::NodeError;
use crate::domain::models::icon::IconData;
use crate::domain::models::node::{Node, NodeDetail, NodeFilterOptions, NodeMetadata};
use crate::domain::ports::node_repository::NodeRepository;
use crate::infrastructure::node::models::{DbNodeDetail, DbNodeMetadata};
use async_trait::async_trait;
use serde_json::Value;
use sqlx::types::Json;
use sqlx::{QueryBuilder, Sqlite, SqlitePool, query, query_as};

pub struct SqliteNodeRepository {
    pub pool: SqlitePool,
}

impl SqliteNodeRepository {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }
}

#[async_trait]
impl NodeRepository for SqliteNodeRepository {
    async fn get_detail(&self, id: &str) -> Result<NodeDetail, NodeError> {
        let db_node = query_as!(
            DbNodeDetail,
            r#"
              SELECT 
                id as "id!: String",
                parent_id,
                icon as "icon: Json<IconData>",
                name,
                kind,
                type as node_type,
                data as "data: Json<Value>",
                properties as "properties: Json<Value>",
                created_at,
                updated_at,
                is_trashed
              FROM nodes
              WHERE id = ? AND is_trashed = 0
            "#,
            id
        )
        .fetch_one(&self.pool)
        .await
        .map_err(|e| match e {
            sqlx::Error::RowNotFound => NodeError::NotFound(id.to_string()),
            e => NodeError::Database(e.to_string()),
        })?;

        Ok(db_node.into())
    }

    async fn get_list(
        &self,
        options: Option<NodeFilterOptions>,
    ) -> Result<Vec<NodeMetadata>, NodeError> {
        let mut builder: QueryBuilder<Sqlite> = QueryBuilder::new(
            r#"
            SELECT 
                id,
                parent_id,
                icon,
                name,
                kind,
                type as node_type,
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
                        separated.push_bind(k.to_string());
                    }
                    separated.push_unseparated(")");
                }
            }

            if let Some(kinds) = opts.exclude_kinds {
                if !kinds.is_empty() {
                    builder.push(" AND kind NOT IN (");
                    let mut separated = builder.separated(", ");
                    for k in kinds {
                        separated.push_bind(k.to_string());
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

        let nodes = builder
            .build_query_as::<DbNodeMetadata>()
            .fetch_all(&self.pool)
            .await
            .map_err(|e| NodeError::Database(e.to_string()))?;

        Ok(nodes.into_iter().map(Into::into).collect())
    }

    async fn create(&self, node: &Node) -> Result<NodeDetail, NodeError> {
        let icon = Json(IconData {
            icon_type: "lucide".to_string(),
            value: "FileText".to_string(),
        });
        let kind = node.kind.to_string();

        let db_node = query_as!(
            DbNodeDetail,
            r#"
            INSERT INTO nodes (id, parent_id, name, icon, kind, type, data)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            RETURNING
                id as "id!: String",
                parent_id,
                name,
                icon as "icon: Json<IconData>",
                kind,
                type as node_type,
                data as "data: Json<Value>",
                properties as "properties: Json<Value>",
                created_at,
                updated_at,
                is_trashed
        "#,
            node.id,
            node.parent_id,
            node.name,
            icon,
            kind,
            node.node_type,
            node.data
        )
        .fetch_one(&self.pool)
        .await
        .map_err(|e| NodeError::Database(e.to_string()))?;

        Ok(db_node.into())
    }

    async fn update_name(&self, id: &str, new_name: &str) -> Result<(), NodeError> {
        query!(
            r#"
            UPDATE nodes
            SET name = ?
            WHERE id = ?
        "#,
            new_name,
            id,
        )
        .execute(&self.pool)
        .await
        .map_err(|e| match e {
            sqlx::Error::RowNotFound => NodeError::NotFound(id.to_string()),
            e => NodeError::Database(e.to_string()),
        })?;

        Ok(())
    }

    async fn update_data(&self, id: &str, new_data: Value) -> Result<(), NodeError> {
        let data = Json(new_data); // ✅ wrap thành Json<Value>

        query!(
            r#"
            UPDATE nodes 
            SET data = ?
            WHERE id = ?
        "#,
            data,
            id,
        )
        .execute(&self.pool)
        .await
        .map_err(|e| NodeError::Database(e.to_string()))?;

        Ok(())
    }
}
