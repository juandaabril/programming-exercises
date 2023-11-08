import { Database } from 'sqlite3';

const db = new Database('db.sqlite');

db.serialize(async () => {
  await run(`DROP TABLE IF EXISTS user;`);
  await run(`DROP TABLE IF EXISTS user_picture;`);

  await run(`
    CREATE TABLE user
    (
      id      VARCHAR(36) PRIMARY KEY,
      name    VARCHAR(255)
    );
  `);

  await run(`
    INSERT INTO user (id, name) 
    VALUES ('1f2d3e4c-5b6a-7d8c-9e0f-1a2b3c4d5e6f', 'John Doe'), 
           ('9a8b7c6d-5e4f-3g2h-1i0j-9k8l7m6n5o4p', 'Jane Smith');
  `);

  await run(`
    CREATE TABLE user_picture
    (
      id      VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36),
      name    VARCHAR(255),
      url     VARCHAR(255)
    );
  `);
});

export function run(sql: string, params = []) {
  return new Promise<void>((resolve, reject) => {
    db.run(sql, params, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export function get<T>(sql: string, params = []) {
  console.log(sql, params);
  return new Promise<T>((resolve, reject) => {
    db.get(sql, params, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(result);
        resolve(result as any);
      }
    });
  });
}
