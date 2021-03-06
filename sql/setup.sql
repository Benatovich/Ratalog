-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS rats;

CREATE TABLE rats (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    sex TEXT NOT NULL,
    color TEXT NOT NULL
);

INSERT INTO
    rats (name, sex, color)
VALUES
    ('ripley', 'female', 'grey'),
    ('halibel', 'female', 'hooded white'),
    ('camina', 'female', 'agouti'),
    ('kozo', 'female', 'agouti'),
    ('nico', 'female', 'black'),
    ('nel', 'female', 'black');