<?php
	print_r($_POST);

	$file = "data.json";
	$json_data = json_encode($_POST);

	file_put_contents($file, $json_data);

print_r($_POST);

?>