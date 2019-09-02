SELECT  * FROM helo_posts hp
INNER JOIN helo_users hu ON hp.user_id = hu.user_id
-- WHERE hp.user_id = $1;
WHERE post_id = $1;