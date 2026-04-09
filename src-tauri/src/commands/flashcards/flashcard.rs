use backend::features::flashcards::{cards::repo::Card, decks::repo::Deck};
use sqlx::types::Uuid;
use tauri::State;

use crate::AppState;

#[tauri::command]
pub async fn get_decks(state: State<'_, AppState>) -> Result<Vec<Deck>, String> {
    backend::features::flashcards::decks::service::get_decks(&state.db)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_cards_from_deck(
    state: State<'_, AppState>,
    deck_id: Uuid,
) -> Result<Vec<Card>, String> {
    backend::features::flashcards::cards::repo::get_cards_from_deck(&state.db, deck_id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn create_deck(
    state: State<'_, AppState>,
    name: String,
    parent_id: Option<Uuid>,
) -> Result<Deck, String> {
    backend::features::flashcards::decks::repo::create_deck(&state.db, name, parent_id)
        .await
        .map_err(|e| e.to_string())
}
