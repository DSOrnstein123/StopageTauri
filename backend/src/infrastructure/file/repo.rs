use anyhow::{Error, Ok};
use sqlx::{SqlitePool, query, query_as};

use crate::infrastructure::file::models::{File, FileDetail, IconData};
use serde_json::Value;
use sqlx::types::Json;

pub async fn get_file_detail(pool: &SqlitePool, id: String) -> Result<FileDetail, Error> {
    let file = query_as!(
        FileDetail,
        r#"
            SELECT 
              id as "id!: String",
              parent_id,
              icon as "icon: Json<IconData>",
              name,
              type as file_type,
              content as "content: Json<Value>",
              properties as "properties: Json<Value>",
              created_at,
              updated_at
            FROM nodes
            WHERE id = ? AND is_trashed = 0
        "#,
        id
    )
    .fetch_one(pool)
    .await?;

    Ok(file)
}

pub async fn get_files(pool: &SqlitePool) -> Result<Vec<File>, Error> {
    let files = query_as!(
        File,
        r#"
            SELECT 
              id as "id!: String",
              parent_id,
              icon as "icon: Json<IconData>",
              name,
              type as file_type,
              created_at,
              updated_at
            FROM nodes
            WHERE is_trashed = 0
        "#
    )
    .fetch_all(pool)
    .await?;

    Ok(files)
}

pub async fn update_file_name(
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
