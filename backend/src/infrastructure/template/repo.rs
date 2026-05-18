pub async fn create_template(pool: &SqlitePool) -> Result<TemplateFile, Error> {
    let file_id = Uuid::new_v4().simple().to_string();
    let icon = Json(IconData {
        icon_type: "lucide".to_string(),
        value: "LayoutTemplate".to_string(),
    });

    let document_file = query_as!(
        TemplateFile,
        r#"
            INSERT INTO nodes (id, name, icon, type)
            VALUES (?, 'Untitled', ?, 'document')
            RETURNING
                id as "id!: String",
                icon as "icon: Json<IconData>",
                name,
                kind,
                type as node_type,
                content,
                created_at,
                updated_at
        "#,
        file_id,
        icon
    )
    .fetch_one(pool)
    .await?;

    Ok(document_file)
}
