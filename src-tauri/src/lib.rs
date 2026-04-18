use backend::database::{migrate::migrate, pool};
use sqlx::SqlitePool;
use tauri::Manager;

pub mod commands;

#[allow(dead_code)]
pub struct AppState {
    db: SqlitePool,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            tauri::async_runtime::block_on(async {
                let db = pool::connect().await;
                migrate(&db).await?;

                app.manage(AppState { db });

                Ok::<(), Box<dyn std::error::Error>>(())
            })?;

            Ok(())
        })
        .invoke_handler(all_commands!())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
