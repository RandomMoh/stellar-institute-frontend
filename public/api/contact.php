<?php
// CORS headers for the React frontend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Get JSON body
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required = ['name', 'email', 'subject', 'message'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => "Missing required field: $field"]);
        exit;
    }
}

// Sanitize inputs
$name    = htmlspecialchars(strip_tags(trim($input['name'])));
$email   = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$phone   = htmlspecialchars(strip_tags(trim($input['phone'] ?? 'Not provided')));
$subject = htmlspecialchars(strip_tags(trim($input['subject'])));
$message = htmlspecialchars(strip_tags(trim($input['message'])));

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address']);
    exit;
}

// Map subject codes to readable names
$subjectMap = [
    'admission' => 'Admission Inquiry',
    'courses'   => 'Course Information',
    'fees'      => 'Fee Structure',
    'general'   => 'General Inquiry'
];
$subjectLabel = $subjectMap[$subject] ?? $subject;

// ── Stellar Institute's receiving email ──
$to = "mohsinddop2309@gmail.com"; // Temporarily set for testing as requested

// Build the email
$emailSubject = "New Website Inquiry: $subjectLabel";

$emailBody = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f4f7fa; padding: 20px; }
        .email-card { background: #fff; max-width: 600px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .email-header { background: linear-gradient(135deg, #0ea5e9, #0284c7); padding: 24px; color: #fff; }
        .email-header h2 { margin: 0; font-size: 20px; }
        .email-body { padding: 24px; }
        .field { margin-bottom: 16px; }
        .field-label { font-size: 12px; text-transform: uppercase; color: #999; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 4px; }
        .field-value { font-size: 15px; color: #333; }
        .message-box { background: #f8fafc; border-left: 4px solid #0ea5e9; padding: 16px; border-radius: 4px; margin-top: 8px; }
        .email-footer { text-align: center; padding: 16px; color: #aaa; font-size: 12px; border-top: 1px solid #eee; }
    </style>
</head>
<body>
    <div class='email-card'>
        <div class='email-header'>
            <h2>📩 New Website Inquiry</h2>
        </div>
        <div class='email-body'>
            <div class='field'>
                <div class='field-label'>Full Name</div>
                <div class='field-value'>$name</div>
            </div>
            <div class='field'>
                <div class='field-label'>Email Address</div>
                <div class='field-value'><a href='mailto:$email'>$email</a></div>
            </div>
            <div class='field'>
                <div class='field-label'>Phone Number</div>
                <div class='field-value'>$phone</div>
            </div>
            <div class='field'>
                <div class='field-label'>Subject</div>
                <div class='field-value'>$subjectLabel</div>
            </div>
            <div class='field'>
                <div class='field-label'>Message</div>
                <div class='message-box'>$message</div>
            </div>
        </div>
        <div class='email-footer'>
            Sent from Stellar Academy Website Contact Form
        </div>
    </div>
</body>
</html>
";

// Email headers
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Stellar Academy <noreply@stellarinstitute.pk>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";

// Send the email
$sent = mail($to, $emailSubject, $emailBody, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email. Please try again later.']);
}
