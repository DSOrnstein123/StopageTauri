-- Add migration script here
PRAGMA foreign_keys = OFF;

-- documents: BLOB -> TEXT
CREATE TABLE documents_new (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL DEFAULT(''),
    content TEXT CHECK (json_valid(content)),
    created_at TEXT NOT NULL DEFAULT(datetime('now')),
    updated_at TEXT NOT NULL DEFAULT(datetime('now'))
);

INSERT INTO
    documents_new
SELECT
    lower(hex(id)),
    title,
    content,
    created_at,
    updated_at
FROM documents;

DROP TABLE documents;

ALTER TABLE documents_new RENAME TO documents;

-- flashcards: BLOB -> TEXT
CREATE TABLE flashcards_new (
    id TEXT PRIMARY KEY,
    front TEXT NOT NULL,
    back TEXT NOT NULL
);

INSERT INTO
    flashcards_new
SELECT lower(hex(id)), front, back
FROM flashcards;

DROP TABLE flashcards;

ALTER TABLE flashcards_new RENAME TO flashcards;

-- decks: BLOB -> TEXT
CREATE TABLE decks_new (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL CHECK (length(name) > 0),
    parent_id TEXT
);

INSERT INTO
    decks_new
SELECT lower(hex(id)), name, lower(hex(parent_id))
FROM decks;

DROP TABLE decks;

ALTER TABLE decks_new RENAME TO decks;

-- decks_flashcards: BLOB -> TEXT
CREATE TABLE decks_flashcards_new (
    deck_id TEXT NOT NULL,
    flashcard_id TEXT NOT NULL,
    PRIMARY KEY (deck_id, flashcard_id),
    FOREIGN KEY (deck_id) REFERENCES decks (id) ON DELETE CASCADE,
    FOREIGN KEY (flashcard_id) REFERENCES flashcards (id) ON DELETE CASCADE
);

INSERT INTO
    decks_flashcards_new
SELECT lower(hex(deck_id)), lower(hex(flashcard_id))
FROM decks_flashcards;

DROP TABLE decks_flashcards;

ALTER TABLE decks_flashcards_new RENAME TO decks_flashcards;

PRAGMA foreign_keys = ON;