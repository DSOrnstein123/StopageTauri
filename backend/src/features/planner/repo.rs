use sqlx::{SqlitePool, query_as};
use uuid::Uuid;

pub struct TaskMetadata {
  type: "date"
  start_date: 
  end_date:
}

pub struct Task {
  pub id: String,
  pub title: String,
  pub metadata: TaskMetadata,
  pub created_at: String,
}

#[allow(dead_code)]
pub async fn create_task(pool: &SqlitePool) -> Result<Task, sqlx::Error> {
    let id = Uuid::new_v4().simple().to_string();
    let title = "Untitled";

    let document = query_as!(
        Task,
        r#"
            INSERT INTO documents (id, title)
            VALUES (?, ?)
            RETURNING
                id as "id!: String",
                title,
                created_at
        "#,
        id,
        title
    )
    .fetch_one(pool)
    .await?;

    Ok(document)
}
