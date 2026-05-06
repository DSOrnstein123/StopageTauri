use sqlx::SqlitePool;

use crate::features::flashcards::decks::repo::{self, Deck};

#[allow(dead_code)]
pub async fn get_decks(pool: &SqlitePool) -> Result<Vec<Deck>, String> {
    repo::get_decks_list(pool).await.map_err(|e| e.to_string())
}
