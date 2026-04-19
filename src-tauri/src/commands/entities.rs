pub mod file;

#[macro_export]
macro_rules! entities_commands {
    () => {{
        use $crate::commands::entities::file::cmd as file;

        tauri::generate_handler![
            // file
            file::get_files
        ]
    }};
}
