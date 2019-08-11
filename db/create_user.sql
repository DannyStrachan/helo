INSERT INTO helo_users(username, profile_pic)
VALUES(${username}, ${profilePic})
RETURNING *;