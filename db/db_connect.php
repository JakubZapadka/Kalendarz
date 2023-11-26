<?php
    require '../env-read.php';

    $servername = getenv('DB_HOST');
    $username = getenv('DB_USER');
    $password = getenv('DB_PASS');
    $db_name = getenv('DB_NAME');

    try
    {
        global $conn;
        $conn = mysqli_connect($servername, $username, $password, $db_name);
    }
    catch (Exception $e)
    {
        if(filter_var(getenv('DEV_MODE'), FILTER_VALIDATE_BOOLEAN)){ // DEVELOPER
            die('Wystąpił wyjątek nr '.$e->getCode().', '.$e->getMessage());
        }
        die('Błąd połączenia z bazą danych'); // PRODUCTION
    }
?>