<?php
$months = array();
date_default_timezone_set('GMT');
$date = new DateTime('2000-01-01');

for ($x = 0; $x <= 11; $x++) {
    array_push($months, $date->format('F'));
    date_add($date, date_interval_create_from_date_string('1 month'));
}
print_r($months);

?>