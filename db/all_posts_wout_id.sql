-- If userposts is false AND there is no search string
SELECT * FROM helo_posts hp
LEFT JOIN helo_users hu ON hp.user_id = hu.user_id
WHERE hu.user_id != $1