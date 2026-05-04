use anyhow::{Error, Ok};
use sqlx::{SqlitePool, query, query_as};

use crate::{
    core::file::models::{File, FileDetail, IconData},
    features::document::repo::get_document_detail,
};
use sqlx::types::Json;

pub async fn get_file_detail(pool: &SqlitePool, id: String) -> Result<FileDetail, Error> {
    let file_info = query!(
        r#"
            SELECT 
              type as file_type
            FROM files
            WHERE id = ?
        "#,
        id
    )
    .fetch_one(pool)
    .await?;

    let response = match file_info.file_type.as_str() {
        "document" => {
            let document_detail = get_document_detail(pool, id).await?;
            FileDetail::Document(document_detail)
        }
        _ => {
            return Err(anyhow::anyhow!(
                "Unknown file type: {}",
                file_info.file_type
            ));
        }
    };

    Ok(response)
}

pub async fn get_files(pool: &SqlitePool) -> Result<Vec<File>, Error> {
    let files = query_as!(
        File,
        r#"
            SELECT 
              id as "id!: String",
              name,
              icon as "icon: Json<IconData>",
              type as file_type,
              created_at,
              updated_at
            FROM files
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
            UPDATE files
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
