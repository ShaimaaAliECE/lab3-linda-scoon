const newConn = require("./DBConnection");
let conn = newConn();

conn.query(
  `CREATE TABLE users(
    name varchar(100) NOT NULL,
    password varchar(100),
    PRIMARY KEY(name)
    )
    CREATE TABLE schedule(
    id int NOT NULL,
    day varchar(20),
    PRIMARY KEY(id,name),
    FOREIGN KEY(name) REFERENCES users(name),
    ON DELETE CASCADE,
    ON UPDATE CASCADE
    )`,
  (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Tables Created");
    }
  }
);

conn.query(
  `INSERT INTO users(name, password)
   values('admin','ping123')
  `,
  (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Users inserted");
    }
  }
);

// conn.query(
//   `DROP TABLE schedule
//    DROP TABLE users;
//    `,
//   (err, rows, fields) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Tables Dropped");
//     }
//   }
// );

conn.end();
