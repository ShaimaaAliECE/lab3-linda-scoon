const server = require("express");
const cookieParser = require("cookie-parser");
const newConn = require("./DBConnection");

const app = server();

app.use(server.urlencoded({ extended: true }));
app.use(server.static("static"));
app.use(cookieParser("#SE3316"));

let conn = newConn();

app.get("/booking", (req, res) => {
  conn = newConn();
  let content = "<h1>There is an error</h1>";
  let times = [];

  if (!req.cookies.loggedin) {
    conn.query(`SELECT time FROM times`, (err, trows, fields) => {
      if (err) {
        console.log(err);
      }
      let i = 0;
      for (const t of trows) {
        times[i] = t.time;
        i++;
      }

      conn.query(`SELECT * FROM users`, (err, urows, fields) => {
        if (err) {
          console.log(err);
        }
        for (const u of urows) {
          conn.query(
            `SELECT time FROM times WHERE timeid IN (SELECT timeid FROM userTimes WHERE username = '${u.username}')`,
            (err, utrows, fields) => {
              if (err) {
                console.log(err);
              }
              let schedules = "";
              for (const t of utrows) {
                schedules = `<tr>
              <td><h3>${u.username}</h3></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><input type="submit" class="btn btn-primary" /></td>
            </tr>`;
              }

              content = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"
    ></script>
    <title>Booking</title>
  </head>
  <body>
    <div class="m-5">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">${times[0] || ""}</th>
            <th scope="col">${times[1] || ""}</th>
            <th scope="col">${times[2] || ""}</th>
            <th scope="col">${times[3] || ""}</th>
            <th scope="col">${times[4] || ""}</th>
            <th scope="col">${times[5] || ""}</th>
            <th scope="col">${times[6] || ""}</th>
            <th scope="col">${times[7] || ""}</th>
            <th scope="col">${times[8] || ""}</th>
            <th scope="col">${times[9] || ""}</th>
          </tr>
        </thead>
        <form action="/booking" method="post">
          <tbody>
          <tr>
               <td><input type="text" name="username" /></td>
              <td><input type="checkbox" name="${times[0]}" value="${
                times[0]
              }"/></td>
              <td><input type="checkbox" name="${times[1]}" value="${
                times[1]
              }"/></td>
              <td><input type="checkbox" name="${times[2]}" value="${
                times[2]
              }"/></td>
              <td><input type="checkbox" name="${times[3]}" value="${
                times[3]
              }"/></td>
              <td><input type="checkbox" name="${times[4]}" value="${
                times[4]
              }"/></td>
              <td><input type="checkbox" name="${times[5]}" value="${
                times[5]
              }"/></td>
              <td><input type="checkbox" name="${times[6]}" value="${
                times[6]
              }"/></td>
              <td><input type="checkbox" name="${times[7]}" value="${
                times[7]
              }"/></td>
              <td><input type="checkbox" name="${times[8]}" value="${
                times[8]
              }"/></td>
              <td><input type="checkbox" name="${times[9]}" value="${
                times[9]
              }"/></td>
              <td><input type="submit" class="btn btn-primary" value="SUBMIT" /></td>
            </tr>
            ${schedules}
          </tbody>
        </form>
      </table>
    </div>
  </body>
</html>`;
              conn.end();
              res.send(content);
            }
          );
        }
      });
    });
  } else {
    conn.query(`SELECT * FROM times`, (err, trows, fields) => {
      if (err) {
        console.log(err);
      }
      let timeid = 0;
      let i = 0;
      for (const t of trows) {
        times[i] = t.time;
        timeid[i] = t.timeid;
        i++;
      }

      conn.query(`SELECT * FROM users`, (err, urows, fields) => {
        if (err) {
          console.log(err);
        }
        for (const u of urows) {
          conn.query(
            `SELECT time FROM times WHERE timeid IN (SELECT timeid FROM userTimes WHERE username = '${u.username}')`,
            (err, utrows, fields) => {
              if (err) {
                console.log(err);
              }
              let schedules = "";
              for (const t of utrows) {
                schedules = `<tr>
              <td><h3>${u.username}</h3></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><p>${t || ""}</p></td>
              <td><input type="submit" class="btn btn-primary" /></td>
            </tr>`;
              }

              content = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"
    ></script>
    <title>Booking</title>
  </head>
  <body>
    <div class="m-5">
      <table class="table table-bordered">
       <form action="/booking" method="post">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col"><input type="text" id="${
              timeid[0]
            }" name="schedule" value="${times[0] || ""}"/></th>
            <th scope="col"><input type="text" id="${
              timeid[1]
            }" name="schedule" value="${times[1] || ""}"/></th>
            <th scope="col"><input type="text" id="${
              timeid[2]
            }" name="schedule" value="${times[2] || ""}"/></th>
            <th scope="col"><input type="text" id="${
              timeid[3]
            }" name="schedule" value="${times[3] || ""}"/></th>
            <th scope="col"><input type="text" id="${
              timeid[4]
            }" name="schedule" value="${times[4] || ""}"/></th>
            <th scope="col"><input type="text" id="${
              timeid[5]
            }" name="schedule" value="${times[5] || ""}"/></th>
            <th scope="col"><input type="text" id="${
              timeid[6]
            }" name="schedule" value="${times[6] || ""}"/></th>
            <th scope="col"><input type="text" id="${
              timeid[7]
            }" name="schedule" value="${times[7] || ""}"/></th>
            <th scope="col"><input type="text" id="${
              timeid[8]
            }" name="schedule" value="${times[8] || ""}"/></th>
            <th scope="col"><input type="text" id="${
              timeid[9]
            }" name="schedule" value="${times[9] || ""}"/></th>       
          </tr>
        </thead>
          <tbody>
            <tr>
              <td><input type="text" name="username" /></td>
              <td><input type="checkbox" name="times" value="${times[0]}"/></td>
              <td><input type="checkbox" name="times" value="${times[1]}"/></td>
              <td><input type="checkbox" name="times" value="${times[2]}"/></td>
              <td><input type="checkbox" name="times" value="${times[3]}"/></td>
              <td><input type="checkbox" name="times" value="${times[4]}"/></td>
              <td><input type="checkbox" name="times" value="${times[5]}"/></td>
              <td><input type="checkbox" name="times" value="${times[6]}"/></td>
              <td><input type="checkbox" name="times" value="${times[7]}"/></td>
              <td><input type="checkbox" name="times" value="${times[8]}"/></td>
              <td><input type="checkbox" name="times" value="${times[9]}"/></td>
              <td><input type="submit" class="btn btn-primary" value="SUBMIT" /></td>
            </tr>
            ${schedules}
          </tbody>
        </form>
      </table>
    </div>
  </body>
</html>`;
              conn.end();
              res.send(content);
            }
          );
        }
      });
    });
  }
});

app.post("/login", (req, res) => {
  conn = newConn();

  conn.query(`SELECT * FROM users`, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      for (const user of rows) {
        if (user.username === req.body.usr && user.pwd === req.body.pwd) {
          loggedin = true;
          res.cookie("loggedin", loggedin);
          res.cookie("username", req.body.usr);
          res.cookie("password", req.body.pwd, { signed: true });
          res.redirect("/booking");
        } else {
          res.redirect("/");
        }
      }
    }
    conn.end();
  });
});

app.post("/booking", (req, res) => {
  conn = newConn();
  let username = req.body.username;
  let timeid = req.body.times;
  let exists = false;

  console.log(req.body.schedule[0]);
  if (req.body.schedule) {
    conn.query(
      `UPDATE times
             SET time = '${t.time}'
             WHERE timeid = '${t.timeid}`,
      (err, rows, fields) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  conn.query(`SELECT * FROM users`, (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
    for (const u of rows) {
      if (u.username == username) {
        exists = true;
      }

      if (!exists) {
        conn.query(
          `INSERT INTO users(username)
   VALUES('${username}')
  `,
          (err, rows, fields) => {
            if (err) {
              console.log(err);
            }
          }
        );
        for (const t of timeid) {
          conn.query(
            `INSERT INTO userTimes(timeid, username)
           VALUES('${t}', '${username}') `,
            (err, rows, fields) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      } else {
        for (const t of timeid) {
          conn.query(
            `UPDATE userTimes
             SET timeid = '${t}'
             WHERE username = '${username}'`,
            (err, rows, fields) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      }
    }
  });
  res.redirect("/booking");
});

app.listen(80);
