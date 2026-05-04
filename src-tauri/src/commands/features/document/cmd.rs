use crate::AppState;
use backend::core::file::models::File;
use tauri::State;

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
