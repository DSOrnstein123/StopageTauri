use serde::Serialize;
use sqlx::{SqlitePool, query, query_as};
use uuid::Uuid;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
#[allow(dead_code)]
pub struct Document {
    pub id: String,
    pub title: String,
    pub created_at: String,
}

#[allow(dead_code)]
pub async fn get_document_list(pool: &SqlitePool) -> Result<Vec<Document>, sqlx::Error> {
    let documents = query_as!(
        Document,
        r#"
        SELECT
            id as "id!: String",
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
    let id = Uuid::new_v4().simple().to_string();
    let title = "";

    let document = query_as!(
        Document,
        r#"
            INSERT INTO documents (id, title)
            VALUES (?, ?)
            RETURNING
                id as "id!: String",
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

#[allow(dead_code)]
pub async fn update_document(
    pool: &SqlitePool,
    id: String,
    content: String,
) -> Result<(), sqlx::Error> {
    query!(
        r#"
            UPDATE documents 
            SET content = ?
            WHERE id = ?
        "#,
        content,
        id,
    )
    .execute(pool)
    .await?;

    Ok(())
}

#[allow(dead_code)]
pub async fn update_title(pool: &SqlitePool, id: String, title: String) -> Result<(), sqlx::Error> {
    query!(
        r#"
            UPDATE documents 
            SET title = ?
            WHERE id = ?
        "#,
        title,
        id,
    )
    .execute(pool)
    .await?;

    Ok(())
}

#[derive(Serialize)]
pub struct DocumentContent {
    pub content: Option<String>,
}

#[allow(dead_code)]
pub async fn get_document_content(
    pool: &SqlitePool,
    id: String,
) -> Result<DocumentContent, sqlx::Error> {
    let document = query_as!(
        DocumentContent,
        r#"
            SELECT content
            FROM documents 
            WHERE id = ?
        "#,
        id,
    )
    .fetch_one(pool)
    .await?;

    Ok(document)
}
