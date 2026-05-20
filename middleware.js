// Vercel Edge Middleware — Password Gate
// Delete this file when you're ready to go public

const PASSWORD = process.env.SITE_PASSWORD || 'stellar2026';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};

export default async function middleware(request) {
  const url = new URL(request.url);

  // Handle the password submission
  if (url.pathname === '/__auth' && request.method === 'POST') {
    const body = await request.formData();
    const password = body.get('password');

    if (password === PASSWORD) {
      // Correct password — set cookie and redirect to home
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/',
          'Set-Cookie': `__stellar_auth=granted; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`,
        },
      });
    } else {
      // Wrong password — show form again with error
      return new Response(getLoginPage(true), {
        status: 401,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
  }

  // Check for auth cookie
  const cookie = request.headers.get('cookie') || '';
  if (cookie.includes('__stellar_auth=granted')) {
    return; // Already authenticated
  }

  // Not authenticated — show login page
  return new Response(getLoginPage(false), {
    status: 401,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

function getLoginPage(showError) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stellar Institute — Access Restricted</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', sans-serif;
      background: #0a0a0f;
      color: #fff;
      overflow: hidden;
    }

    body::before {
      content: '';
      position: fixed;
      top: -50%; left: -50%;
      width: 200%; height: 200%;
      background: radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 80%, rgba(168, 85, 247, 0.06) 0%, transparent 50%);
      animation: drift 20s ease-in-out infinite alternate;
    }

    @keyframes drift {
      0% { transform: translate(0, 0) rotate(0deg); }
      100% { transform: translate(-3%, 3%) rotate(2deg); }
    }

    .gate {
      position: relative;
      width: 380px;
      padding: 48px 36px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 20px;
      backdrop-filter: blur(40px);
      text-align: center;
    }

    .lock-icon {
      width: 48px; height: 48px;
      margin: 0 auto 24px;
      border: 2px solid rgba(255,255,255,0.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }

    h1 {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
    }

    .subtitle {
      font-size: 13px;
      color: rgba(255,255,255,0.4);
      font-weight: 300;
      margin-bottom: 32px;
    }

    form { display: flex; flex-direction: column; gap: 12px; }

    input[type="password"] {
      width: 100%;
      padding: 14px 16px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }

    input[type="password"]:focus {
      border-color: rgba(99, 102, 241, 0.5);
    }

    input[type="password"]::placeholder {
      color: rgba(255,255,255,0.2);
    }

    button {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border: none;
      border-radius: 10px;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.1s;
    }

    button:hover { opacity: 0.9; }
    button:active { transform: scale(0.98); }

    .error {
      color: #f87171;
      font-size: 13px;
      margin-top: 4px;
      animation: shake 0.4s ease;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-6px); }
      75% { transform: translateX(6px); }
    }
  </style>
</head>
<body>
  <div class="gate">
    <div class="lock-icon">🔒</div>
    <h1>Access Restricted</h1>
    <p class="subtitle">This site is under development</p>
    <form method="POST" action="/__auth">
      <input type="password" name="password" placeholder="Enter password" autofocus required />
      <button type="submit">Continue</button>
      ${showError ? '<p class="error">Incorrect password</p>' : ''}
    </form>
  </div>
</body>
</html>`;
}
