// JavaScript Document

function CreateLoopsProgramWindow(varid,varname)
{
		StopDataAcquisition();
		var Parameters = new Array();
		if (FlagWindowIsCreated==0)
		{	
			
			var LoopProgram = GetLoopsSetup(varid);
			if (LoopProgram == "ERROR")
			{
				alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ 1");
				return;
			}
			Parameters = LoopProgram.split(";"); 
				
			//*********************************************			
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 5, 5, 600, 400);
			DialogWindow.setText("ΠΡΟΓΡΑΜΜΑ ΓΕΝΙΚΟΥ ΕΛΕΓΧΟΥ");
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

			formData = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "block", width: "550", list:[
					{type: "input", label: "ID", name: "ID" , labelWidth: "30", inputWidth: 50 , value: ''+varid , readonly:true ,style: "background-color:#CCCCCC " },
					{type: "newcolumn", offset:0},
					{type: "input", label: "ONOMA:", labelWidth: "70", labelAlign:"right" ,inputWidth: 180 ,name: "NAME" ,  maxLength :DEF_NAMES_MAX_LENGHT , value:varname },
					{type: "newcolumn", offset:0},
					{type: "label", labelWidth: "100" , label: "                      "},
					{type: "newcolumn", offset:0},
					{type: "button", position: "center", name: "OK" , value: "ΑΠΟΣΤΟΛΗ"}
				]},
				{type: "fieldset", width: "550", label: "ΠΑΡΑΜΕΤΡΟΙ", list:[
					{type: "checkbox", label: "ΓΕΝΙΚΗ ΕΝΕΡΓΟΠΟΙΗΣΗ:", labelWidth: "150" , labelAlign:"right" , name:"ENABLE" ,checked: false},
					{type: "select",   label: "ΕΝΕΡΓΟΠΟΙΗΣΗ:", labelWidth: "140", inputWidth: 120 , name:"ENABLEVV" },
					{type: "select",   label: "ΕΠΙΘΥΜΗΤΗ ΤΙΜΗ:", labelWidth: "140", inputWidth: 120 , name:"SETPOINT" },
					{type: "select",   label: "ΑΝΑΤΡΟΦΟΔΟΤΗΣΗ:", labelWidth: "140", inputWidth: 120 , name:"FEEDBACK" },
					{type: "select",   label: "ΕΛΕΓΚΤΗΣ:", labelWidth: "140", inputWidth: 120 , name:"CONTROLLER" },
					{type: "select",   label: "ΠΡΟΣΟΤΡΟΦΟΔΟΤΗΣΗ:", labelWidth: "140", inputWidth: 120 , name:"FEEDFORWARD" },
					{type: "select",   label: "ΕΞΟΔΟΣ:", labelWidth: "140", inputWidth: 120 , name:"OUTPUTDRIVER" },
					{type: "select",   label: "ΑΠΕΥΘΕΙΑΣ ΕΝΤΟΛΗ:", labelWidth: "140", inputWidth: 120 , name:"COMMAND" },
					{type: "select",   label: "ΔΙΑΚΟΠΤΗΣ:", labelWidth: "140", inputWidth: 120 , name:"SWITCH" }
				]}

			];
			//*************************************************************
			myForm = DialogWindow.attachForm(formData);
			//*************************************************************
			//************* FILL LIST BOXES *******************************
			//*************************************************************
			FeelSelectWithAllVirtuals(myForm.getSelect("ENABLEVV"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("SETPOINT"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("FEEDBACK"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("CONTROLLER"),DEF_CONTROLLER_VARIABLE);
			FeelSelectWithAllVirtuals(myForm.getSelect("FEEDFORWARD"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("OUTPUTDRIVER"),DEF_OUTPUT_DRIVER_VARIABLE);
			FeelSelectWithAllVirtuals(myForm.getSelect("COMMAND"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("SWITCH"),DEF_ALL_VIRTUALS_MASK);
			//*************************************************************
			//************* SET VALUES ************************************
			//*************************************************************
			SetCheckValue(myForm,"ENABLE",Parameters[0]);
			SelectOptionInSelectByValue(myForm.getSelect("ENABLEVV"),Parameters[1]);
			SelectOptionInSelectByValue(myForm.getSelect("SETPOINT"),Parameters[2]);
			SelectOptionInSelectByValue(myForm.getSelect("FEEDBACK"),Parameters[3]);
			SelectOptionInSelectByValue(myForm.getSelect("CONTROLLER"),Parameters[4]);
			SelectOptionInSelectByValue(myForm.getSelect("FEEDFORWARD"),Parameters[5]);
			SelectOptionInSelectByValue(myForm.getSelect("OUTPUTDRIVER"),Parameters[6]);
			SelectOptionInSelectByValue(myForm.getSelect("COMMAND"),Parameters[7]);
			SelectOptionInSelectByValue(myForm.getSelect("SWITCH"),Parameters[8]);

			//*************************************************************
			myForm.attachEvent("onChange", function(name,value,is_checked){
			});
			//*************************************************************
			myForm.attachEvent("onButtonClick", function(name){
				var Parameters = new Array();
				if ( myForm.isItemChecked("ENABLE") ) {Parameters[0]=1;} else {Parameters[0]=0;}
				Parameters[1]=myForm.getSelect("ENABLEVV").options[myForm.getSelect("ENABLEVV").selectedIndex].value;
				Parameters[2]=myForm.getSelect("SETPOINT").options[myForm.getSelect("SETPOINT").selectedIndex].value;
				Parameters[3]=myForm.getSelect("FEEDBACK").options[myForm.getSelect("FEEDBACK").selectedIndex].value;
				Parameters[4]=myForm.getSelect("CONTROLLER").options[myForm.getSelect("CONTROLLER").selectedIndex].value;
				Parameters[5]=myForm.getSelect("FEEDFORWARD").options[myForm.getSelect("FEEDFORWARD").selectedIndex].value;
				Parameters[6]=myForm.getSelect("OUTPUTDRIVER").options[myForm.getSelect("OUTPUTDRIVER").selectedIndex].value;
				Parameters[7]=myForm.getSelect("COMMAND").options[myForm.getSelect("COMMAND").selectedIndex].value;
				Parameters[8]=myForm.getSelect("SWITCH").options[myForm.getSelect("SWITCH").selectedIndex].value;
				SetLoopsSetup(myForm.getInput("ID").value,myForm.getInput("NAME").value,Parameters,Parameters.length);
				WindowsViewPort.window("DialogWindow").close();
				ReloadLoopsGrid();
			})
		}

}
//**********************************************************************************
function SetLoopsSetup(pid,Name,Parameters,ParametersLenght)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 017;'+pid+';';
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
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);
	
}
//**********************************************************************************
function GetLoopsSetup(pid)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 016;'+pid+';';
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
function CreateLoopsGrid()
{
	//VariablesGrid = new dhtmlXGridObject(GridDivId);
	LoopsGrid.setHeader("ID,ONOMA, ");
	LoopsGrid.setInitWidths("30,220,0")
	LoopsGrid.setColAlign("left,left,center")
	LoopsGrid.setColTypes("ro,ro,ro");
	//mygrid.setColSorting("str,str,str")
	LoopsGrid.setSkin("dhx_skyblue")
	LoopsGrid.enableKeyboardSupport(false); 
	LoopsGrid.enableLightMouseNavigation(false);
	LoopsGrid.init();
	LoopsGrid.attachEvent("onRightClick", RowClickedOnLoopsGrid);
	LoopsGrid.attachEvent("onRowSelect", RowClickedOnLoopsGrid);
	LoopsGrid.attachEvent("onHeaderClick", HeaderClickedOnLoopsGrid);

	var url='http://'+SystemIpAdress+'/'+SystemFileSystem+LOOP_NAMES_RAM_FILE_NAME;
	//url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	LoopsGrid.parse(txt,"csv");
	LoopsGridLoaded();
	
}

function ReloadLoopsGrid()
{
	//VariablesGrid.clearAndLoad('http://'+SystemIpAdress+'/'+SystemFileSystem+'/vir.txt',VariablesGridLoaded,"csv");
	LoopsGrid.clearAll(false);
	var url='http://'+SystemIpAdress+'/'+SystemFileSystem+LOOP_NAMES_RAM_FILE_NAME;
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	LoopsGrid.parse(txt,"csv");
	LoopsGridLoaded();
}

function LoopsGridLoaded()
{
	for (i=0;i<MAX_LOOPS;i++)
	{
		AllLoopsNames[i]='';
	}
	
	var NumberOfRows = LoopsGrid.getRowsNum();
	for (i=1;i<=NumberOfRows;i++)
	{
		LoopsGrid.cells(i,1).setValue(hex2a(LoopsGrid.cellById(i,1).getValue()));
		LoopsGrid.cells(i,1).setValue(LoopsGrid.cellById(i,1).getValue().replace(/~/g,' '));
		AllLoopsNames[i-1]=LoopsGrid.cellById(i,1).getValue();
	}
}


function HeaderClickedOnLoopsGrid(ind,obj)
{
	//	alert(ind+' '+obj);
	if  (ind ==0)
		LoopsGrid.sortRows(ind,"int","asc");    
	else	
		LoopsGrid.sortRows(ind,"str","asc");    
}

function RowClickedOnLoopsGrid(row,col,ev)
{
	if (col==0)
	{
		CreateLoopsProgramWindow(LoopsGrid.cellById(row,0).getValue(),LoopsGrid.cellById(row,1).getValue());
	}

}


