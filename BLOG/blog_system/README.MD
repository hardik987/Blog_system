# GlobalBlog - Blog System with API Integration

A React.js blog application that integrates with the RestCountries API to display information about countries around the world.

## Features

### Core Features
- **List Blogs**: Display a list of blog posts with relevant information
- **Blog Details**: View detailed information about a selected blog post

### Enhanced Features
- **Comments**: Add and view comments on blog posts
- **Likes**: Like blog posts (requires authentication)
- **Search/Filter**: Search blog content and filter by region
- **User Authentication**: Basic user authentication system

## Technologies Used

- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router
- **API Integration**: RestCountries API
- **HTTP Client**: Axios

## Project Structure

```
blog_system/
├── public/
├── src/
│   ├── components/
│   │   ├── blog/
│   │   │   ├── BlogCard.js
│   │   │   └── CommentSection.js
│   │   ├── common/
│   │   │   └── CountryInfo.js
│   │   └── layout/
│   │       ├── Header.js
│   │       └── Footer.js
│   ├── context/
│   │   └── BlogContext.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── BlogDetailPage.js
│   │   ├── SearchResultsPage.js
│   │   ├── CountriesPage.js
│   │   ├── LoginPage.js
│   │   └── NotFoundPage.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com//blog_system.git
   cd blog_system

   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and visit `http:/hardik987/localhost:3000`

## API Integration

This project integrates with the [RestCountries API](https://restcountries.com/) to fetch and display information about countries. The API data is used to:

- Create blog posts about different countries
- Display detailed country information on blog post pages
- Provide a countries explorer page

## User Authentication

For demo purposes, the application implements a simple front-end authentication system:

- Any username and password combination will work
- Authentication state is managed through the BlogContext
- Authenticated users can:
  - Like blog posts
  - Add comments to blog posts

## Project Features

### Home Page
- Displays a list of blog posts
- Allows filtering by region
- Shows blog cards with title, summary, date, author, likes, and comments count

### Blog Detail Page
- Displays complete blog post content
- Shows country information
- Includes a comment section for authenticated users
- Allows users to like posts

### Search Functionality
- Search for blog posts by title or content
- Results displayed in a clean, responsive grid

### Countries Explorer
- Browse countries from the RestCountries API
- Filter by region
- Search by country name

## Credits

- Developed by [Hardik Singla]
- Uses [RestCountries API](https://restcountries.com/)
- Built with [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
