USE letx;

CREATE TABLE user_auth (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    salt VARCHAR(255)
);

CREATE TABLE trainer_profile (
    email VARCHAR(255),
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    gender VARCHAR(10),
    phone_number VARCHAR(15),
    birthdate DATETIME,
	cid VARCHAR(13),
    preferences VARCHAR(255),
    profile_image_url VARCHAR(255),
    CONSTRAINT FK_trainer_email FOREIGN KEY (email) REFERENCES user_auth(email) ON DELETE CASCADE
);

CREATE TABLE trainee_profile (
    email VARCHAR(255),
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    gender VARCHAR(10),
    phone_number VARCHAR(15),
    birthdate DATETIME,
    preferences VARCHAR(255),
    profile_image_url VARCHAR(255),
    CONSTRAINT FK_trainee_email FOREIGN KEY (email) REFERENCES user_auth(email) ON DELETE CASCADE
);