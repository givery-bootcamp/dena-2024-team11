INSERT INTO users (name, email, password, icon) VALUES ('taro', 'taro@dena.com', 'password', 'https://avatars.githubusercontent.com/u/162857806?v=4');
INSERT INTO users (name, email, password) VALUES ('hanako', 'hanako@dena.com', 'PASSWORD');
INSERT INTO users (name, email, password, icon) VALUES ('shunsuke.koike', 'shunsuke.koike@dena.com', 'shunsuke.koike', 'https://avatars.githubusercontent.com/u/162857806?v=4');
INSERT INTO users (name, email, password, icon) VALUES ('keigo.yonezawa', 'keigo.yonezawa@dena.com', 'keigo.yonezawa', 'https://avatars.githubusercontent.com/u/71923432?v=4');
INSERT INTO users (name, email, password, icon) VALUES ('toma.tanigawa','toma.tanigawa@dena.com', 'toma.tanigawa', 'https://avatars.githubusercontent.com/u/61912106?v=4');
INSERT INTO users (name, email, password, icon) VALUES ('yukihiko.tone', 'yukihiko.tone@dena.com', 'yukihiko.tone', 'https://avatars.githubusercontent.com/u/68996392?v=4');
INSERT INTO users (name, email, password, icon) VALUES ('tomohiro.kawakami', 'tomohiro.kawakami@dena.com', 'tomohiro.kawakami', 'https://avatars.githubusercontent.com/u/61912106?v=4');
INSERT INTO users (name, email, password, icon) VALUES ('shunsuke.nagano', 'shunsuke.nagano@dena.com', 'shunsuke.nagano', 'https://avatars.githubusercontent.com/u/38309289?v=4');

INSERT INTO posts (user_id, content) VALUES (1, '質問1\n改行');
INSERT INTO posts (user_id, content) VALUES (1, '質問2\n改行');

INSERT INTO replies (user_id, content,post_id) VALUES (1, '返信1\n改行',1);
INSERT INTO replies (user_id, content,post_id) VALUES (1, '返信2\n改行',2);
INSERT INTO replies (user_id, content,post_id) VALUES (2, '返信3\n改行',1);

INSERT INTO post_stamps (name, user_id, post_id) VALUES ("good", 1, 1);
INSERT INTO post_stamps (name, user_id, post_id) VALUES ("good", 1, 2);
INSERT INTO post_stamps (name, user_id, post_id) VALUES ("bad", 1, 1);
INSERT INTO post_stamps (name, user_id, post_id) VALUES ("bad", 2, 1);
INSERT INTO post_stamps (name, user_id, post_id) VALUES ("soso", 1, 1);
INSERT INTO post_stamps (name, user_id, post_id) VALUES ("notgood", 2, 1);