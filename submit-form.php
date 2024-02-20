<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullName = $_POST['fullName'];
    $dob = $_POST['dob'];
    $phoneNumber = $_POST['phoneNumber'];
    $preferredDateTime = $_POST['preferredDateTime'];

    $message = "New Massage Booking: Name: $fullName Date of Birth: $dob Phone Number: $phoneNumber Preferred Date and Time: $preferredDateTime";

    $botToken = '6339368271:AAEz62ZF4Pm1wW_XP5KRjjFEEbAFHSzEiPM';
    $chatId = '-1002007841427';

    $telegramApiUrl = "https://api.telegram.org/bot$botToken/sendMessage?chat_id=$chatId&text=" . urlencode($message);

    // Используйте cURL для отправки запроса
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $telegramApiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response !== false && $httpCode === 200) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to send message', 'http_code' => $httpCode]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>

