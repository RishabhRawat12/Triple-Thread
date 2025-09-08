# LearnHive: A Peer-to-Peer Knowledge Sharing Platform

## 📌 Motivation
In today’s fast-paced digital era, knowledge and skills are as valuable as formal education.  
However, traditional learning platforms are often limited by high costs, rigid structures, and dependency on institutions. Learners may struggle to find the right tutor at the right time, while individuals with skills often lack a platform to share their expertise.  

A **Peer-to-Peer (P2P) Knowledge Sharing Platform** bridges this gap. It allows anyone with a skill—whether coding, music, or design—to become a tutor, while learners can directly connect, book sessions, and learn flexibly. Unlike centralized systems, a P2P approach ensures greater accessibility, fairness, and affordability.  

This project is motivated by the need to design a **DBMS-driven platform** that efficiently manages tutors, learners, skills, sessions, bookings, and feedback, while ensuring scalability, reliability, and security of the data.

---

## 📌 State of the Art / Current Solution
Currently, popular platforms like **Coursera, Udemy, or Byju’s** provide large-scale e-learning but follow a centralized, institution-based model. These platforms are less flexible for peer-to-peer direct learning and do not easily allow individuals to become both learners and tutors simultaneously.  

Some tutoring apps (like **Preply or UrbanPro**) allow individual tutors, but they often lack strong DBMS-backed features such as:
- Efficient session scheduling and conflict management.
- Integrated feedback and rating system tightly linked to session data.
- Recorded lecture management for learners who prefer asynchronous learning.

**Our project is novel because it integrates**:
- Live session scheduling  
- Recorded lectures  
- Tutor availability management  
- Reviews and feedback  

into a **single cohesive DBMS application**, ensuring seamless peer-to-peer knowledge sharing.

---

## 📌 Project Goals and Milestones

### 🎯 General Goals
- Design and implement a normalized relational database supporting all entities (Users, Skills, Sessions, Bookings, Reviews).  
- Develop SQL queries and stored procedures for session scheduling, booking management, and review aggregation.  
- Ensure referential integrity and implement many-to-many relationships (User–Skill, User–Session).  
- Build a simulation/demo application (CLI or basic React web front-end) that interacts with the database.  

### 🗓️ Milestones
- **Week 4**: Finalize ER model, design relational schema, and create normalized database tables.  
- **Week 8**: Implement SQL queries, triggers, and stored procedures for core operations (registration, booking, availability).  
- **Week 12**: Integrate feedback and review mechanism; add support for recorded lectures.  
- **Week 16**: Complete application integration, performance testing, prepare final report, and demonstration.  

---

## 📌 Project Approach
The project will be implemented using a **DBMS-first approach**, ensuring that database design is the foundation.

- **Database System**: MySQL / Oracle XE  
- **Programming Layer**: Simple React front-end for user interaction  
- **Design Method**: ER modeling → Relational schema → Normalization (up to 3NF)  

### 🗂️ Key Entities & Tables
- **User** (UserID, Name, Email, Role)  
- **Skill** (SkillID, SkillName, Description)  
- **UserSkill** (UserID, SkillID, Level)  
- **Session** (SessionID, TutorID, SkillID, Date, Time, Duration, MeetingLink)  
- **Booking** (BookingID, SessionID, LearnerID, Status)  
- **Review** (ReviewID, BookingID, Rating, Comment)  
- **Availability** (AvailabilityID, TutorID, Date, StartTime, EndTime)  
- **RecordedLecture** (RecordedID, TutorID, SkillID, Title, URL)  

The application layer will allow users to **register, create sessions, book slots, and give reviews**, while the DBMS ensures integrity using **foreign keys and transaction management**.

---

## 📌 System Architecture (High-Level)

**Layers**:
1. **User Layer (Learners & Tutors)** – Register, search, book, teach  
2. **Application Layer** – Interface for booking, scheduling, uploading lectures  
3. **Database Layer** – MySQL/Oracle DB managing Users, Skills, Sessions, Bookings, Reviews, and Availability  

The **Database Layer** is the **core engine**, ensuring consistency and supporting real-time operations like conflict-free booking and feedback aggregation.  

---

## 📌 Project Outcomes / Deliverables
- **Functional DBMS Application** with user registration, skill management, session booking, and review functionality.  
- **Well-Designed Database Schema** with ER diagram and normalized relational tables.  
- **SQL Scripts & Queries** for creation of tables, joins, stored procedures, and triggers.  
- **Comprehensive Project Report** covering schema design, ER model, SQL implementation, and test cases.  
- **Final Presentation & Demonstration** showing live booking, tutoring, and review scenarios.  

---

## 📌 Assumptions
- All users register with unique emails.  
- Skills and categories are predefined but can be extended.  
- A session belongs to exactly **one tutor** and **one skill**.  
- A booking is linked to exactly **one learner** and **one session**.  
- Video integration (Zoom/Meet link) is stored as a URL in the DB, but not implemented within DBMS itself.  

---

## 📌 References
- Silberschatz, A., Korth, H. F., & Sudarshan, S. (2019). *Database System Concepts* (7th ed.), McGraw Hill.  
- Ramakrishnan, R., & Gehrke, J. (2003). *Database Management Systems* (3rd ed.), McGraw Hill.  
- Online Learning Platforms: Coursera, Preply, Udemy for feature inspiration.  
