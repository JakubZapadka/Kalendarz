<?php
$envFilePath = __DIR__ . '/.env';

if (file_exists($envFilePath)) {
    $envFileContents = file_get_contents($envFilePath);
    $envLines = explode("\n", $envFileContents);

    foreach ($envLines as $line) {
        if (empty($line) || strpos($line, '#') === 0) {
            continue;
        }

        list($key, $value) = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        putenv("{$key}={$value}");
    }
}
?>