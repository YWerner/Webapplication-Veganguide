<?php
namespace Api\Model;

class XmlModel {
	
	private $_server = API_URL;
	
    protected function _doApiCall($method, $data)
    {
        /* daten-array in einen xml-query umwandeln */
        $request = xmlrpc_encode_request($method, $data);

        /* request an den server schicken und response abholen */
        $response = file_get_contents($this->_server, false, stream_context_create(
            array(
                "http" => array(
                    "method" => "POST",
                    "header" => "Content-Type: text/xml charset=UTF-8\r\n",
                    "content" => $request
                )
            )
        ));

        /* rueckgabe von xml in ein array umwandeln */
        $response = xmlrpc_decode_request($response, $method);

        /* Wenn die Antwort einen Fehler enthält loggen */
        if (xmlrpc_is_fault($response)) {
            /*
            *
            * An dieser Stelle loggen
            * Fehler: ".$response["faultCode"]." ".$response["faultString"];
            *
            */
            return "Fehler: ".$response["faultCode"]." ".$response["faultString"]. "listCountries";
        }
        /*Daten muessen noch sortiert werden*/
        return $response;
    }
	
}