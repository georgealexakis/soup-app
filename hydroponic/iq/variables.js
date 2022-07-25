// JavaScript Document
//style="background-image: url('./images/Logo1.PNG'); position: relative;background-size:100% 100%;opacity:0.3;"

var VesrionTxt="NO VERSION";
var MainAccord;
var WindowsViewPort, DialogWindow;
var VariablesGrid;
var ReportsGrid;
var TimeProgramsGrid;
var FertigationProgramsGrid;
var LoopsGrid;
var ClimateControlGrid;
var menu;
var myForm, formData;
var OnCloseEvent;
var MainAccordDivIsOpen=0;
var FlagWindowIsCreated=0;
var DialogWindow=null;
var MainTabBar;
var ClimateTabbar;

var myForm1;
var myForm2;
var myForm3;
var myForm4;	
var myForm5;	
var myForm6;	

var toolbar;
var DataAcquisitionTimer;
var DataAcqusitionIsActive=false;

var AllClimateControlNames = new Array();
var MAX_CLIMATE_CONTROL = 10;

var AllLoopsNames = new Array();
var MAX_LOOPS = 10;

var AllFertigationProgramsNames = new Array();
var DEF_MAXIMUM_FERTIGATION_PROGRAMS  = 10;

var AllTimeProgramsNames = new Array();
var DEF_MAXIMUM_TIME_PROGRAMS  = 25;

var AllVirtualVariablesType = new Array();
var AllVirtualVariablesName = new Array();
var DEF_MAXIMUM_VARIABLES	= 200;

var DEF_MAXIMUM_RELE = 32;
var DEF_RELE_GROUPS_IN_TP   = 5;
var DEF_RELE_IN_GROUP_IN_TP = 5;


var DEF_GET_VARIABLE=0x1000;
var DEF_SET_VARIABLE=0x2000;

var DEF_GENERAL_INPUT_VARIABLE  = 1;
var DEF_DIGITAL_INPUT_VARIABLE  = 2;
var DEF_DIGITAL_OUTPUT_VARIABLE = 4;
var DEF_DERIVED_VARIABLE        = 8;
var DEF_RAMP_VARIABLE           = 16;
var DEF_TIME_ENABLED_VARIABLE   = 32;
var DEF_CONTROLLER_VARIABLE     = 64;
var DEF_OUTPUT_DRIVER_VARIABLE  = 128;
var DEF_WEECK_VARIABLE  		= 256;

var DEF_NAMES_MAX_LENGHT		= 10;


var DEF_ALL_VIRTUALS_MASK = DEF_GENERAL_INPUT_VARIABLE|DEF_DIGITAL_INPUT_VARIABLE|DEF_DIGITAL_OUTPUT_VARIABLE|DEF_DERIVED_VARIABLE|DEF_RAMP_VARIABLE|DEF_TIME_ENABLED_VARIABLE|DEF_CONTROLLER_VARIABLE|DEF_OUTPUT_DRIVER_VARIABLE|DEF_WEECK_VARIABLE;

var MasterCodeIsOK=0;
var MasterCode="123456";

var ECGauge;
var PHGauge;
var FlawGauge;
var ProgressGauge;
var TemperatureGauge 	= [];
var HumidityGauge 		= [];
var SolarGauge 			= [];
var ScreenGauge 		= [];
var WindowPositionGauge = [];

var ExternalTemperatureGauge;
var ExternalHumidityGauge;
var ExternalSolarGauge;
var ExternalWindSpeedGauge;
var ExternalWindDirectionGauge;


var MainHydroponicsScreen   =  new Array();
var MainScreenVariables     =  new Array();
var Climate1ScreenVariables =  new Array();
var OnLineGraphsVariables   =  new Array();


var DataAcquisitionIndex=0;

var LightVersion=0;

var LOOP_NAMES_RAM_FILE_NAME = '/LOOP.RAM ';
var CLIMATE_NAMES_RAM_FILE_NAME = '/CC.RAM ';
var FERTIGATION_NAMES_RAM_FILE_NAME = '/FER.RAM ';
var IRRIGATION_NAMES_RAM_FILE_NAME = '/IRI.RAM ';
var VIRTUALS_NAMES_RAM_FILE_NAME = '/VIR.RAM ';
//var VIRTUALS_NAMES_RAM_FILE_NAME = '/F_VIRT.NAM ';
var MATH_FUN_FILE_NAME_IN_FLASH  = '/MATH_FU2.FLASH ';
var FILE_MANAGER_FILE_NAME_IN_FLASH  = '/FM.FLASH ';

function ReadFromSystemVersionSettings()
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 003';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
    var Parameters = txt.split(";");
	if (Parameters.length > 8)
	{
		VesrionTxt=Parameters[0];
		SystemFileSystem=Parameters[1];
		DataFileSystem=Parameters[2];
		ReportFileSystem=Parameters[3];
		DEF_NAMES_MAX_LENGHT		=(Parameters[4]-1)/2;
		DEF_MAXIMUM_VARIABLES		=Parameters[5];
		DEF_MAXIMUM_TIME_PROGRAMS	=Parameters[6];
		DEF_MAXIMUM_FERTIGATION_PROGRAMS	=Parameters[7];
		MAX_LOOPS					=Parameters[8];
		DEF_MAXIMUM_RELE            =Parameters[11];
		
		DEF_RELE_GROUPS_IN_TP   = Parameters[19];
		DEF_RELE_IN_GROUP_IN_TP = Parameters[20];
		
		if (ClimateControlVersion)
		{
			
			if (Parameters[21])
			{
				MAX_CLIMATE_CONTROL = Parameters[21];
			}
			else
			{
				alert("Το Σύστημα δεν περιλαμβάνει έλεγχο κλίματος")
				MAX_CLIMATE_CONTROL = 0;
			}
		}
		
	}
	

	if (SHOW_RELAY_01_08)
	{
		document.getElementById("FrontButtons01-08_ID").style.visibility="";
		MainTabBar.setSize('100%',MAIN_TAB_MIN_HEIGHT-70-70-70);
	}
	if (SHOW_RELAY_09_16)
	{
		document.getElementById("FrontButtons09-16_ID").style.visibility="";
		MainTabBar.setSize('100%',MAIN_TAB_MIN_HEIGHT-70-70);
	}
	if (SHOW_RELAY_17_24)
	{
		document.getElementById("FrontButtons17-24_ID").style.visibility="";
		MainTabBar.setSize('100%',MAIN_TAB_MIN_HEIGHT-70);
	}
	if (SHOW_RELAY_25_32)
	{
		document.getElementById("FrontButtons25-32_ID").style.visibility="";
		MainTabBar.setSize('100%',MAIN_TAB_MIN_HEIGHT+20);
	}
	if (SHOW_RELAY_33_40)
	{
		document.getElementById("FrontButtons33-40_ID").style.visibility="";
		MainTabBar.setSize('100%',MAIN_TAB_MIN_HEIGHT+70+20);
	}
	if (SHOW_RELAY_41_48)
	{
		document.getElementById("FrontButtons41-48_ID").style.visibility="";
		MainTabBar.setSize('100%',MAIN_TAB_MIN_HEIGHT+70+70+20);
	}
	if (SHOW_RELAY_49_56)
	{
		document.getElementById("FrontButtons49-56_ID").style.visibility="";
		MainTabBar.setSize('100%',MAIN_TAB_MIN_HEIGHT+70+70+70+20);
	}
	if (SHOW_RELAY_57_64)
	{
		document.getElementById("FrontButtons57-64_ID").style.visibility="";
		MainTabBar.setSize('100%',MAIN_TAB_MIN_HEIGHT+70+70+70+70+20);
	}

	if (DEF_MAXIMUM_RELE > 33)
	{
		//document.getElementById("MainHTMLBodyID").bgColor = "#A6CA00";
	}
	//alert(DEF_MAXIMUM_RELE);
	//Parameters.length
	//alert(VesrionTxt);
	var url='http://'+SystemIpAdress+'/'+SystemFileSystem+MATH_FUN_FILE_NAME_IN_FLASH;
	//url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	Math_Fun_XML_File = decodeURIComponent(txt);
	
}
