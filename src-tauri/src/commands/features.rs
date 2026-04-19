pub mod collection;
pub mod document;
pub mod flashcard;

#[macro_export]
macro_rules! feature_commands {
    () => {{
        use $crate::commands::features::collection::cmd as collection;
        use $crate::commands::features::document::cmd as docucment;
        use $crate::commands::features::flashcard::deck;

        tauri::generate_handler![
            // flashcard
            deck::get_decks,
            deck::get_cards_from_deck,
            deck::create_deck,
            // document
            docucment::get_document_list,
            docucment::create_document,
            docucment::update_document,
            docucment::update_title,
            docucment::get_document_content,
            // collection
            collection::create_collection,
            collection::create_property,
            collection::get_collection,
            collection::create_document_in_collection,
            collection::get_documents_in_collection,
            collection::update_document_property
        ]
    }};
}
