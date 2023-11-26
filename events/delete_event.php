<?php
require_once '../db/db_connect.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : -1;

if($id > -1){
    $sql = "DELETE FROM `events` WHERE id = $id";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 'ok', 'message' => 'Record deleted successfully']);
      } else {
        echo json_encode(['status' => 'error', 'message' => $conn->error]);
      }
}

require_once '../db/db_close.php';
?>
