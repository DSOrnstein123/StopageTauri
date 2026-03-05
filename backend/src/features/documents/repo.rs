use serde::Serialize;
use sqlx::{SqlitePool, query_as};
use uuid::Uuid;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
#[allow(dead_code)]
pub struct Document {
    pub id: Uuid,
    pub title: String,
    pub created_at: String,
}

#[allow(dead_code)]
pub async fn get_documents_list(pool: &SqlitePool) -> Result<Vec<Document>, sqlx::Error> {
    let documents = query_as!(
        Document,
        r#"
        SELECT
            id as "id!: Uuid",
            title,
            created_at
        FROM documents
        "#
    )
    .fetch_all(pool)
    .await?;

    Ok(documents)
}
