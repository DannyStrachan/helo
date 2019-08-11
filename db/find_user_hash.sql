SELECT * FROM helo_users hu
JOIN helo_credentials hc ON hc.user_id = hu.user_id
WHERE username = $1;