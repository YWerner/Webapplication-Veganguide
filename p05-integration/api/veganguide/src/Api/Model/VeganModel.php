<?php 
namespace Api\Model;

include '../inc/xmlrpc-3.0.1/lib/xmlrpc.inc';
include '../inc/xmlrpc-3.0.1/extras-0.5/xmlrpc_extension_api/xmlrpc_extension_api.inc';
include '../config/api.config.inc';

use Api\Model\XmlModel;

class VeganModel extends XmlModel {

    private $_apikey = API_KEY;
	private $_lang;
	private $_city;
	private $_country;
	private $_answerparams;
	
	public function __set($variable, $value)
	{
		$variable = '_' . $variable; 
		$this->$variable = $value;
	}
	
	public function getCountries()
	{
        $method = "vg.browse.listCountries";

        $data = array(
            "apikey"	=> $this->_apikey,
            "lang"		=> $this->_lang
        );

        $response = $this->_doApiCall($method, $data);
        //TODO Problem mit umlauten loesen!
        //var_dump(str_replace('&#38;', '&', $app->json($response)));
        return  $response;
	}

    public function getCities()
    {
        $method = "vg.browse.listCities";

        $data = array(
            "apikey"	=> $this->_apikey,
            "lang"		=> $this->_lang,
            "country"	=> $this->_country
        );

        $response = $this->_doApiCall($method, $data);
        return $response;
    }
    
    public function getPlacesByCity()
    {
        $method = "vg.browse.listPlacesByCity";
        
        $data = array(
            "apikey"	=> $this->_apikey,
            "lang"		=> $this->_lang,
            "city"		=> $this->_city,
            "country"	=> $this->_country,
            "verbose"	=> $this->_answerparams
        );

        $response = $this->_doApiCall($method, $data);
        return $response;
    }

}
?>