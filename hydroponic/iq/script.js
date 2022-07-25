// JavaScript Document
var xmlHttp;
var xmlHttpDataAcquisition;
var hintID="";



function MyparseFloat(variable)
{
	var tmp2="";
	var tmp=parseFloat(variable);
	tmp2=tmp.toString();
	if (tmp2.length ==0)
		tmp2='0.0';
	return tmp2;		
	
}

function MyparseFloatWithFixed(variable)
{

	var tmp2="";
	var tmp=parseFloat(variable);
	tmp = tmp.toFixed(DECIMAL_PLACE_IN_FLOATS);
	tmp2=tmp.toString();
	if (tmp2.length ==0)
		tmp2='0.0';
	return tmp2;		
}

function SetGUIOnSynchronousHttpRequest()
{
	document.body.style.backgroundColor = "#FFFF00";
	//document.getElementById('winVP1').style.backgroundColor  =  "#FFFF00";
}

function XmlSynchronousHttpRequest(url,timeout,timeoutfunction)
{
	delay(50);
	for (i3=0;i3<5;i3++)
	{
	var txt='';
	xmlHttp=GetXmlHttpObject()
	if (xmlHttp==null)
	{
		alert ("Browser does not support HTTP Request");
		return;
	}
	//*************************************************
	XmlSynchronousHttpRequestTimer  = setTimeout(timeoutfunction,timeout);
	if (LocalServerIsUsed)
	{
		//var Newurl = './on.php?d='+url;
		var Newurl = LocalServerPath+url;
	}
	else
	{
		var Newurl = url;
	}
	//
	//alert(Newurl);
	xmlHttp.open("GET",Newurl,false);
	if (msieversion() > 0)
	{
		xmlHttp.setRequestHeader('Cache-Control', 'no-cache');
	    xmlHttp.setRequestHeader('Pragma', 'no-cache');
		xmlHttp.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
	}
	/////// Uncomment xmlHttp.send(null);
	window.clearTimeout(XmlSynchronousHttpRequestTimer);
	txt = decodeURIComponent(xmlHttp.responseText);
	//alert(txt+' '+Newurl);
	var n = txt.indexOf("+++FILE+ERROR+++");
	if (n == -1)
	{
		document.body.style.backgroundColor = "#3366cc";
		document.getElementById('winVP1').style.backgroundColor  =  "#5c85d6";
		return txt;
		//break;
	}
	else
	{
		if (i3==4) alert('Fail 10 Times For '+Newurl);	
	}
	}
	//alert(txt);
	document.body.style.backgroundColor = "#b3b3ff"; 
	document.getElementById('winVP1').style.backgroundColor  =  "#ff0000";
	return txt;
}

function delay(ms) {
   ms += new Date().getTime();
   while (new Date() < ms){}
}


function GetXmlHttpObject()
{ 
	var objXMLHttp=null;
	if (window.XMLHttpRequest)
	{
		objXMLHttp=new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{
		objXMLHttp=new ActiveXObject("MSXML2.XMLHTTP.3.0");
	}
	return objXMLHttp;
} 

function timeoutFired()
{
	xmlHttp.abort();
	alert("Η ΣΥΣΚΕΥΗ ΔΕΝ ΑΝΤΑΠΟΚΡΙΝΕΤΑΙ!");
	var r = confirm(" ΕΞΟΔΟΣ ?");
	if (r == true) {
		window.close();
	} else {
    	return;
	}
	
}

var Convert = {
     chars: "  !\"#$%'()*+'-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψως",
     hex: '0123456789ABCDEF', bin: ['0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111', '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111'],
     decToHex: function(d){
          return (this.hex.charAt((d - d % 16)/16) + this.hex.charAt(d % 16));
     },
     toBin: function(ch){
          var d = this.toDec(ch);
          var l = this.hex.charAt(d % 16);
          var h = this.hex.charAt((d - d % 16)/16);
          var hhex = "ABCDEF";
          var lown = l < 10 ? l : (10 + hhex.indexOf(l));
          var highn = h < 10 ? h : (10 + hhex.indexOf(h));
          return this.bin[highn] + ' ' + this.bin[lown];
     },
     toHex: function(ch){
          return this.decToHex(this.toDec(ch));
     },
     toDec: function(ch){
          var p = this.chars.indexOf(ch);
          return (p <= -1) ? 0 : (p + 32);
     }
};


function hex2a(hex) { 
    var Greeck = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψως";
	var str = ''; 
    
	for (var i = 0; i < hex.length; i += 2)
	{
        var inte=parseInt(hex.substr(i, 2), 16);
		if (inte < 128)
		{
			str += String.fromCharCode(inte); 
		}
		else
		{
			str=str+Greeck.charAt(inte-128);
		}
	}
    return str; 
} 

//************************************************************
var TimeSelectInputName;
var TimeSelectActiveForm;
function AttachMouseClickEventForTimeSelect(dhxInputControl,ActiveForm)
{
	//var inpLogin = myForm.getInput("PHLL");
	TimeSelectActiveForm = ActiveForm;
	if (window.addEventListener) {
		dhxInputControl.addEventListener("click",doOnClickForMobiScrollTime,false);
	} else {
		dhxInputControl.attachEvent("onclick",doOnClickForMobiScrollTime);
	}
}



function doOnClickForMobiScrollTime(e)
{
	e = e||event;
	var t = (e.target||e.srcElement);
	TimeSelectInputName = t._idd;
	
	var timetoset =  new Array();
	var stringvalue = TimeSelectActiveForm.getInput(t._idd).value;
	timetoset = stringvalue.split(":");
	$('#MobiScrollTimeInput').mobiscroll('setValue', timetoset, true,0);
	$('#MobiScrollTimeInput').mobiscroll('show'); 
}

function MobiScrollTimeInputChange(valueText, inst)
{
	TimeSelectActiveForm.setItemValue(TimeSelectInputName, valueText);
}

//************************************************************

function AttachMouseClickEventForFullTimeSelect(dhxInputControl)
{
	//var inpLogin = myForm.getInput("PHLL");
	if (window.addEventListener) {
		dhxInputControl.addEventListener("click",doOnClickForMobiScrollFullTime,false);
	} else {
		dhxInputControl.attachEvent("onclick",doOnClickForMobiScrollFullTime);
	}
}


function DettachMouseClickEventForFullTimeSelect(dhxInputControl)
{
	if (window.removeEventListener) {
		dhxInputControl.removeEventListener("click",doOnClickForMobiScrollFullTime,false);
	} else {
		dhxInputControl.detachEvent("onclick",doOnClickForMobiScrollFullTime);
	}
}

var Form3InputName;

function doOnClickForMobiScrollFullTime(e)
{
	e = e||event;
	var t = (e.target||e.srcElement);
	Form3InputName = t._idd;
	var timetoset =  new Array();
	var stringvalue = myForm3.getInput(t._idd).value;
	timetoset = stringvalue.split(":");
	$('#MobiScrollFullTimeInput').mobiscroll('setValue', timetoset, true,0);
	$('#MobiScrollFullTimeInput').mobiscroll('show'); 
}

function MobiScrollFullTimeInputChange(valueText, inst)
{
	myForm3.setItemValue(Form3InputName, valueText);
}

function msieversion()
{
      var ua = window.navigator.userAgent
      var msie = ua.indexOf ( "MSIE " )

      if ( msie > 0 )      // If Internet Explorer, return version number
         return parseInt (ua.substring (msie+5, ua.indexOf (".", msie )))
      else                 // If another browser, return 0
         return 0
}


function ResetGeneralAlarm1()
{
	var r = confirm("ΕΠΑΝΑΦΟΡΑ ΓΕΝΙΚΟΥ ΣΥΝΑΓΕΡΜΟΥ ?");
	if (r == true) {

	} else {
    	return;
	}
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 051';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);	
}

function WriteToFileOnmBed(FileName,Parameters,ParametersLenght)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 019;'+FileName+' ';
	for (i=0;i<ParametersLenght;i++)
	{
		url=url+Parameters[i]+';';
	}
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);	
}
//**********************************************************************************
function ReadFileFromMBedAndReturnParametersArray(FileName)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/'+DataFileSystem+'/'+FileName+'  ';
	//url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	var Parameters = new Array();
	Parameters = txt.split(";"); 
	return Parameters;
}
//**********************************************************************************
function ReadFileFromMBedAndReturnPeriexomeno(FileName)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/'+DataFileSystem+'/'+FileName+'  ';
	//url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	return txt;
}
//**********************************************************************************
function WriteToFileOnmBedPeriexomeno(FileName,Parameters,ParametersLenght)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 019;'+FileName+' ';
	url=url+Parameters;
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);	
}
//**********************************************************************************
//**********************************************************************************
function WriteToFileOnmBedPeriexomeno2(FileName,action,Parameters,ParametersLenght)
{
	var txt='';
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 031;'+action+';'+FileName+' ';
	url=url+Parameters;
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	return txt;

}
//**********************************************************************************
function WriteToFileOnmBed2(FileName,action,Parameters,ParametersLenght)
{
	var txt='';
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 031;'+action+';'+FileName+' ';
	for (i=0;i<ParametersLenght;i++)
	{
		url=url+Parameters[i]+';';
	}
	//alert(url);
	//alert(action+' '+url.length);
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	//alert(action+' '+txt);
	return txt;
	
}
//**********************************************************************************
function AttacheKeyboardToInput(inid)
{
	if (USE_INTERNAL_KEYBOARD == 0) return;

	$('#'+inid).keyboard({
			 // *** choose layout ***
			 layout : 'custom',
				customLayout: {
				  'default': ['1 2 3 4 5 6 7 8 9 0 - =','Q W E R T Y U I O P [ ]','A S D F G H J K L ; $ {left} {right}','{shift} Z X C V B N M , . /','{meta1} {meta2} {space} {accept} {c} {bksp}'],
				  'shift'  : ['! @ # $ % ^ & * ( ) _ +','q w e r t y u i o p { }','a s d f g h j k l : " {left} {right}','{shift} z x c v b n m < > ?','{meta1} {meta2} {space} {accept} {c} {bksp}'],
				  'meta1'  : ['1 2 3 4 5 6 7 8 9 0 - =','; ς Ε Ρ Τ Υ Θ Ι Ο Π [ ]','Α Σ Δ Φ Γ Η Ξ Κ Λ ; $ {left} {right}','{shift} Ζ Χ Ψ Ω Β Ν Μ , . /','{meta1} {meta2} {space} {accept} {c} {bksp}'],
				  'meta2'  : ['1 2 3 4 5 6 7 8 9 0 - =','; ς ε ρ τ υ θ ι ο π [ ]','α σ δ φ γ η ξ κ λ ; $ {left} {right}','{shift} ζ χ ψ ω β ν μ , . /','{meta1} {meta2} {space} {accept} {c} {bksp}']
				},
			  position     : {
			    of : $('#MainHTMLBodyID'), // optional - null (attach to input/textarea) or a jQuery object (attach elsewhere)
			    my : 'center top',
			    at : 'center top',
			    at2: 'center center' // used when "usePreview" is false (centers keyboard at bottom of the input/textarea)
			  },
  			  display: {
 					  'accept' : 'OK:',
					  'meta1'  : 'Ε:',  // Diamond
  					  'meta2'  : 'ε:',  // Diamond
					  'bksp'   : 'ΔΙΑΓΡΑΦΗ:Some other character set', // Heart
			  },
			  maxLength:20,
			  keyBinding : 'mousedown touchstart'
			})
	
}
//**********************************************************************************
function AttacheNumKeyboardToInput(inid,type)
{
	if (USE_INTERNAL_KEYBOARD == 0) return;
	if (type > 0)
	{
		$('#'+inid).keyboard({
		    layout : 'custom',
			customLayout: {
				  'default': ['1 2 3','4 5 6','7 8 9 ','. 0 -','{left} {right} e','{a} {bksp} {c}']
				},
			position     : {
			    of : $('#MainHTMLBodyID'), // optional - null (attach to input/textarea) or a jQuery object (attach elsewhere)
			    my : 'center top',
			    at : 'center top',
			    at2: 'center center' // used when "usePreview" is false (centers keyboard at bottom of the input/textarea)
			  },
			maxLength:20,
			keyBinding : 'mousedown touchstart'			})
	}
	else
	{
		$('#'+inid).keyboard({
		    layout : 'custom',
			customLayout: {
				  'default': ['1 2 3','4 5 6','7 8 9 ','- 0 -','{left} {right} e','{a} {bksp} {c}']
				},
			position     : {
			    of : $('#MainHTMLBodyID'), // optional - null (attach to input/textarea) or a jQuery object (attach elsewhere)
			    my : 'center top',
			    at : 'center top',
			    at2: 'center center' // used when "usePreview" is false (centers keyboard at bottom of the input/textarea)
			  },
			maxLength:20,
			keyBinding : 'mousedown touchstart'			})
	}
	
}
//**********************************************************************************
function FeelSelectWithAllTimePrograms(sel)
{
	sel.options.length = 0;
	sel.options[sel.options.length] = new Option('KENO', 0xFF);
	for (i=0;i<DEF_MAXIMUM_TIME_PROGRAMS;i++)
	{
		sel.options[sel.options.length] = new Option(AllTimeProgramsNames[i],i);
	}
	
}
//**********************************************************************************
function FeelSelectWithFertigationPrograms(sel)
{
	sel.options.length = 0;
	sel.options[sel.options.length] = new Option('KENO', 0xFF);
	for (i=0;i<DEF_MAXIMUM_FERTIGATION_PROGRAMS;i++)
	{
		sel.options[sel.options.length] = new Option(AllFertigationProgramsNames[i],i);
	}
}
//**********************************************************************************
function FeelSelectWithNumbersAndSelectValue(sel,from,to,step,value,fix)
{
	k=0;
	for (i=from;i<=to;i=i+step)
	{
		sel.options[sel.options.length] = new Option(i.toFixed(fix),i.toFixed(fix));
		if ( MyparseFloat(i.toFixed(fix)) == MyparseFloat(value) )
		{
			sel.selectedIndex=k;
		}
		k++;

	}
}
//**********************************************************************************
function FeelSelectWithAllVirtuals(sel,mask)
{
	sel.options[sel.options.length] = new Option('KENO', 0);
	for (i=1;i<DEF_MAXIMUM_VARIABLES;i++)
	{
		if (AllVirtualVariablesType[i] & mask)		
			sel.options[sel.options.length] = new Option(AllVirtualVariablesName[i],i);
	}
}
//**********************************************************************************
function SelectOptionInSelectByValue(sel,value)
{
	for (i=0;i<sel.options.length;i++)
	{
		if (sel.options[i].value == value)
		{
			sel.selectedIndex=i;
			break;
		}
	}
	sel.readonly=true
	//ConvertSelectToMobiScrollSelect(sel.id,sel.className);
}
//**********************************************************************************
function ConvertSelectToMobiScrollSelect(selid, selclass)
{
	if (USE_INTERNAL_KEYBOARD == 0) return;

	$(function(){
	    $('#'+selid).mobiscroll().select({
	        //headerText:'ΕΠΙΛΕΓΜΕΝΗ ΩΡΑ: {value}',
			showInput:true,
			cancelText: 'ΑΚΥΡΟ',
			setText: 'ΟΚ',
			theme: 'sense-ui',
    	    lang: ' ',
        	display: 'modal',
	        animate: 'flip',
    	    mode: 'mixed',
        	//timeFormat: 'HH:ii',
	        //timeWheels: 'HHii',
			rows: 5,
			height:70,
	        width: 400,
			inputClass: selclass
	    });
	});
}
//**********************************************************************************