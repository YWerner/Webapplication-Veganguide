<?php 
header('Content-type: application/json');

require_once __DIR__.'/../vendor/autoload.php';

$app = new Silex\Application();

// only for testing
$app['debug'] = true;

$app->get('veganguide/index', 'Api\Controller\VeganController::indexAction');

$app->get('veganguide/local/{lang}', 'Api\Controller\VeganController::listCountries');

$app->get('veganguide/local/{lang}/country/{country}', 'Api\Controller\VeganController::listCities');

$app->get('veganguide/local/{lang}/country/{country}/city/{city}', 'Api\Controller\VeganController::listPlacesByCity');

$app->run();