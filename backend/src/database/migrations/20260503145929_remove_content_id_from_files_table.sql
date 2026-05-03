-- Add migration script here
PRAGMA foreign_keys = OFF;

CREATE TABLE files_new (
    id TEXT PRIMARY KEY,
    folder_id TEXT,
    icon TEXT NOT NULL CHECK (json_valid(icon)),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_trashed BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (folder_id) REFERENCES folders (id) ON DELETE CASCADE
);

DROP TABLE files;

ALTER TABLE files_new RENAME TO files;

PRAGMA foreign_keys = ON;