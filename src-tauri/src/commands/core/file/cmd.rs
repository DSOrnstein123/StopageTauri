use backend::entities::file::models::{File, FileDetail};
use tauri::State;

use crate::AppState;

#[tauri::command]
pub async fn get_file_detail(
    state: State<'_, AppState>,
    file_id: String,
) -> Result<FileDetail, String> {
    backend::entities::file::repo::get_file_detail(&state.db, file_id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_files(state: State<'_, AppState>) -> Result<Vec<File>, String> {
    backend::entities::file::repo::get_files(&state.db)
        .await
        .map_err(|e| e.to_string())
}
