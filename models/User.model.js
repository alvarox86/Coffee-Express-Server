const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username:{
      type:String,
      required:[true, 'User name is required.']
    },
    phone:{
      type:String,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    rol:{
      type: String,
      enum:["user","admin","vendor","superAdmin"],
      default:"user"
    },
    adress:{
      type:String
    },
    profilepicture:{
      type:String,
      default:"https://res.cloudinary.com/dotfm1go0/image/upload/v1749833868/1361728_qxjjh8.png"
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
