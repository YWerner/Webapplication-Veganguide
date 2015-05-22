<?php 
namespace Api\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Api\Model\VeganModel;

class VeganController {

    private $_model;

    public function __construct() {
		$this->_model = new VeganModel();
    }

    public function indexAction(Request $request, Application $app) {/*TODO*/}

    public function listCountries(Request $request, Application $app)
    {
        $this->_model->lang = ($request->attributes->get('lang') ? $request->attributes->get('lang') : "de");
        
		$result = $this->_model->getCountries();
		return $app->json($result);
    }

    public function listCities(Request $request, Application $app)
    {
        $this->_model->lang = ($request->attributes->get('lang') ? $request->attributes->get('lang') : "de");
        $this->_model->country = ($request->attributes->get('country') ? $request->attributes->get('country') : "de");

        $result = $this->_model->getCities();
        return $app->json($result);
    }
    
    public function listPlacesByCity(Request $request, Application $app)
    {
        $this->_model->city = ($request->attributes->get('city') ? $request->attributes->get('city') : "leipzig");
        $this->_model->lang = ($request->attributes->get('lang') ? $request->attributes->get('lang') : "de");
        $this->_model->country = ($request->attributes->get('country') ? $request->attributes->get('country') : "germany");
        $this->_model->answerparams = array("rating", "comments", "submitter", "address", "city", "country", "coords");

        $result = $this->_model->getPlacesByCity();
        return $app->json($result);
    }

}

?>