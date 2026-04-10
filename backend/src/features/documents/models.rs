use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Document {
    pub id: String,
    pub title: String,
    pub created_at: String,
}

// #[derive(Debug, Serialize)]
// #[serde(rename_all = "camelCase")]
// pub struct DocumentInCollection {
//     pub id: String,
//     pub collection_id: String,
//     pub title: String,
//     pub created_at: String,
// }

#[derive(Serialize)]
pub struct DocumentContent {
    pub content: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Collection {
    pub id: String,
    pub name: String,
    pub schema: Vec<Property>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Property {
    pub id: String,
    pub name: String,
    pub r#type: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DocumentInCollection {
    pub id: String,
    pub title: String,
    pub collection_id: String,
    pub property: serde_json::Value,
}
