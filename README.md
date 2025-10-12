#  BazaarTrack – Local Shop Price Tracker

BazaarTrack is a mobile application that helps users in Bangladesh track and compare essential item prices across multiple local stores.  
Built with **React Native, Node.js, and MySQL**, the system uses **web scraping** to fetch real-time data, offering personalized alerts, price history analytics, and recommendations for better purchasing decisions.

---

##  Features
-  Search items & filter by categories  
-  Secure authentication (JWT, bcrypt)  
-  Favorites & push notifications for price drops  
-  Price history charts & trend analysis  
-  Smart recommendations (best time to buy)  
-  Admin panel for store & scraping management  

---

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| Frontend       | React Native (Expo), Tailwind CSS |
| Backend        | Node.js, Express.js               |
| Database       | MySQL                             |
| Web Scraping   | Cheerio, Puppeteer                |
| Authentication | JWT, bcrypt                       |
| Charts         | Recharts, Victory Native          |


---

BazaarTrack/
├── frontend/                     # React Native mobile application
│   ├── app/                      # Expo entry point
│   ├── src/
│   │   ├── auth/                 # Authentication screens (Login, Signup)
│   │   ├── main/                 # Main screens (Home, Compare, History, etc.)
│   │   ├── components/           # Reusable UI components
│   │   ├── services/             # API calls and utility functions
│   │   └── assets/               # Images, icons, fonts
│   ├── package.json
│   └── app.json
│
├── backend/                      # Node.js + Express.js server
│   ├── scraping/                 # Web scraping scripts and schedulers
│   ├── controllers/              # Business logic and API handlers
│   ├── models/                   # Database models
│   ├── routes/                   # API endpoints
│   ├── config/                   # Database and environment setup
│   ├── server.js                 # Backend entry point
│   └── package.json
│
├── docs/                         # ERD, API documentation, diagrams
└── README.md


