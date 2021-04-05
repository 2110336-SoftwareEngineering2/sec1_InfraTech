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
    average_rating DECIMAL(3,2) DEFAULT 2.50,
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
    district VARCHAR(255),
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

CREATE UNIQUE INDEX IX_trainee_user_id_course_id ON application(trainee_user_id, course_id);

-- TODO : Create index for application (course_id, trainee_id)
-- TODO : Create index for application (trainee_id, course_id)

CREATE TABLE review(
    id VARCHAR(36) PRIMARY KEY,
    trainee_user_id VARCHAR(36),
    trainer_user_id VARCHAR(36),
    application_id VARCHAR(36) UNIQUE,
    comment VARCHAR(1000),
    rating TINYINT UNSIGNED,
    CONSTRAINT FK_review_trainee_user_id FOREIGN KEY (trainee_user_id) REFERENCES trainee(user_id) ON DELETE CASCADE,
    CONSTRAINT FK_review_trainer_user_id FOREIGN KEY (trainer_user_id) REFERENCES trainer(user_id) ON DELETE CASCADE,
    CONSTRAINT FK_review_application_id FOREIGN KEY (application_id) REFERENCES application(id) ON DELETE CASCADE
);

CREATE TABLE faq(
    id VARCHAR(36) PRIMARY KEY,
    trainer_user_id VARCHAR(36),
    question VARCHAR(500),
    answer VARCHAR(500),
    CONSTRAINT FK_faq_trainer_user_id FOREIGN KEY (trainer_user_id) REFERENCES trainer(user_id) ON DELETE CASCADE
);