INSERT INTO users (name, password) VALUES ('taro', 'password');
INSERT INTO users (name, password) VALUES ('hanako', 'PASSWORD');

INSERT INTO posts (user_id, content) VALUES (1, '質問1\n改行');
INSERT INTO posts (user_id, content) VALUES (1, '質問2\n改行');

INSERT INTO replies (user_id, content,post_id) VALUES (1, '返信1\n改行',1);
INSERT INTO replies (user_id, content,post_id) VALUES (1, '返信2\n改行',2);
INSERT INTO replies (user_id, content,post_id) VALUES (2, '返信3\n改行',1);

