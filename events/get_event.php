<?php
require_once '../db/db_connect.php';

$sql = "SELECT id, date_and_time, duration, location, title, description FROM events";

$result = $conn->query($sql);
if ($result) {
    $data = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode(['status' => 'ok', 'data' => $data]);
} else {
    echo json_encode(['status' => 'error', 'message' => $conn->error]);
}

require_once '../db/db_close.php';
?>
