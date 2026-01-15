# 🏠 WanderLust - Airbnb Clone

A feature-rich, full-stack accommodation booking platform inspired by Airbnb. Built with modern web technologies, WanderLust allows users to explore, list, and review properties from around the world.

![Node.js](https://img.shields.io/badge/Node.js-v22.13.1-green)
![Express](https://img.shields.io/badge/Express-4.21.2-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![License](https://img.shields.io/badge/License-Educational-orange)

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Technologies Used](#-technologies-used)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Routes](#-api-routes)
- [Database Models](#-database-models)
- [Middleware](#-middleware)
- [Error Handling](#-error-handling)
- [Security Features](#-security-features)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Functionality
- 🔐 **User Authentication & Authorization**
  - Secure signup and login with Passport.js
  - Password hashing with bcrypt
  - Session-based authentication
  - Protected routes and owner-based permissions

- 🏡 **Property Listings**
  - Create, read, update, and delete listings
  - Upload property images to Cloudinary
  - Category-based filtering (Mountains, Trending, Iconic City, Castle, Amazing Pools, Camping, Farms, Arctics)
  - Detailed property information (title, description, location, price)

- ⭐ **Review System**
  - Add ratings (1-5 stars) and comments
  - Delete own reviews
  - Average rating calculation
  - Review authorization

- 🗺️ **Interactive Maps**
  - Mapbox integration for location visualization
  - Geocoding support
  - Property location markers

- 💬 **User Experience**
  - Flash messages for user feedback
  - Responsive design
  - Intuitive navigation
  - Form validation (client & server-side)

## 🎯 Demo

```bash
# Clone and run locally
git clone <repository-url>
cd wanderlust
npm install
npm start
```

Visit `http://localhost:8080` to explore the application.

## 🛠️ Technologies Used

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | v22.13.1 | JavaScript runtime |
| Express.js | 4.21.2 | Web application framework |
| MongoDB | - | NoSQL database |
| Mongoose | 8.12.1 | MongoDB object modeling |

### Authentication & Security
| Technology | Purpose |
|------------|---------|
| Passport.js | Authentication middleware |
| Passport-Local | Local authentication strategy |
| Passport-Local-Mongoose | Simplified authentication for MongoDB |
| Express-Session | Session management |
| Connect-Mongo | MongoDB session store |
| Connect-Flash | Flash message middleware |

### File Upload & Cloud Storage
| Technology | Purpose |
|------------|---------|
| Cloudinary | Cloud image storage and CDN |
| Multer | File upload handling |
| Multer-Storage-Cloudinary | Cloudinary storage engine |

### Validation & Utilities
| Technology | Purpose |
|------------|---------|
| Joi | Schema validation |
| Method-Override | HTTP verb override |
| EJS | Templating engine |
| EJS-Mate | Layout support for EJS |
| dotenv | Environment variable management |

### Mapping
| Technology | Purpose |
|------------|---------|
| @mapbox/mapbox-sdk | Interactive maps and geocoding |

## 📋 Prerequisites

Before you begin, ensure you have the following installed and set up:

- **Node.js** (v22.13.1 or higher)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas)
- **Cloudinary Account** - [Sign up here](https://cloudinary.com/)
- **Mapbox Account** - [Sign up here](https://www.mapbox.com/)

## 🚀 Installation

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd wanderlust
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following variables (see [Environment Variables](#-environment-variables) section):

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret_key
```

### Step 4: Start the Application

```bash
# Production
node app.js

# Development (with nodemon)
npm install -g nodemon
nodemon app.js
```

The application will be available at `http://localhost:8080`

## 🔑 Environment Variables

Create a `.env` file with the following configuration:

| Variable | Description | Example |
|----------|-------------|---------|
| `CLOUD_NAME` | Cloudinary cloud name | `my-cloud-name` |
| `CLOUD_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUD_API_SECRET` | Cloudinary API secret | `abcdefghijklmnopqrstuvwxyz` |
| `ATLASDB_URL` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/wanderlust` |
| `SECRET` | Session secret (use strong random string) | `my-super-secret-key-12345` |

### Getting Your Credentials

#### MongoDB Atlas
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier available)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

#### Cloudinary
1. Log in to [Cloudinary](https://cloudinary.com/)
2. Navigate to Dashboard
3. Copy Cloud Name, API Key, and API Secret

#### Session Secret
Generate a strong random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

⚠️ **Security Note**: Never commit your `.env` file to version control!

## 📁 Project Structure

```
wanderlust/
│
├── app.js                      # Main application entry point
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Locked versions of dependencies
├── .env                        # Environment variables (not in repo)
├── .gitignore                  # Git ignore rules
│
├── models/                     # Mongoose data models
│   ├── listing.js              # Property listing schema
│   ├── review.js               # Review schema
│   └── user.js                 # User schema (passport-local-mongoose)
│
├── routes/                     # Express route handlers
│   ├── listing.js              # Listing CRUD routes
│   ├── review.js               # Review routes
│   └── user.js                 # Authentication routes
│
├── views/                      # EJS templates
│   ├── layouts/                # Layout templates
│   │   └── boilerplate.ejs     # Main layout
│   ├── listings/               # Listing views
│   │   ├── index.ejs           # All listings
│   │   ├── new.ejs             # Create listing form
│   │   ├── show.ejs            # Single listing details
│   │   ├── edit.ejs            # Edit listing form
│   │   └── error.ejs           # Error page
│   └── users/                  # User authentication views
│       ├── signup.ejs          # Registration form
│       └── login.ejs           # Login form
│
├── public/                     # Static assets
│   ├── css/                    # Stylesheets
│   ├── js/                     # Client-side JavaScript
│   └── images/                 # Static images
│
├── middlewares.js              # Custom middleware functions
├── Schema.js                   # Joi validation schemas
├── cloudConfig.js              # Cloudinary configuration
│
└── utils/                      # Utility functions
    └── ExpressError.js         # Custom error class
```

## 🌐 API Routes

### Authentication Routes (`/`)

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| GET | `/signup` | Show registration form | No |
| POST | `/signup` | Register new user | No |
| GET | `/login` | Show login form | No |
| POST | `/login` | Authenticate user | No |
| GET | `/logout` | Logout user | Yes |

### Listing Routes (`/listing`)

| Method | Route | Description | Auth Required | Owner Only |
|--------|-------|-------------|---------------|------------|
| GET | `/listing` | View all listings | No | No |
| GET | `/listing/new` | Show create form | Yes | No |
| POST | `/listing` | Create new listing | Yes | No |
| GET | `/listing/:id` | View single listing | No | No |
| GET | `/listing/:id/edit` | Show edit form | Yes | Yes |
| PUT | `/listing/:id` | Update listing | Yes | Yes |
| DELETE | `/listing/:id` | Delete listing | Yes | Yes |

### Review Routes (`/listing/:id/reviews`)

| Method | Route | Description | Auth Required | Author Only |
|--------|-------|-------------|---------------|-------------|
| POST | `/listing/:id/reviews` | Add review | Yes | No |
| DELETE | `/listing/:id/reviews/:reviewId` | Delete review | Yes | Yes |

## 🗄️ Database Models

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  // password is handled by passport-local-mongoose
}
```

### Listing Model
```javascript
{
  title: String (required),
  description: String (required),
  image: {
    url: String (default: placeholder),
    filename: String
  },
  price: Number (required),
  location: String (required),
  country: String (required),
  category: String (required, enum),
  reviews: [Review ObjectId],
  owner: User ObjectId (required),
  geometry: {
    type: "Point",
    coordinates: [Number] // [longitude, latitude]
  }
}
```

**Categories**: Mountains, Trending, Iconic City, Castle, Amazing pools, Camping, Farms, Arctics

### Review Model
```javascript
{
  comment: String (required),
  rating: Number (required, 1-5),
  createdAt: Date (default: Date.now),
  author: User ObjectId (required)
}
```

## 🔧 Middleware

### Custom Middleware (`middlewares.js`)

#### `isLoggedIn`
Checks if user is authenticated. Redirects to login if not.
```javascript
if (!req.isAuthenticated()) {
  req.session.redirectUrl = req.originalUrl;
  req.flash("error", "You must be logged in first!");
  return res.redirect("/login");
}
```

#### `isOwner`
Verifies that the current user owns the listing.
```javascript
if (!listing.owner._id.equals(res.locals.currUser._id)) {
  req.flash("error", "You are not the owner of this listing.");
  return res.redirect(`/listing/${id}`);
}
```

#### `isReviewAuthor`
Verifies that the current user authored the review.
```javascript
if (!review.author.equals(res.locals.currUser._id)) {
  req.flash("error", "You are not the author of this review.");
  return res.redirect(`/listing/${id}`);
}
```

#### `validateListing`
Validates listing data using Joi schema.

#### `validateReview`
Validates review data using Joi schema.

#### `saveRedirectUrl`
Saves the URL to redirect to after login.

## ⚠️ Error Handling

### Custom Error Class
```javascript
class ExpressError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
```

### Error Handling Middleware
```javascript
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("./listings/error.ejs", { message });
});
```

### 404 Handler
```javascript
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});
```

## 🛡️ Security Features

### Authentication Security
- **Password Hashing**: Passwords are hashed using bcrypt through passport-local-mongoose
- **Session Management**: Secure sessions stored in MongoDB with configurable expiration
- **HTTP-Only Cookies**: Prevents client-side JavaScript access to cookies

### Session Configuration
```javascript
{
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true // Prevents XSS attacks
  }
}
```

### Input Validation
- **Server-side validation** using Joi schemas
- **Client-side validation** using HTML5 attributes
- **Sanitization** of user inputs

### Authorization
- Route-level protection with middleware
- Owner-based permissions for listings
- Author-based permissions for reviews

### Database Security
- MongoDB Atlas with encrypted connections
- Environment variables for sensitive data
- No exposure of database credentials

## 🚧 Future Enhancements

- [ ] **Search Functionality**: Search by location, price range, amenities
- [ ] **Booking System**: Complete reservation workflow
- [ ] **Payment Integration**: Stripe or PayPal integration
- [ ] **Email Notifications**: Confirmation emails, booking reminders
- [ ] **User Profiles**: Profile pictures, bio, listing history
- [ ] **Wishlist**: Save favorite listings
- [ ] **Advanced Filters**: Date availability, guest count, amenities
- [ ] **Messaging System**: Host-guest communication
- [ ] **Rating Analytics**: Detailed rating breakdowns
- [ ] **Image Gallery**: Multiple images per listing
- [ ] **Mobile App**: React Native or Flutter app
- [ ] **Admin Dashboard**: Manage users, listings, reviews
- [ ] **Social Login**: Google, Facebook authentication
- [ ] **Two-Factor Authentication**: Enhanced security
- [ ] **API Documentation**: Swagger/OpenAPI docs

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Coding Standards
- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting

## 📝 License

This project is created for **educational purposes only**. It is not affiliated with, endorsed by, or connected to Airbnb, Inc.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Inspired by [Airbnb](https://www.airbnb.com/)
- Built as a learning project for full-stack development
- Special thanks to the open-source community
- Icons from [Font Awesome](https://fontawesome.com/)
- Images from [Unsplash](https://unsplash.com/)

## 📞 Support

If you encounter any issues or have questions:

- **Open an issue**: [GitHub Issues](https://github.com/yourusername/wanderlust/issues)
- **Email**: your.email@example.com
- **Documentation**: Check this README and inline code comments

## 📊 Project Status

🚧 **Active Development** - This project is actively being developed and improved.

---

**Made with ❤️ for learning and education**

⭐ Star this repo if you found it helpful!
