use crate::AppState;
use backend::features::documents::models::{Document, DocumentContent};
use tauri::State;

#[tauri::command]
pub async fn get_document_list(state: State<'_, AppState>) -> Result<Vec<Document>, String> {
    backend::features::documents::document::get_document_list(&state.db)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn create_document(state: State<'_, AppState>) -> Result<Document, String> {
    backend::features::documents::document::create_document(&state.db)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_document(
    state: State<'_, AppState>,
    id: String,
    content: String,
) -> Result<(), String> {
    backend::features::documents::document::update_document(&state.db, id, content)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_title(
    state: State<'_, AppState>,
    id: String,
    title: String,
) -> Result<(), String> {
    backend::features::documents::document::update_title(&state.db, id, title)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_document_content(
    state: State<'_, AppState>,
    id: String,
) -> Result<DocumentContent, String> {
    backend::features::documents::document::get_document_content(&state.db, id)
        .await
        .map_err(|e| e.to_string())
}
