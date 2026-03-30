-- Add migration script here
CREATE TABLE "collections" (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL DEFAULT(''),
    schema TEXT NOT NULL DEFAULT('[]') CHECK (json_valid(schema)),
    views TEXT NOT NULL DEFAULT('[]') CHECK (json_valid(views)),
    created_at TEXT NOT NULL DEFAULT(datetime('now')),
    updated_at TEXT NOT NULL DEFAULT(datetime('now'))
)