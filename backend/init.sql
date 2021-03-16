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
    average_rating DECIMAL(3,2),
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

CREATE TABLE course(
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    `description` VARCHAR(255),
    `level` VARCHAR(255),
    specialization VARCHAR(255),
    price DECIMAL(18,2),
    `period` INT,
    trainer_user_id VARCHAR(36) NOT NULL,
    city VARCHAR(255),
    province VARCHAR(255) NOT NULL,

    CONSTRAINT FK_course_trainer_user_id FOREIGN KEY (trainer_user_id) REFERENCES trainer(user_id) ON DELETE CASCADE
);

CREATE INDEX IX_course_title ON course(title);
CREATE INDEX IX_course_level ON course(`level`);
CREATE INDEX IX_course_specialization ON course(`specialization`);
CREATE INDEX IX_course_price ON course(`price`);
CREATE INDEX IX_course_period ON course(`period`);

CREATE TABLE course_trainee(
    trainee_user_id VARCHAR(36),
    course_id VARCHAR(36),
    CONSTRAINT FK_course_trainee_trainee_user_id FOREIGN KEY (trainee_user_id) REFERENCES trainee(user_id) ON DELETE CASCADE,
    CONSTRAINT FK_course_trainee_course_id FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE application(
    id VARCHAR(36) PRIMARY KEY,
    trainee_user_id VARCHAR(36),
    course_id VARCHAR(36),
-- TODO : change status to enum
    status VARCHAR(100),
    CONSTRAINT FK_application_trainee_user_id FOREIGN KEY (trainee_user_id) REFERENCES trainee(user_id) ON DELETE CASCADE,
    CONSTRAINT FK_application_course_id FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);

-- TODO : Create index for application (course_id, trainee_id)
-- TODO : Create index for application (trainee_id, course_id)

-- Mock User (password: root) --
INSERT INTO user VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f7", "tanboi@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainer VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f7", "Somlux", "Kamsing", "MALE", "081234567", "2017-06-15 00:00:00", "0", "https://www.aceshowbiz.com/images/photo/john_cena.jpg");
INSERT INTO user VALUES ("b1d3aeeb-7cb6-11eb-9490-0242ac140002", "toiban@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainee VALUES ("b1d3aeeb-7cb6-11eb-9490-0242ac140002", "Tyler", "One", "MALE", "081234567", "2017-06-15 00:00:00", "https://esportspedia-streamers.s3.amazonaws.com/thumb/f/f7/Tyler1_2019.jpg/600px-Tyler1_2019.jpg");

-- Mock Course --
INSERT INTO course VALUES ("d1491b96-fa03-48b9-9bae-bb9c33e98eb2", "Biceps Burst", "Up size you biceps and prepare to go beyond human limits", "beginner", "strength", "1999", "20", "38a04ba7-096f-4af3-abb2-e38a518a01f7", "Sam Yan", "Bangkok");

-- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLWlkLTAiLCJlbWFpbCI6Indvbmd0YXdhbi5wc25AZ21haWwuY29tIiwidHlwZSI6IlRSQUlORUUiLCJpYXQiOjE2MTU3MTA3ODcsImV4cCI6MTYxNjcxMDc4N30.IfHwR_CwfDmAll6ubqa52NS5LbJ49q9BWnMwD9-GGlI
INSERT INTO user VALUES ("user-id-0","wongtawan.psn@gmail.com","$2a$10$r16B3Ce8VYmxnaoaLVEAc.VepiOumzJJtwSk.H2xAXiexhEMnAAs.","$2a$10$r16B3Ce8VYmxnaoaLVEAc.");
INSERT INTO trainee VALUES ("user-id-0","Wongtawan","Junthai","MALE","0882441120","2000-01-01 00:00:00","https://www.google.com");

-- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLWlkLTEiLCJlbWFpbCI6Indvbmd0YXdhbi53cmtAZ21haWwuY29tIiwidHlwZSI6IlRSQUlORVIiLCJpYXQiOjE2MTU3MTA4MTEsImV4cCI6MTYxNjcxMDgxMX0.lrQIy7M9DQW5LbbqbE6natodrCZeLlqfh4rdX6hyggg
INSERT INTO user VALUES ("user-id-1","wongtawan.wrk@gmail.com","$2a$10$zLA95OWY3aH0lZzyEpKsGOA/DTb7JPqBJeKysldxk2AZSv9ZaphGG","$2a$10$zLA95OWY3aH0lZzyEpKsGO");
INSERT INTO trainer VALUES ("user-id-1","Wongtawan","Junthai","MALE","0882441120","2000-01-01 00:00:00","1111111111","https://www.google.com");

INSERT INTO course VALUES ("course-id-0","Course Title 1","description","intermediate","biceps",100000,200,"user-id-1","Thailand","Bangkok");
INSERT INTO course VALUES ("course-id-1","Course Title 2","description","intermediate","biceps",100000,200,"user-id-1","Thailand","Bangkok");
INSERT INTO course VALUES ("course-id-2","Course Title 3","description","intermediate","biceps",100000,200,"user-id-1","Thailand","Bangkok");
INSERT INTO course VALUES ("course-id-3","Course Title 4","description","intermediate","biceps",100000,200,"user-id-1","Thailand","Bangkok");

INSERT INTO application VALUES ("application-id-0","user-id-0","course-id-0","pending");
INSERT INTO application VALUES ("application-id-1","user-id-0","course-id-1","pending");

CREATE TABLE review(
    id VARCHAR(36) PRIMARY KEY,
    trainee_user_id VARCHAR(36),
    trainer_user_id VARCHAR(36),
    comment VARCHAR(1000),
    rating TINYINT UNSIGNED,
    CONSTRAINT FK_review_trainee_user_id FOREIGN KEY (trainee_user_id) REFERENCES trainee(user_id) ON DELETE CASCADE,
    CONSTRAINT FK_review_trainer_user_id FOREIGN KEY (trainer_user_id) REFERENCES trainer(user_id) ON DELETE CASCADE
);

DELIMITER //
CREATE PROCEDURE update_trainer_average_rating(IN trainer_user_id VARCHAR(36))
BEGIN
    UPDATE trainer SET average_rating = (
		SELECT CAST(SUM(review.rating)/COUNT(review.id) AS DECIMAL(3,2))
		FROM review
		WHERE review.trainer_user_id = trainer_user_id
    ) WHERE trainer.user_id = trainer_user_id;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER trigger_review_insert AFTER INSERT ON review
FOR EACH ROW
BEGIN
	CALL update_trainer_average_rating(NEW.trainer_user_id);
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER trigger_review_update AFTER UPDATE ON review
FOR EACH ROW
BEGIN
	CALL update_trainer_average_rating(NEW.trainer_user_id);
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER trigger_review_delete AFTER DELETE ON review
FOR EACH ROW
BEGIN
	CALL update_trainer_average_rating(OLD.trainer_user_id);
END //
DELIMITER ;

-- Mock User --
INSERT INTO user VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f7", "tanboi@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainer VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f7", "SomluxA", "KamsingA", "MALE", "081234567", "2017-06-15 00:00:00", "0", "https://www.aceshowbiz.com/images/photo/john_cena.jpg", 0);
INSERT INTO user VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f8", "tanboi2@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainer VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f8", "SomluxA", "KamsingB", "MALE", "081234567", "2017-06-15 00:00:00", "0", "https://www.aceshowbiz.com/images/photo/john_cena.jpg", 0);
INSERT INTO user VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f9", "tanboi3@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainer VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f9", "SomluxB", "KamsingA", "MALE", "081234567", "2017-06-15 00:00:00", "0", "https://www.aceshowbiz.com/images/photo/john_cena.jpg", 0);
INSERT INTO user VALUES ("b1d3aeeb-7cb6-11eb-9490-0242ac140002", "toiban@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainee VALUES ("b1d3aeeb-7cb6-11eb-9490-0242ac140002", "Tyler", "One", "MALE", "081234567", "2017-06-15 00:00:00", "https://esportspedia-streamers.s3.amazonaws.com/thumb/f/f7/Tyler1_2019.jpg/600px-Tyler1_2019.jpg");

-- Mock Review --
INSERT INTO review VALUES (UUID(), "b1d3aeeb-7cb6-11eb-9490-0242ac140002", "38a04ba7-096f-4af3-abb2-e38a518a01f7", "You are good", 5);
INSERT INTO review VALUES (UUID(), "b1d3aeeb-7cb6-11eb-9490-0242ac140002", "38a04ba7-096f-4af3-abb2-e38a518a01f7", "You are bad", 2);
INSERT INTO review VALUES (UUID(), "b1d3aeeb-7cb6-11eb-9490-0242ac140002", "38a04ba7-096f-4af3-abb2-e38a518a01f8", "You are bad", 2);
INSERT INTO review VALUES (UUID(), "b1d3aeeb-7cb6-11eb-9490-0242ac140002", "38a04ba7-096f-4af3-abb2-e38a518a01f9", "You are bad", 3);