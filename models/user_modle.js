import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"

const user_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    mobile: {
        type: Number,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone) {
                throw new Error("Invalid Phone number")
            }
        }

    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail) {
                throw new Error("Invalid Email")
            }
        }
    },
    level: {
        name: {
            type: String,
            default: "Beginner"
        },
        levelNo: {
            type: Number,
            default: 1
        },
    },
    joined: {
        type: Date,
        default: Date.now()
    }

})
user_Schema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})
export const User = new mongoose.model("User", user_Schema)

