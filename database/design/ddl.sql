CREATE DATABASE conexao095;

-- Tables --
CREATE TABLE IF NOT EXISTS users (
	id INT NOT NULL,
    is_admin BOOLEAN NOT NULL,
    selected_avatar INT NOT NULL,
    nickname VARCHAR(20) NOT NULL,
    password TEXT NOT NULL,
    xp INT NOT NULL
);

CREATE TABLE IF NOT EXISTS photos (
	id INT NOT NULL,
    user_id INT NOT NULL,
    filename TEXT NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS avatars (
	id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    filename TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_avatars (
	user_id INT NOT NULL,
    avatar_id INT NOT NULL
);

-- Constraints --
ALTER TABLE users
MODIFY id INT NOT NULL AUTO_INCREMENT,
ADD CONSTRAINT pk_users_id PRIMARY KEY (id),
ADD CONSTRAINT uk_users_nickname UNIQUE KEY (nickname),
ADD CONSTRAINT fk_users_selected_avatar FOREIGN KEY (selected_avatar) REFERENCES avatars(id) ON UPDATE CASCADE ON DELETE RESTRICT,
ADD INDEX idx_users_nickname (nickname);

ALTER TABLE photos
MODIFY id INT NOT NULL AUTO_INCREMENT,
ADD CONSTRAINT pk_photos_id PRIMARY KEY (id),
ADD CONSTRAINT fk_photos_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
ADD INDEX idx_photos_user_id (user_id),
ADD INDEX idx_photos_latitude (latitude),
ADD INDEX idx_photos_longitude (longitude);

ALTER TABLE avatars
MODIFY id INT NOT NULL AUTO_INCREMENT,
ADD CONSTRAINT pk_avatars_id PRIMARY KEY (id),
ADD CONSTRAINT uk_avatars_name UNIQUE KEY (name),
ADD INDEX idx_avatars_name (name);

ALTER TABLE user_avatars
ADD CONSTRAINT fk_user_avatars_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
ADD CONSTRAINT fk_user_avatars_avatar_id FOREIGN KEY (avatar_id) REFERENCES avatars(id) ON UPDATE CASCADE ON DELETE CASCADE,
ADD CONSTRAINT cpk_user_avatars PRIMARY KEY (user_id, avatar_id);