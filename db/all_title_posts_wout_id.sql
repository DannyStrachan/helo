
If userposts is false AND there is a search string
SELECT * FROM helo_posts
WHERE title = ${title} AND user_id != $1;