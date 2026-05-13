# Stellar Academy 🎓

The official website for **Stellar Institute, Lahore** — a growing educational institution offering everything from academic programs (5th to Intermediate) to professional IT and Beauty courses.

This project started as a from-scratch rebuild. The old site was a clunky WordPress template that barely loaded on mobile and looked like it was designed in 2014. I rebuilt the entire thing in React with a modern design inspired by top-tier education portals — think smooth animations, a premium feel, and a UI that actually makes you want to explore the courses.

## What's Inside

### 🏠 Public Website
- **Homepage** — Hero section with animated floating shapes, featured courses grid, live notices feed, testimonials slider, and call-to-action banners.
- **Skilled Institute** — Full course catalog with search + category filtering. Covers 13 IT courses (Web Dev, Graphic Design, Video Editing, etc.) and 10 Beauty courses.
- **Stellar Academy** — Academic programs breakdown for Middle, Matric, and Intermediate levels with subjects and highlights.
- **About** — Mission statement, core values, and a milestone timeline.
- **Contact** — Working contact form with email delivery via Nodemailer + a Google Maps embed pinned to the actual campus location.
- **Coming Soon** — Placeholder for School and College pages that are still in development.

### 📢 Announcement CMS
This was the big feature request from the team. They wanted something like what NUST and COMSATS have — where admins can push announcements and students see them instantly.

Built a full content management system from scratch:

- **Popup Modal** — The highest-priority announcement automatically pops up when someone visits the site. Dismissing it stores the specific announcement ID, so new announcements will still pop up fresh.
- **Scrolling Ticker** — A horizontal marquee strip under the navbar that cycles through all active notices.
- **Latest Notices Section** — A clean feed on the homepage. Clicking any notice opens a detailed modal with the full text, attached image, and any external links.
- **Admin Panel** (`/stellar-admin`) — Protected login with JWT auth. Dashboard with stats, a full CRUD table for announcements, priority levels (Normal / Important / Urgent), date scheduling, image uploads with automatic compression, and toggle switches for activation.

### 🖼️ Image Support
Admins can attach images up to 10MB to any announcement. The browser automatically compresses and resizes them before upload — this keeps the database lean and bypasses Vercel's payload limits without any external image hosting needed.

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite 8, Framer Motion |
| Backend | Vercel Serverless Functions (Node.js) |
| Database | Neon Postgres (Serverless) |
| Auth | JWT + bcrypt |
| Email | Nodemailer |
| Hosting | Vercel (test deployment) |

## Project Structure

```
stellar_institute/
├── api/                    # Vercel serverless functions
│   ├── db.js               # Neon Postgres connection + table setup
│   ├── announcements.js    # Public GET for active announcements
│   ├── admin-login.js      # JWT login endpoint
│   ├── admin-announcements.js  # Protected CRUD for announcements
│   ├── admin-seed.js       # One-time admin user seeder
│   └── contact.js          # Contact form email handler
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx      # Multi-level dropdown navigation
│   │   ├── Footer.jsx      # Site footer with social links
│   │   ├── AnnouncementPopup.jsx   # Auto-popup modal
│   │   ├── AnnouncementTicker.jsx  # Scrolling notice strip
│   │   ├── AnnouncementModal.jsx   # Detailed notice viewer
│   │   ├── CursorTrail.jsx # Custom cursor effect
│   │   ├── FloatingShapes.jsx # Animated SVG decorations
│   │   ├── ScrollReveal.jsx   # Scroll-triggered animations
│   │   ├── StatsCounter.jsx   # Animated number counter
│   │   └── CampusCarousel.jsx # Image carousel
│   ├── pages/
│   │   ├── Home.jsx        # Landing page
│   │   ├── SkilledInstitute.jsx # Course catalog
│   │   ├── Academy.jsx     # Academic programs
│   │   ├── About.jsx       # About us
│   │   ├── Contact.jsx     # Contact form
│   │   ├── StellarAdmin.jsx # Admin dashboard
│   │   └── ComingSoon.jsx  # Placeholder
│   └── data/
│       └── courses.js      # Course data + testimonials
├── public/                 # Static assets (logo, images)
├── vercel.json             # Vercel routing config
└── package.json
```

## Environment Variables

These need to be set in the Vercel dashboard (or `.env` for local dev):

```
DATABASE_URL=postgresql://...          # Neon Postgres connection string
JWT_SECRET=your-secret-key             # For admin auth tokens

# Optional — for contact form emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=info@stellarinstitute.pk
```

## Running Locally

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`. The API routes require Vercel CLI (`vercel dev`) to work locally since they're serverless functions.

## Deployment

Connected to GitHub — every push to `main` triggers an automatic deployment on Vercel. Currently live at the test URL for team review before moving to the production domain on cPanel.

---

Built for Stellar Institute, Lahore 🇵🇰
