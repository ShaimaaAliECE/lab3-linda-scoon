const newConn = require("./DBConnection");
let conn = newConn();

conn.query(`DROP TABLE IF EXISTS userTimes;`, (err, rows, fields) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Table Dropped");
  }
});

conn.query(`DROP TABLE IF EXISTS users;`, (err, rows, fields) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Table Dropped");
  }
});
conn.query(`DROP TABLE IF EXISTS times;`, (err, rows, fields) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Table Dropped");
  }
});
conn.query(
  `CREATE TABLE users (
    username VARCHAR(100) NOT NULL,
    pwd VARCHAR(100),
    PRIMARY KEY (username)
);`,
  (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Table Created");
    }
  }
);

conn.query(
  `CREATE TABLE times (
    timeid INT NOT NULL AUTO_INCREMENT,
    time VARCHAR(20),
    PRIMARY KEY (timeid)
);`,
  (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Table Created");
    }
  }
);

conn.query(
  `CREATE TABLE userTimes (
    timeid INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    PRIMARY KEY (timeid , username),
    FOREIGN KEY (username)
        REFERENCES users (username)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (timeid)
        REFERENCES times (timeid)
        ON DELETE CASCADE ON UPDATE CASCADE
);`,
  (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Table Created");
    }
  }
);
conn.query(
  `INSERT INTO users(username, pwd)
   VALUES('admin','ping123')
  `,
  (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Users inserted");
    }
  }
);
conn.query(
  `INSERT INTO times(time) 
  VALUES('08:00-10:00'),('10:00-12:00'),('12:00-14:00'),('14:00-16:00'),('16:00-18:00'),('06:00-08:00'),('08:00-09:00'),('09:00-10:00'),('10:00-11:00'),('11:00-12:00');`,
  (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Times inserted");
    }
    conn.end();
  }
);
