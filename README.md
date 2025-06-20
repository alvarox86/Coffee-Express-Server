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
| GET         | `/gameApi`                  |                              | 200            | 401          | Gets game data from API (Search)                               |
| GET         | `/gameApi/:apiId`           |                              | 200            | 401          | Gets game details from API                                     |
  
## Links

### Collaborators

[Developer 1 name](www.github-url.com)

[Developer 2 name](www.github-url.com)

### Project

[Repository Link Client](www.your-github-url-here.com)

[Repository Link Server](www.your-github-url-here.com)

[Deploy Link](www.your-deploy-url-here.com)

### Trello

[Link to your trello board](www.your-trello-url-here.com)

### Slides

[Slides Link](www.your-slides-url-here.com)