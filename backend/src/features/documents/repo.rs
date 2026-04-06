use anyhow::Result;
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::{Error, SqlitePool, query, query_as};
use uuid::Uuid;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
#[allow(dead_code)]
pub struct Document {
    pub id: String,
    pub title: String,
    pub created_at: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
#[allow(dead_code)]
pub struct Collection {
    pub id: String,
    pub name: String,
    pub schema: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Property {
    pub id: String,
    pub name: String,
    pub r#type: String,
}

#[allow(dead_code)]
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

#[allow(dead_code)]
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

#[allow(dead_code)]
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

#[allow(dead_code)]
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

#[derive(Serialize)]
pub struct DocumentContent {
    pub content: Option<String>,
}

#[allow(dead_code)]
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

#[allow(dead_code)]
pub async fn create_collection(pool: &SqlitePool) -> Result<Collection, Error> {
    let id = Uuid::new_v4().simple().to_string();
    let name = "";
    let schema = json!([
        {
            "id": Uuid::new_v4().simple().to_string(),
            "name": "Name",
            "type": "text",
            "position": 0
        }
    ])
    .to_string();

    let collection = query_as!(
        Collection,
        r#"
            INSERT INTO collections (id, name, schema)
            VALUES (?, ?, ?)
            RETURNING
                id as "id!: String",
                name,
                schema
        "#,
        id,
        name,
        schema,
    )
    .fetch_one(pool)
    .await?;

    Ok(collection)
}

pub async fn add_property(
    pool: &SqlitePool,
    collection_id: String,
    name: String,
    property_type: String,
) -> Result<()> {
    let row = query!("SELECT schema FROM collections WHERE id = ?", collection_id)
        .fetch_one(pool)
        .await?;

    let mut schema: Vec<Property> = serde_json::from_str(&row.schema)?;

    let new_property = Property {
        id: Uuid::new_v4().to_string(),
        name: name,
        r#type: property_type,
    };

    schema.push(new_property);
    let updated_schema = serde_json::to_string(&schema)?;

    query!(
        "UPDATE collections SET schema = ?, updated_at = datetime('now') WHERE id = ?",
        updated_schema,
        collection_id
    )
    .execute(pool)
    .await?;

    Ok(())
}
