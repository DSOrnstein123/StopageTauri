use backend::entities::file::models::File;
use tauri::State;

use crate::AppState;

#[tauri::command]
pub async fn get_files(state: State<'_, AppState>) -> Result<Vec<File>, String> {
    backend::entities::file::repo::get_files(&state.db)
        .await
        .map_err(|e| e.to_string())
}
