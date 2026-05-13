-- Add migration script here
PRAGMA foreign_keys = OFF;

DROP TABLE nodes;

CREATE TABLE nodes (
    id TEXT PRIMARY KEY,
    parent_id TEXT,
    icon TEXT NOT NULL CHECK (json_valid(icon)),
    name TEXT NOT NULL,
    kind TEXT NOT NULL DEFAULT 'file' CHECK (
        kind IN ('file', 'folder', 'template')
    ),
    type TEXT NOT NULL,
    content TEXT NOT NULl DEFAULT '{}' CHECK (json_valid(icon)),
    properties TEXT NOT NULL DEFAULT '{}' CHECK (json_valid(icon)),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_trashed BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (parent_id) REFERENCES nodes (id) ON DELETE CASCADE
);

PRAGMA foreign_keys = ON;