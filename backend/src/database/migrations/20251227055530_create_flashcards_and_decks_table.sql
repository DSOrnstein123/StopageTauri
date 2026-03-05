PRAGMA foreign_keys = OFF;

-- FLASHCARDS
CREATE TABLE flashcards (
    id BLOB PRIMARY KEY,
    front TEXT NOT NULL,
    back TEXT NOT NULL
);

INSERT INTO
    flashcards (id, front, back)
VALUES (
        x'43afb2e9ce194c36bba45da37b3444bc',
        'What is Rust?',
        'A systems programming language.'
    ),
    (
        x'91c2d4f8aeb44a1b98765c3f0e2a1d7f',
        'What is SQLx?',
        'An async SQL toolkit for Rust.'
    );

-- DECKS
CREATE TABLE decks (
    id BLOB PRIMARY KEY,
    name TEXT NOT NULL CHECK (length(name) > 0),
    parent_id BLOB
);

INSERT INTO
    decks (id, name, parent_id)
VALUES (
        x'a1b2c3d4e5f60718293a4b5c6d7e8f90',
        'Rust Basics',
        NULL
    ),
    (
        x'b1c2d3e4f5061728394a5b6c7d8e9f01',
        'Advanced Rust',
        x'a1b2c3d4e5f60718293a4b5c6d7e8f90'
    );

-- DECKS_FLASHCARDS
CREATE TABLE decks_flashcards (
    deck_id BLOB NOT NULL,
    flashcard_id BLOB NOT NULL,
    PRIMARY KEY (deck_id, flashcard_id),
    FOREIGN KEY (deck_id) REFERENCES decks (id) ON DELETE CASCADE,
    FOREIGN KEY (flashcard_id) REFERENCES flashcards (id) ON DELETE CASCADE
);

INSERT INTO
    decks_flashcards (deck_id, flashcard_id)
VALUES (
        x'a1b2c3d4e5f60718293a4b5c6d7e8f90',
        x'43afb2e9ce194c36bba45da37b3444bc'
    ),
    (
        x'a1b2c3d4e5f60718293a4b5c6d7e8f90',
        x'91c2d4f8aeb44a1b98765c3f0e2a1d7f'
    ),
    (
        x'b1c2d3e4f5061728394a5b6c7d8e9f01',
        x'91c2d4f8aeb44a1b98765c3f0e2a1d7f'
    );

PRAGMA foreign_keys = ON;