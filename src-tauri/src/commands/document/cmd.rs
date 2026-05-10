use crate::AppState;
use backend::infrastructure::document::models::DocumentFile;
use tauri::State;

#[tauri::command]
pub async fn create_document(
    state: State<'_, AppState>,
    parent_id: Option<String>,
) -> Result<DocumentFile, String> {
    backend::infrastructure::document::repo::create_document(&state.db, parent_id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_document(
    state: State<'_, AppState>,
    id: String,
    content: String,
) -> Result<(), String> {
    backend::infrastructure::document::repo::update_document_content(&state.db, id, content)
        .await
        .map_err(|e| e.to_string())
}
