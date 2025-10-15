CREATE DATABASE learn_hive_db;

USE learn_hive_db;


-- 1. User Table
CREATE TABLE User (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    userType ENUM('Learner', 'Tutor', 'Admin') NOT NULL,
    profilePictureURL VARCHAR(255),
    bio TEXT,
    registrationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    lastLogin DATETIME
);

-- 2. Skill Table
CREATE TABLE Skill (
    skillID INT AUTO_INCREMENT PRIMARY KEY,
    skillName VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- 3. TutorSkill Table (Associative Entity)
CREATE TABLE TutorSkill (
    tutorID INT NOT NULL,
    skillID INT NOT NULL,
    experienceLevel ENUM('Beginner', 'Intermediate', 'Advanced'),
    hourlyRate DECIMAL(10, 2),
    PRIMARY KEY (tutorID, skillID),
    FOREIGN KEY (tutorID) REFERENCES User(userID) ON DELETE CASCADE,
    FOREIGN KEY (skillID) REFERENCES Skill(skillID) ON DELETE CASCADE
);

-- 4. Session Table
CREATE TABLE Session (
    sessionID INT AUTO_INCREMENT PRIMARY KEY,
    tutorID INT NOT NULL,
    skillID INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    durationMinutes INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    scheduledTime DATETIME NOT NULL,
    sessionLink VARCHAR(255),
    status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    creationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tutorID) REFERENCES User(userID) ON DELETE CASCADE,
    FOREIGN KEY (skillID) REFERENCES Skill(skillID) ON DELETE RESTRICT
);

-- 5. Booking Table
CREATE TABLE Booking (
    bookingID INT AUTO_INCREMENT PRIMARY KEY,
    sessionID INT NOT NULL,
    learnerID INT NOT NULL,
    bookingDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Confirmed', 'Pending', 'Cancelled') DEFAULT 'Confirmed',
    paymentStatus ENUM('Paid', 'Pending', 'Refunded') DEFAULT 'Pending',
    FOREIGN KEY (sessionID) REFERENCES Session(sessionID) ON DELETE RESTRICT,
    FOREIGN KEY (learnerID) REFERENCES User(userID) ON DELETE CASCADE
);

-- 6. Review Table
CREATE TABLE Review (
    reviewID INT AUTO_INCREMENT PRIMARY KEY,
    sessionID INT NOT NULL,
    learnerID INT NOT NULL,
    tutorID INT NOT NULL, -- Storing tutorID directly here for easier lookup
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    reviewDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sessionID) REFERENCES Session(sessionID) ON DELETE CASCADE,
    FOREIGN KEY (learnerID) REFERENCES User(userID) ON DELETE CASCADE,
    FOREIGN KEY (tutorID) REFERENCES User(userID) ON DELETE CASCADE
);

-- 7. Message Table
CREATE TABLE Message (
    messageID INT AUTO_INCREMENT PRIMARY KEY,
    senderID INT NOT NULL,
    receiverID INT NOT NULL,
    messageText TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    isRead BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (senderID) REFERENCES User(userID) ON DELETE CASCADE,
    FOREIGN KEY (receiverID) REFERENCES User(userID) ON DELETE CASCADE
);