-- Add migration script here
INSERT INTO
    decks (id, name, parent_id)
VALUES (
        x'c1d2e3f40516273849a5b6c7d8e9f021',
        'Ownership',
        x'a1b2c3d4e5f60718293a4b5c6d7e8f90'
    ),
    (
        x'd1e2f30516273849a5b6c7d8e9f0502c',
        'Borrowing',
        x'c1d2e3f40516273849a5b6c7d8e9f021'
    );