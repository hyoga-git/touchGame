const express = require("express");
const app = express();
const PORT = 3000;
const pool=require("./db");
const axios=require("axios");
app.use(express.static("views"));
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');




app.use(express.static("views"));

app.get("/",(req,res)=>{
    res.render("home.ejs")
    console.log("ルートディレクトリーに入っています")
})


app.get("/touch",(req,res)=>{
    res.render("game.ejs")
    console.log("反射神経のゲーム起動中")
})

app.get("/ranking",(req,res)=>{
    res.render("ranking.ejs")
    console.log("ランキング表示")
})


app.post("/submit-result",(req,res)=>{
    const playerName=req.body.playerName
    const times=req.body.record
    console.log(`名前: ${playerName} レコード: ${times}`);
    app.post("/submit-result", (req, res) => {

        console.log(playerName);
        console.log(times);

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


})

app.listen(process.env.PORT || PORT, () => {
    console.log("サーバー起動");
});