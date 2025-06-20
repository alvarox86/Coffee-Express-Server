# Coffee Express

## [See the App!](https://coffee-express-app.netlify.app/)

<img src="https://res.cloudinary.com/dotfm1go0/image/upload/v1750281160/iconlogo_bsqf1c.png" alt="Descripción" width="200" />

## Description

Coffee Express is an e-commerce platform for buy some different kinds of coffees where sellers add products and registered users can buy and leave reviews. It offers a easy shopping experience. Payments are fully simulated for testing purposes. 

#### [Client Repo here](https://github.com/alvarox86/Coffee-Express-Client.git)
#### [Server Repo here](https://github.com/alvarox86/Coffee-Express-Server.git)

## Backlog Functionalities

- Add a page to view order history and total spending.  
- Create a new superadmin role to manage seller functionalities.  
- Enable multi-product orders with a display of the total amount.  
- Implement password recovery and reset via email.  
- Allow sending coffee recommendations through email.

## Technologies used

- React  
- JavaScript (ES6+)  
- HTML5  
- CSS3  
- MongoDB  
- Node.js  
- Express.js  
- Material UI (MUI)  
- External APIs: Stripe, Cloudinary  
- Git (version control)  
- JSON Web Tokens (JWT) for authentication 
- Axios 
- Bcript

# Server Structure

## Models

Payment model

```javascript
{
  price: Number,
  paymentIntentId: String,
  clientSecret: String,
  status: {
    type: String,
    enum: ["incomplete", "succeeded"],
    default: "incomplete"
  },
  product: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }],
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}
```

Product model

```javascript
   {
    name:{
      type:String,
      required
    },
    description:{
      type:String,
    },
    imageUrl: {
      type: String,
      trim: true,
      default
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
      required
    },
    price:{
      type:Number,
      required
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
```

User model

```javascript
    {
    username:{
      type:String,
      required
    },
    phone:{
      type:String,
      trim: true
    },
    email: {
      type: String,
      required,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required
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
      default
    },
    cart:{
      type:[Schema.Types.ObjectId],
      ref:"Product"
    }
  },
  {
    timestamps: true
  }
```
Review model

```javascript
 {
    rating:{
      type:Number,
      required,
      enum:[1,2,3,4,5]
    },
    comment:{
      type:String,
      required
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
```


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                    |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | -------------------------------------------------------------- |
| POST        | `/api/auth/signup`              |       | 201            | 400          | Registers the user in the Database                             |
| POST        | `/apiauth/login`               | {email, password}         | 200            | 400          | User login, returns token                |
| GET         | `/api/auth/verify`              |                              | 200            | 401          | Verifies the user Token                                        |
| GET         | `/api/user/:userId/`                     |                              | 200            | 400          | Get current user profile details                  |
| PATCH        | `/api/user`                     | {apiId}                      | 201            | 400          | Edit own user data                                   |
| GET         | `/api/product/`             |                              | 200            | 400, 401     | List all products                                         |
| PATCH         | `/api/product/`             |                              | 200            | 400, 401     | filters (search bar) document                                            |
| GET      | `/api/product/:productId/`             |                              | 200            | 401          | Get details of a single product                                        |
| POST         | `/api/product`                  |                              | 200            | 401          |Create a new product (admin role required)                                     |
| PUT         | `/api/product/:productId`                  |                              | 200            | 400, 401     | Edit product (creator admin only)                                       |
| DELETE       | `/api/product/:productId`          |                              | 200            | 401          | Delete product (creator admin only)                                        |
| GET         | `/api/review/product/:productId`                  |                              | 200            | 401          | Get all reviews for a product                              |
| POST         | `/api/review`           |                              | 200            | 401          | Create a review for a product (user logged in)    
| POST   | /api/review                 | Headers + body (review data) - Create a review |
| GET    | /api/review                 | View all reviews with their products |
| DELETE | /api/review/:reviewId       | Headers - Delete own review     |
| GET    | /api/user/cart              | Headers - Get current user's cart |
| PATCH  | /api/user/cart/:productId/add    | Params - Add product to cart     |
| PATCH  | /api/user/cart/:productId/remove | Headers - Remove product from cart |
| POST   | /api/order                 | Headers + body {cart, paymentData} - Create new order with payment info |
| GET    | /api/order/:orderId         | Headers - Get details of a specific order |                                |
  

## Links

### Collaborators

María Jiménez Sánchez

Alvaro Ruiz Monfillo
