DROP TABLE IF EXISTS helo_users;
DROP TABLE IF EXISTS helo_credentials;
DROP TABLE IF EXISTS helo_posts;

CREATE TABLE helo_users(
user_id SERIAL PRIMARY KEY,
username VARCHAR(50) UNIQUE,
profilePic TEXT
);

CREATE TABLE helo_credentials(
user_id INTEGER,
hash TEXT
);

CREATE TABLE helo_posts(
account_id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES helo_users(user_id),
title VARCHAR(100),
img TEXT,
content TEXT
);