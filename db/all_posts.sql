-- If userposts is true AND there is no search string
-- SELECT * FROM helo_posts;

 SELECT 
    post_id,
    title,
    content,
    post_img,
    profile_pic,
    username
FROM helo_posts hp
join helo_users hu on hp.author_id = hu.user_id
SELECT 
  *
FROM helo_posts
join helo_users on hp.author_id = up.user_id