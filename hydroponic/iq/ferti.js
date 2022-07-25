// JavaScript Document

function CreateFertigationProgramWindow(varid,varname)
{
		StopDataAcquisition();
		var Parameters = new Array();
		if (FlagWindowIsCreated==0)
		{	
			
			var FertigationProgram = GetFertigationProgramSetup(varid);
			if (FertigationProgram == "ERROR")
			{
				alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ 1");
				return;
			}
			Parameters = FertigationProgram.split(";"); 
				
			//*********************************************			
			//return;
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 0, 0, 720, 420);
			DialogWindow.setText("ΠΡΟΓΡΑΜΜΑ ΛΙΠΑΝΣΗΣ");
			FlagWindowIsCreated=1;
			DialogWindow.setModal(true);
			OnCloseEvent = DialogWindow.attachEvent("onClose", function(win){
				FlagWindowIsCreated=0;
				WindowsViewPort.window(win.getId()).detachEvent(OnCloseEvent);
				WindowsViewPort.window(win.getId()).close();
				DoAfterWindowClose();
    		});
			//DialogWindow.denyResize();
			//DialogWindow.denyPark();
			DialogWindow.button("minmax1").hide();
			DialogWindow.button("minmax2").hide();
			
			var TabBar = DialogWindow.attachTabbar();
			TabBar.setSkin('dhx_skyblue');
			TabBar.setImagePath("./dhxn/imgs/");

			TabBar.addTab("t1","Οθόνη 1","100px");
			TabBar.addTab("t2","Οθόνη 2","100px");
		    TabBar.setTabActive("t1");
			
			formData = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "fieldset", width: "auto", list:[
					{type: "input", label: "ID", name: "ID" , labelWidth: "30", inputWidth: 50 , value: ''+varid , readonly:true ,style: "background-color:#CCCCCC " },
					{type: "newcolumn", offset:50},
					{type: "button", position: "center", name: "OK" , value: "ΑΠΟΣΤΟΛΗ", width:150 ,className :'DialogOKButtonClass' },
					{type: "newcolumn", offset:50},
					{type: "button", position: "center", name: "CANCEL" , value: "ΑΚΥΡΟ", width:150 ,className :'DialogOKButtonClass'}
				]},
				{type: "fieldset", width: "auto", list:[
					{type: "input", label: "ONOMA:", labelWidth: "auto", labelAlign:"left" ,inputWidth:250 ,name: "NAME" , className :'DialogInputClass' ,maxLength :DEF_NAMES_MAX_LENGHT , value:varname , style: "background-color:#ffff99; "}
				]},
				{type: "fieldset", width: "auto", label: "ΠΟΣΟΣΤΑ ΠΥΚNΩΝ ΔΙΑΛΥΜΑΤΩΝ %", list:[
					{type: "input", label: "A", labelWidth:"auto", labelAlign:"right" ,inputWidth:70 ,name: "T1" , className :'DialogInputClass' , value:Parameters[0] },
					{type: "input", label: "Z", labelWidth:"auto", labelAlign:"right" ,inputWidth:70 ,name: "T6" , className :'DialogInputClass' , value:Parameters[5] },
					{type: "newcolumn", offset:0},
					{type: "input", label: "B", labelWidth:"auto", labelAlign:"right" ,inputWidth:70 ,name: "T2" , className :'DialogInputClass' , value:Parameters[1] },
					{type: "input", label: "H", labelWidth:"auto", labelAlign:"right" ,inputWidth:70 ,name: "T7" , className :'DialogInputClass' , value:Parameters[6] },
					{type: "newcolumn", offset:0},
					{type: "input", label: "Γ", labelWidth:"auto", labelAlign:"right" ,inputWidth:70 ,name: "T3" , className :'DialogInputClass' , value:Parameters[2] },
					{type: "input", label: "Θ", labelWidth:"auto", labelAlign:"right" ,inputWidth:70 ,name: "T8" , className :'DialogInputClass' , value:Parameters[7] },
					{type: "newcolumn", offset:0},
					{type: "input", label: "Δ", labelWidth:"auto", labelAlign:"right" ,inputWidth:70 ,name: "T4" , className :'DialogInputClass' , value:Parameters[3] },
					{type: "input", label: "Ι", labelWidth:"auto", labelAlign:"right" ,inputWidth:70 ,name: "T9" , className :'DialogInputClass' , value:Parameters[8] },
					{type: "newcolumn", offset:0},
					{type: "input", label: "E", labelWidth:"auto", labelAlign:"right" ,inputWidth:70 ,name: "T5" , className :'DialogInputClass' , value:Parameters[4] },
					{type: "input", label: "Κ", labelWidth:"auto", labelAlign:"right" ,inputWidth:70 ,name: "T10" ,className :'DialogInputClass' , value:Parameters[9] },
					{type: "newcolumn", offset:20},
					{type: "input", label: "ΟΞΥ", labelWidth:"auto", labelAlign:"right" ,inputWidth: 70 ,name: "TACID" ,  className :'DialogInputClass' , value:Parameters[10] }
	
				]},
				{type: "fieldset", width: "auto", label: "ΕΠΙΘΥΜΗΤΗ ΑΓΩΓΙΜΟΤΗΤΑ & pH", list:[
					{type: "input", label: "ΑΓΩΓΙΜΟΤΗΤΑ (ΕC)", labelWidth:"250", labelAlign:"left" ,inputWidth:70 ,name: "EC" , className :'DialogInputClass' , value:MyparseFloat(Parameters[12]) },
					{type: "input", label: "ΟΞΥΤΗΤΑ (pH)", labelWidth:"250", labelAlign:"left" ,inputWidth:70 ,name: "PH" , className :'DialogInputClass' , value:MyparseFloat(Parameters[11]) },
					{type: "newcolumn", offset:0},
					{type: "select", label: " + ", labelWidth: "30", labelAlign:"center" , inputWidth: 250 ,name:"ECADAPT" , className :'DialogsSelectInput'} //13
				]}

			];
			//*************************************************************
			formData2 = [
				{type: "fieldset", width: "auto", label: "ΔΙΑΧΕΙΡΙΣΗ ΑΝΑΜΙΚΤΙΚΗΣ ΔΕΞΑΜΕΝΗΣ ΣΤΗΝ ΕΝΑΡΞΗ", list:[
					{type: "checkbox", label: "ΑΠΟΡΙΨΗ:", labelWidth: "100" , labelAlign:"right" , name:"REJECT" ,checked: false, className :'DialogCheckBoxClass'}, //14
					{type: "newcolumn", offset:0},
					{type: "input", label: "για", labelWidth: "40", labelAlign:"center" ,inputWidth: 100 ,name: "REJECTSEC" ,  maxLength:4 , value: Parameters[15], className :'DialogInputClass'},
					{type: "newcolumn", offset:0},
					{type: "label", labelWidth: "auto" , label: "Δευτερόλεπτα"  }
				]},
				{type: "fieldset", width: "auto", label: "ΕΛΕΓΚΤΕΣ", list:[
					{type: "select", label: "EC ΕΛΕΓΚΤΗΣ:", labelWidth: "auto", labelAlign:"right" , inputWidth: 150 ,name:"ECPID" ,  className :'DialogsSelectInput'}, //16
					{type: "newcolumn", offset:0},
					{type: "select", label: "pH ΕΛΕΓΚΤΗΣ:", labelWidth: "auto", labelAlign:"right" , inputWidth: 150 ,name:"PHPID" ,  className :'DialogsSelectInput'} //17
				]}

			];
			//*************************************************************
			//myForm = DialogWindow.attachForm(formData);
			myForm  = TabBar.cells("t1").attachForm(formData);
			myForm2 = TabBar.cells("t2").attachForm(formData2);

			AttacheKeyboardToInput(myForm.getInput("NAME").id);
			AttacheNumKeyboardToInput(myForm2.getInput("REJECTSEC").id,0);
			AttacheNumKeyboardToInput(myForm.getInput("T1").id,0);
			AttacheNumKeyboardToInput(myForm.getInput("T2").id,0);
			AttacheNumKeyboardToInput(myForm.getInput("T3").id,0);
			AttacheNumKeyboardToInput(myForm.getInput("T4").id,0);
			AttacheNumKeyboardToInput(myForm.getInput("T5").id,0);
			AttacheNumKeyboardToInput(myForm.getInput("T6").id,0);
			AttacheNumKeyboardToInput(myForm.getInput("T7").id,0);
			AttacheNumKeyboardToInput(myForm.getInput("T8").id,0);
			AttacheNumKeyboardToInput(myForm.getInput("T9").id,0);
			AttacheNumKeyboardToInput(myForm.getInput("T10").id,0);
			AttacheNumKeyboardToInput(myForm.getInput("TACID").id,0);
			AttacheNumKeyboardToInput(myForm.getInput("EC").id,1);
			AttacheNumKeyboardToInput(myForm.getInput("PH").id,1);
			//myForm.setFontSize('x-large');
			FeelSelectWithAllVirtuals(myForm.getSelect("ECADAPT"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm2.getSelect("ECPID"),DEF_CONTROLLER_VARIABLE);
			FeelSelectWithAllVirtuals(myForm2.getSelect("PHPID"),DEF_CONTROLLER_VARIABLE);						
			//*************************************************************
			//************* SET VALUES ************************************
			//*************************************************************
			SelectOptionInSelectByValue(myForm.getSelect("ECADAPT"),Parameters[13]);
			SelectOptionInSelectByValue(myForm2.getSelect("ECPID"),Parameters[16]);
			SelectOptionInSelectByValue(myForm2.getSelect("PHPID"),Parameters[17]);
			SetCheckValue(myForm2,"REJECT",Parameters[14]);
			//*************************************************************
			myForm.attachEvent("onChange", function(name,value,is_checked){
			});
			//*************************************************************
			myForm.attachEvent("onButtonClick", function(name){
				if (name == 'CANCEL')
				{
					WindowsViewPort.window("DialogWindow").close();	
					return;
				}
				var Parameters = new Array();
				Parameters[0]=myForm.getInput("T1").value;
				Parameters[1]=myForm.getInput("T2").value;	
				Parameters[2]=myForm.getInput("T3").value;	
				Parameters[3]=myForm.getInput("T4").value;	
				Parameters[4]=myForm.getInput("T5").value;	
				Parameters[5]=myForm.getInput("T6").value;	
				Parameters[6]=myForm.getInput("T7").value;	
				Parameters[7]=myForm.getInput("T8").value;	
				Parameters[8]=myForm.getInput("T9").value;	
				Parameters[9]=myForm.getInput("T10").value;	
				Parameters[10]=myForm.getInput("TACID").value;	
				Parameters[11]=myForm.getInput("PH").value;	
				Parameters[12]=myForm.getInput("EC").value;	
				Parameters[13]=myForm.getSelect("ECADAPT").options[myForm.getSelect("ECADAPT").selectedIndex].value;
				if ( myForm2.isItemChecked("REJECT") ) {Parameters[14]=1;} else {Parameters[14]=0;}
				Parameters[15]=myForm2.getInput("REJECTSEC").value;					
				Parameters[16]=myForm2.getSelect("ECPID").options[myForm2.getSelect("ECPID").selectedIndex].value;
				Parameters[17]=myForm2.getSelect("PHPID").options[myForm2.getSelect("PHPID").selectedIndex].value;
				SetFertigationProgramSetup(myForm.getInput("ID").value,myForm.getInput("NAME").value,Parameters,Parameters.length);
				WindowsViewPort.window("DialogWindow").close();
				ReloadFertigationProgramsGrid();
			})
		}
		
		
//					$(function(){
//					$('#'+myForm.getInput("NAME").id).keyboard();//
//					});
//				return;
		
		
}
//**********************************************************************************
function SetFertigationProgramSetup(pid,Name,Parameters,ParametersLenght)
{
	var txt=''
	
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 013;'+pid+';';
	for (i=0;i<ParametersLenght;i++)
	{
		url=url+Parameters[i]+';';
	}
	
	var NameLenght = Name.length;
    for (i=NameLenght;i<DEF_NAMES_MAX_LENGHT;i++)
		Name=Name+'~';
	Name=Name.replace(/ /g,'~');
	Name = ConvertStringToHEX(Name);
	url=url+Name+';';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);
	
}
//**********************************************************************************
function GetFertigationProgramSetup(pid)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 012;'+pid+';';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	return txt;
}
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
function CreateFertigationProgramsGrid()
{
	//VariablesGrid = new dhtmlXGridObject(GridDivId);
	FertigationProgramsGrid.setHeader("ID,ONOMA, ");
	FertigationProgramsGrid.setInitWidths("50,300,0")
	FertigationProgramsGrid.setColAlign("left,left,center")
	FertigationProgramsGrid.setColTypes("ro,ro,ro");
	//mygrid.setColSorting("str,str,str")
	FertigationProgramsGrid.setSkin("dhx_skyblue")
	FertigationProgramsGrid.enableKeyboardSupport(false); 
	FertigationProgramsGrid.enableLightMouseNavigation(false);
	FertigationProgramsGrid.init();
	FertigationProgramsGrid.attachEvent("onRowSelect", RowClickedOnFertigationProgramsGrid);
	FertigationProgramsGrid.attachEvent("onRightClick", RowClickedOnFertigationProgramsGrid);	
	
	FertigationProgramsGrid.attachEvent("onHeaderClick", HeaderClickedOnFertigationProgramsGrid);
	
	var url='http://'+SystemIpAdress+'/'+SystemFileSystem+FERTIGATION_NAMES_RAM_FILE_NAME;
	//url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	FertigationProgramsGrid.parse(txt,"csv");
	FertigationProgramsGridLoaded();
	
}

function ReloadFertigationProgramsGrid()
{
	//VariablesGrid.clearAndLoad('http://'+SystemIpAdress+'/'+SystemFileSystem+'/vir.txt',VariablesGridLoaded,"csv");
	FertigationProgramsGrid.clearAll(false);
	var url='http://'+SystemIpAdress+'/'+SystemFileSystem+FERTIGATION_NAMES_RAM_FILE_NAME;
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	FertigationProgramsGrid.parse(txt,"csv");
	FertigationProgramsGridLoaded();
}

function FertigationProgramsGridLoaded()
{
	for (i=0;i<DEF_MAXIMUM_FERTIGATION_PROGRAMS;i++)
	{
		AllFertigationProgramsNames[i]='';
	}
	
	var NumberOfRows = FertigationProgramsGrid.getRowsNum();
	for (i=1;i<=NumberOfRows;i++)
	{
		//FertigationProgramsGrid.setRowTextStyle(i, "font-size:x-large;color:#291919;font-family: digital-7, Arial, Helvetica, sans-serif;");
		FertigationProgramsGrid.cells(i,1).setValue(hex2a(FertigationProgramsGrid.cellById(i,1).getValue()));
		FertigationProgramsGrid.cells(i,1).setValue(FertigationProgramsGrid.cellById(i,1).getValue().replace(/~/g,' '));
		AllFertigationProgramsNames[i-1]=FertigationProgramsGrid.cellById(i,1).getValue();
	}
	FeelSelectWithFertigationPrograms(document.getElementById('InfoFertiList'));
	ConvertSelectToMobiScrollSelect(document.getElementById('InfoFertiList').id,document.getElementById('InfoFertiList').className);
}


function HeaderClickedOnFertigationProgramsGrid(ind,obj)
{
	//	alert(ind+' '+obj);
	if  (ind ==0)
		FertigationProgramsGrid.sortRows(ind,"int","asc");    
	else	
		FertigationProgramsGrid.sortRows(ind,"str","asc");    
}

function RowClickedOnFertigationProgramsGrid(row,col,ev)
{
	if (col==0)
	{
		CreateFertigationProgramWindow(FertigationProgramsGrid.cellById(row,0).getValue(),FertigationProgramsGrid.cellById(row,1).getValue());
	}

}


function CreateGeneralHydroponicsDialog()
{
		StopDataAcquisition();
		var Parameters = new Array();
		if (FlagWindowIsCreated==0)
		{	
			
			var GeneralHydroponicsSetup = GetGeneralHydroponicsSetup();
			if (GeneralHydroponicsSetup == "ERROR")
			{
				alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ");
				return;
			}
			Parameters = GeneralHydroponicsSetup.split(";"); 
				
			//*********************************************			
			//return;
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow",0,0,650,430);
			DialogWindow.setText("ΓΕΝΙΚΕΣ ΡΥΘΜΙΣΕΙΣ ΛΙΠΑΝΣΗΣ");
			FlagWindowIsCreated=1;
			DialogWindow.setModal(true);
			OnCloseEvent = DialogWindow.attachEvent("onClose", function(win){
				FlagWindowIsCreated=0;
				WindowsViewPort.window(win.getId()).detachEvent(OnCloseEvent);
				WindowsViewPort.window(win.getId()).close();
				DoAfterWindowClose();
    		});
			DialogWindow.denyResize();
			DialogWindow.denyPark();
			DialogWindow.button("minmax1").hide();
			DialogWindow.button("minmax2").hide();

			var TabBar = DialogWindow.attachTabbar();
			TabBar.setSkin('dhx_skyblue');
			TabBar.setImagePath("./dhxn/imgs/");

			TabBar.addTab("t1","Οθόνη 1","100px");
			TabBar.addTab("t2","Οθόνη 2","100px");
			TabBar.addTab("t3","Οθόνη 3","100px");
			TabBar.setTabActive("t1");

			formData = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "fieldset", width: "auto", list:[
					{type: "button", position: "center", name: "OK" , value: "ΑΠΟΣΤΟΛΗ", width:150 ,className :'DialogOKButtonClass' },
					{type: "newcolumn", offset:50},
					{type: "button", position: "center", name: "CANCEL" , value: "ΑΚΥΡΟ", width:150 ,className :'DialogOKButtonClass'}
				]},
				{type: "fieldset", width: "auto", label: "ΜΕΤΑΒΛΗΤΕΣ ΕΛΕΓΧΟΥ", list:[
					{type: "select", label: "EC:", labelWidth: "250", labelAlign:"left" , inputWidth: 200 ,name:"ECV" , className :'DialogsSelectInput' }, // 0
					{type: "select", label: "pH:", labelWidth: "250", labelAlign:"left" , inputWidth: 200 ,name:"PHV" , className :'DialogsSelectInput' }, // 1
					{type: "select", label: "ΓΕΝΙΚΟ ΣΦΑΛΜΑ:", labelWidth: "250", labelAlign:"left" , inputWidth: 200 ,name:"ALARMV" , className :'DialogsSelectInput'}, // 2
					{type: "select", label: "ΚΕΝΗ ΔEΞΑΜΕΝΗ:", labelWidth: "250", labelAlign:"left" , inputWidth: 200 ,name:"LLTV" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "ΒΑΛΒΙΔΑ ΑΠΟΡΙΨΗΣ:", labelWidth: "250", labelAlign:"left" , inputWidth: 200 ,name:"REJV" , className :'DialogsSelectInput'}, // 4
					{type: "select", label: "ΠΑΡΟΧΗ (m3/h):", labelWidth: "250", labelAlign:"left" , inputWidth: 200 ,name:"FLOWMETER2" , className :'DialogsSelectInput'}, // 20
					{type: "select", label: "ΕΞΟΔΟΣ ΣΥΝΑΓΕΡΜΟΥ:", labelWidth: "250", labelAlign:"left" , inputWidth: 200 ,name:"ALARMOUTPUT" , className :'DialogsSelectInput'}, // 23
					{type: "select", label: "ΠΑΡΟΧΟΜΕΤΡΟ ΑΡΔ.:", labelWidth: "250", labelAlign:"left" , inputWidth: 200 ,name:"IRRIGATIONFLOWMETER" , className :'DialogsSelectInput'}, // 24		
					{type: "select", label: "ΜΑΝΟΜΕΤΡΟ:", labelWidth: "250", labelAlign:"left" , inputWidth: 200 ,name:"IPRESUREMETER" , className :'DialogsSelectInput'}, // 25
					{type: "select", label: "ΗΛΙΟΜΕΤΡΟ:", labelWidth: "250", labelAlign:"left" , inputWidth: 200 ,name:"IPSOLARMETER" , className :'DialogsSelectInput'}, // 26
					{type: "select", label: "ΑΝΑΦΟΡΕΣ:", labelWidth: "250" , inputWidth: 220 ,name: "ENABLEREPORTS" ,className :			'DialogsSelectInput' ,options:[
						{text: "OXI",  value: "0"},
						{text: "NAI ΜΟΝΟ ΚΑΡΤΑ SD",  value: "1"},
						{text: "NAI MONO WEB", value: "2"},
						{text: "NAI ΚΑΡΤΑ SD & WEB", value: "3"}
					]}					
				]}
			];
			//*************************************************************
			formData2 = [			
				{type: "fieldset", width: "auto", label: "ΒΑΛΒΙΔΕΣ ΛΙΠΑΣΜΑΤΩΝ & ΟΞΕΟΣ", list:[
					{type: "select", label: "Α:", labelWidth: "30", labelAlign:"left" , inputWidth: 200 ,name:"TA" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "Β:", labelWidth: "30", labelAlign:"left" , inputWidth: 200 ,name:"TB" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "Γ:", labelWidth: "30", labelAlign:"left" , inputWidth: 200 ,name:"TC" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "Δ:", labelWidth: "30", labelAlign:"left" , inputWidth: 200 ,name:"TD" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "Ε:", labelWidth: "30", labelAlign:"left" , inputWidth: 200 ,name:"TE" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "ΟΞΥ:", labelWidth: "60", labelAlign:"left" , inputWidth: 200 ,name:"TACID" , className :'DialogsSelectInput'},   // 3
					{type: "newcolumn", offset:10},
					{type: "select", label: "Ζ:", labelWidth: "30", labelAlign:"left" , inputWidth: 200 ,name:"TF" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "Η:", labelWidth: "30", labelAlign:"left" , inputWidth: 200 ,name:"TG" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "Θ:", labelWidth: "30", labelAlign:"left" , inputWidth: 200 ,name:"TH" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "Ι:", labelWidth: "30", labelAlign:"left" , inputWidth: 200 ,name:"TJ" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "Κ:", labelWidth: "30", labelAlign:"left" , inputWidth: 200 ,name:"TK" , className :'DialogsSelectInput'}   // 3
				]}
			];
			//*************************************************************
			formData3 = [			
				{type: "fieldset", width: "auto", label: "ΟΡΙΑ ΑΓΩΓΙΜΟΤΗΤΑΣ & pH", list:[
					{type: "input", label: "ΚΑΤΩ ΟΡΙΟ pH:", labelWidth: "150", labelAlign:"right" ,inputWidth: 80 ,name: "PHLL" ,  maxLength:5 , value: MyparseFloat(Parameters[5]),className :'DialogInputClass'},
					{type: "input", label: "ΚΑΤΩ ΟΡΙΟ EC:", labelWidth: "150", labelAlign:"right" ,inputWidth: 80 ,name: "ECLL" ,  maxLength:5 , value: MyparseFloat(Parameters[6]),className :'DialogInputClass'},
					{type: "newcolumn", offset:0},
					{type: "input", label: "ΠΑΝΩ ΟΡΙΟ pH:", labelWidth: "150", labelAlign:"right" ,inputWidth: 80 ,name: "PHHL" ,  maxLength:5 , value: MyparseFloat(Parameters[7]),className :'DialogInputClass'},
					{type: "input", label: "ΠΑΝΩ ΟΡΙΟ EC:", labelWidth: "150", labelAlign:"right" ,inputWidth: 80 ,name: "ECHL" ,  maxLength:5 , value: MyparseFloat(Parameters[8]),className :'DialogInputClass'}
				]},
				{type: "fieldset", width: "auto", list:[
					{type: "input", label: "ΕΝΕΡΓΟΠΟΙΗΣΗ ΣΥΝΑΓΕΡΜΟΥ (sec):", labelWidth:"380", labelAlign:"left" ,inputWidth:70 ,name: "MaxSecondsForAlarm" , className :'DialogInputClass' , value:Parameters[22] }
				]},
			];
			//*************************************************************

			//myForm = DialogWindow.attachForm(formData);
			myForm  = TabBar.cells("t1").attachForm(formData);
			myForm2 = TabBar.cells("t3").attachForm(formData2);
			myForm3 = TabBar.cells("t2").attachForm(formData3);
	
			AttacheNumKeyboardToInput(myForm3.getInput("PHLL").id,1);
			AttacheNumKeyboardToInput(myForm3.getInput("ECLL").id,1);
			AttacheNumKeyboardToInput(myForm3.getInput("PHHL").id,1);
			AttacheNumKeyboardToInput(myForm3.getInput("ECHL").id,1);			

			//*************************************************************
			//************* FILL LIST BOXES *******************************
			//*************************************************************
			FeelSelectWithAllVirtuals(myForm.getSelect("ECV"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("PHV"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("ALARMV"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("LLTV"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("FLOWMETER2"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("IRRIGATIONFLOWMETER"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("IPRESUREMETER"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("IPSOLARMETER"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("ALARMOUTPUT"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm.getSelect("REJV"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm2.getSelect("TA"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm2.getSelect("TB"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm2.getSelect("TC"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm2.getSelect("TD"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm2.getSelect("TE"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm2.getSelect("TF"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm2.getSelect("TG"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm2.getSelect("TH"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm2.getSelect("TJ"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm2.getSelect("TK"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm2.getSelect("TACID"),DEF_DIGITAL_OUTPUT_VARIABLE);						
			//*************************************************************
			//************* SET VALUES ************************************
			//*************************************************************
			//SetCheckValue(myForm,"ENABLEREPORTS",Parameters[20]);
			myForm.getSelect("ENABLEREPORTS").selectedIndex = parseInt(Parameters[20]);
			SelectOptionInSelectByValue(myForm.getSelect("FLOWMETER2"),Parameters[21]);	
			SelectOptionInSelectByValue(myForm.getSelect("IRRIGATIONFLOWMETER"),Parameters[24]);
			SelectOptionInSelectByValue(myForm.getSelect("IPRESUREMETER"),Parameters[25]);
			SelectOptionInSelectByValue(myForm.getSelect("IPSOLARMETER"),Parameters[26]);
			SelectOptionInSelectByValue(myForm.getSelect("ALARMOUTPUT"),Parameters[23]);	
			SelectOptionInSelectByValue(myForm.getSelect("ECV"),Parameters[0]);
			SelectOptionInSelectByValue(myForm.getSelect("PHV"),Parameters[1]);
			SelectOptionInSelectByValue(myForm.getSelect("ALARMV"),Parameters[2]);
			SelectOptionInSelectByValue(myForm.getSelect("LLTV"),Parameters[3]);
			SelectOptionInSelectByValue(myForm.getSelect("REJV"),Parameters[4]);			
			SelectOptionInSelectByValue(myForm2.getSelect("TA"),Parameters[9]);
			SelectOptionInSelectByValue(myForm2.getSelect("TB"),Parameters[10]);
			SelectOptionInSelectByValue(myForm2.getSelect("TC"),Parameters[11]);
			SelectOptionInSelectByValue(myForm2.getSelect("TD"),Parameters[12]);
			SelectOptionInSelectByValue(myForm2.getSelect("TE"),Parameters[13]);			
			SelectOptionInSelectByValue(myForm2.getSelect("TF"),Parameters[14]);
			SelectOptionInSelectByValue(myForm2.getSelect("TG"),Parameters[15]);
			SelectOptionInSelectByValue(myForm2.getSelect("TH"),Parameters[16]);
			SelectOptionInSelectByValue(myForm2.getSelect("TJ"),Parameters[17]);
			SelectOptionInSelectByValue(myForm2.getSelect("TK"),Parameters[18]);			
			SelectOptionInSelectByValue(myForm2.getSelect("TACID"),Parameters[19]);	
			//*************************************************************
			myForm.attachEvent("onChange", function(name,value,is_checked){
			});
			//*************************************************************
			
			//*************************************************************
			myForm.attachEvent("onButtonClick", function(name){
				if (name == 'CANCEL')
				{
					WindowsViewPort.window("DialogWindow").close();	
					return;
				}
				var Parameters = new Array();
				Parameters[0]=myForm.getSelect("ECV").options[myForm.getSelect("ECV").selectedIndex].value;
				Parameters[1]=myForm.getSelect("PHV").options[myForm.getSelect("PHV").selectedIndex].value;
				Parameters[2]=myForm.getSelect("ALARMV").options[myForm.getSelect("ALARMV").selectedIndex].value;
				Parameters[3]=myForm.getSelect("LLTV").options[myForm.getSelect("LLTV").selectedIndex].value;
				Parameters[4]=myForm.getSelect("REJV").options[myForm.getSelect("REJV").selectedIndex].value;
				Parameters[5]=myForm3.getInput("PHLL").value;
				Parameters[6]=myForm3.getInput("ECLL").value;	
				Parameters[7]=myForm3.getInput("PHHL").value;	
				Parameters[8]=myForm3.getInput("ECHL").value;
				Parameters[9] =myForm2.getSelect("TA").options[myForm2.getSelect("TA").selectedIndex].value;
				Parameters[10]=myForm2.getSelect("TB").options[myForm2.getSelect("TB").selectedIndex].value;
				Parameters[11]=myForm2.getSelect("TC").options[myForm2.getSelect("TC").selectedIndex].value;
				Parameters[12]=myForm2.getSelect("TD").options[myForm2.getSelect("TD").selectedIndex].value;
				Parameters[13]=myForm2.getSelect("TE").options[myForm2.getSelect("TE").selectedIndex].value;
				Parameters[14]=myForm2.getSelect("TF").options[myForm2.getSelect("TF").selectedIndex].value;
				Parameters[15]=myForm2.getSelect("TG").options[myForm2.getSelect("TG").selectedIndex].value;
				Parameters[16]=myForm2.getSelect("TH").options[myForm2.getSelect("TH").selectedIndex].value;
				Parameters[17]=myForm2.getSelect("TJ").options[myForm2.getSelect("TJ").selectedIndex].value;
				Parameters[18]=myForm2.getSelect("TK").options[myForm2.getSelect("TK").selectedIndex].value;
				Parameters[19]=myForm2.getSelect("TACID").options[myForm2.getSelect("TACID").selectedIndex].value;
				//if ( myForm.isItemChecked("ENABLEREPORTS") ) {Parameters[20]=1;} else {Parameters[20]=0;}
				Parameters[20]=parseInt(myForm.getSelect("ENABLEREPORTS").options[myForm.getSelect("ENABLEREPORTS").selectedIndex].value)
				Parameters[21]=myForm.getSelect("FLOWMETER2").options[myForm.getSelect("FLOWMETER2").selectedIndex].value;
				Parameters[22]=myForm3.getInput("MaxSecondsForAlarm").value;
				Parameters[23]=myForm.getSelect("ALARMOUTPUT").options[myForm.getSelect("ALARMOUTPUT").selectedIndex].value;
				Parameters[24]=myForm.getSelect("IRRIGATIONFLOWMETER").options[myForm.getSelect("IRRIGATIONFLOWMETER").selectedIndex].value;
				Parameters[25]=myForm.getSelect("IPRESUREMETER").options[myForm.getSelect("IPRESUREMETER").selectedIndex].value;
				Parameters[26]=myForm.getSelect("IPSOLARMETER").options[myForm.getSelect("IPSOLARMETER").selectedIndex].value;
				SetGeneralHydroponicsSetup(Parameters,Parameters.length);
				WindowsViewPort.window("DialogWindow").close();
			})
		}
}

function GetGeneralHydroponicsSetup()
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 014;';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	return txt;
}

function SetGeneralHydroponicsSetup(Parameters,ParametersLenght)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 015;';
	for (i=0;i<ParametersLenght;i++)
	{
		url=url+Parameters[i]+';';
	}
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);

}