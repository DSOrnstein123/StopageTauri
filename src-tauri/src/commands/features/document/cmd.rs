use crate::AppState;
use backend::{entities::file::models::File, features::document::models::Document};
use tauri::State;

#[tauri::command]
pub async fn get_document_list(state: State<'_, AppState>) -> Result<Vec<Document>, String> {
    backend::features::document::repo::get_document_list(&state.db)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn create_document(state: State<'_, AppState>) -> Result<File, String> {
    backend::features::document::repo::create_document(&state.db)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_document(
    state: State<'_, AppState>,
    id: String,
    content: String,
) -> Result<(), String> {
    backend::features::document::repo::update_document(&state.db, id, content)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_title(
    state: State<'_, AppState>,
    id: String,
    title: String,
) -> Result<(), String> {
    backend::features::document::repo::update_title(&state.db, id, title)
        .await
        .map_err(|e| e.to_string())
}
