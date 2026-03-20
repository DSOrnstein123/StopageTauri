use backend::{
    database::migrate::migrate,
    features::{
        documents::repo::Document,
        flashcards::{
            cards::repo::Card,
            decks::{repo::Deck, service},
        },
    },
};
use sqlx::{types::Uuid, SqlitePool};
use tauri::{Manager, State};

pub mod features;

#[allow(dead_code)]
pub struct AppState {
    db: SqlitePool,
}

#[tauri::command]
async fn get_decks(state: State<'_, AppState>) -> Result<Vec<Deck>, String> {
    service::get_decks(&state.db)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_document_list(state: State<'_, AppState>) -> Result<Vec<Document>, String> {
    backend::features::documents::repo::get_document_list(&state.db)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_cards_from_deck(
    state: State<'_, AppState>,
    deck_id: Uuid,
) -> Result<Vec<Card>, String> {
    backend::features::flashcards::cards::repo::get_cards_from_deck(&state.db, deck_id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn create_deck(
    state: State<'_, AppState>,
    name: String,
    parent_id: Option<Uuid>,
) -> Result<Deck, String> {
    backend::features::flashcards::decks::repo::create_deck(&state.db, name, parent_id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn create_document(state: State<'_, AppState>) -> Result<Document, String> {
    backend::features::documents::repo::create_document(&state.db)
        .await
        .map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            tauri::async_runtime::block_on(async {
                let db = backend::repo::pool::connect().await;
                migrate(&db).await?;

                app.manage(AppState { db });

                Ok::<(), Box<dyn std::error::Error>>(())
            })?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_document_list,
            get_decks,
            get_cards_from_deck,
            create_deck,
            create_document
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
