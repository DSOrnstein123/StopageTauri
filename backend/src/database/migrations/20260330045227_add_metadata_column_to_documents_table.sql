-- Add migration script here
PRAGMA foreign_keys = OFF;

CREATE TABLE "documents_new" (
    id TEXT PRIMARY KEY,
    collection_id TEXT,
    title TEXT NOT NULL DEFAULT(''),
    content TEXT NOT NULL DEFAULT('{}') CHECK (json_valid(content)),
    metadata TEXT NOT NULL DEFAULT('{}') CHECK (json_valid(metadata)),
    created_at TEXT NOT NULL DEFAULT(datetime('now')),
    updated_at TEXT NOT NULL DEFAULT(datetime('now')),
    FOREIGN KEY (collection_id) REFERENCES collections (id) ON DELETE SET NULL
);

INSERT INTO
    "documents_new" (
        id,
        title,
        content,
        created_at,
        updated_at
    )
SELECT
    id,
    title,
    COALESCE(content, '{}'),
    created_at,
    updated_at
FROM "documents";

DROP TABLE "documents";

ALTER TABLE "documents_new" RENAME TO "documents";

PRAGMA foreign_keys = ON;