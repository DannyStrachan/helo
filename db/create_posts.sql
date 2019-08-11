INSERT INTO helo_posts(user_id, title, img, content)
VALUES($1, %{title}, ${img}, ${content})
RETURNNING *;