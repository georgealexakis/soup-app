// JavaScript Document
var xmlHttp
var hintID="";

//***************************************************************************
dhtmlXCalendarObject.prototype.langData["de"] = {
			dateformat: '%d.%m.%Y',
			monthesFNames: ["Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μαίος","Ιούνιος","Ιούλιος","Αυγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος"],
			monthesSNames: ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],
			daysFNames: ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
			daysSNames: ["Κυ","Δε","Τρ","Τε","Πε","Πα","Σα"],
			weekstart: 1
}
//***************************************************************************
function doOnLoad()
{
	DataValuesArrayIndex = GetDataValuesArrayIndex();
	LoadVariablesNames();
	CreateCalendar();
	LoadDataFile();
	document.getElementById("MessageDIVID").innerHTML = "ΠΑΡΑΚΑΛΩ ΕΠΙΛΕΞΤΕ ΗΜΕΡΟΜΗΝΙΕΣ ΓΙΑ ΜΕΤΑΦΟΡΑ ΔΕΔΟΜΕΝΩΝ";
}
//***************************************************************************
function DataTimeoutFired()
{
	alert("Η ΣΥΣΚΕΥΗ ΔΕΝ ΑΝΤΑΠΟΚΡΙΝΕΤΑΙ! (ΕΚΤΟΣ ΧΡΟΝΟΥ)");
}
//***************************************************************************
function XmlSynchronousHttpRequest(url,timeout,timeoutfunction)
{
	var txt='';
	xmlHttp=GetXmlHttpObject()
	if (xmlHttp==null)
	{
		alert ("Browser does not support HTTP Request");
		return;
	}
	//*************************************************
	//XmlSynchronousHttpRequestTimer  = setTimeout(timeoutfunction,timeout);
	if (LocalServerIsUsed) { url='../on.php?d='+url; }
	//alert(url);
	xmlHttp.open("GET",url,false);
	if (msieversion() > 0)
	{
		xmlHttp.setRequestHeader('Cache-Control', 'no-cache');
	    xmlHttp.setRequestHeader('Pragma', 'no-cache');
		xmlHttp.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
	}
	xmlHttp.send(null);
	//window.clearTimeout(XmlSynchronousHttpRequestTimer);
	txt = decodeURIComponent(xmlHttp.responseText);
	//alert(txt);
	return txt;
}
//************************************************************
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
//************************************************************
function timeoutFired()
{
	xmlHttp.abort();
	document.getElementById("MessageDIVID").innerHTML = "ΣΦΑΛΜΑ. Η ΣΥΣΚΕΥΗ ΔΕΝ ΑΝΤΑΠΟΚΡΙΝΕΤΑΙ! ΠΑΡΑΚΑΛΩ ΞΑΝΑΠΡΟΣΠΑΘΗΣΤΕ ";
	//alert("Η ΣΥΣΚΕΥΗ ΔΕΝ ΑΝΤΑΠΟΚΡΙΝΕΤΑΙ!");
}
//************************************************************
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
//************************************************************
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
function msieversion()
   {
      var ua = window.navigator.userAgent
      var msie = ua.indexOf ( "MSIE " )

      if ( msie > 0 )      // If Internet Explorer, return version number
         return parseInt (ua.substring (msie+5, ua.indexOf (".", msie )))
      else                 // If another browser, return 0
         return 0

   }
//************************************************************
function LoadDataFile2()
{
	var Alltxt = '';
	var DateFrom = myCalendarFrom.getFormatedDate("%m/%d/%y");
	var DateTo   = myCalendarTo.getFormatedDate("%m/%d/%y");
	
	var date1 = new Date(DateFrom);
	var date2 = new Date(DateTo);
	var timeDiff = Math.abs(date2.getTime() - date1.getTime());
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))+1; 
	
	for (i=0;i<diffDays;i++)
	{
		//date1.setDate(date1.getDate() + i*1);
		DateToLoad = String("0" + date1.getDate()).slice(-2);
		DateToLoad = DateToLoad + String("0" + (date1.getMonth()+1)).slice(-2);
		if ( date1.getFullYear() < 2000)
		{
			DateToLoad = DateToLoad + String(date1.getFullYear()-1900);
		}
		else
		{
			DateToLoad = DateToLoad + String(date1.getFullYear()-2000);
		}	
	//	var url='http://'+SystemIpAdress+'/'+ReportFileSystem+'/DATA/'+'D'+DateToLoad+'.TXT';
		if ( date1.getFullYear() < 2000)
		{
			var url='http://'+SystemIpAdress+'/'+ReportFileSystem+'/DATA/'+String("0" + (date1.getMonth()+1)).slice(-2)+'_'+String(date1.getFullYear()-1900+2000)+'/D'+DateToLoad+'.TXT';

		}
		else
		{
			var url='http://'+SystemIpAdress+'/'+ReportFileSystem+'/DATA/'+String("0" + (date1.getMonth()+1)).slice(-2)+'_'+String(date1.getFullYear())+'/D'+DateToLoad+'.TXT';

		}	


		date1.setDate(date1.getDate() + 1);
		//alert(url);
		txt = XmlSynchronousHttpRequest(url,3000,DataTimeoutFired);
		txt = decodeURIComponent(xmlHttp.responseText)
		if ( txt.indexOf("IQ:File") < 0) 
		{
			Alltxt = Alltxt + txt;
		}
	}	
	//alert(Alltxt);
	DataLinesArray = Alltxt.split("\r"); 
	var LinesLenght = DataLinesArray.length-1;
	document.getElementById("MessageDIVID").innerHTML = "ΦΟΡΤΩΘΗΚΑΝ "+LinesLenght+' ΓΡΑΜΜΕΣ ΔΕΔΟΜΕΝΩΝ ';
}
//***************************************************************************
function LoadDataFile()
{
	document.getElementById("MessageDIVID").innerHTML = "ΠΑΡΑΚΑΛΩ ΠΕΡΙΜΕΝΕΤΕ";
	LoadDataTimer  = setTimeout(LoadDataFile2,50);
}
//***************************************************************************
function LoadVariablesNames()
{
	
	var url='http://'+SystemIpAdress+'/'+SystemFileSystem+'/VIR.RAM ';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,DataTimeoutFired);
	txt = decodeURIComponent(txt);
	
	//alert(txt);
	var tmpDataArray = new Array(); 
	var tmpLinesArray = new Array();
	tmpLinesArray = txt.split("\n"); 
	//alert(tmpLinesArray.length);
	for (i = 0 ; i < tmpLinesArray.length ; i++) 
	{
		AllVirtualVariablesType[i] = 0;
		AllVirtualVariablesName[i] = '';
		tmpDataArray = tmpLinesArray[i].split(",");
		AllVirtualVariablesName[i] = hex2a(tmpDataArray[1]+'7E7E');
		AllVirtualVariablesName[i] = AllVirtualVariablesName[i].replace(/~/g,' ') 
		AllVirtualVariablesType[i] = tmpDataArray[2]; 
	}

	var opt1 = document.createElement("option");
	opt1.text  = "ΕΠΙΛΕΞΤΕ";
    opt1.value = '0,0';
	document.getElementById("Graph1VariablesList").options.add(opt1);
	var opt2 = document.createElement("option");
	opt2.text  = "ΕΠΙΛΕΞΤΕ";
    opt2.value = '0,0';
	document.getElementById("Graph2VariablesList").options.add(opt2);

	for (i=0;i<DataValuesArrayIndex.length;i++)
	{
		if (DataValuesArrayIndex[i] != 0)
		{
			var opt1 = document.createElement("option");
	    	opt1.text  = AllVirtualVariablesName[DataValuesArrayIndex[i]];
		    opt1.value = i+','+AllVirtualVariablesName[DataValuesArrayIndex[i]];
    		document.getElementById("Graph1VariablesList").options.add(opt1);
			var opt2 = document.createElement("option");
	    	opt2.text  = AllVirtualVariablesName[DataValuesArrayIndex[i]];
		    opt2.value = i+','+AllVirtualVariablesName[DataValuesArrayIndex[i]];
			document.getElementById("Graph2VariablesList").options.add(opt2);
		}	
	}	
}
//***************************************************************************
function ClearGraph(gid)
{
	var chart = $('#IQ_Graph'+gid+'Container').highcharts();
	for (i=chart.series.length ; i>0 ; i--) 
	{
		chart.series[i-1].remove(false);
	}
	chart.redraw();
}
//***************************************************************************
function GetDataValuesArrayIndex()
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 029;';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	//alert(txt);
	var Parameters = new Array();
	Parameters = txt.split(";"); 
	// GIA NA MEINOYN STON PINAKA MONO TA ID TON APOUHKEYMENON METABLHTON
	Parameters.splice(0,1);
	Parameters.splice(0,1);
	Parameters.splice(15,5);
	
	return Parameters;
}
//***************************************************************************
function CreateCalendar()
{
	myCalendarFrom = new dhtmlXCalendarObject("CalendarFrom");
	myCalendarFrom.loadUserLanguage('de');
	myCalendarFrom.hideTime();
	//myCalendar.show();
	myCalendarFrom.setDateFormat("%d/%m/%Y");
	var d = new Date();
    var day   = d.getDate();
	var month = d.getMonth(); 
	var year  = d.getFullYear(); 
	document.getElementById('CalendarFrom').value=day+'/'+parseInt(month+1,10)+'/'+year;
	//myCalendar.setDate("2011-06-08");
	myCalendarFrom.setDate(day+'/'+parseInt(month+1,10)+'/'+year);

	myCalendarTo = new dhtmlXCalendarObject("CalendarTo");
	myCalendarTo.loadUserLanguage('de');
	myCalendarTo.hideTime();
	//myCalendar.show();
	myCalendarTo.setDateFormat("%d/%m/%Y");
	var d = new Date();
    var day   = d.getDate();
	var month = d.getMonth(); 
	var year  = d.getFullYear(); 
	document.getElementById('CalendarTo').value=day+'/'+parseInt(month+1,10)+'/'+year;
	//myCalendar.setDate("2011-06-08");
	myCalendarTo.setDate(day+'/'+parseInt(month+1,10)+'/'+year);

}
//***************************************************************************

