use std::collections::HashMap;

use anyhow::Result;
use serde_json::{Value, json};
use sqlx::{SqlitePool, query, query_as};
use uuid::Uuid;

use crate::features::collection::models::{Collection, Property};

#[allow(dead_code)]
pub async fn get_collection(pool: &SqlitePool, id: String) -> Result<Collection> {
    struct RawCollection {
        id: String,
        name: String,
        schema: String,
    }

    let raw = query_as!(
        RawCollection,
        r#"
            SELECT 
                id as "id!", 
                name as "name!", 
                schema as "schema!"
            FROM collections 
            WHERE id = ?
        "#,
        id,
    )
    .fetch_one(pool)
    .await?;

    Ok(Collection {
        id: raw.id,
        name: raw.name,
        schema: serde_json::from_str(&raw.schema).unwrap_or_default(),
    })
}

#[allow(dead_code)]
pub async fn create_collection(pool: &SqlitePool) -> Result<Collection> {
    let id = Uuid::new_v4().simple().to_string();
    let name = "";
    let default_property = Property {
        id: Uuid::new_v4().simple().to_string(),
        name: "Name".to_string(),
        r#type: "text".to_string(),
    };
    let schema = serde_json::to_string(&vec![default_property]).unwrap();

    struct RawCollection {
        id: String,
        name: String,
        schema: String,
    }

    let raw = query_as!(
        RawCollection,
        r#"
            INSERT INTO collections (id, name, schema)
            VALUES (?, ?, ?)
            RETURNING
                id as "id!",
                name as "name!",
                schema as "schema!"
        "#,
        id,
        name,
        schema,
    )
    .fetch_one(pool)
    .await?;

    Ok(Collection {
        id: raw.id,
        name: raw.name,
        schema: serde_json::from_str(&raw.schema).unwrap_or_default(),
    })
}

pub async fn create_document_in_collection(
    pool: &SqlitePool,
    collection_id: String,
) -> Result<DocumentInCollection> {
    let collection = get_collection(pool, collection_id.clone()).await?;

    let property: serde_json::Value =
        collection
            .schema
            .iter()
            .fold(serde_json::json!({}), |mut acc, property| {
                acc[&property.id] = serde_json::Value::Null;
                acc
            });

    let property_str = serde_json::to_string(&property).unwrap();
    let id = Uuid::new_v4().simple().to_string();
    let title = "".to_string();

    struct RawDocumentInCollection {
        id: String,
        collection_id: String,
        title: String,
        property: String,
    }

    let raw = query_as!(
        RawDocumentInCollection,
        r#"
            INSERT INTO documents (id, collection_id, title, property)
            VALUES (?, ?, ?, ?)
            RETURNING
                id as "id!",
                collection_id as "collection_id!",
                title as "title!",
                property as "property!"
        "#,
        id,
        collection_id,
        title,
        property_str,
    )
    .fetch_one(pool)
    .await?;

    Ok(DocumentInCollection {
        id: raw.id,
        collection_id: raw.collection_id,
        title: raw.title,
        property: serde_json::from_str(&raw.property).unwrap_or_default(),
    })
}

pub async fn create_property(
    pool: &SqlitePool,
    collection_id: String,
    name: String,
    property_type: String,
) -> Result<Property> {
    let row = query!("SELECT schema FROM collections WHERE id = ?", collection_id)
        .fetch_one(pool)
        .await?;

    let mut schema: Vec<Property> = serde_json::from_str(&row.schema)?;

    let new_property = Property {
        id: Uuid::new_v4().simple().to_string(),
        name: name,
        r#type: property_type,
    };

    schema.push(new_property.clone());
    let updated_schema = serde_json::to_string(&schema)?;

    query!(
        "UPDATE collections SET schema = ?, updated_at = datetime('now') WHERE id = ?",
        updated_schema,
        collection_id
    )
    .execute(pool)
    .await?;

    Ok(new_property)
}

pub async fn update_document_property(
    pool: &SqlitePool,
    document_id: String,
    property_id: String,
    new_value: String,
) -> Result<()> {
    let row = query!("SELECT property FROM documents WHERE id = ?", document_id)
        .fetch_one(pool)
        .await?;

    let mut properties: HashMap<String, Value> = serde_json::from_str(&row.property)?;
    properties.insert(property_id, json!(new_value));

    let updated_json = serde_json::to_string(&properties)?;
    sqlx::query!(
        "UPDATE documents SET property = ? WHERE id = ?",
        updated_json,
        document_id
    )
    .execute(pool)
    .await?;

    Ok(())
}
