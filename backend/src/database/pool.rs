use sqlx::{SqlitePool, sqlite::SqlitePoolOptions};

#[allow(dead_code)]
pub async fn connect() -> SqlitePool {
    SqlitePoolOptions::new()
        .max_connections(5)
        .connect("sqlite:///F:/Code/stopage-tauri/data/dev1.db")
        .await
        .expect("connect db failed")
}
