USE letx;

CREATE TABLE user (
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

CREATE TABLE preference (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255),
    svg_url VARCHAR(255)
);
INSERT INTO preference (id, name, svg_url) VALUES (UUID(), "Cardiovascular", "http://www.svg.com/cardiovascular");
INSERT INTO preference (id, name, svg_url) VALUES (UUID(), "Balance", "http://www.svg.com/balance");
INSERT INTO preference (id, name, svg_url) VALUES (UUID(), "Flexibility", "http://www.svg.com/flexibility");
INSERT INTO preference (id, name, svg_url) VALUES (UUID(), "Strength", "http://www.svg.com/strength");

CREATE TABLE trainer_preference (
    trainer_id VARCHAR(36),
    preference_id VARCHAR(36),
    CONSTRAINT PK_user_preference PRIMARY KEY (trainer_id, preference_id),
    CONSTRAINT FK_user_trainer_preference_trainer_id FOREIGN KEY (trainer_id) REFERENCES trainer_profile(id) ON DELETE CASCADE,
    CONSTRAINT FK_user_trainer_preference_preference_id FOREIGN KEY (preference_id) REFERENCES preference(id) ON DELETE CASCADE
);

CREATE TABLE trainee_preference (
    trainee_id VARCHAR(36),
    preference_id VARCHAR(36),
    CONSTRAINT PK_user_preference PRIMARY KEY (trainee_id, preference_id),
    CONSTRAINT FK_user_trainee_preference_trainee_id FOREIGN KEY (trainee_id) REFERENCES trainee_profile(id) ON DELETE CASCADE,
    CONSTRAINT FK_user_trainee_preference_preference_id FOREIGN KEY (preference_id) REFERENCES preference(id) ON DELETE CASCADE
);