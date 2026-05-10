use crate::infrastructure::document::models::{DocumentFile, TemplateFile};
use crate::infrastructure::file::models::IconData;
use sqlx::types::Json;
use sqlx::{Error, SqlitePool, query, query_as};
use uuid::Uuid;

pub async fn create_document(
    pool: &SqlitePool,
    parent_id: Option<String>,
) -> Result<DocumentFile, Error> {
    let file_id = Uuid::new_v4().simple().to_string();
    let icon = Json(IconData {
        icon_type: "lucide".to_string(),
        value: "FileText".to_string(),
    });

    let document_file = query_as!(
        DocumentFile,
        r#"
            INSERT INTO nodes (id, parent_id, name, icon, type)
            VALUES (?, ?, 'Untitled', ?, 'document')
            RETURNING
                id as "id!: String",
                parent_id,
                name,
                icon as "icon: Json<IconData>",
                type as file_type,
                content,
                created_at,
                updated_at
        "#,
        file_id,
        parent_id,
        icon
    )
    .fetch_one(pool)
    .await?;

    Ok(document_file)
}

pub async fn create_template(pool: &SqlitePool) -> Result<TemplateFile, Error> {
    let file_id = Uuid::new_v4().simple().to_string();
    let icon = Json(IconData {
        icon_type: "lucide".to_string(),
        value: "LayoutTemplate".to_string(),
    });

    let document_file = query_as!(
        TemplateFile,
        r#"
            INSERT INTO nodes (id, name, icon, type, is_template)
            VALUES (?, 'Untitled', ?, 'document', 1)
            RETURNING
                id as "id!: String",
                name,
                icon as "icon: Json<IconData>",
                type as file_type,
                content,
                is_template,
                created_at,
                updated_at
        "#,
        file_id,
        icon
    )
    .fetch_one(pool)
    .await?;

    Ok(document_file)
}

pub async fn update_document_content(
    pool: &SqlitePool,
    id: String,
    content: String,
) -> Result<(), Error> {
    query!(
        r#"
            UPDATE nodes 
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
