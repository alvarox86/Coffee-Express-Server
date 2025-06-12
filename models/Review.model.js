const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    rating:{
      type:Number,
      required:[true, 'Rating is required.'],
      enum:[1,2,3,4,5]
    },
    comment:{
      type:String,
      required:true
    },
    username:{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    product:{
        type: Schema.Types.ObjectId, 
        ref: 'Product'
    }
  },
  {
    timestamps: true
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
