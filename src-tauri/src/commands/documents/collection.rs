use backend::features::documents::models::{Collection, Document, DocumentInCollection, Property};
use tauri::State;

use crate::AppState;

#[tauri::command]
pub async fn get_collection(state: State<'_, AppState>, id: String) -> Result<Collection, String> {
    backend::features::documents::collection::get_collection(&state.db, id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn create_collection(state: State<'_, AppState>) -> Result<Collection, String> {
    backend::features::documents::collection::create_collection(&state.db)
        .await
        .map_err(|e| e.to_string())
}

// #[tauri::command]
// pub async fn create_document_in_collection(
//     state: State<'_, AppState>,
//     collection_id: String,
// ) -> Result<DocumentInCollection, String> {
//     backend::features::documents::document::create_document_in_collection(&state.db, collection_id)
//         .await
//         .map_err(|e| e.to_string())
// }

#[tauri::command]
pub async fn get_documents_in_collection(
    state: State<'_, AppState>,
    collection_id: String,
) -> Result<Vec<Document>, String> {
    backend::features::documents::document::get_documents_in_collection(&state.db, collection_id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn create_document_in_collection(
    state: State<'_, AppState>,
    collection_id: String,
) -> Result<DocumentInCollection, String> {
    backend::features::documents::collection::create_document_in_collection(
        &state.db,
        collection_id,
    )
    .await
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn create_property(
    state: State<'_, AppState>,
    collection_id: String,
    name: String,
    property_type: String,
) -> Result<Property, String> {
    backend::features::documents::collection::create_property(
        &state.db,
        collection_id,
        name,
        property_type,
    )
    .await
    .map_err(|e| e.to_string())
}
