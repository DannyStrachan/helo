-- If userposts is true AND there is no search string
-- SELECT * FROM helo_posts;

 SELECT 
    post_id,
    title,
    content,
    img,
    profile_pic,
    username
FROM helo_posts hp
join helo_users hu on hp.user_id = hu.user_id;