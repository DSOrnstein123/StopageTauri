-- Add migration script here
CREATE TABLE documents (
    id BLOB PRIMARY KEY,
    title TEXT NOT NULL DEFAULT(''),
    content TEXT CHECK (json_valid(content)),
    created_at TEXT NOT NULL DEFAULT(datetime('now')),
    updated_at TEXT NOT NULL DEFAULT(datetime('now'))
)