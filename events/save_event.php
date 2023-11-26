<?php
require_once '../db/db_connect.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    if ($_POST['action'] === 'add') {
        $title = $_POST['title'];
        $date = $_POST['date'];
        $duration = $_POST['duration'];
        $location = $_POST['location'];
        $description = $_POST['description'];

        $dateTime = new DateTime($date);
        $formattedDate = $dateTime->format("Y-m-d H:i:s");

        $initialDate = new DateTime($date);
        $initialTimeInMinutes = $initialDate->format('H') * 60 + $initialDate->format('i');
        if($initialTimeInMinutes + intval($duration) > 1440){
            echo json_encode(['status' => 'error', 'message' => 'Nieprawidłowa akcja w danych.']);
            exit;
        }

        $sql = "INSERT INTO events (title, date_and_time, duration, location, description) VALUES ('$title', '$date', '$duration', '$location', '$description')";

        if ($conn->query($sql) === TRUE) {
            $insertedId = $conn->insert_id;
            echo json_encode(['status' => 'ok', 'Object' => ['id' => $insertedId, 'title' => $title, 'date_and_time' => $formattedDate, 'duration' => $duration, 'location' => $location, 'description' => $description]]);
        } else {
            echo json_encode(['status' => 'error', 'message' => $conn->error]);
        }
    } elseif ($_POST['action'] === 'update') {
        $id = $_POST['id']; // Identyfikator rekordu do zaktualizowania
        $title = $_POST['title'];
        $date = $_POST['date'];
        $duration = $_POST['duration'];
        $location = $_POST['location'];
        $description = $_POST['description'];

        $dateTime = new DateTime($date);
        $formattedDate = $dateTime->format("Y-m-d H:i:s");

        $initialDate = new DateTime($date);
        $initialTimeInMinutes = $initialDate->format('H') * 60 + $initialDate->format('i');
        if($initialTimeInMinutes + intval($duration) > 1440){
            echo json_encode(['status' => 'error', 'message' => 'Nieprawidłowa akcja w danych.']);
            exit;
        }

        $sql = "UPDATE events SET title='$title', date_and_time='$date', duration='$duration', location='$location', description='$description' WHERE id=$id";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['status' => 'ok', 'Object' => ['id' => $id, 'title' => $title, 'date_and_time' => $formattedDate, 'duration' => $duration, 'location' => $location, 'description' => $description]]);
        } else {
            echo json_encode(['status' => 'error', 'message' => $conn->error]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Nieprawidłowa akcja w danych.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Nieprawidłowa metoda żądania.']);
}

require_once '../db/db_close.php';
?>
