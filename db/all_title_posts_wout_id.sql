
-- If userposts is false AND there is a search string
SELECT * FROM helo_posts hp
LEFT JOIN helo_users hu ON hp.user_id = hu.user_id
WHERE UPPER(hp.title) LIKE UPPER($1) AND hu.user_id != $2;

-- SELECT * FROM helo_posts hp
-- LEFT JOIN helo_users hu ON hp.user_id = hu.user_id
-- WHERE UPPER(hp.title) LIKE UPPER($1);