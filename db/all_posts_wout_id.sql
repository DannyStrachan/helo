
If userposts is false AND there is no search string
SELECT * FROM helo_posts 
WHERE user_id  != $1;