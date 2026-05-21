use backend::{
    database::{connect::connect, migrate::migrate},
    infrastructure::node::repo::SqliteNodeRepository,
};
use sqlx::SqlitePool;
use tauri::Manager;

pub mod commands;
pub mod dtos;

#[allow(dead_code)]
pub struct AppState {
    db: SqlitePool,
    pub node_repo: SqliteNodeRepository,
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
                let db = connect().await;
                migrate(&db).await?;

                app.manage(AppState {
                    db: db.clone(),
                    node_repo: SqliteNodeRepository::new(db.clone()),
                });

                Ok::<(), Box<dyn std::error::Error>>(())
            })?;

            Ok(())
        })
        .invoke_handler(app_commands!())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
