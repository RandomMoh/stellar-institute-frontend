/**
 * Generates a styled testimonial card as a canvas data URL.
 * Used to feed testimonial content into CircularGallery which expects image URLs.
 */
export function generateTestimonialCard({ quote, name, role, accentColor = '#2e3192', bgColor = '#ffffff', width = 800, height = 600 }) {
  const canvas = document.createElement('canvas');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Accent bar at top
  ctx.fillStyle = accentColor;
  ctx.fillRect(0, 0, width, 6);

  // Subtle top-right circle decoration
  ctx.save();
  ctx.globalAlpha = 0.06;
  ctx.fillStyle = accentColor;
  ctx.beginPath();
  ctx.arc(width - 40, 60, 120, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Stars
  const starY = 55;
  ctx.fillStyle = '#f59e0b';
  ctx.font = '28px Arial';
  ctx.textBaseline = 'middle';
  ctx.fillText('★★★★★', 52, starY);

  // Quote mark
  ctx.fillStyle = accentColor;
  ctx.globalAlpha = 0.15;
  ctx.font = 'bold 160px Georgia';
  ctx.textBaseline = 'top';
  ctx.fillText('"', 36, 50);
  ctx.globalAlpha = 1;

  // Quote text — wrapped
  ctx.fillStyle = '#334155';
  ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.textBaseline = 'top';
  const words = quote.split(' ');
  const lineH = 34;
  const maxW = width - 100;
  let line = '';
  let y = 105;
  for (const word of words) {
    const testLine = line + (line ? ' ' : '') + word;
    if (ctx.measureText(testLine).width > maxW && line) {
      ctx.fillText(line, 52, y);
      line = word;
      y += lineH;
    } else {
      line = testLine;
    }
  }
  if (line) ctx.fillText(line, 52, y);

  // Divider
  const dividerY = Math.min(y + 55, height - 120);
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(52, dividerY);
  ctx.lineTo(width - 52, dividerY);
  ctx.stroke();

  // Avatar circle
  const avatarX = 72;
  const avatarY = dividerY + 45;
  ctx.fillStyle = accentColor;
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, 24, 0, Math.PI * 2);
  ctx.fill();
  // Initials
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  ctx.fillText(initials, avatarX, avatarY);
  ctx.textAlign = 'left';

  // Name
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText(name, avatarX + 38, avatarY - 11);

  // Role
  ctx.fillStyle = accentColor;
  ctx.font = '600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText(role.toUpperCase(), avatarX + 38, avatarY + 13);

  return canvas.toDataURL('image/png');
}
