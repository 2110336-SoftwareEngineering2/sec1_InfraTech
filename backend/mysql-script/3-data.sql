USE letx;

-- Preference --
INSERT INTO preference (id, name, svg_url) VALUES ("pref-1", "Cardiovascular", "/cardiovascular.svg");
INSERT INTO preference (id, name, svg_url) VALUES ("pref-2", "Balance", "/balance.svg");
INSERT INTO preference (id, name, svg_url) VALUES ("pref-3", "Flexibility", "/flexibility.svg");
INSERT INTO preference (id, name, svg_url) VALUES ("pref-4", "Strength", "/strength.svg");

-- Mock User --
-- cookie: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLWlkLTAiLCJlbWFpbCI6Indvbmd0YXdhbi5wc25AZ21haWwuY29tIiwidHlwZSI6IlRSQUlORUUiLCJpYXQiOjE2MTU3MTA3ODcsImV4cCI6MTYxNjcxMDc4N30.IfHwR_CwfDmAll6ubqa52NS5LbJ49q9BWnMwD9-GGlI
-- password: 1103743852
INSERT INTO user VALUES ("user-id-0","wongtawan.psn@gmail.com","$2a$10$r16B3Ce8VYmxnaoaLVEAc.VepiOumzJJtwSk.H2xAXiexhEMnAAs.","$2a$10$r16B3Ce8VYmxnaoaLVEAc.");
INSERT INTO trainee VALUES ("user-id-0","Wongtawan","Junthai","MALE","0882441120","2000-01-01 00:00:00","https://www.google.com");

-- cookie: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLWlkLTEiLCJlbWFpbCI6Indvbmd0YXdhbi53cmtAZ21haWwuY29tIiwidHlwZSI6IlRSQUlORVIiLCJpYXQiOjE2MTU3MTA4MTEsImV4cCI6MTYxNjcxMDgxMX0.lrQIy7M9DQW5LbbqbE6natodrCZeLlqfh4rdX6hyggg
-- password: 1103743852
INSERT INTO user VALUES ("user-id-1","wongtawan.wrk@gmail.com","$2a$10$zLA95OWY3aH0lZzyEpKsGOA/DTb7JPqBJeKysldxk2AZSv9ZaphGG","$2a$10$zLA95OWY3aH0lZzyEpKsGO");
INSERT INTO trainer VALUES ("user-id-1","Wongtawan","Junthai","MALE","0882441120","2000-01-01 00:00:00","1111111111","https://www.google.com", 1);

-- cookie: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLWlkLTIiLCJlbWFpbCI6InRhbmJvaUBsbnd6YW1haWwuY29tIiwidHlwZSI6IlRSQUlORVIiLCJpYXQiOjE2MTYzMTg2NjMsImV4cCI6MTYxNzMxODY2M30.gyvJFrFiZXHxcs-wsUwIz_f9h15niU9KR1xyLs8Un0k
INSERT INTO user VALUES ("user-id-2", "tanboi@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainer VALUES ("user-id-2", "Somlux", "Kamsing", "MALE", "081234567", "2017-06-15 00:00:00", "0", "https://www.aceshowbiz.com/images/photo/john_cena.jpg", 0);

-- password: root
INSERT INTO user VALUES ("user-id-3", "tanboi1@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainer VALUES ("user-id-3", "SomluxA", "KamsingA", "MALE", "081234567", "2017-06-15 00:00:00", "0", "https://www.aceshowbiz.com/images/photo/john_cena.jpg", 0);
INSERT INTO user VALUES ("user-id-4", "tanboi2@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainer VALUES ("user-id-4", "SomluxA", "KamsingB", "MALE", "081234567", "2017-06-15 00:00:00", "0", "https://www.aceshowbiz.com/images/photo/john_cena.jpg", 0);
INSERT INTO user VALUES ("user-id-5", "tanboi3@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainer VALUES ("user-id-5", "SomluxB", "KamsingA", "MALE", "081234567", "2017-06-15 00:00:00", "0", "https://www.aceshowbiz.com/images/photo/john_cena.jpg", 0);

-- cookie: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLWlkLTYiLCJlbWFpbCI6InRvaWJhbkBsbnd6YW1haWwuY29tIiwidHlwZSI6IlRSQUlORUUiLCJpYXQiOjE2MTYzMTg3NjAsImV4cCI6MTYxNzMxODc2MH0.mOz7WsG-7PPkDt-URvly5j5se2Pz8jJVuRle3xqMSXk
-- password: root
INSERT INTO user VALUES ("user-id-6", "toiban@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainee VALUES ("user-id-6", "Tyler", "One", "MALE", "081234567", "2017-06-15 00:00:00", "https://esportspedia-streamers.s3.amazonaws.com/thumb/f/f7/Tyler1_2019.jpg/600px-Tyler1_2019.jpg");

-- Mock User Preference --
INSERT INTO user_preference VALUES("user-id-2", "pref-1");
INSERT INTO user_preference VALUES("user-id-2", "pref-4");

INSERT INTO user_preference VALUES("user-id-3", "pref-2");

INSERT INTO user_preference VALUES("user-id-4", "pref-3");

INSERT INTO user_preference VALUES("user-id-5", "pref-1");
INSERT INTO user_preference VALUES("user-id-5", "pref-3");
INSERT INTO user_preference VALUES("user-id-5", "pref-4");

INSERT INTO user_preference VALUES("user-id-6", "pref-2");
INSERT INTO user_preference VALUES("user-id-6", "pref-3");

-- Mock Course --
INSERT INTO course VALUES ("course-id-0", "Biceps Burst", "Up size you biceps and prepare to go beyond human limits", "beginner", "strength", 1999, 20, "user-id-2", "Sam Yan", "Bangkok");
INSERT INTO course VALUES ("course-id-1","Course Title 1","description","intermediate","strength",100000,200,"user-id-1","Sam Yan", "Bangkok");
INSERT INTO course VALUES ("course-id-2","Course Title 2","description","intermediate","strength",100000,200,"user-id-1","Sam Yan", "Bangkok");
INSERT INTO course VALUES ("course-id-3","Course Title 3","description","intermediate","strength",100000,200,"user-id-1","Sam Yan", "Bangkok");
INSERT INTO course VALUES ("course-id-4","Course Title 4","description","intermediate","strength",100000,200,"user-id-1","Sam Yan", "Bangkok");

INSERT INTO application VALUES ("application-id-0","user-id-0","course-id-0","pending");
INSERT INTO application VALUES ("application-id-1","user-id-0","course-id-1","pending");

-- Mock Review --
INSERT INTO review VALUES (UUID(), "user-id-6", "user-id-3", "You are good", 5);
INSERT INTO review VALUES (UUID(), "user-id-6", "user-id-3", "You are bad", 2);
INSERT INTO review VALUES (UUID(), "user-id-6", "user-id-4", "You are bad", 2);
INSERT INTO review VALUES (UUID(), "user-id-6", "user-id-5", "You are bad", 3);

-- Mock FAQ --
INSERT INTO faq VALUES (UUID(), "user-id-2", "can a private course with a specific requirements be requested ?", "yes, just send requirements to my chat.");
INSERT INTO faq VALUES (UUID(), "user-id-2", "will the traineing fee be returned if I cancel the course ?", "No, unless there is a acceptable reason.");
