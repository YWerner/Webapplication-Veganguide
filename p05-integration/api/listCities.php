<?php
/* Parameter
*
* Es werden zwei Parameter via GET oder POST erwartet
* 1. country: Default = germany
* 2. lang: Default = de
*
*/

require_once(dirname(__FILE__)."/config/config.inc.php");
$method = "vg.browse.listCities";

$country = (isset($_GET["country"]) ? $_GET["country"] : (isset($_POST["country"]) ? $_POST["country"] : "germany"));
$lang = (isset($_GET["lang"]) ? $_GET["lang"] : (isset($_POST["lang"]) ? $_POST["lang"] : "de"));

/*
*
*Parameter setzen
*
*/
$data = array(
    "apikey" => $apikey,
    "lang" => $lang,
    "country" => $country
);

/* daten-array in einen xml-query umwandeln */

$request = xmlrpc_encode_request($method, $data);

/* request an den server schicken und response abholen */

$response = file_get_contents($server, false, stream_context_create(
    array(
        "http" => array(
            "method" => "POST",
            "header" => "Content-Type: text/xml\r\n",
            "content" => $request
        )
    )
));

/* rückgabe von xml in ein array umwandeln */

$response = xmlrpc_decode($response);

/* Wenn die Antwort einen Fehler enthält loggen */

if (xmlrpc_is_fault($response)) 
{
/*
*
* An dieser Stelle loggen
*
* Fehler: ".$response["faultCode"]." ".$response["faultString"];
*
*/
} 
else 
{
/*
*
*
* Array als JSON zurückgeben
*
*/
	echo json_encode($response);
}

?>