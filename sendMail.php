<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name    = htmlspecialchars($_POST["name"] ?? "");
    $email   = filter_var($_POST["email"] ?? "", FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars($_POST["message"] ?? "");

    if (!$name || !$email || !$message) {
        http_response_code(400);
        echo "שדות חסרים או לא תקינים";
        exit;
    }

    $to = "yosef.dabush33@gmail.com"; 
    $subject = "הודעה חדשה מהאתר";
    $body = "שם: $name\nמייל: $email\n\nהודעה:\n$message";
    $headers = "From: website@dabush.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "ההודעה נשלחה בהצלחה";
    } else {
        http_response_code(500);
        echo "שליחה נכשלה";
    }
}
?>
