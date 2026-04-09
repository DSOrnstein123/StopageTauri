pub mod documents;
pub mod flashcards;

#[macro_export]
macro_rules! all_commands {
    () => {
        tauri::generate_handler![
            //flashcard
            crate::commands::flashcards::flashcard::get_decks,
            crate::commands::flashcards::flashcard::get_cards_from_deck,
            crate::commands::flashcards::flashcard::create_deck,
            //document
            crate::commands::documents::document::get_document_list,
            crate::commands::documents::document::create_document,
            crate::commands::documents::document::update_document,
            crate::commands::documents::document::update_title,
            crate::commands::documents::document::get_document_content,
            //document/collection
            crate::commands::documents::collection::create_collection,
            crate::commands::documents::collection::create_property,
            crate::commands::documents::collection::get_collection,
            crate::commands::documents::collection::create_document_in_collection,
            crate::commands::documents::collection::get_documents_in_collection,
            crate::commands::documents::collection::create_row
        ]
    };
}
