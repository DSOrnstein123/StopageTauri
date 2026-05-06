// pub mod collection;
pub mod document;
pub mod file;
pub mod flashcard;

#[macro_export]
macro_rules! app_commands {
    () => {{
        use $crate::commands::file::cmd as file;

        // use $crate::commands::features::collection::cmd as collection;
        use $crate::commands::document::cmd as docucment;
        use $crate::commands::flashcard::deck;

        tauri::generate_handler![
            //core/file
            file::get_files,
            file::get_file_detail,
            file::update_file_name,
            // flashcard
            deck::get_decks,
            deck::get_cards_from_deck,
            deck::create_deck,
            // document
            docucment::create_document,
            docucment::update_document,
            // collection
            // collection::create_collection,
            // collection::create_property,
            // collection::get_collection,
            // collection::create_document_in_collection,
            // collection::get_documents_in_collection,
            // collection::update_document_property
        ]
    }};
}
