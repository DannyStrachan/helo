-- If userposts is true AND there is a search string
-- SELECT * FROM helo_posts
-- WHERE title = ${title};

-- select * from helo_posts hp
-- LEFT JOIN helo_users hu on hp.user_id = hu.user_id
-- where UPPER(hp.post_title) like UPPER($1)


SELECT * FROM helo_posts hp
LEFT JOIN helo_users hu ON hp.user_id = hu.user_id
WHERE UPPER(hp.title) LIKE UPPER($1);