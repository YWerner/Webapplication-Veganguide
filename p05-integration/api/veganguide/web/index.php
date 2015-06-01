<?php 
require_once __DIR__.'/../vendor/autoload.php';

$app = new Silex\Application();
$app['debug'] = true;

//$app['autoloader']->registerNamespace('Api', __DIR__.'/../src');

$app->get('veganguide/', function() use ($app) {
    echo 'API Veganguide Mobile';
});

$app->get('api/veganguide/index', 'Api\Controller\VeganController::indexAction');

$app->get('api/veganguide/local/{lang}', 'Api\Controller\VeganController::listCountries');

$app->get('api/veganguide/local/{lang}/country/{country}', 'Api\Controller\VeganController::listCities');

$app->get('api/veganguide/local/{lang}/country/{country}/city/{city}', 'Api\Controller\VeganController::listPlacesByCity');

$app->get('api/veganguide/local/{lang}/lon/{lon}/lat/{lat}/radius/{radius}', 'Api\Controller\VeganController::searchByCoords');

$app->get('api/veganguide/local/{lang}/place/{place}/action/info', 'Api\Controller\VeganController::getInfo');

$app->get('api/veganguide/local/{lang}/place/{place}/action/comments', 'Api\Controller\VeganController::getComments');

$app->get('api/veganguide/local/{lang}/place/{place}/action/image/width/{width}', 'Api\Controller\VeganController::getImage');
/*
$app->get('veganguide/suche/{value}', function ($id) {

    $xml = xmlrpc_encode_request(
        'vg.browse.listPlacesByCity',
        array(
            'apikey' => 'btlvbcwm31hn',
            'lang' => 'de',
            'city' => $id,
            'country' => 'germany'
        )
    );
    echo $xml;

    $context = stream_context_create(array('http' => array(
        'method' => "POST",
        'header' => "Content-Type: text/xml",
        'content' => $xml
    )));
    
    $file = file_get_contents("http://veganguide.org/api'", false, $context);
    $response = xmlrpc_decode($file);
    echo '<pre>'; var_dump($response);
    
    return $id;
});
*/
$app->run();
