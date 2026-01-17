# 🎮 Quizventure - Interactive Learning Platform

A gamified quiz and learning platform that teaches programming languages (HTML, CSS, JavaScript, Python) through interactive lessons and competitive leaderboards.

## 📋 Features

- 🔐 **User Authentication** - Secure signup/login with JWT tokens
- 📚 **Interactive Lessons** - Multiple programming courses with quizzes
- 🏆 **Leaderboard System** - Rank players by score and completion time
- 📊 **Progress Tracking** - Save user quiz progress per course
- 🎨 **Retro Gaming UI** - Press Start 2P font with dark, gamified design
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⚡ **Real-time Scoring** - Instant feedback on quiz submissions

## 🛠️ Tech Stack

### Frontend

- HTML5, CSS3, Vanilla JavaScript
- Press Start 2P retro font
- localStorage for client-side state

### Backend

- Node.js + Express.js
- MySQL/MariaDB database
- JWT authentication with bcryptjs
- Netlify Serverless Functions

### Deployment

- Netlify (functions + hosting)
- XAMPP/Apache for local development

## 📁 Project Structure

```
quizventure/
├── public/                 # HTML pages
│   ├── index.html         # Landing page
│   ├── dashboard.html     # User dashboard
│   ├── login.html, signup.html
│   ├── learning.html      # Lessons (protected)
│   ├── leader.html        # Leaderboard
│   ├── lesson*.html       # Quiz lessons
│   └── [other pages]
├── css/                   # Stylesheets
│   ├── style.css          # Main styles
│   ├── dashboard.css
│   ├── lesson.css
│   └── [other styles]
├── js/                    # Frontend JavaScript
│   ├── auth.js            # Authentication logic
│   ├── s.js               # Leaderboard logic
│   ├── contact.js         # Contact form
│   └── hotdog.js          # Resource links
├── images/                # Image assets
│   ├── logo.png
│   ├── backgrounds
│   └── [other images]
├── assets/                # Media files
│   ├── guides.pdf
│   ├── cheatsheets.pdf
│   ├── music.mp3
│   └── [other assets]
├── backend/               # Node.js backend
│   ├── server.js          # Express server
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   ├── progress.js
│   │   ├── leaderboard.js
│   │   └── questions.js
│   ├── package.json
│   ├── .env
│   └── go_to_backend.bat
├── database/              # Database schema
│   └── create_tables.sql
├── netlify/               # Netlify functions
│   └── functions/
│       ├── login.js
│       ├── signup.js
│       ├── leaderboard.js
│       └── submitScore.js
├── netlify.toml           # Netlify config
└── .gitignore

```

## 🚀 Getting Started

### Prerequisites

- Node.js 14+
- MySQL/MariaDB
- XAMPP (for local development)
- Netlify CLI (for deployment)

### Local Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/quizventure.git
   cd quizventure
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   ```

3. **Configure Database**

   ```bash
   # Create database in MySQL
   mysql -u root -p < ../database/create_tables.sql
   ```

4. **Setup Environment Variables**

   ```bash
   # backend/.env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=quizventure
   JWT_SECRET=your_jwt_secret
   ```

5. **Start Backend Server**

   ```bash
   npm run dev
   ```

6. **Open Frontend**
   - Open `public/index.html` in your browser, or
   - Use XAMPP to serve files from this directory

### Database Schema

**users** - User accounts

- id, username, email, password, created_at, last_login

**user_progress** - Quiz progress tracking

- user_id, course, current_set_key, current_index, hearts, correct_count, etc.

**leaderboard** - Score submissions

- user_id, username, course, score, percentage, completion_time, difficulty

## 📚 API Endpoints

### Authentication

- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Progress

- `GET /api/progress/:userId/:course` - Get user course progress
- `PUT /api/progress/:userId/:course` - Update progress

### Leaderboard

- `GET /api/leaderboard/:course` - Get leaderboard for course
- `POST /api/leaderboard/submit` - Submit score

### Questions

- `GET /api/questions/:course` - Get questions for course

## 🔐 Security Notes

⚠️ **Current Limitations:**

- Client-side auth uses localStorage (demo-only, not for production)
- Passwords stored in plaintext in localStorage (use JWT tokens instead)
- Consider implementing:
  - HTTP-only cookies for tokens
  - HTTPS for production
  - Rate limiting on API endpoints
  - Input validation on server-side

## 🎨 Customization

### Colors & Theme

Edit `css/style.css` for color scheme:

- Primary: #00A8B5 (teal)
- Accent: #B0391B (red)
- Highlight: #F9B233 (yellow)

### Lessons & Questions

Add new lessons by duplicating `public/lesson*.html` and updating the lesson content.

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Known Issues

- Duplicate auth.js import in index.html (line 23-24)
- Some mock endpoints in server.js need proper implementation
- Mixed Supabase and MySQL authentication (consolidate to one)

## 📄 License

This project is open source. Please specify your license here.

## 👥 Authors

- Created for educational purposes

## 🙏 Acknowledgments

- Press Start 2P font for retro aesthetic
- Adventure Time inspiration for gamified UI
- Community feedback and contributions

## 📞 Support

For issues, questions, or suggestions:

- Open an GitHub Issue
- Check existing issues first

---

**Happy Learning! 🚀**
