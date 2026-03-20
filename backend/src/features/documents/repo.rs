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
pub async fn get_document_list(pool: &SqlitePool) -> Result<Vec<Document>, sqlx::Error> {
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

#[allow(dead_code)]
pub async fn create_document(pool: &SqlitePool) -> Result<Document, sqlx::Error> {
    let id = Uuid::new_v4();
    let title = "Untitled";

    let document = query_as!(
        Document,
        r#"
            INSERT INTO documents (id, title)
            VALUES (?, ?)
            RETURNING
                id as "id!: Uuid",
                title,
                created_at
        "#,
        id,
        title
    )
    .fetch_one(pool)
    .await?;

    Ok(document)
}
