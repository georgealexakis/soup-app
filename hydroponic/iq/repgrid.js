// JavaScript Document
/*
				pid
				date
				H_R.StartingMode,
                H_R.TerminationMode,
                H_R.DesiredEC,
                H_R.DesiredPH,
                H_R.AverageEC,
                H_R.AveragePH,
                H_R.RejectTime,
                H_R.Tank[0],
                H_R.Tank[1],
                H_R.Tank[2],
                H_R.Tank[3],
                H_R.Tank[4],
                H_R.Tank[5],
                H_R.Tank[6],
                H_R.Tank[7],
                H_R.Tank[8],
                H_R.Tank[9],
                H_R.TankAcid,
                H_R.ValveGroup[0],
                H_R.ValveGroup[1],
                H_R.ValveGroup[2],
                H_R.ValveGroup[3],
                H_R.ValveGroup[4]);
*/
var xmlHttp2;
var ReportTimer;
var ReportSecondsCounter=0;
function ReportstimeoutFired()
{
	clearInterval(ReportTimer);
	alert("Η ΣΥΣΚΕΥΗ ΔΕΝ ΑΝΤΑΠΟΚΡΙΝΕΤΑΙ! (ΕΚΤΟΣ ΧΡΟΝΟΥ)");
	document.getElementById("IrrigationReportTitleDivID").innerHTML="ΑΝΑΦΟΡΑ ΛΙΠΑΝΣΕΩΝ";
}

function CreateReportsGrid(GridDivId,DateToLoad)
{
	StopDataAcquisition();
	//alert('A');
	//ReportsGrid.clearAll(false);
	ReportsGrid = new dhtmlXGridObject(GridDivId);
	ReportsGrid.setHeader("ΟΝΟΜΑ,ΕΝΑΡΞΗ,SM,ΛΗΞΗ,ΕΠ. EC,ΕΠ. pH,MO EC,MO pH,Απόριψη (sec),Σ1,Σ2,Σ3,Σ4,Σ5,Σ6,Σ7,Σ8,Σ9,Σ10,A,B,Γ,Δ,Ε,Ζ,Η,Θ,Ι,Κ,ΟΞΥ,M");
	ReportsGrid.setInitWidths("100,120,0,150,50,50,50,50,90,55,55,55,55,55,55,55,55,55,55,50,50,50,50,50,50,50,50,50,50,50,0")
	ReportsGrid.setColAlign("left,left,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center")
	//ReportsGrid.setColTypes("ro,ro,ro,ro,ro,ro,ro");
	//mygrid.setColSorting("str,str,str")
	ReportsGrid.setSkin("dhx_skyblue")
	//(xp, mt, gray, light, clear, modern, sb_dark)
	ReportsGrid.setSkin("sb_dark");//set "light" skin to the grid
	ReportsGrid.enableKeyboardSupport(false); 
	ReportsGrid.enableLightMouseNavigation(false);
	ReportsGrid.init();
	ReportsGrid.attachEvent("onHeaderClick", HeaderClickedOnReportsGrid); 
	ReportsGrid.enableSmartRendering(true)
		
	ReportsGrid.setStyle( 'background-color:navy;color:white; font-weight:bold;", "","color:red;", " '	);
	//ReportsGrid.enableAutoWidth(true);
	xmlHttp2=GetXmlHttpObject();
	var url='http://'+SystemIpAdress+'/'+ReportFileSystem+'/'+ GetMonth_YearFromReportCalendar() +'/RE'+DateToLoad+'.TXT';
	//url=url+Math.random()+';';
	//alert(ReportFileSystem);
	//alert(url);
	//if (LocalServerIsUsed) { url = './on.php?d='+url; }
	if (LocalServerIsUsed) { url = LocalServerPath+url; }
	xmlHttp2.open("GET",url,true)
	
	xmlHttp2.timeout = 40000;
	xmlHttp2.ontimeout = ReportstimeoutFired;
	xmlHttp2.onerror = function() { ReportGridLoaded(); };
	if (msieversion() > 0)
	{
		//xmlHttp2.setRequestHeader('Cache-Control', 'no-cache');
	    //xmlHttp2.setRequestHeader('Pragma', 'no-cache');
		//xmlHttp2.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
	}
	xmlHttp2.onreadystatechange=function()
    {
  		if (xmlHttp2.readyState==4 && xmlHttp2.status==200)
     	{
			clearInterval(ReportTimer);
			txt = decodeURIComponent(xmlHttp2.responseText)
				
			ReportsGrid.setCSVDelimiter(";")
			ReportsGrid.parse(txt,"csv");
			//ReportsGrid.setNumberFormat("0,000.00",4); //(Greek)
			ReportGridLoaded();
			//ReportsGrid.setColumnColor("white,#d5f1ff,#d5f1ff");
			//ReportsGrid.printView();
			ReportsGrid.setCSVDelimiter(",")
			document.getElementById("IrrigationReportTitleDivID").innerHTML="ΑΝΑΦΟΡΑ ΛΙΠΑΝΣΕΩΝ ΓΙΑ ΤΗΝ ΗΜΕΡΟΜΗΝΙΑ: "+GetDateFromReportCalendar();
			
     	}
		else if (xmlHttp2.readyState==4 && xmlHttp2.status!=200)
     	{
			clearInterval(ReportTimer);
			txt = decodeURIComponent(xmlHttp2.responseText)
		
			//alert(txt);
			ReportsGrid.setCSVDelimiter(";")
			ReportsGrid.parse(txt,"csv");
			ReportGridLoaded();
			document.getElementById("IrrigationReportTitleDivID").innerHTML="!ΑΝΑΦΟΡΑ ΛΙΠΑΝΣΕΩΝ ΓΙΑ ΤΗΝ ΗΜΕΡΟΜΗΝΙΑ: "+GetDateFromReportCalendar();
     	}
	}
	document.getElementById("IrrigationReportTitleDivID").innerHTML="ΠΑΡΑΚΑΛΩ ΠΕΡΙΜΕΝΕΤΕ";
	xmlHttp2.send(null);
}

function HeaderClickedOnReportsGrid(ind,obj)
{
	//	alert(ind+' '+obj);
	if  (ind ==0) 
		ReportsGrid.sortRows(ind,"str","asc");    
	else if  (ind ==1) 
		ReportsGrid.sortRows(ind,"date","asc");    
	else	
		ReportsGrid.sortRows(ind,"int","asc");    
}



function ReportGridLoaded()
{
	var NumberOfRows = ReportsGrid.getRowsNum();
	document.getElementById("IrrigationReportTitleDivID").innerHTML="ΑΝΑΦΟΡΑ ΛΙΠΑΝΣΕΩΝ";
	if ( ( NumberOfRows == 1 ) && (ReportsGrid.cellById(1,2).getValue() == '') )
	{
		ReportsGrid.clearAll(false);
		alert("ΔΕΝ ΒΡΕΘΗΚΑΝ ΚΑΤΑΧΩΡΗΜΕΝΕΣ ΑΝΑΦΟΡΕΣ ΛΙΠΑΝΣΗΣ");
		return;
	}
	
	for (i=1;i<=NumberOfRows;i++)
	{
		if (i%2==0) ReportsGrid.setRowColor(i,"#d9d9d9");
		ReportsGrid.cells(i,0).setValue(AllTimeProgramsNames[ReportsGrid.cellById(i,0).getValue()-1]);
		
		if ( ReportsGrid.cellById(i,3).getValue() ==4)
		{
			ReportsGrid.cellById(i,3).setValue("ΠΑΡΟΧΗ ΕΚΤΟΣ ΟΡΙΩΝ")
			ReportsGrid.setRowTextBold(i);
			ReportsGrid.setRowColor(i,"red");
		}
		else if ( ReportsGrid.cellById(i,3).getValue() ==5)
		{
			ReportsGrid.cellById(i,3).setValue("ΔΙΑΛΥΜΑ ΕΚΤΟΣ ΟΡΙΩΝ")
			ReportsGrid.setRowTextBold(i);
			ReportsGrid.setRowColor(i,"red");
		}
		else if ( ReportsGrid.cellById(i,3).getValue() ==6)
		{
			ReportsGrid.cellById(i,3).setValue("ΥΠΕΡΒΑΣΗ ΧΡΟΝΟΥ")
			ReportsGrid.setRowTextBold(i);
			ReportsGrid.setRowColor(i,"red");
		}
		else if ( ReportsGrid.cellById(i,3).getValue() ==7)
		{
			ReportsGrid.cellById(i,3).setValue("ΠΙΕΣΗ ΕΚΤΟΣ ΟΡΙΩΝ")
			ReportsGrid.setRowTextBold(i);
			ReportsGrid.setRowColor(i,"red");
		}
		else if ( ReportsGrid.cellById(i,3).getValue() ==8)
		{
			ReportsGrid.cellById(i,3).setValue("ΣΦΑΛΜΑ ΣΤΑΘΜΗΣ ΔΕΞΑΜΕΝΗΣ")
			ReportsGrid.setRowTextBold(i);
			ReportsGrid.setRowColor(i,"red");
		}
		else 
			ReportsGrid.cellById(i,3).setValue("OK")


		ReportsGrid.cells(i,4).setValue(parseFloat(ReportsGrid.cellById(i,4).getValue()).toFixed(2));
		ReportsGrid.cells(i,5).setValue(parseFloat(ReportsGrid.cellById(i,5).getValue()).toFixed(2));
		ReportsGrid.cells(i,6).setValue(parseFloat(ReportsGrid.cellById(i,6).getValue()).toFixed(2));
		ReportsGrid.cells(i,7).setValue(parseFloat(ReportsGrid.cellById(i,7).getValue()).toFixed(2));

		ReportsGrid.cells(i,8).setValue(parseFloat(ReportsGrid.cellById(i,8).getValue()).toFixed(0));
		
		if (ReportsGrid.cellById(i,30).getValue() == 0)
		{
		ReportsGrid.cells(i,9).setValue(SecondsToTimeFormat(MyparseFloat(ReportsGrid.cellById(i,9).getValue())));		
		ReportsGrid.cells(i,10).setValue(SecondsToTimeFormat(MyparseFloat(ReportsGrid.cellById(i,10).getValue())));
		ReportsGrid.cells(i,11).setValue(SecondsToTimeFormat(MyparseFloat(ReportsGrid.cellById(i,11).getValue())));
		ReportsGrid.cells(i,12).setValue(SecondsToTimeFormat(MyparseFloat(ReportsGrid.cellById(i,12).getValue())));
		ReportsGrid.cells(i,13).setValue(SecondsToTimeFormat(MyparseFloat(ReportsGrid.cellById(i,13).getValue())));
		ReportsGrid.cells(i,14).setValue(SecondsToTimeFormat(MyparseFloat(ReportsGrid.cellById(i,14).getValue())));
		ReportsGrid.cells(i,15).setValue(SecondsToTimeFormat(MyparseFloat(ReportsGrid.cellById(i,15).getValue())));
		ReportsGrid.cells(i,16).setValue(SecondsToTimeFormat(MyparseFloat(ReportsGrid.cellById(i,16).getValue())));
		ReportsGrid.cells(i,17).setValue(SecondsToTimeFormat(MyparseFloat(ReportsGrid.cellById(i,17).getValue())));		
		ReportsGrid.cells(i,18).setValue(SecondsToTimeFormat(MyparseFloat(ReportsGrid.cellById(i,18).getValue())));		
		}
		else
		{
			ReportsGrid.cells(i,9).setValue(parseFloat(ReportsGrid.cellById(i,9).getValue()).toFixed(0));
			ReportsGrid.cells(i,10).setValue(parseFloat(ReportsGrid.cellById(i,10).getValue()).toFixed(0));
			ReportsGrid.cells(i,11).setValue(parseFloat(ReportsGrid.cellById(i,11).getValue()).toFixed(0));
			ReportsGrid.cells(i,12).setValue(parseFloat(ReportsGrid.cellById(i,12).getValue()).toFixed(0));
			ReportsGrid.cells(i,13).setValue(parseFloat(ReportsGrid.cellById(i,13).getValue()).toFixed(0));
			ReportsGrid.cells(i,14).setValue(parseFloat(ReportsGrid.cellById(i,14).getValue()).toFixed(0));
			ReportsGrid.cells(i,15).setValue(parseFloat(ReportsGrid.cellById(i,15).getValue()).toFixed(0));
			ReportsGrid.cells(i,16).setValue(parseFloat(ReportsGrid.cellById(i,16).getValue()).toFixed(0));
			ReportsGrid.cells(i,17).setValue(parseFloat(ReportsGrid.cellById(i,17).getValue()).toFixed(0));
			ReportsGrid.cells(i,18).setValue(parseFloat(ReportsGrid.cellById(i,18).getValue()).toFixed(0));
			
		}
		ReportsGrid.cells(i,19).setValue(parseFloat(ReportsGrid.cellById(i,19).getValue()).toFixed(2));
		ReportsGrid.cells(i,20).setValue(parseFloat(ReportsGrid.cellById(i,20).getValue()).toFixed(2));		
		ReportsGrid.cells(i,21).setValue(parseFloat(ReportsGrid.cellById(i,21).getValue()).toFixed(2));		
		ReportsGrid.cells(i,22).setValue(parseFloat(ReportsGrid.cellById(i,22).getValue()).toFixed(2));		
		ReportsGrid.cells(i,23).setValue(parseFloat(ReportsGrid.cellById(i,23).getValue()).toFixed(2));		
		ReportsGrid.cells(i,24).setValue(parseFloat(ReportsGrid.cellById(i,24).getValue()).toFixed(2));				
		ReportsGrid.cells(i,25).setValue(parseFloat(ReportsGrid.cellById(i,25).getValue()).toFixed(2));				
		ReportsGrid.cells(i,26).setValue(parseFloat(ReportsGrid.cellById(i,26).getValue()).toFixed(2));						
		ReportsGrid.cells(i,27).setValue(parseFloat(ReportsGrid.cellById(i,27).getValue()).toFixed(2));				
		ReportsGrid.cells(i,28).setValue(parseFloat(ReportsGrid.cellById(i,28).getValue()).toFixed(2));						
		ReportsGrid.cells(i,29).setValue(parseFloat(ReportsGrid.cellById(i,29).getValue()).toFixed(2));						
		
	}
	//if (NumberOfRows > 100)	
	//ReportsGrid.printView();
}

function GetDateFromReportCalendar()
{
	var D = $('#CalendarFrom').mobiscroll('getValue');
	$('#CalendarFrom').mobiscroll('setValue',D);
	if (D[0] < 10) D[0] = '0'+D[0];
	D[1] = parseInt(D[1])+1;
	if (D[1] < 10) D[1] = '0'+D[1];
	D[2] = parseInt(D[2])-2000;
	var DateToLoad = ''+D[0]+D[1]+D[2];

	return DateToLoad;
}

function GetMonth_YearFromReportCalendar()
{
	var D = $('#CalendarFrom').mobiscroll('getValue');
	$('#CalendarFrom').mobiscroll('setValue',D);
	if (D[0] < 10) D[0] = '0'+D[0];
	D[1] = parseInt(D[1])+1;
	if (D[1] < 10) D[1] = '0'+D[1];
	D[2] = parseInt(D[2]);//-2000;
	var DateToLoad = ''+D[1]+'_'+D[2];

	return DateToLoad;
}

function LoadReport()
{
	var DateToLoad = GetDateFromReportCalendar();
	CreateReportsGrid("ReportGridDivId",DateToLoad);
}



function CreatePrintView()
{
	ReportsGrid.printView();
}
	