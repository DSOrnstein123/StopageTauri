use sqlx::SqlitePool;

pub async fn migrate(pool: &SqlitePool) -> Result<(), sqlx::Error> {
    sqlx::migrate!("./src/database/migrations")
        .run(pool)
        .await?;
    Ok(())
}
