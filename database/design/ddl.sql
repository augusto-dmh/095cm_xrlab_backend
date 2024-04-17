CREATE DATABASE conexao095;
-- Tables --
CREATE TABLE IF NOT EXISTS users (
	id BIGINT UNSIGNED NOT NULL,
    is_admin BOOLEAN NOT NULL,
    selected_avatar INT UNSIGNED NOT NULL,
    nickname VARCHAR(20) NOT NULL,
    password TEXT NOT NULL,
    xp INT UNSIGNED NOT NULL
);

CREATE TABLE IF NOT EXISTS photos (
	id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    filename TEXT NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS avatars (
	id INT UNSIGNED NOT NULL,
    name VARCHAR(30) NOT NULL,
    filename TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_avatars (
	user_id BIGINT UNSIGNED NOT NULL,
    avatar_id INT UNSIGNED NOT NULL
);

-- Constraints --
ALTER TABLE avatars
MODIFY id INT UNSIGNED NOT NULL AUTO_INCREMENT,
ADD CONSTRAINT pk_avatars_id PRIMARY KEY (id),
ADD CONSTRAINT uk_avatars_name UNIQUE KEY (name),
ADD INDEX idx_avatars_name (name);

ALTER TABLE users
MODIFY id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
ADD CONSTRAINT pk_users_id PRIMARY KEY (id),
ADD CONSTRAINT uk_users_nickname UNIQUE KEY (nickname),
ADD CONSTRAINT fk_users_selected_avatar FOREIGN KEY (selected_avatar) REFERENCES avatars(id) ON UPDATE CASCADE ON DELETE RESTRICT,
ADD INDEX idx_users_nickname (nickname);

ALTER TABLE photos
MODIFY id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
ADD CONSTRAINT pk_photos_id PRIMARY KEY (id),
ADD CONSTRAINT fk_photos_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
ADD INDEX idx_photos_user_id (user_id),
ADD INDEX idx_photos_latitude (latitude),
ADD INDEX idx_photos_longitude (longitude);

ALTER TABLE user_avatars
ADD CONSTRAINT fk_user_avatars_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
ADD CONSTRAINT fk_user_avatars_avatar_id FOREIGN KEY (avatar_id) REFERENCES avatars(id) ON UPDATE CASCADE ON DELETE CASCADE,
ADD CONSTRAINT cpk_user_avatars PRIMARY KEY (user_id, avatar_id);