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

## Project Structure

```
BazaarTrack/
├── frontend/
│ ├── app/
│ ├── src/
│ │ ├── auth/
│ │ ├── main/
│ │ ├── components/
│ │ ├── services/
│ │ └── assets/
│ ├── package.json
│ └── app.json
├── backend/
│ ├── scraping/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/
│ ├── server.js
│ └── package.json
├── docs/
└── README.md

