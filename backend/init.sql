USE letx;

CREATE TABLE user (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    salt VARCHAR(255)
);

CREATE TABLE trainer (
    user_id VARCHAR(36) PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    gender VARCHAR(10),
    phone_number VARCHAR(15),
    birthdate DATETIME,
    cid VARCHAR(13),
    profile_image_url VARCHAR(255),
    CONSTRAINT FK_trainer_user_id FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE trainee (
    user_id VARCHAR(36) PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    gender VARCHAR(10),
    phone_number VARCHAR(15),
    birthdate DATETIME,
    profile_image_url VARCHAR(255),
    CONSTRAINT FK_trainee_user_id FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE preference (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255),
    svg_url VARCHAR(255)
);
INSERT INTO preference (id, name, svg_url) VALUES (UUID(), "Cardiovascular", "/cardiovascular.svg");
INSERT INTO preference (id, name, svg_url) VALUES (UUID(), "Balance", "/balance.svg");
INSERT INTO preference (id, name, svg_url) VALUES (UUID(), "Flexibility", "/flexibility.svg");
INSERT INTO preference (id, name, svg_url) VALUES (UUID(), "Strength", "/strength.svg");

CREATE TABLE user_preference(
    user_id VARCHAR(36),
    preference_id VARCHAR(36),
    CONSTRAINT PK_user_preference PRIMARY KEY (user_id, preference_id),
    CONSTRAINT FK_user_preference_user_id FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT FK_user_preference_preference_id FOREIGN KEY (preference_id) REFERENCES preference(id) ON DELETE CASCADE
);

CREATE TABLE review(
    id VARCHAR(36) PRIMARY KEY,
    trainee_user_id VARCHAR(36),
    trainer_user_id VARCHAR(36),
    comment VARCHAR(1000),
    rating TINYINT UNSIGNED,
    CONSTRAINT FK_review_trainee_user_id FOREIGN KEY (trainee_user_id) REFERENCES trainee(user_id) ON DELETE CASCADE,
    CONSTRAINT FK_review_trainer_user_id FOREIGN KEY (trainer_user_id) REFERENCES trainer(user_id) ON DELETE CASCADE
);

-- Mock User --
INSERT INTO user VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f7", "tanboi@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainer VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f7", "Somlux", "Kamsing", "MALE", "081234567", "2017-06-15 00:00:00", "0", "https://www.aceshowbiz.com/images/photo/john_cena.jpg");
INSERT INTO user VALUES ("b1d3aeeb-7cb6-11eb-9490-0242ac140002", "toiban@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainee VALUES ("b1d3aeeb-7cb6-11eb-9490-0242ac140002", "Tyler", "One", "MALE", "081234567", "2017-06-15 00:00:00", "https://esportspedia-streamers.s3.amazonaws.com/thumb/f/f7/Tyler1_2019.jpg/600px-Tyler1_2019.jpg");

-- Mock Review --
INSERT INTO review VALUES (UUID(), "b1d3aeeb-7cb6-11eb-9490-0242ac140002", "38a04ba7-096f-4af3-abb2-e38a518a01f7", "You are good", 5);
INSERT INTO review VALUES (UUID(), "b1d3aeeb-7cb6-11eb-9490-0242ac140002", "38a04ba7-096f-4af3-abb2-e38a518a01f7", "You are bad", 2);