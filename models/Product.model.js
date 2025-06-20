const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name:{
      type:String,
      required:[true, 'Coffee name is required.']
    },
    description:{
      type:String,
    },
    imageUrl: {
      type: String,
      trim: true,
      default:"https://res.cloudinary.com/dotfm1go0/image/upload/v1749917582/default-image_600_u1nizl.webp"
    },
    origin: {
      country: {
        type:String,
        required:true
      },
      region: {
        type:String,
        required:true
      },
      latitude: {
        type:Number,
      },
      longitude: {
        type:Number,
      },
    },
    type:{
      type: String,
      enum:["beans","ground","capsule"],
      required:[true,'Type of the coffee is required.' ]
    },
    price:{
      type:Number,
      required:[true,'Price is required.' ]
    },
    stock:{
      type:Number,
      default:0
    },
    createdBy:{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
