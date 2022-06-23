const express = require("express");
const app = express();
const mysql = require("mysql2");

app.use(express.static("sf"));

let dbparams = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "result",
  port: 3306,
};

const con = mysql.createConnection(dbparams);

//----------------------------------------------------------------------------------------------

app.get("/bookInfo", function (req, res) {
  let bookno1 = req.query.id;

  console.log("bookno1");

  let details = { status: false, bookdetails: {} };
  con.query(
    "select bookid,bookname,bookprice from book where bookid=?",
    [bookno1],
    (error, Row) => {
      if (error) {
        console.log(" Error is HERE" + error);
      } else if (Row.length > 0) {
        details.status = true;
        details.bookdetails.id = Row[0].bookid;
        details.bookdetails.name = Row[0].bookname;
        details.bookdetails.price = Row[0].bookprice;
      }

      res.send(details);
    }
  );
});

//--------------------------------------------------------------------------------------

app.get("/bookupdate", function (req, res) {
  let bookid2 = req.query.id2;
  let bookname2 = req.query.name2;
  let bookprice2 = req.query.price2;

  let details = { status: false, book: {} };
  con.query(
    "update book set  bookname=? ,bookprice=? where bookid=?",
    [bookname2, bookprice2, bookid2],
    (error, Row) => {
      if (error) {
        console.log(" Error is HERE" + error);
      } else if (Row.affecetedRows > 0) {
        details.status = true;
        console.log("update Successfully");
      }

      res.send(details);
    }
  );
});

//--------------------------------------------------------------------------------------

app.listen(8081, function () {
  console.log("server listening at port 8081...");
});
