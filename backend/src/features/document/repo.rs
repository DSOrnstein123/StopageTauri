use crate::entities::file::models::{File, IconData};
use crate::features::document::models::{Document, DocumentContent, DocumentInCollection};
use sqlx::types::Json;
use sqlx::{Error, SqlitePool, query, query_as};
use std::collections::HashMap;
use uuid::Uuid;

pub async fn get_document_list(pool: &SqlitePool) -> Result<Vec<Document>, Error> {
    let documents = query_as!(
        Document,
        r#"
        SELECT
            id as "id!: String"
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
) -> Result<Vec<DocumentInCollection>, Error> {
    let documents = query_as!(
        DocumentInCollection,
        r#"
        SELECT
            id as "id!: String",
            collection_id as "collection_id!",
            title,
            property as "property: Json<HashMap<String, serde_json::Value>>"
        FROM documents
        WHERE collection_id = ?
        "#,
        collection_id
    )
    .fetch_all(pool)
    .await?;

    Ok(documents)
}

pub async fn create_document(pool: &SqlitePool) -> Result<File, Error> {
    let mut tx = pool.begin().await?;

    let document_id = Uuid::new_v4().simple().to_string();
    query_as!(
        Document,
        r#"
            INSERT INTO documents (id)
            VALUES (?)
        "#,
        document_id
    )
    .execute(&mut *tx)
    .await?;

    let file_id = Uuid::new_v4().simple().to_string();
    let icon = Json(IconData {
        icon_type: "lucide".to_string(),
        value: "file-text".to_string(),
    });
    let document_file = query_as!(
        File,
        r#"
            INSERT INTO files (id, name, icon, type, content_id)
            VALUES (?, 'Untitled', ?, 'document', ?)
            RETURNING
                id as "id!: String",
                name,
                icon as "icon: Json<IconData>",
                type as file_type,
                content_id,
                created_at,
                updated_at
        "#,
        file_id,
        icon,
        document_id
    )
    .fetch_one(&mut *tx)
    .await?;

    tx.commit().await?;

    Ok(document_file)
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
            SELECT 
                collection_id,
                content,
                property as "property: Json<HashMap<String, serde_json::Value>>"
            FROM documents 
            WHERE id = ?
        "#,
        id,
    )
    .fetch_one(pool)
    .await?;

    Ok(document)
}
