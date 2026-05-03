-- Add migration script here
PRAGMA foreign_keys = OFF;

CREATE TABLE documents_new (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL DEFAULT(''),
    content TEXT NOT NULL DEFAULT('{}') CHECK (json_valid(content)),
    created_at TEXT NOT NULL DEFAULT(datetime('now')),
    updated_at TEXT NOT NULL DEFAULT(datetime('now')),
    FOREIGN KEY (id) REFERENCES files (id) ON DELETE CASCADE
);

DROP TABLE documents;

ALTER TABLE documents_new RENAME TO documents;

PRAGMA foreign_keys = ON;