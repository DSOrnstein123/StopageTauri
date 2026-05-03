-- Add migration script here
PRAGMA foreign_keys = OFF;

CREATE TABLE documents_new (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL DEFAULT('{}') CHECK (json_valid(content)),
    FOREIGN KEY (id) REFERENCES files (id) ON DELETE CASCADE
);

DROP TABLE documents;

ALTER TABLE documents_new RENAME TO documents;

PRAGMA foreign_keys = ON;