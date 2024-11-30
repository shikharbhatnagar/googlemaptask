# Replace the Google Map API Key

### src/components/GMapComponent.jsx


# Setup PHP file to save location data

### xamp/htdocs/googlemaptask/save-location.php


# Create table gpslocations in DB googlemaptask_db

CREATE TABLE `gpslocations` (
  `id` int(11) NOT NULL,
  `ip` varchar(20) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
