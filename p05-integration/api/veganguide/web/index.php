<?php 
header("Access-Control-Allow-Origin: *");

require_once __DIR__.'/../vendor/autoload.php';

$app = new Silex\Application();
$app['debug'] = true;

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

$app->get('api/veganguide/newplaces', 'Api\Controller\VeganController::listNewPlaces');

$app->get('api/veganguide/local/{lang}/blog', 'Api\Controller\VeganController::getBlogThemes');

$app->get('api/veganguide/local/{lang}/blog/identifier/{identifier}', 'Api\Controller\VeganController::getBlogComments');

$app->run();
