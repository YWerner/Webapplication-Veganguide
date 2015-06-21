<?php 
namespace Api\Model;

include '../inc/xmlrpc-3.0.1/lib/xmlrpc.inc';
include '../inc/xmlrpc-3.0.1/extras-0.5/xmlrpc_extension_api/xmlrpc_extension_api.inc';
include '../config/api.config.inc';

use Api\Model\XmlModel;
use Api\Model\CacheModel;

class VeganModel extends XmlModel {

    private $_apikey = API_KEY;
	private $_lang;
	private $_city;
	private $_country;
	private $_place;
	private $_query;
	private $_width;
	private $_answerparams;
	private $_identifier;
	
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
	
	public function getPlacesByCoords()
    {
        $method = "vg.search.byCoords";
        
        $data = array(
            "apikey"	=> $this->_apikey,
            "lang"		=> $this->_lang,
            "query"		=> $this->_query,
			"verbose" => $this ->_answerparams
        );

        $response = $this->_doApiCall($method, $data);
        return $response;
    }
	
	public function getInfo()
    {
        $method = "vg.place.getInfo";
        
        $data = array(
            "apikey"	=> $this->_apikey,
            "lang"		=> $this->_lang,
            "place"		=> $this->_place
        );

        $response = $this->_doApiCall($method, $data);
        return $response;
    }
	
	public function getComments()
    {
        $method = "vg.place.getComments";
        
        $data = array(
            "apikey"	=> $this->_apikey,
            "lang"		=> $this->_lang,
            "place"		=> $this->_place
        );

        $response = $this->_doApiCall($method, $data);
        return $response;
    }
	
	public function getImage()
    {
        $method = "vg.place.getImage";
        
        $data = array(
            "apikey"	=> $this->_apikey,
            "lang"		=> $this->_lang,
            "place"		=> $this->_place,
			"width" => $this ->_width,
			"returnmethod" => 0
        );

        $response = $this->_doApiCall($method, $data);
        return $response;
    }
    
    public function getNewPlaces()
    {
        $filename = 'http://veganguide.org/feeds/places';
        
	    // Feed laden
	    if( !$xml = simplexml_load_file($filename) ) {
	        die('Fehler beim Einlesen der XML Datei!');
	    }
	    
	    // Items vorhanden?
	    if( !isset($xml->channel->item) ) {
	        die('Keine Items vorhanden!');
	    }
	    
	    $return = array('status' => 'ok', 'data' => array());

	    foreach($xml->channel->item as $item) {
	    	$link = explode('/', $item->link);
	        $title = explode('(', $item->title);
	        $return['data'][] = array(
	        	'identifier' => $link[(count($link)-1)],
	        	'name' => ($title[0]),
	        	'city' => (substr($title[1], 0, -1)),
	        	'description' => trim($item->description)
	        );
	    }
	    return $return;
    }
	
	public function getBlogThemes()
	{	
		$dom_document = new \DOMDocument();
		$dom_document->loadHTMLFile("http://veganguide.org/blog");
		$xpath = new \DOMXpath($dom_document);
		$elements = $xpath->query("//div[@class='item']");
		$count=0;
		$response['status']='ok';
		foreach ($elements as $element)
		{
			$blog[$count]["head"]=$xpath->query("h3/a" , $element)->item(0)->nodeValue;
			$blog[$count]["supplier"]=$xpath->query("p/a" , $element)->item(0)->nodeValue;
			$blog[$count]["href"]=$xpath->query("h3/a/@href" , $element)->item(0)->nodeValue;
				$body=$xpath->query("p" , $element)->item(1)->nodeValue;
			$blog[$count]["body"]=trim($body);
				$date=$xpath->query("p", $element)->item(0)->textContent;
				$date=explode(" von ",$date);
			$blog[$count]["date"]=str_replace(" ","T",$date[0]);
				$href=$xpath->query("h3/a/@href" , $element)->item(0)->nodeValue;
				$identifier=explode("http://veganguide.org/blog/", $href);
			$blog[$count]["identifier"]= (count($identifier)>1 ? $identifier[1] : null);

			$count++;
		}
		$response['data']=$blog;
		return $response;
	}
	
	public function getBlogComments()
	{
		$identifier = $this->_identifier;
		$dom_doc_comments = new \DOMDocument();
		$dom_doc_comments->loadHTMLFile("http://veganguide.org/blog/".$identifier);
		$xpath_comments = new \DOMXpath($dom_doc_comments);
		
		$elements = $xpath_comments->query("//div[@class='item']");
		$count=0;

		$doc_comments = $xpath_comments->query("//div[@class='item']");
		$comments_index=-1;
		$response['status']='ok';
		foreach ($doc_comments as $com)
		{
			if($comments_index>-1)
			{
				$comments[$comments_index]["supplier"]=$xpath_comments->query("h4/a" , $com)->item(0)->nodeValue;
				$comments[$comments_index]["body"]=$xpath_comments->query("blockquote" , $com)->item(0)->nodeValue;
					$date=$xpath_comments->query("h4/span" , $com)->item(0)->nodeValue;
					$date=explode(' ',str_replace('.','',$date));
				$comments[$comments_index]["date"]=$date[2].'-'.$date[1].'-'.$date[0].'T'.$date[3];
				$comments[$comments_index]["supplier_img"]=($xpath_comments->query("img/@src" , $com)->length>0) ? $xpath_comments->query("img/@src" , $com)->item(0)->nodeValue : null;
			}
			$comments_index++;
		}
		$response['data']=$comments;
		return $response;
	}
}
?>