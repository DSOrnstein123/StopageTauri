use backend::database::migrate::migrate;
use sqlx::SqlitePool;
use std::error::Error;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let pool = SqlitePool::connect("sqlite://D:/code/p/stopagetauri/data/dev1.db").await?;
    migrate(&pool).await?;

    Ok(())
}
