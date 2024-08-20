<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $subject }}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 4px; }
        h1 { color: #333333; }
        p { color: #666666; }
    </style>
</head>
<body>
    <div class="container">
        <h1>{{ $subject }}</h1>
        <p>Message de {{ $user->firstname }} {{ $user->lastname }}</p>
        <p>Email : {{ $user->email }}</p>
        <p>{{ $text }}</p>
    </div>
</body>
</html>
