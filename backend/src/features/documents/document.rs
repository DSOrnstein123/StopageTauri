use sqlx::{Error, SqlitePool, query, query_as};
use uuid::Uuid;

use crate::features::documents::models::{Document, DocumentContent};

pub async fn get_document_list(pool: &SqlitePool) -> Result<Vec<Document>, Error> {
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

pub async fn get_documents_in_collection(
    pool: &SqlitePool,
    collection_id: String,
) -> Result<Vec<Document>, Error> {
    let documents = query_as!(
        Document,
        r#"
        SELECT
            id as "id!: String",
            title,
            created_at
        FROM documents
        WHERE collection_id = ?
        "#,
        collection_id
    )
    .fetch_all(pool)
    .await?;

    Ok(documents)
}

pub async fn create_document(pool: &SqlitePool) -> Result<Document, Error> {
    let id = Uuid::new_v4().simple().to_string();
    let title = "Untitled";

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

pub async fn update_document(pool: &SqlitePool, id: String, content: String) -> Result<(), Error> {
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

pub async fn update_title(pool: &SqlitePool, id: String, title: String) -> Result<(), Error> {
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

pub async fn get_document_content(pool: &SqlitePool, id: String) -> Result<DocumentContent, Error> {
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
