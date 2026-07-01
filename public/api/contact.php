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
$to = "info@stellarinstitute.pk"; // Local cPanel email for direct delivery

// Build the email
$emailSubject = "New Website Inquiry: $subjectLabel";

$emailBody = "
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <style>
        /* Force light mode styles to prevent webmail clients from applying dark mode inversions */
        :root {
            color-scheme: light;
        }
        body { 
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
            background-color: #f3f4f6; 
            margin: 0; 
            padding: 40px 20px; 
            -webkit-font-smoothing: antialiased;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: #ffffff; 
            border-radius: 12px; 
            overflow: hidden; 
            box-shadow: 0 4px 15px rgba(0,0,0,0.05); 
        }
        .header { 
            background-color: #1e3a8a; /* Deep professional blue */
            padding: 30px; 
            text-align: center; 
            border-bottom: 4px solid #3b82f6;
        }
        .header h1 { 
            margin: 0; 
            color: #ffffff; 
            font-size: 24px; 
            font-weight: 600; 
            letter-spacing: 0.5px;
        }
        .content { 
            padding: 40px 30px; 
            background-color: #ffffff;
        }
        .intro {
            color: #4b5563;
            font-size: 16px;
            margin-top: 0;
            margin-bottom: 30px;
            line-height: 1.5;
        }
        .field-group { 
            margin-bottom: 24px; 
        }
        .label { 
            display: block;
            font-size: 12px; 
            text-transform: uppercase; 
            color: #6b7280; 
            font-weight: 700; 
            letter-spacing: 0.8px; 
            margin-bottom: 6px; 
        }
        .value { 
            font-size: 16px; 
            color: #111827; 
            background-color: #f9fafb;
            padding: 12px 16px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
            word-break: break-word;
        }
        .value a {
            color: #2563eb;
            text-decoration: none;
        }
        .message-box { 
            font-size: 15px; 
            color: #1f2937; 
            background-color: #f0f9ff; 
            padding: 20px; 
            border-radius: 8px; 
            border-left: 4px solid #3b82f6; 
            line-height: 1.6;
            white-space: pre-wrap;
        }
        .footer { 
            background-color: #f9fafb; 
            text-align: center; 
            padding: 24px; 
            color: #9ca3af; 
            font-size: 13px; 
            border-top: 1px solid #e5e7eb; 
        }
        .footer p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>New Website Inquiry</h1>
        </div>
        <div class='content'>
            <p class='intro'>You have received a new message from the <strong>Stellar Institute</strong> website contact form.</p>
            
            <div class='field-group'>
                <span class='label'>Full Name</span>
                <div class='value'>$name</div>
            </div>
            
            <div class='field-group'>
                <span class='label'>Email Address</span>
                <div class='value'><a href='mailto:$email'>$email</a></div>
            </div>
            
            <div class='field-group'>
                <span class='label'>Phone Number</span>
                <div class='value'>$phone</div>
            </div>
            
            <div class='field-group'>
                <span class='label'>Subject</span>
                <div class='value'><strong>$subjectLabel</strong></div>
            </div>
            
            <div class='field-group'>
                <span class='label'>Message</span>
                <div class='message-box'>$message</div>
            </div>
        </div>
        <div class='footer'>
            <p>This is an automated email from the Stellar Institute website.</p>
            <p>&copy; " . date('Y') . " Stellar Institute. All rights reserved.</p>
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
$sent = mail($to, $emailSubject, $emailBody, $headers, "-fnoreply@stellarinstitute.pk");

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    $error = error_get_last();
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email. Please try again later.', 'debug' => $error]);
}

