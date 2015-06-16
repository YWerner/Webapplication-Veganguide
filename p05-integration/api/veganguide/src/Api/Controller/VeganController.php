<?php 
namespace Api\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Api\Model\VeganModel;
use Api\Model\CacheModel;

class VeganController {

    private $_model;
	private $_cache;

    public function __construct() {
		$this->_model = new VeganModel();
		$this->_cache = new CacheModel();
    }

    public function indexAction(Request $request, Application $app) {/*TODO*/}

    public function listCountries(Request $request, Application $app)
    {
		$cachefile = $this->_cache->_getCacheFileName($request);
        $json = $this->_cache->_getcache($cachefile);
		if($json!==false)
		{
			return $json;
		}
		else
		{
			$this->_model->lang = ($request->attributes->get('lang') ? $request->attributes->get('lang') : "de");
        
			$result = $this->_model->getCountries();
			$this->_cache->_writecache($cachefile, json_encode($result));
			return $app->json($result);
		}
    }

    public function listCities(Request $request, Application $app)
    {
		$cachefile = $this->_cache->_getCacheFileName($request);
        $json = $this->_cache->_getcache($cachefile);
		if($json!==false)
		{
			return $json;
		}
		else
		{
			$this->_model->lang = ($request->attributes->get('lang') ? $request->attributes->get('lang') : "de");
			$this->_model->country = ($request->attributes->get('country') ? $request->attributes->get('country') : "germany");
			
			$result = $this->_model->getCities();
			$json=json_encode($result);
			$this->_cache->_writecache($cachefile, $json);
			return $app->json($result);
		}
    }
    
    public function listPlacesByCity(Request $request, Application $app)
    {
		$cachefile = $this->_cache->_getCacheFileName($request);
        $json = $this->_cache->_getcache($cachefile);
		if($json!==false)
		{
			return $json;
		}
		else
		{
			$this->_model->city = ($request->attributes->get('city') ? $request->attributes->get('city') : "leipzig");
			$this->_model->lang = ($request->attributes->get('lang') ? $request->attributes->get('lang') : "de");
			$this->_model->country = ($request->attributes->get('country') ? $request->attributes->get('country') : "germany");
			$this->_model->answerparams = array("rating", "comments", "submitter", "address", "city", "country", "coords");
			
			$result = $this->_model->getPlacesByCity();
			$json=json_encode($result);
			$this->_cache->_writecache($cachefile, $json);
			return $app->json($result);
		}
    }
	
	public function getInfo(Request $request, Application $app)
    {
		$cachefile = $this->_cache->_getCacheFileName($request);
		$json = $this->_cache->_getcache($cachefile);
		if($json!==false)
		{
			return $json;
		}
		else
		{
			$this->_model->lang = ($request->attributes->get('lang') ? $request->attributes->get('lang') : "de");
			$this->_model->place = ($request->attributes->get('place') ? $request->attributes->get('place') : "al-bascha-bistro");
			
			$result = $this->_model->getInfo();
			$json=json_encode($result);
			$this->_cache->_writecache($cachefile, $json);
			return $app->json($result);
		}
    }

	public function getComments(Request $request, Application $app)
    {
		$cachefile = $this->_cache->_getCacheFileName($request);
		$json = $this->_cache->_getcache($cachefile);
		if($json!==false)
		{
			return $json;
		}
		else
		{
			$this->_model->lang = ($request->attributes->get('lang') ? $request->attributes->get('lang') : "de");
			$this->_model->place = ($request->attributes->get('place') ? $request->attributes->get('place') : "al-bascha-bistro");
			
			$result = $this->_model->getComments();
			$json=json_encode($result);
			$this->_cache->_writecache($cachefile, $json);
			return $app->json($result);
		}
    }
	
	public function getImage(Request $request, Application $app)
    {
		$cachefile = $this->_cache->_getCacheFileName($request);
        $json = $this->_cache->_getcache($cachefile);
		if($json!==false)
		{
			return $json;
		}
		else
		{
			$this->_model->lang = ($request->attributes->get('lang') ? $request->attributes->get('lang') : "de");
			$this->_model->place = ($request->attributes->get('place') ? $request->attributes->get('place') : "al-bascha-bistro");
			$this->_model->width = ($request->attributes->get('width') ? $request->attributes->get('width') : "300");
			
			$result = $this->_model->getImage();
			$json=json_encode($result);
			$this->_cache->_writecache($cachefile, $json);
			return $app->json($result);
		}
    }
	
	public function searchByCoords(Request $request, Application $app)
    {
		$cachefile = $this->_cache->_getCacheFileName($request);
		$json = $this->_cache->_getcache($cachefile);
		if($json!==false)
		{
			return $json;
		}
		else
		{
			$this->_model->lang = ($request->attributes->get('lang') ? $request->attributes->get('lang') : "de");
			$this->_model->query = array(
										"lon" => ($request->attributes->get('long') ? $request->attributes->get('long') : 12.3333333),
										"lat" => ($request->attributes->get('lat') ? $request->attributes->get('lat') : 51.3),
										"radius" => ($request->attributes->get('radius') ? $request->attributes->get('radius') : 20)
										);
			$this->_model->answerparams = array("rating", "comments", "submitter", "address", "city", "country", "coords");
			
			$result = $this->_model->getPlacesByCoords();
			$json=json_encode($result);
			$this->_cache->_writecache($cachefile, $json);
			return $app->json($result);
		}
    }
	
	public function getBlogThemes(Request $request, Application $app)
	{
		$cachefile = $this->_cache->_getCacheFileName($request);
		$json = $this->_cache->_getcache($cachefile);
		if($json!==false)
		{
			return $json;
		}
		else
		{
			$blog = $this->_model->getBlogThemes();
			$json=json_encode($blog);
			$this->_cache->_writecache($cachefile, $json);
			return $app->json($blog);
		}
	}
	
	public function getBlogComments(Request $request, Application $app)
	{
		$cachefile = $this->_cache->_getCacheFileName($request);
		$json = $this->_cache->_getcache($cachefile);
		if($json!==false)
		{
			return $json;
		}
		else
		{
			$this->_model->identifier = ($request->attributes->get('identifier') ? $request->attributes->get('identifier') : null);
			$comments = $this->_model->getBlogComments();
			$json=json_encode($comments);
			$this->_cache->_writecache($cachefile, $json);
			return $app->json($comments);
		}
	}
}

?>