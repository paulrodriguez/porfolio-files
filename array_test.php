<?php
//$select2 = array(0,1,2);
//$select = array('test' => '0', 'test1 '=> '1');
require_once('../movies/model/movies.class.php');
$movies = new Movies();
/*$test['select']['id'] = "id";
$test['table'] = "Actor";
$results = $movies->getActor($test);
if(is_int($results)) {echo "got -1";}
else {
while ($row = $results->fetch_assoc()) {
				print_r($row);
			}
}*/

$constaints['select']['id'] = 'id';
$constaints['select']['last'] = 'last';
$constaints['select']['first'] = 'first';
$constraints['table'] = "Actor";
//$constraints['order'] = 'first, last';
$getListOfActors = $movies->getActor($constraints);
while ($row = $getListOfActors->fetch_assoc()) {
	print_r($row);
}
//include '../model/connect.php';
//$con = db_con("movie_db");

?>