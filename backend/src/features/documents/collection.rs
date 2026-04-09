use anyhow::Result;
use sqlx::{Error, SqlitePool, query, query_as};
use uuid::Uuid;

use crate::features::documents::models::{Collection, Property, Row};

#[allow(dead_code)]
pub async fn get_collection(pool: &SqlitePool, id: String) -> Result<Collection, Error> {
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
pub async fn create_collection(pool: &SqlitePool) -> Result<Collection, Error> {
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

pub async fn create_row(pool: &SqlitePool, collection_id: String) -> Result<Row, Error> {
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

    struct RawRow {
        id: String,
        collection_id: String,
        property: String,
    }

    let raw = query_as!(
        RawRow,
        r#"
            INSERT INTO documents (id, collection_id, property)
            VALUES (?, ?, ?)
            RETURNING
                id as "id!",
                collection_id as "collection_id!",
                property as "property!"
        "#,
        id,
        collection_id,
        property_str,
    )
    .fetch_one(pool)
    .await?;

    Ok(Row {
        id: raw.id,
        collection_id: raw.collection_id,
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
        id: Uuid::new_v4().to_string(),
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
