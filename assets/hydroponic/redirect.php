<?php
    //var LocalServerPath='./redirect.php?VPNServerURL=http://143.233.183.205:8080/iq17/vpn.php
	//&BBBURL=http://192.168.2.15:8080/iq/on.php
	//&IQURL=http://192.168.1.200/LOCALFS/SCREEN1.TXT
	header("Access-Control-Allow-Origin: *");
    $VPNServerURL  = "";
	$BBBURL        = "";
    $IQURL         = "";
	$finalurl = "***";
	
	global $dbServer; 
	global $dbUser; 
	global $dbPass;
	global $dbName; 

	//******************************************************
	if( isset($_GET["VPNServerURL"]) ) 
	{
		$VPNServerURL  = $_GET["VPNServerURL"];
		$VPNServerURL  = str_replace(" ", "%20", $VPNServerURL);
	}
	if( isset($_GET["BBBURL"]) ) 
	{
		$BBBURL  = $_GET["BBBURL"];
		$BBBURL  = str_replace(" ", "%20", $BBBURL);
	}
	if( isset($_GET["IQURL"]) ) 
	{
		 $IQURL = $_GET["IQURL"];
		 $IQURL = str_replace(" ", "%20", $IQURL);
	}
	//******************************************************
    if( isset($_GET["USESQL"]) )
	{ 
		if( $_GET["USESQL"] == '1')
		{
		$dbServer ='alagro.eu'; 
    	$dbUser   ='axilleas'; 
	    $dbPass   ='markella';
    	$dbName   ='my_iq'; 
		$SQL_HOST_CONNECTION_RESOURCE_ID = mysql_connect($dbServer,$dbUser,$dbPass);
		$SQL_DATABASE_SELECTION_RESULT = mysql_select_db($dbName,$SQL_HOST_CONNECTION_RESOURCE_ID);
		mysql_query("SET NAMES 'UTF8'");
		$BBB_IP_FromDataBase="";
		//$SQL_QUERY="SELECT * FROM iq_vpn_clients WHERE ( ClientID = 'AXILLEAS-HOME-BBB' ) ";
		$SQL_QUERY="SELECT * FROM iq_vpn_clients WHERE ( ClientID = '$BBBURL' ) ";
		//echo $SQL_QUERY;
		$SQL_RESULTS_RESOURCE_ID = mysql_query($SQL_QUERY,$SQL_HOST_CONNECTION_RESOURCE_ID) or die(mysql_error());
		$SQL_NUMBER_OF_ROWS_RETURNED_FROM_QUERY = mysql_num_rows($SQL_RESULTS_RESOURCE_ID);
	
		if ($SQL_NUMBER_OF_ROWS_RETURNED_FROM_QUERY >0)
		{
			$newArray = mysql_fetch_array($SQL_RESULTS_RESOURCE_ID);
		  	$BBB_IP_FromDataBase=$newArray['ClientIP'];
			$BBBURL  = "http://".$BBB_IP_FromDataBase.":80/iq/on.php";
			//http://192.168.2.11:80/iq/on.php
		}		
		mysql_close($SQL_HOST_CONNECTION_RESOURCE_ID);
		}
	}
	//******************************************************
	// http://143.233.183.205:8080/iq17/vpn.php?url=http://192.168.2.11:80/iq/on.php&d=http://192.168.1.200:80/LOCALFS/SCREEN1.TXT
	if( strlen($VPNServerURL) > 0 )
    {
		 $finalurl = $VPNServerURL."?url=".$BBBURL."&d=".$IQURL;
		 //print_r("REDIRECT.PHP:".$finalurl);		
		 $data = file_get_contents($finalurl);
	 	 print_r($data);
	}
	else
	{
		$finalurl = $IQURL;
	    $data = file_get_contents($finalurl);
	 	print_r($data);

		//print_r("ERROR FROM REDIRECT.PHP:".$finalurl);		
	}
	//echo "<p>".$finalurl."</p>";
?>