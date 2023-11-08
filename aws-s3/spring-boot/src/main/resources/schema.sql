DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "user_picture";

CREATE TABLE "user"
(
  id      VARCHAR(36) PRIMARY KEY,
  name    VARCHAR(255)
);

INSERT INTO "user" (id, name)
VALUES
  ('1f2d3e4c-5b6a-7d8c-9e0f-1a2b3c4d5e6f', 'John Doe'),
  ('9a8b7c6d-5e4f-3g2h-1i0j-9k8l7m6n5o4p', 'Jane Smith');

CREATE TABLE "user_picture"
(
  id      VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36),
  name    VARCHAR(255),
  url     VARCHAR(255)
);