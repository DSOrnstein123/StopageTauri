use crate::infrastructure::document::models::DocumentFile;
use crate::infrastructure::file::models::{File, IconData};
use sqlx::types::Json;
use sqlx::{Error, SqlitePool, query, query_as};
use uuid::Uuid;

pub async fn get_document_detail(pool: &SqlitePool, id: String) -> Result<DocumentFile, Error> {
    let document = query_as!(
        DocumentFile,
        r#"
        SELECT
            f.id as "id!: String",
            f.name,
            f.type as file_type,
            f.icon as "icon: Json<IconData>",
            f.created_at,
            f.updated_at,
            d.content
        FROM documents d
        INNER JOIN files f ON d.id = f.id
        WHERE d.id = ?
        "#,
        id
    )
    .fetch_one(pool)
    .await?;

    Ok(document)
}

pub async fn create_document(pool: &SqlitePool) -> Result<File, Error> {
    let file_id = Uuid::new_v4().simple().to_string();
    let icon = Json(IconData {
        icon_type: "lucide".to_string(),
        value: "FileText".to_string(),
    });

    let mut tx = pool.begin().await?;

    let document_file = query_as!(
        File,
        r#"
            INSERT INTO files (id, name, icon, type)
            VALUES (?, 'Untitled', ?, 'document')
            RETURNING
                id as "id!: String",
                name,
                icon as "icon: Json<IconData>",
                type as file_type,
                created_at,
                updated_at
        "#,
        file_id,
        icon
    )
    .fetch_one(&mut *tx)
    .await?;

    query!(
        r#"
            INSERT INTO documents (id)
            VALUES (?)
        "#,
        file_id
    )
    .execute(&mut *tx)
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
