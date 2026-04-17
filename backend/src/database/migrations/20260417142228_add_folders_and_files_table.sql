-- Add migration script here
CREATE TABLE folders (
    id TEXT PRIMARY KEY,
    parent_id TEXT,
    icon TEXT NOT NULL CHECK (json_valid(icon)),
    name TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_trashed BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (parent_id) REFERENCES folders (id) ON DELETE CASCADE
);

CREATE TABLE files (
    id TEXT PRIMARY KEY,
    folder_id TEXT,
    icon TEXT NOT NULL CHECK (json_valid(icon)),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    content_id TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_trashed BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (folder_id) REFERENCES folders (id) ON DELETE CASCADE
);