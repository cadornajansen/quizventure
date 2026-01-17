USE quizventure_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_username (username)
) ENGINE=InnoDB;

CREATE TABLE user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course VARCHAR(20) NOT NULL,
    current_set_key VARCHAR(50),
    current_index INT DEFAULT 0,
    selected_answer INT DEFAULT 0,
    hearts INT DEFAULT 5,
    correct_count INT DEFAULT 0,
    lich_health INT DEFAULT 3,
    section_stats TEXT,
    param_stats TEXT,
    answered_flags TEXT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_course (user_id, course),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_course (user_id, course)
) ENGINE=InnoDB;

CREATE TABLE leaderboard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    username VARCHAR(50) NOT NULL,
    course VARCHAR(20) NOT NULL,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    completion_time INT DEFAULT 0,
    difficulty ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_course_percentage (course, percentage DESC),
    INDEX idx_user_course_date (user_id, course, submitted_at DESC),
    INDEX idx_date (submitted_at DESC)
) ENGINE=InnoDB;