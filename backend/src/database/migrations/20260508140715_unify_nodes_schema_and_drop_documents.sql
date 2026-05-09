-- Add migration script here
PRAGMA foreign_keys = OFF;

DROP TABLE documents;

DROP TABLE files;

CREATE TABLE nodes (
    id TEXT PRIMARY KEY,
    parent_id TEXT,
    icon TEXT NOT NULL CHECK (json_valid(icon)),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    content TEXT NOT NULl DEFAULT '{}',
    properties TEXT NOT NULL DEFAULT '{}',
    is_template BOOLEAN NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_trashed BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (parent_id) REFERENCES nodes (id) ON DELETE CASCADE
);

PRAGMA foreign_keys = ON;