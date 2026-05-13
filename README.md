# Stellar Academy

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
