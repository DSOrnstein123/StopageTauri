use crate::AppState;
use backend::infrastructure::file::models::File;
use tauri::State;

#[tauri::command]
pub async fn create_document(state: State<'_, AppState>) -> Result<File, String> {
    backend::infrastructure::document::repo::create_document(&state.db)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_document(
    state: State<'_, AppState>,
    id: String,
    content: String,
) -> Result<(), String> {
    backend::infrastructure::document::repo::update_document(&state.db, id, content)
        .await
        .map_err(|e| e.to_string())
}
