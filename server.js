const express = require("express");
const app = express();
const PORT = 3000;
const pool = require("./db");
const axios=require("axios");
app.use(express.static("views"));
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get("/",(req,res)=>{
    res.render("home.ejs")
    console.log("ルートディレクトリーに入っています")
    
})

app.get("/touch",(req,res)=>{
    
    console.log("反射神経のゲーム起動中")
    
    pool.query(

        "SELECT * FROM touch ORDER BY time ASC",
        (error, results) => {
            if (error) {
                console.log("データベース内を表示できませんでした。", error);
                return res.status(500).send("Internal Server Error");
            }
            res.render("game.ejs",{ touch:results.rows});
            console.log("データを送信できました")
        }
    );
})

app.get("/ranking",(req,res)=>{
    console.log("ランキング表示")

    pool.query(
        "SELECT * FROM touch ORDER BY time ASC",
        (error, results) => {
            if (error) {
                console.log("データベース内を表示できませんでした。", error);
                return res.status(500).send("Internal Server Error");
            }
            res.render("ranking.ejs", {touch:results.rows});
        }
    );
});

app.post("/submit-result",(req,res)=>{
    const playerName=req.body.playerName
    const times=req.body.record
    console.log(`名前: ${playerName} レコード: ${times}`);

    pool.query(
        'INSERT INTO touch (name,time) VALUES ($1,$2)',[playerName,times],
        (error, results) => {
            if (error) {
                console.log("データベースにデータを入れれませんでした.", error);
                return res.status(500).send("Internal Server Error");
            }
            console.log(`名前:${playerName} レコード: ${times}`);
            res.status(200).send("OK");
        }
     );
     
});

app.listen(process.env.PORT || PORT, () => {
    console.log("サーバー起動");
});
