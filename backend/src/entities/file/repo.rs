use anyhow::{Error, Ok};
use sqlx::{SqlitePool, query_as};

use crate::entities::file::models::{File, IconData};
use sqlx::types::Json;

pub async fn get_files(pool: &SqlitePool) -> Result<Vec<File>, Error> {
    let files = query_as!(
        File,
        r#"
            SELECT 
              id as "id!: String",
              name,
              icon as "icon: Json<IconData>",
              type as file_type,
              content_id,
              created_at,
              updated_at
            FROM files
        "#
    )
    .fetch_all(pool)
    .await?;

    Ok(files)
}
