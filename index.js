import express from "express";
import axios from "axios";
import ejs from "ejs";


const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("index.ejs");
})

app.post("/check-price", async (req, res) => {
    try{
    const symbol = req.body.crypto;
    const result = await axios.get(`https://api.blockchain.com/v3/exchange/tickers/${symbol}` );
    const data = result.data;

    res.render("index.ejs", {
        symbol: data.symbol,
        price: data.last_trade_price,
    })

    } catch (error){
        res.render("index.ejs", { error: "Symbol not found or API error." });
    }
})

app.listen(port, () => {
    console.log(`Server started running on port ${port}`);
})