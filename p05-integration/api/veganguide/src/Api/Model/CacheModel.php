<?php
namespace Api\Model;

use Symfony\Component\HttpFoundation\Request;

class CacheModel {
	private $_cachetime = 1800; //60*60

	public function _getcache($cachefile)
	{		
		$cachetime=$this->_cachetime;
		if (file_exists($cachefile) && time() - $cachetime < filemtime($cachefile))
		{
			return file_get_contents($cachefile);
		}
		else
		{
			return false;
		}
	}
	
	public function _writecache($cachefile, $json)
	{
		$cached = fopen($cachefile, 'w');
		fwrite($cached, $json);
		fclose($cached);
	}
	
	public function _getCacheFileName(Request $request)
	{
		$answer = '';
		$params = $request->attributes->all();
		foreach ( $params as $key => $val )
		{
			if (strpos($key, '_') === false && $key!='app')
			{
				$answer .= $val;
			}
		}
		return '../tmp/'.$answer.'.tmp';
	}
}

?>