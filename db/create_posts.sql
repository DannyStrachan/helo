INSERT INTO helo_posts(user_id, title, img, content)
VALUES($1, $2, $3, $4)
RETURNING *;