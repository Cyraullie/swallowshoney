<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 4px;
        }
        h1 {
            color: #333333;
        }
        p {
            color: #666666;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 4px;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome, {{ $user->name }}!</h1>
        <p>Thank you for signing up with us. We are excited to have you on board.</p>
        <p><a href="{{ url('/') }}" class="button">Visit Our Website</a></p>
        <p>If you have any questions, feel free to reply to this email.</p>
        <p>Best regards,<br>Your Company</p>
    </div>
</body>
</html>
