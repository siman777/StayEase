# 🏠 Airbnb Clone - WanderLust

A full-stack web application clone of Airbnb built with Node.js, Express, MongoDB, and EJS templating engine. This project allows users to browse, create, edit, and review property listings with user authentication and image upload capabilities.

## ✨ Features

- **User Authentication**: Secure signup/login system using Passport.js with local strategy
- **Property Listings Management**: Create, read, update, and delete (CRUD) property listings
- **Image Upload**: Upload property images to Cloudinary cloud storage
- **Review System**: Users can add ratings and comments to properties
- **Category Filtering**: Browse properties by categories (Mountains, Trending, Iconic City, Castle, Amazing pools, Camping, Farms, Arctics)
- **Interactive Maps**: Integration with Mapbox for location visualization
- **Session Management**: Persistent user sessions with MongoDB store
- **Flash Messages**: User-friendly feedback notifications
- **Authorization**: Owner-based permissions for editing/deleting listings and reviews

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database (with MongoDB Atlas)
- **Mongoose** - MongoDB object modeling

### Authentication & Security
- **Passport.js** - Authentication middleware
- **Passport-Local-Mongoose** - Simplified authentication for MongoDB
- **Express-Session** - Session management
- **Connect-Flash** - Flash messages

### File Upload & Storage
- **Cloudinary** - Cloud-based image storage
- **Multer** - File upload handling middleware
- **Multer-Storage-Cloudinary** - Cloudinary storage engine for Multer

### Validation & Utilities
- **Joi** - Schema validation
- **Method-Override** - HTTP method override for forms
- **EJS-Mate** - Layout support for EJS templates
- **dotenv** - Environment variable management

### Mapping
- **Mapbox SDK** - Interactive maps and geocoding

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v22.13.1 or higher)
- MongoDB Atlas account
- Cloudinary account
- Mapbox account

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd major-project-(airbnb)
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```bash
   # Cloudinary Configuration
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret

   # MongoDB Configuration
   ATLASDB_URL=your_mongodb_atlas_connection_string

   # Session Secret
   SECRET=your_session_secret_key
   ```

   **⚠️ Important**: Never commit your `.env` file to version control!

4. **Start the application**
   ```bash
   node app.js
   ```

   The application will start on `http://localhost:8080`

## 📁 Project Structure

```
├── app.js                  # Main application entry point
├── models/                 # Mongoose models
│   ├── listing.js         # Listing schema
│   ├── review.js          # Review schema
│   └── user.js            # User schema
├── routes/                # Express route handlers
│   ├── listing.js         # Listing routes
│   ├── review.js          # Review routes
│   └── user.js            # User authentication routes
├── views/                 # EJS templates
│   └── listings/          # Listing views
├── public/                # Static files (CSS, JS, images)
├── middlewares.js         # Custom middleware functions
├── Schema.js              # Joi validation schemas
├── cloudConfig.js         # Cloudinary configuration
└── utils/                 # Utility functions
    └── ExpressError.js    # Custom error handler
```

## 🔑 Key Features Explained

### Authentication Flow
- Users can sign up with username and password
- Passwords are hashed using passport-local-mongoose
- Sessions are maintained with connect-mongo for persistent login
- Protected routes redirect to login if user is not authenticated

### Authorization
- Only listing owners can edit or delete their listings
- Only review authors can delete their reviews
- Middleware checks ensure proper authorization

### Image Handling
- Images are uploaded to Cloudinary via Multer
- Supports PNG, JPG, and JPEG formats
- Stored in organized folders on Cloudinary

### Data Validation
- Server-side validation using Joi schemas
- Validates listing data (title, description, location, price, category)
- Validates review data (rating, comment)

## 🌐 API Routes

### Listings
- `GET /listing` - View all listings
- `GET /listing/new` - Show create listing form
- `POST /listing` - Create new listing
- `GET /listing/:id` - View single listing
- `GET /listing/:id/edit` - Show edit form
- `PUT /listing/:id` - Update listing
- `DELETE /listing/:id` - Delete listing

### Reviews
- `POST /listing/:id/reviews` - Add review to listing
- `DELETE /listing/:id/reviews/:reviewId` - Delete review

### Authentication
- `GET /signup` - Show signup form
- `POST /signup` - Register new user
- `GET /login` - Show login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

## 🔒 Environment Variables

| Variable | Description |
|----------|-------------|
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `ATLASDB_URL` | MongoDB Atlas connection string |
| `SECRET` | Session secret key |

## 🛡️ Security Features

- Password hashing with passport-local-mongoose
- HTTP-only cookies for session management
- CSRF protection considerations
- Input validation and sanitization
- Secure session storage with MongoDB

## 🐛 Error Handling

- Custom `ExpressError` class for consistent error handling
- Async error wrapper for route handlers
- 404 handling for undefined routes
- User-friendly error pages

## 📝 Validation Schemas

### Listing Schema
```javascript
{
  title: String (required),
  description: String (required),
  location: String (required),
  country: String (required),
  price: Number (required),
  image: String (optional),
  category: String (required, predefined categories)
}
```

### Review Schema
```javascript
{
  rating: Number (1-5, required),
  comment: String (required)
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes.

## 👤 Author

Your Name - [GitHub Profile]

## 🙏 Acknowledgments

- Inspired by Airbnb
- Built as a learning project for full-stack web development
- Uses various open-source packages and libraries

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Note**: This is a clone project built for educational purposes and is not affiliated with Airbnb, Inc.