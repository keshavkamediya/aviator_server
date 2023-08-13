import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/CubeTech_Games_Tivit", { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => {
        console.log("Connected successfully");
    }).catch((error) => {
        console.log(error);
    });
