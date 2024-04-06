CREATE DATABASE 095cm;

-- Tables --
CREATE TABLE IF NOT EXISTS users (
	id INT,
    is_admin BOOLEAN,
    selected_avatar INT <<FK>>
    nickname VARCHAR(20),
    password TEXT,
    xp INT
);

CREATE TABLE IF NOT EXISTS photos (
	id INT,
    user_id INT,
    path TEXT,
    filename VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT
);

CREATE TABLE IF NOT EXISTS avatars (
	id INT,
    name VARCHAR(30),
    url TEXT
);

CREATE TABLE IF NOT EXISTS user_avatars (
	user_id INT,
    avatar_id INT
);

-- Constraints --
ALTER TABLE users
ADD CONSTRAINT pk_users_id PRIMARY KEY (id),
ADD CONSTRAINT uk_users_nickname UNIQUE KEY (nickname),
ADD CONSTRAINT fk_users_selected_avatar FOREIGN KEY (selected_avatar) REFERENCES avatars(id) ON UPDATE CASCADE ON DELETE RESTRICT,
ADD INDEX idx_users_nickname (nickname);

ALTER TABLE photos
ADD CONSTRAINT pk_photos_id PRIMARY KEY (id),
ADD CONSTRAINT fk_photos_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
ADD INDEX idx_photos_user_id (user_id),
ADD INDEX idx_photos_latitude (latitude),
ADD INDEX idx_photos_longitude (longitude);

ALTER TABLE avatars
ADD CONSTRAINT pk_avatars_id PRIMARY KEY (id),
ADD CONSTRAINT uk_avatars_name UNIQUE KEY (name),
ADD INDEX idx_avatars_name (name);

ALTER TABLE user_avatars
ADD CONSTRAINT fk_user_avatars_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
ADD CONSTRAINT fk_user_avatars_avatar_id FOREIGN KEY (avatar_id) REFERENCES avatars(id) ON UPDATE CASCADE ON DELETE CASCADE,
ADD CONSTRAINT cpk_user_avatars PRIMARY KEY (user_id, avatar_id);