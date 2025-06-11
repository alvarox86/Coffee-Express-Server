const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    totalAmount:{
      type:Number,
      required:[true, 'totalAmount is required.']
    },
    status:{
      type:String,
      enum:["pending","paid","failed","shipped"],
      default:"pending"
    },
    stripeSessionId: {
      type: String,
    },
    paidAt: {
      type: Date,
    },
    user:{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    products:{
        type: [Schema.Types.ObjectId], 
        ref: 'Product'
    }
  },
  {
    timestamps: true
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
