// JavaScript Document
function CreateToolBar(ToolBarDivID)
{
		var toolbarData = {
		parent: ToolBarDivID,
		//icon_path: "../common/imgs/",
		items: [
			{type: "buttonTwoState", id: "autosave", text: "OFF", img: "./images/phone.png", pressed: false, tooltip: ""},
			{type: "separator", id: "sep1"},
			{type: "button", id: "docreload", text: "", img: "./images/refresh.png", tooltip: ""},
			{type: "separator", id: "sep1"},			
			{type: "text", id: "Version", text: VesrionTxt },
			//{type: "separator", id: "sep1"},
			//{type: "text", id: "info", text: "00:00:00 0/0/0000"},
			{type: "separator", id: "sep1"},
			{type: "button", id: "StatisticsGraph", text: "", img: "./images/graph.png", tooltip: "ΓΡΑΦΗΜΑΤΑ"},
			{type: "separator", id: "sep1"},
			{type: "buttonSelect", id: "Commands", text: "Διάφορα", img: "",  options:[
					{id: "SendTimeDate", type: "obj", text: "ΑΠΟΣΤΟΛΗ ΩΡΑΣ", img: "./images/clock.png"},
					{id: "SaveToFlashCommand", type: "obj", text: "Save To Flash", img: "./images/cd.png"},
					{id: "GeneralHydroponics", type: "obj", text: "ΓΕΝΙΚΑ ΛΙΠΑΝΣΗΣ", img: "./images/Bag_of_Fertilizer-icon.png"},
					//{id: "Calibration", type: "obj", text: "ΒΑΘΜΟΝΟΜΗΣΗ", img: "./images/calib.png"},
					//{id: "LCDSetup", type: "obj", text: "LCD", img: "./images/lcd.png"},
					//{id: "GSMSetup", type: "obj", text: "SMS", img: "./images/sms.png"},
					{id: "EmailSetup", type: "obj", text: "e-mail", img: "./images/email.png"},
					{id: "BackUpToSD1", type: "obj", text: "Δημιουργεία Αντιγράφου Ασφαλείας (SD/Date)", img: "./images/flopy.png"},
					{id: "BackUpToSD2", type: "obj", text: "Δημιουργεία Τελευταίου Αντιγράφου Ασφαλείας (SD/LASTBP)", img: "./images/flopy.png"},
					{id: "WorkingModeSetup", type: "obj", text: "Αποθήκευση (Στατιστικά)", img: "./images/stat.png"},
					{id: "Screen2", type: "obj", text: "Διαμόρφωση Οθόνης Πληροφοριών", img: "./images/InfoBox-icon.png"},
					{id: "OnLineCharsMenuID", type: "obj", text: "Διαμόρφωση Γραφημάτων", img: "./images/graph.png"},
					{id: "OpenErrorWindow", type: "obj", text: "Σφάλματα", img: "./images/errors.png"},
					{id: "FileManagerDialog", type: "obj", text: "File Manager", img: "./images/data.png"},
					{id: "SoftReset", type: "obj", text: "RESET (Software)", img: "./images/reset2.png"}
			]},
			{type: "separator", id: "sep2"},
			{type: "buttonSelect", id: "Variables", text: "Εργαλεία", img: "",  options:[
					{id: "CreateNewGeneralVariable", type: "obj", text: "Νέα Γενική Εισοδος", img: "./images/GINPUT.gif"},
					{id: "CreateNewDigitalInput", type: "obj", text: "Νέα Ψηφιακή Εισοδος", img: "./images/DINPUT.gif"},
					{id: "CreateNewDigitalOutput", type: "obj", text: "Νέα Ψηφιακή Εξοδος (Relay)", img: "./images/DOUTPUT.gif"},
					
					{type: "separator", id: "sep2"},
					{id: "CreateNewDerivedVirtual", type: "obj", text: "Νέα Μαθηματική Μεταβλητή", img: "./images/DERIVED.gif"},
					{id: "CreateNewRampVirtual", type: "obj", text: "Νέα Ράμπα", img: "./images/RAMP.gif"},
					{id: "CreateNewTimeVirtual", type: "obj", text: "Νέα Χρονική Μεταβλητή", img: "./images/TIMEV.gif"},
					{type: "separator", id: "sep2"},
					{id: "CreateNewControllerVirtual", type: "obj", text: "Νέος Ελεγκτής", img: "./images/CONTROLV.gif"},
					{id: "CreateNewOutputDriverVirtual", type: "obj", text: "Νέος Οδηγός Εξόδου", img: "./images/OUTDRV.gif"},
					{type: "separator", id: "sep2"},
					{id: "GeneralWorkingParameters", type: "obj", text: "Γενικές Παράμετροι Λειτουργίας", img: "./images/PumpIcon.png"},
					{type: "separator", id: "sep2"},
					{id: "Screen1", type: "obj", text: "Διαμόρφωση Οθόνης Αρδευση-Λίπανση", img: "./images/PumpIcon.png"},
					{type: "separator", id: "sep2"},
					{id: "NetworkSetupMenuID", type: "obj", text: "NETWORK (RAM)", img: "./images/network.png"},
					{type: "separator", id: "sep2"},	
					{id: "BackUpToSD3", type: "obj", text: "Create Factory Default (SD/FACSET)", img: "./images/flopy.png"},					
					//{id: "ClimateScreen", type: "obj", text: "Διαμόρφωση Οθόνης Κλίματος", img: "./images/weather256.png"},
					//{type: "separator", id: "sep2"},
					{id: "SaveMimicItemsOnMBED", type: "obj", text: "Αποθήκευση Γραφικών Αντικειμένων", img: "./images/flopy.png"},
					{id: "FullSetupReset", type: "obj", text: "FULL RESET (WARNING: EMPTY SETUP)", img: "./images/flopy.png"}
									
			]},
			//{type: "buttonTwoState", id: "ShowList", text: "", img: "./images/list.png", pressed: false, tooltip: "Εμφάνιση Λίστας"},
			{type: "buttonTwoState", id: "ShowVariables", text: "", img: "./images/control_center.png", pressed: false, tooltip: "Εμφάνιση Εργαλείων"},
			{type: "separator", id: "sep1"},
			{type: "button", id: "ButtonExit", text: "", img: "./images/exit.png", tooltip: "EXIT"},
			{type: "separator", id: "sep1"},
			{type: "button", id: "CarouselBack", text: "", img: "./images/ar_right.png", tooltip: "ΠΡΟΗΓΟΥΜΕΝΟ"},
			{type: "separator", id: "sep1"},
			{type: "button", id: "CarouselNext", text: "", img: "./images/ar_left.png", tooltip: "ΕΠΟΜΕΝΟ"},
			{type: "separator", id: "sep1"},
			{type: "button", id: "ButtonZoomIn", text: "", img: "./images/Zoom-In-icon.png", tooltip: "ZOOM-IN"},
			{type: "separator", id: "sep1"},
			{type: "button", id: "ButtonZoomOut", text: "", img: "./images/Zoom-Out-icon.png", tooltip: "ZOOM-OUT"},
			{type: "separator", id: "sep1"},
			{type: "text", id: "MenuInfoText", text:"IQ V2.0.0" }
			//{type: "button", id: "ShowProgLog", text: "", img: "./images/icon2.gif", pressed: false, tooltip: "Αναφορές Αρδευσης"}
			//{type: "button", id: "Screen1", text: "", img: "./images/icon2.gif", pressed: false, tooltip: "Screen 1"},
			//{type: "button", id: "Screen2", text: "", img: "./images/icon2.gif", pressed: false, tooltip: "Screen 2"}
		]
	};
	toolbar = new dhtmlXToolbarObject(toolbarData);
	
	toolbar.attachEvent("onClick", toolbarClick);
	toolbar.attachEvent("onStateChange", toolbarStateChange);
	toolbar.hideItem("Variables");
	//toolbar.setFontSize('15px');
	//the icons size in pixels. Possible values: 18, 24, 32, 48. 18 pixels is the default size.
	toolbar.setIconSize(48);
	if (LightVersion)
	{
		//toolbar.hideItem("ShowList");
		toolbar.hideItem("ShowVariables");
	}
	//toolbar.showItem("Variables");
}

function toolbarStateChange(id, state)
{
	if (id == "autosave")
	{
		if (state)
		{
			DataAcquisitionIndex=0;
			DataAcqusitionIsActive=true;
			toolbar.setItemText("autosave" ,"ON");
			DataAcquisitionTimer = setTimeout("GetAcquisitionData()", 2000);
		}
		else
		{
			StopDataAcquisition();
			//DataAcqusitionIsActive=false;
	        //clearTimeout(DataAcquisitionTimer);
    	    //DataAcquisitionTimer  = 0;
		}		
	}
	
	if ( (id == "ShowVariables") && (LightVersion ==0) )
	{
		StopDataAcquisition();
		if(!MasterCodeIsOK) 
		{
			EnterMasterCode();
			return;
		}
		if (state)
		{
			MainAccord.cells("Variables").show();
			MainAccord.cells("Loops").show();	

			MainAccord.openItem("Variables");
		}
		else
		{
			MainAccord.cells("Variables").hide();
			MainAccord.cells("Loops").hide();	

		}		
	}
	
	

	/*
	if ( (id== "ShowList") && (LightVersion ==0))
	{
		d = document.getElementById('MainAccordDivID');
		if (MainAccordDivIsOpen)
		{
			d.style.width="0px";
			MainAccordDivIsOpen=0;
		}
		else
		{
			d.style.width="255px";
			MainAccord.openItem("TimePrograms");
			MainAccordDivIsOpen=1;
		}
	}
	*/
}

function toolbarClick(id)
{
	if (id == "SendTimeDate")
	{
		SetTimeDate();
	}
	else if (id == "GeneralHydroponics")
	{
		SetGUIOnSynchronousHttpRequest();
			setTimeout(function() {
			CreateGeneralHydroponicsDialog();
		}, 100)
	}
	else if (id == "Calibration")
	{
		CreateCalibrationWindow();
	}
	else if (id == "ShowProgLog")
	{
		DataAcquisitionIndex=0;
		DataAcqusitionIsActive=false;
		toolbar.setItemState("autosave", false);
		window.open("plog.htm"); 
	}
	else if (id == "Screen1")
	{
		SetGUIOnSynchronousHttpRequest();
			setTimeout(function() {
			EditScreen1Setup();
		}, 100)
	}
	else if (id == "Screen2")
	{
		SetGUIOnSynchronousHttpRequest();
			setTimeout(function() {
			EditScreen2Setup();
		}, 100)
	}
	else if (id == "LCDSetup")
	{
		SetGUIOnSynchronousHttpRequest();
			setTimeout(function() {
			LCDSetup();
		}, 100)
	}
	else if (id == "GSMSetup")
	{
		SetGUIOnSynchronousHttpRequest();
			setTimeout(function() {
			GSMSetup();
		}, 100)
	}
	else if (id == "BackUpToSD1")
	{
		CreateBackUPToSD('1');	
	}
	else if (id == "BackUpToSD2")
	{
		CreateBackUPToSD('2');	
	}
	else if (id == "BackUpToSD3")
	{
		CreateBackUPToSD('3');	
	}
	else if (id == "EmailSetup")
	{
		SetGUIOnSynchronousHttpRequest();
			setTimeout(function() {
			EditEmailSetup();
		}, 100)
	}
	else if (id == "NetworkSetupMenuID")
	{
		SetGUIOnSynchronousHttpRequest();
			setTimeout(function() {
			EditNetWorkSetupSetup();
		}, 100)
	}
	else if (id == "WorkingModeSetup")
	{
		SetGUIOnSynchronousHttpRequest();
			setTimeout(function() {
			CreateDataStorageModeDialog();
		}, 100)
	}
	else if (id == "StatisticsGraph")
	{
		//window.open("./charts/iqchart.htm","_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes ");
		window.close();
		window.open("./charts/iqchart.htm");
	}
	else if (id == "CarouselNext")
	{
		StopDataAcquisition();
		MainTabBar.goToNextTab();
	}
	else if (id == "CarouselBack")
	{
		StopDataAcquisition();
		MainTabBar.goToPrevTab();
	}
	else if (id == "docreload")
	{
		location.reload(true);
	}
	else if (id == "ButtonZoomIn")
	{
		StopDataAcquisition();
		START_ZOOM_FACTOR = START_ZOOM_FACTOR + BUTTON_ZOOM_STEP;
		$(document.body).css("zoom", START_ZOOM_FACTOR); 
		DoAfterZoomInZoomOut();
	}
	else if (id == "ButtonZoomOut")
	{
		StopDataAcquisition();
		START_ZOOM_FACTOR = START_ZOOM_FACTOR - BUTTON_ZOOM_STEP;
		$(document.body).css("zoom", START_ZOOM_FACTOR); 
		DoAfterZoomInZoomOut();		

	}
	else if (id == "ButtonExit")
	{
		window.close();
		StopDataAcquisition();
	}
	else if (id == "SaveToFlashCommand")
	{
		StopDataAcquisition();
		SendSaveToFlashCommand();
	}
	else if (id== "OpenErrorWindow")
	{
		IQErrorWindow();
	}
	else if (id == "FileManagerDialog")
	{
		IQFileManager();	
	}
	else if (id=="OnLineCharsMenuID")
	{
		EditOnLineCharts();	
	}
	else if (id == "Screen2")
	{
		EditScreen2Setup();
	}
	else if (id == "SoftReset" )
	{
		SendSoftResetSetupToController();
	}
	else 
		menuClick(id);

}

function GetNextFreeAllVirtualVariablesIndex()
{
	for (i=1;i<DEF_MAXIMUM_VARIABLES;i++)
	{
		if (AllVirtualVariablesType[i]==0)
		{	
			return i;
		}
	}
}

function menuClick(id) 
{
	if(!MasterCodeIsOK) return;

	if (id == "CreateNewGeneralVariable")
	{
		CreateGeneralVirtualWindow(GetNextFreeAllVirtualVariablesIndex(),"ΝΕΟ ΟΝΟΜΑ",0,"New");
	}
	else if (id == "CreateNewDigitalInput")
	{
		CreateDigitalInputVirtualWindow(GetNextFreeAllVirtualVariablesIndex(),"ΝΕΟ ΟΝΟΜΑ",0,"New");
	}
	else if (id == "CreateNewDigitalOutput")
	{
		CreateDigitalOutputVirtualWindow(GetNextFreeAllVirtualVariablesIndex(),"ΝΕΟ ΟΝΟΜΑ",0,"New");
	}
	else if (id == "CreateNewDerivedVirtual")
	{
		CreateDerivedVirtualWindow(GetNextFreeAllVirtualVariablesIndex(),"ΝΕΟ ΟΝΟΜΑ",-1,"New");
	}
	else if (id == "CreateNewRampVirtual")
	{
		CreateRampVirtualWindow(GetNextFreeAllVirtualVariablesIndex(),"ΝΕΟ ΟΝΟΜΑ",-1,"New");
	}
	else if (id == "CreateNewControllerVirtual")
	{
		CreateControllerVirtualWindow(GetNextFreeAllVirtualVariablesIndex(),"NEW NAME",-1,"New");
	}
	else if (id == "CreateNewOutputDriverVirtual")
	{
		CreateOutputDriverVirtualWindow(GetNextFreeAllVirtualVariablesIndex(),"NEW NAME",-1,"New");
	}
	else if (id == "CreateNewTimeVirtual")
	{
		CreateTimeVirtualWindow(GetNextFreeAllVirtualVariablesIndex(),"NEW NAME",-1,"New");
	}
	else if (id == "Screen1")
	{
		EditScreen1Setup();
	}
	/*
	else if (id == "LCDSetup")
	{
		LCDSetup();
	}
	else if (id == "GSMSetup")
	{
		GSMSetup();
	}
	*/
	else if (id== "ClimateScreen")
	{
		EditClimateScreenSetup();
	}
	/*
	else if (id == "BackUpToSD")
	{
		CreateBackUPToSD();	
	}
	else if (id == "EmailSetup")
	{
		EditEmailSetup();	
	}
	else if (id == "WorkingModeSetup")
	{
		CreateDataStorageModeDialog();
	}
	*/
	else if (id == "SaveMimicItemsOnMBED")
	{
		SaveMimics();
	}
	else if (id == "FullSetupReset")
	{
		SendFullResetSetupToController();
	}
	else if (id == "GeneralWorkingParameters")
	{
		CreateGeneralWorkingParametersDialog();
	}

}
//****************************************************************************************************
function SendSoftResetSetupToController()
{
	var txt='';
	//delay(2000);
	var url="http://"+SystemIpAdress+"/rpc/SetData/run 046;";
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	delay(2000);
	alert(txt);
}
//****************************************************************************************************
function SendFullResetSetupToController()
{
	var r = confirm("1. ΠΡΟΣΟΧΗ: Η ΕΝΤΟΛΗ ΘΑ ΚΑΤΑΡΓΗΣΕΙ ΟΛΟ ΤΟ SETUP. ΟΚ?");
	if (r == true) {

	} else {
    	return;
	}

    r = confirm("2. ΠΡΟΣΟΧΗ: Η ΕΝΤΟΛΗ ΘΑ ΚΑΤΑΡΓΗΣΕΙ ΟΛΟ ΤΟ SETUP. ΟΚ?");
	if (r == true) {

	} else {
    	return;
	}
	
	
	var txt='';
	delay(2000);
	var url="http://"+SystemIpAdress+"/rpc/SetData/run 043;";
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	delay(2000);
	alert(txt);
}
//****************************************************************************************************
function SendSaveToFlashCommand()
{
	var txt='';
	delay(2000);
	var url="http://"+SystemIpAdress+"/rpc/SetData/run 033;";
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	delay(2000);
	alert(txt);
	
}
//****************************************************************************************************
function timeoutOnDataAcquisition()
{
	document.getElementById('DataAcquisitonDIV').innerHTML  = '<p>DATA ACQUSITION TIMEOUT</p>' ;
	if (DataAcqusitionIsActive)
		DataAcquisitionTimer  = setTimeout("GetAcquisitionData()", DataAcquisitionPeriod);
}
//****************************************************************************************************
function SetTimeDate()
{
	var txt='';
	var dt = new Date();
	var unixtime = (dt.getTime() * 0.001)-3600*(dt.getTimezoneOffset()/60);
	var url="http://"+SystemIpAdress+"/rpc/SetData/run 001:"+unixtime;
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);
}
//****************************************************************************************************
function CreateBackUPToSD(type)
{
	//1 sd 2 usb
	var txt='';
	var url="http://"+SystemIpAdress+"/rpc/SetData/run 026;"+type+";";
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);
	
}
//****************************************************************************************************
var DataAcquisitionDoseis=0;
var CurrentDataAcquisitionDosh=0;
var AllDataAcquisitionData2='';

function StartDataAcquisitionTimer()
{
	if (DataAcqusitionIsActive)
	{
		if (DataAcquisitionIndex > MAX_DATA_ACQUISITION)
		{
			DataAcquisitionIndex=0;
			DataAcqusitionIsActive=false;
			toolbar.setItemState("autosave", false);
		}
		else
		{
			DataAcquisitionTimer  = setTimeout("GetAcquisitionData()", DataAcquisitionPeriod);
		}
	}
}
//****************************************************************************************************

function XmlASynchronousHttpRequest(url,timeout,okfunction)
{
	var txt='';
	xmlHttpDataAcquisition = new XMLHttpRequest();
    xmlHttpDataAcquisition.ontimeout = function () {
 			document.getElementById('DataAcquisitonDIV').innerHTML  = '<p>DATA ACQUSITION STEP 1 TIME OUT</p>' ;
			StartDataAcquisitionTimer();
    };
    xmlHttpDataAcquisition.onload = okfunction;
   
    if (DataAcquisitionIsASynchronous >0)
	{
		//26/7/2016
    	xmlHttpDataAcquisition.open("GET", url, false);
		//xmlHttpDataAcquisition.timeout = timeout;
	}
	else
	{
		xmlHttpDataAcquisition.open("GET", url, true);
		xmlHttpDataAcquisition.timeout = timeout;
	}
    xmlHttpDataAcquisition.send(null);
}
//**********************************************************************************************************************
function DataAcquisitionOkFunction1()
{
	if (xmlHttpDataAcquisition.readyState === 4)
	{ 
    	if (xmlHttpDataAcquisition.status === 200) 
		{
        	txt = decodeURIComponent(xmlHttpDataAcquisition.responseText)
			var AllDataAcquisitionData = new Array(); 
			var IrrigationProgramData = new Array();
			AllDataAcquisitionData=txt.split("@");
			var TotalVariables=0;
			if (AllDataAcquisitionData[0] =='OK')
			{	
			    IrrigationProgramData=AllDataAcquisitionData[1].split(";");
				//toolbar.setItemText("info" ,AllDataAcquisitionData[2] );
				if (DataAcqusitionIsActive) toolbar.setItemText("autosave" ,AllDataAcquisitionData[2] );
				TotalVariables = AllDataAcquisitionData[3];
				if (LightVersion==0) UpdateIconsOnTimeProgramsGrid(IrrigationProgramData);
				DataAcquisitionIndex++;
				txt='';
				DataAcquisitionDoseis= Math.floor(TotalVariables/MaxVariablesPerDataAcquisition);
				if (DataAcquisitionDoseis != TotalVariables/MaxVariablesPerDataAcquisition) DataAcquisitionDoseis++;
				CurrentDataAcquisitionDosh=1; 
				AllDataAcquisitionData2='';
				var url='http://'+SystemIpAdress+'/rpc/SetData/run 005;'+CurrentDataAcquisitionDosh+';'+MaxVariablesPerDataAcquisition+';';
				url=url+Math.random()+';';
				if (LocalServerIsUsed) { url=LocalServerPath+url; }
				XmlASynchronousHttpRequest(url,5000,DataAcquisitionOkFunction2);
			}
			else
			{
				document.getElementById('DataAcquisitonDIV').innerHTML  = '<p>DATA ACQUSITION STEP 1 NO OK</p>' ;
				StartDataAcquisitionTimer();	
			}
      	} 
		else 
		{
    		document.getElementById('DataAcquisitonDIV').innerHTML  = '<p>DATA ACQUSITION STEP 1 ERROR</p>' ;
			StartDataAcquisitionTimer();
      	}
    }
}
//**********************************************************************************************************************
function DataAcquisitionOkFunction2()
{
	if (xmlHttpDataAcquisition.readyState === 4)
	{ 
    	if (xmlHttpDataAcquisition.status === 200) 
		{
				var tmptxt=decodeURIComponent(xmlHttpDataAcquisition.responseText);
				if (tmptxt.length > 400) 
				{
				document.getElementById('DataAcquisitonDIV').innerHTML  = '<p>ΠΡΟΣΟΧΗ ΤΟ ΜΕΓΕΘΟΣ ΤΩΝ ΔΕΔΟΜΕΝΩΝ ΞΕΠΕΡΝΑ ΤΟ ΟΡΙΟ.\nΜΕΙΩΣΤΕ ΤΟ MaxVariablesPerDataAcquisition</p>'+tmptxt.length ;
					//alert(tmptxt.length);
				}
				AllDataAcquisitionData2 = AllDataAcquisitionData2 + tmptxt;
				CurrentDataAcquisitionDosh++;
				if (CurrentDataAcquisitionDosh > DataAcquisitionDoseis)
				{
					var Data= new Array();
					Data = AllDataAcquisitionData2.split(";");
					UpDateVariablesGridValues(Data);
					UpDateVariablesOnMainHydroponicsScreen(Data);
					UpDateVariablesOnMainScreen(Data);
					if (ClimateControlVersion) UpDateVariablesOnExternalClimateScreen(Data);
					if (ClimateControlVersion) UpDateVariablesOnClimate1Screen(Data);
				StartDataAcquisitionTimer();
					
				}
				else
				{
					var url='http://'+SystemIpAdress+'/rpc/SetData/run 005;'+CurrentDataAcquisitionDosh+';'+MaxVariablesPerDataAcquisition+';';
					url=url+Math.random()+';';
					if (LocalServerIsUsed) { url=LocalServerPath+url; }
					XmlASynchronousHttpRequest(url,5000,DataAcquisitionOkFunction2);
				}

      	} 
		else 
		{
    		document.getElementById('DataAcquisitonDIV').innerHTML  = '<p>DATA ACQUSITION STEP 2 ERROR</p>' ;
			StartDataAcquisitionTimer();
      	}
    }
	else
	{
    		document.getElementById('DataAcquisitonDIV').innerHTML  = '<p>DATA ACQUSITION STEP 2 ERROR</p>' ;
			StartDataAcquisitionTimer();
	}
}
//**********************************************************************************************************************

function GetAcquisitionData()
{
	var txt='';
	//*********************************************************************
	document.getElementById('DataAcquisitonDIV').innerHTML='';
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 004;';
	url=url+Math.random()+';';
	if (LocalServerIsUsed) { url=LocalServerPath+url; }
	//*********************************************************************
	XmlASynchronousHttpRequest(url,5000,DataAcquisitionOkFunction1);
	return;
	
	if (xmlHttpDataAcquisition.readyState==4)
	{
		txt = decodeURIComponent(xmlHttpDataAcquisition.responseText)
		//alert(txt);
		var AllDataAcquisitionData = new Array(); 
		var IrrigationProgramData = new Array();
		AllDataAcquisitionData=txt.split("@");
		var TotalVariables=0;

		if (AllDataAcquisitionData[0] =='OK')
		{	
		    IrrigationProgramData=AllDataAcquisitionData[1].split(";");
			toolbar.setItemText("info" , 'ΩΡΑ: '+AllDataAcquisitionData[2] );
			TotalVariables = AllDataAcquisitionData[3];
			if (LightVersion==0) UpdateIconsOnTimeProgramsGrid(IrrigationProgramData);
			DataAcquisitionIndex++;
			txt='';
			var Doseis= Math.floor(TotalVariables/MaxVariablesPerDataAcquisition);
			if (Doseis != TotalVariables/MaxVariablesPerDataAcquisition) Doseis++;
			
			for (i=1;i<=Doseis;i++)
			{
				var url='http://'+SystemIpAdress+'/rpc/SetData/run 005;'+i+';'+MaxVariablesPerDataAcquisition+';';
				url=url+Math.random()+';';
				if (LocalServerIsUsed) { url=LocalServerPath+url; }
				xmlHttpDataAcquisition.open("GET",url,false);
				//xmlHttpDataAcquisition.timeout = 3000;
				xmlHttpDataAcquisition.ontimeout = timeoutOnDataAcquisition;
				xmlHttpDataAcquisition.send(null);
				if (xmlHttpDataAcquisition.readyState==4)
				{
					var tmptxt=decodeURIComponent(xmlHttpDataAcquisition.responseText);
					if (tmptxt.length > 400) document.getElementById('DataAcquisitonDIV').innerHTML  = '<p>ΠΡΟΣΟΧΗ ΤΟ ΜΕΓΕΘΟΣ ΤΩΝ ΔΕΔΟΜΕΝΩΝ ΞΕΠΕΡΝΑ ΤΟ ΟΡΙΟ.\nΑΥΞΗΣΤΕ ΤΟ MaxVariablesPerDataAcquisition</p>' ;

					txt = txt + tmptxt;
					//alert(txt);
				}
			}
			var Data= new Array();		
			Data = txt.split(";");
			UpDateVariablesGridValues(Data);
			UpDateVariablesOnMainHydroponicsScreen(Data);
			UpDateVariablesOnMainScreen(Data);
			if (ClimateControlVersion) UpDateVariablesOnExternalClimateScreen(Data);
			if (ClimateControlVersion) UpDateVariablesOnClimate1Screen(Data);
		}
		else
		{
			document.getElementById('DataAcquisitonDIV').innerHTML  = '<p>DATA ACQUSITION NOK</p>' ;
		}
	}
	else
	{
		document.getElementById('DataAcquisitonDIV').innerHTML  = '<p>DATA ACQUSITION NOT COMPLETE</p>' ;
	}
	//*************************************************************************************************
	if (DataAcqusitionIsActive)
	{
		if (DataAcquisitionIndex > MAX_DATA_ACQUISITION)
		{
			DataAcquisitionIndex=0;
			DataAcqusitionIsActive=false;
			toolbar.setItemState("autosave", false);
		}
		else
		{
			DataAcquisitionTimer  = setTimeout("GetAcquisitionData()", DataAcquisitionPeriod);
		}
	}
	
}
//*******************************************************************************************
function StopDataAcquisition()
{
	DataAcquisitionIndex=0;
	DataAcqusitionIsActive=false;
	toolbar.setItemState("autosave", false);
	toolbar.setItemText("autosave" ,"OFF");
}
//*******************************************************************************************
function DoAfterZoomInZoomOut()
{
	MainTabBar.goToNextTab();
	MainTabBar.goToPrevTab();
	if (START_ZOOM_FACTOR > 1.0)
	{
		$('#MobiScrollTimeInput').mobiscroll('option', 'height', 50);
		$('#MobiScrollFullTimeInput').mobiscroll('option', 'height', 50);
		$('#CalendarFrom').mobiscroll('option', 'height', 50);			
		if (USE_INTERNAL_KEYBOARD == 0) return;
		$('#InfoProgramList').mobiscroll('option', 'height', 50);			
		$('#InfoFertiList').mobiscroll('option', 'height', 50);			
		$('#InfoClimaList').mobiscroll('option', 'height', 50);			
	}
	else
	{
		$('#MobiScrollTimeInput').mobiscroll('option', 'height', 70);
		$('#MobiScrollFullTimeInput').mobiscroll('option', 'height', 70);
		$('#CalendarFrom').mobiscroll('option', 'height', 70);			
		if (USE_INTERNAL_KEYBOARD == 0) return;
		$('#InfoProgramList').mobiscroll('option', 'height', 70);			
		$('#InfoFertiList').mobiscroll('option', 'height', 70);			
		$('#InfoClimaList').mobiscroll('option', 'height', 70);			
	}
	
}
//*******************************************************************************************