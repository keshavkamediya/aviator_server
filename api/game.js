import express from "express";
const port = process.env.PORT || 8000;
import "../config/connection.js"

const app = express();

app.use(express.json())

var paint = 1;

setInterval(() => {
    paint+=1
}, 1000);


useEffect(() => {
    app.get("/games", (req, res) => {
        res.send(paint)
    })
}, paint);

app.listen(port);