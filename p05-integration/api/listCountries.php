<?php
/* Parameter
*
* Es wird ein Parameter via GET oder POST erwartet
* 1. lang: Default = de
*
*/

require_once(dirname(__FILE__)."/config/config.inc.php");
$method = "vg.browse.listCountries";

/* 
*
* Parameter setzen 
*
*/
$lang = (isset($_GET["lang"]) ? $_GET["lang"] : (isset($_POST["lang"]) ? $_POST["lang"] : "de"));

$data = array(
    "apikey" => $apikey,
    "lang" => $lang
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
* Array als JSON encoden
*
*/
	echo json_encode($response);
}

?>