<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization');
header('Access-Control-Allow-Methods: *');
header('Content-Type: application/json');

$host = "localhost:3307";
$dbname = "googlemaptask_db";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed"]);
    die;
}

$data = json_decode(file_get_contents('php://input'), true);
$latitude = $data['lat'];
$longitude = $data['lng'];
$ipaddress = $_SERVER['REMOTE_ADDR'];
try {
    $stmt = $pdo->prepare("INSERT INTO gpslocations (ip, latitude, longitude) VALUES (:ip, :lat, :log)");
    $stmt->bindParam(':ip', $ipaddress);
    $stmt->bindParam(':lat', $latitude);
    $stmt->bindParam(':log', $longitude);
    $stmt->execute();
    echo json_encode(["message" => "GPS Location saved successfully!"]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Failed to save GPS Location: " . $e->getMessage()]);
}