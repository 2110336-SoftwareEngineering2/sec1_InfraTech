USE letx;

CREATE TABLE user_auth (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    salt VARCHAR(255)
);

CREATE TABLE trainer_profile (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    gender VARCHAR(10),
    phone_number VARCHAR(15),
    birthdate DATETIME,
    cid VARCHAR(13),
    profile_image_url VARCHAR(255),
    CONSTRAINT FK_trainer_profile_user_id FOREIGN KEY (user_id) REFERENCES user_auth(id) ON DELETE CASCADE
);

CREATE TABLE trainee_profile (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    gender VARCHAR(10),
    phone_number VARCHAR(15),
    birthdate DATETIME,
    profile_image_url VARCHAR(255),
    CONSTRAINT FK_trainee_profile_user_id FOREIGN KEY (user_id) REFERENCES user_auth(id) ON DELETE CASCADE
);