USE letx;

-- Preference
INSERT INTO preference (id, name, svg_url) VALUES (UUID(), "Cardiovascular", "/cardiovascular.svg");
INSERT INTO preference (id, name, svg_url) VALUES (UUID(), "Balance", "/balance.svg");
INSERT INTO preference (id, name, svg_url) VALUES (UUID(), "Flexibility", "/flexibility.svg");
INSERT INTO preference (id, name, svg_url) VALUES (UUID(), "Strength", "/strength.svg");

-- Mock User --

-- cookie: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzOGEwNGJhNy0wOTZmLTRhZjMtYWJiMi1lMzhhNTE4YTAxZjYiLCJlbWFpbCI6InRhbmJvaUBsbnd6YW1haWwuY29tIiwidHlwZSI6IlRSQUlORVIiLCJpYXQiOjE2MTU4NTk2NjcsImV4cCI6MTYxNjg1OTY2N30.o237KjbBbEPuuGBZugf-CLE2AOR9KYM87gDTqzi-LfU 
-- password: root
INSERT INTO user VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f6", "tanboi@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainer VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f6", "Somlux", "Kamsing", "MALE", "081234567", "2017-06-15 00:00:00", "0", "https://www.aceshowbiz.com/images/photo/john_cena.jpg", 0);

-- password: root
INSERT INTO user VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f7", "tanboi1@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainer VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f7", "SomluxA", "KamsingA", "MALE", "081234567", "2017-06-15 00:00:00", "0", "https://www.aceshowbiz.com/images/photo/john_cena.jpg", 0);
INSERT INTO user VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f8", "tanboi2@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainer VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f8", "SomluxA", "KamsingB", "MALE", "081234567", "2017-06-15 00:00:00", "0", "https://www.aceshowbiz.com/images/photo/john_cena.jpg", 0);
INSERT INTO user VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f9", "tanboi3@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainer VALUES ("38a04ba7-096f-4af3-abb2-e38a518a01f9", "SomluxB", "KamsingA", "MALE", "081234567", "2017-06-15 00:00:00", "0", "https://www.aceshowbiz.com/images/photo/john_cena.jpg", 0);

-- cookie: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMWQzYWVlYi03Y2I2LTExZWItOTQ5MC0wMjQyYWMxNDAwMDIiLCJlbWFpbCI6InRvaWJhbkBsbnd6YW1haWwuY29tIiwidHlwZSI6IlRSQUlORUUiLCJpYXQiOjE2MTU4NTk3MTgsImV4cCI6MTYxNjg1OTcxOH0.jE26_l5nnSoZfEDY8Ary4gv-lp4IRFkj4rsqejAWOMo
-- password: root
INSERT INTO user VALUES ("b1d3aeeb-7cb6-11eb-9490-0242ac140002", "toiban@lnwzamail.com", "$2a$10$XPTfy6sx.TUnze7fHhP6XOWds8bdQaS2NTaELcIKHcyqwNPBKtQk6", "$2a$10$XPTfy6sx.TUnze7fHhP6XO");
INSERT INTO trainee VALUES ("b1d3aeeb-7cb6-11eb-9490-0242ac140002", "Tyler", "One", "MALE", "081234567", "2017-06-15 00:00:00", "https://esportspedia-streamers.s3.amazonaws.com/thumb/f/f7/Tyler1_2019.jpg/600px-Tyler1_2019.jpg");

-- cookie: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLWlkLTAiLCJlbWFpbCI6Indvbmd0YXdhbi5wc25AZ21haWwuY29tIiwidHlwZSI6IlRSQUlORUUiLCJpYXQiOjE2MTU3MTA3ODcsImV4cCI6MTYxNjcxMDc4N30.IfHwR_CwfDmAll6ubqa52NS5LbJ49q9BWnMwD9-GGlI
-- password: 1103743852
INSERT INTO user VALUES ("user-id-0","wongtawan.psn@gmail.com","$2a$10$r16B3Ce8VYmxnaoaLVEAc.VepiOumzJJtwSk.H2xAXiexhEMnAAs.","$2a$10$r16B3Ce8VYmxnaoaLVEAc.");
INSERT INTO trainee VALUES ("user-id-0","Wongtawan","Junthai","MALE","0882441120","2000-01-01 00:00:00","https://www.google.com");

-- cookie: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLWlkLTEiLCJlbWFpbCI6Indvbmd0YXdhbi53cmtAZ21haWwuY29tIiwidHlwZSI6IlRSQUlORVIiLCJpYXQiOjE2MTU3MTA4MTEsImV4cCI6MTYxNjcxMDgxMX0.lrQIy7M9DQW5LbbqbE6natodrCZeLlqfh4rdX6hyggg
-- password: 1103743852
INSERT INTO user VALUES ("user-id-1","wongtawan.wrk@gmail.com","$2a$10$zLA95OWY3aH0lZzyEpKsGOA/DTb7JPqBJeKysldxk2AZSv9ZaphGG","$2a$10$zLA95OWY3aH0lZzyEpKsGO");
INSERT INTO trainer VALUES ("user-id-1","Wongtawan","Junthai","MALE","0882441120","2000-01-01 00:00:00","1111111111","https://www.google.com");

-- Mock Course --
INSERT INTO course VALUES ("d1491b96-fa03-48b9-9bae-bb9c33e98eb2", "Biceps Burst", "Up size you biceps and prepare to go beyond human limits", "beginner", "strength", "1999", "20", "38a04ba7-096f-4af3-abb2-e38a518a01f6", "Sam Yan", "Bangkok");
INSERT INTO course VALUES ("course-id-0","Course Title 1","description","intermediate","biceps",100000,200,"user-id-1","Thailand","Bangkok");
INSERT INTO course VALUES ("course-id-1","Course Title 2","description","intermediate","biceps",100000,200,"user-id-1","Thailand","Bangkok");
INSERT INTO course VALUES ("course-id-2","Course Title 3","description","intermediate","biceps",100000,200,"user-id-1","Thailand","Bangkok");
INSERT INTO course VALUES ("course-id-3","Course Title 4","description","intermediate","biceps",100000,200,"user-id-1","Thailand","Bangkok");

INSERT INTO application VALUES ("application-id-0","user-id-0","course-id-0","pending");
INSERT INTO application VALUES ("application-id-1","user-id-0","course-id-1","pending");

-- Mock Review --
INSERT INTO review VALUES (UUID(), "b1d3aeeb-7cb6-11eb-9490-0242ac140002", "38a04ba7-096f-4af3-abb2-e38a518a01f7", "You are good", 5);
INSERT INTO review VALUES (UUID(), "b1d3aeeb-7cb6-11eb-9490-0242ac140002", "38a04ba7-096f-4af3-abb2-e38a518a01f7", "You are bad", 2);
INSERT INTO review VALUES (UUID(), "b1d3aeeb-7cb6-11eb-9490-0242ac140002", "38a04ba7-096f-4af3-abb2-e38a518a01f8", "You are bad", 2);
INSERT INTO review VALUES (UUID(), "b1d3aeeb-7cb6-11eb-9490-0242ac140002", "38a04ba7-096f-4af3-abb2-e38a518a01f9", "You are bad", 3);
