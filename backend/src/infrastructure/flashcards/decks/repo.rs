use serde::Serialize;
use sqlx::{SqlitePool, query_as};
use uuid::Uuid;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
#[allow(dead_code)]
pub struct Deck {
    pub id: Uuid,
    pub name: String,
    pub parent_id: Option<Uuid>,
}

#[allow(dead_code)]
pub async fn get_decks_list(pool: &SqlitePool) -> Result<Vec<Deck>, sqlx::Error> {
    let decks = query_as!(
        Deck,
        r#"
            SELECT
                id as "id!: Uuid",
                name,
                parent_id as "parent_id: Uuid"
            FROM decks
            ORDER BY name ASC
        "#,
    )
    .fetch_all(pool)
    .await?;

    Ok(decks)
}

#[allow(dead_code)]
pub async fn create_deck(
    pool: &SqlitePool,
    name: String,
    parent_id: Option<Uuid>,
) -> Result<Deck, sqlx::Error> {
    let id = Uuid::new_v4();

    let deck = sqlx::query_as!(
        Deck,
        r#"
            INSERT INTO decks (id, name, parent_id)
            VALUES (?, ?, ?)
            RETURNING id as "id!: Uuid", name, parent_id as "parent_id: Uuid"
        "#,
        id,
        name,
        parent_id
    )
    .fetch_one(pool)
    .await?;

    Ok(deck)
}
