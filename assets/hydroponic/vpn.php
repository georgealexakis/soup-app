<?php
	header("Access-Control-Allow-Origin: *");
	if(isset($_GET["d"]))
    {
         $url = $_GET["url"];
		 $d = $_GET["d"];
		 $d = str_replace(" ", "%20", $d);
		 //print_r('<p>'.$d.'</p>'); 
		 //$data = file_get_contents($d);
		 //$data = file_get_contents("http://143.233.183.13/iq16l/iq_vpn.php?d=".$d);
		 //$data = file_get_contents("http://192.168.2.11:8080/iq/on.php?d=".$d);
		 //print_r("OK FROM VPN.PHP:".$url."?d=".$d);	
		 $data = file_get_contents($url."?d=".$d);
	 	 print_r($data);
	}
	else
	{
		print_r("ERROR FROM VPN.PHP:".$url."?d=".$d);		
	}

?>
