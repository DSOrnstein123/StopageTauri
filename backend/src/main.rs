use backend::database::migrate::migrate;
use sqlx::SqlitePool;
use std::error::Error;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let url = "sqlite://F:/Code/stopage-tauri/data/dev1.db";
    let pool = SqlitePool::connect(url).await?;
    migrate(&pool).await?;

    Ok(())
}
