// JavaScript Document
//col 0 variable id 0-200
//col 1 variable name
//col 2 variable type image
//col 3 variable value or image
//col 4 variable type number
//col 5 variable other index
//col 6 variable value number

function ReloadVariablesGrid()
{
	//alert("reload");
	//VariablesGrid.clearAndLoad('http://'+SystemIpAdress+'/'+SystemFileSystem+'/vir.txt',VariablesGridLoaded,"csv");
	VariablesGrid.clearAll(false);
	var url='http://'+SystemIpAdress+'/'+SystemFileSystem+VIRTUALS_NAMES_RAM_FILE_NAME;
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	//alert(txt)
	VariablesGrid.parse(txt,"csv");
	VariablesGridLoaded();
    //CreateVariablesGrid("VariablesGridDivID");
}

function CreateVariablesGrid(GridDivId)
{
	//VariablesGrid = new dhtmlXGridObject(GridDivId);
	VariablesGrid.setHeader("ID,ONOMA, ,TIMH, , , ");
	VariablesGrid.setInitWidths("50,300,40,60,50,50,50")
	VariablesGrid.setColAlign("left,left,center,center,center,center,center")
	VariablesGrid.setColTypes("ro,ro,ro,ro,ro,ro,ro");
	//mygrid.setColSorting("str,str,str")
	VariablesGrid.setSkin("dhx_skyblue")
	VariablesGrid.enableKeyboardSupport(false); 
	VariablesGrid.enableLightMouseNavigation(false);
	VariablesGrid.init();
	VariablesGrid.attachEvent("onRowSelect", RowClickedOnVariablesGrid);
	VariablesGrid.attachEvent("onRightClick", RowClickedOnVariablesGrid);
	VariablesGrid.attachEvent("onHeaderClick", HeaderClickedOnVariablesGrid); 
	//VariablesGrid.enableAlterCss("even_row","odd_row");
	//VariablesGrid.load('http://'+SystemIpAdress+'/SD/VIR.TXT',VariablesGridLoaded,"csv");
	//VariablesGrid.load('http://'+SystemIpAdress+'/'+SystemFileSystem+'/vir.txt',VariablesGridLoaded,"csv");
	//VariablesGrid.load('vir.txt',VariablesGridLoaded,"csv");	
	var url='http://'+SystemIpAdress+'/'+SystemFileSystem+VIRTUALS_NAMES_RAM_FILE_NAME;
	//url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	//alert(txt);
	VariablesGrid.parse(txt,"csv");
	
	VariablesGridLoaded();
	
}

function HeaderClickedOnVariablesGrid(ind,obj)
{
	//	alert(ind+' '+obj);
	if ( (ind ==0) || (ind ==3))
		VariablesGrid.sortRows(ind,"int","asc");    
	else if  (ind ==2) 
		VariablesGrid.sortRows(4,"int","asc");    
	else	
		VariablesGrid.sortRows(ind,"str","asc");    
}

function ExtractValueFromData(Data,VariableIndex)
{
	var i;
	var DataLenght=Data.length;
	var ReturnValue='ΣΦΑΛΜΑ';
	var d= new Array();
	for (i=0;i<DataLenght;i++)
	{
		d=Data[i].split(",");
		if (parseInt(d[0]) == parseInt(VariableIndex))
		{
			ReturnValue=''+d[1];
			break;
		}
	}
	return ReturnValue;
}


function UpDateVariablesGridValues(Data)
{
	var NumberOfRows = VariablesGrid.getRowsNum();
	var Result='';
	var VariableIndex;
	for (i=1;i<=NumberOfRows;i++)
	{
		if ( VariablesGrid.doesRowExist(i) )
		{
		if (VariablesGrid.cellById(i,4).getValue() == DEF_DIGITAL_INPUT_VARIABLE)
		{
			VariableIndex = VariablesGrid.cellById(i,0).getValue();
			Result=ExtractValueFromData(Data,VariableIndex);
			if ( Result > 0)
				VariablesGrid.cells(i,3).setValue('<img src="./images/red-on-16.png">');
			else
				VariablesGrid.cells(i,3).setValue('<img src="./images/red-off-16.png">');
		}
		else if (VariablesGrid.cellById(i,4).getValue() == DEF_DIGITAL_OUTPUT_VARIABLE)
		{
			VariableIndex = VariablesGrid.cellById(i,0).getValue();
			Result=ExtractValueFromData(Data,VariableIndex);
			if ( Result >0)
			{
				VariablesGrid.cells(i,3).setValue('<img src="./images/Perspective-Button-Stop-icon.png">');
				var MimicButtonID='MB'+VariablesGrid.cellById(i,5).getValue();
				document.getElementById(MimicButtonID).setAttribute("className", "button_ON");
				document.getElementById(MimicButtonID).setAttribute("class", "button_ON");
			}
			else
			{
				VariablesGrid.cells(i,3).setValue('<img src="./images/Perspective-Button-Go-icon.png">');
				var MimicButtonID='MB'+VariablesGrid.cellById(i,5).getValue();
				document.getElementById(MimicButtonID).setAttribute("className", "button");
				document.getElementById(MimicButtonID).setAttribute("class", "button");
			}
		}
		else 
		{
			VariableIndex = VariablesGrid.cellById(i,0).getValue();
			Result=ExtractValueFromData(Data,VariableIndex);
			VariablesGrid.cells(i,3).setValue(''+Result);
		}
		}//
		else
		{
			NumberOfRows++;
		}
	}

	if (FlagWindowIsCreated)
	{
		if (DialogWindow.getText() == "ΒΑΘΜΟΝΟΜΗΣΗ EC-pH")
		{
			calibvariableindex = myForm.getSelect("SENSOR").options[myForm.getSelect("SENSOR").selectedIndex].value;
			Result=ExtractValueFromData(Data,calibvariableindex);
			myForm.setItemValue("SENSORVALUE", Result);
		}
	}

}



function RowClickedOnVariablesGrid(row,col,ev)
{
	if (col==0) // COPY
	{
		if (VariablesGrid.cellById(row,4).getValue() == DEF_GENERAL_INPUT_VARIABLE)
		{
			CreateGeneralVirtualWindow(GetNextFreeAllVirtualVariablesIndex(),"NEO ONOMA",VariablesGrid.cellById(row,5).getValue(),"Copy");
		}
		if (VariablesGrid.cellById(row,4).getValue() == DEF_DERIVED_VARIABLE)
		{
			CreateDerivedVirtualWindow(GetNextFreeAllVirtualVariablesIndex(),"NEO ONOMA",VariablesGrid.cellById(row,5).getValue(),"Copy");
		}

	}
	//*****************************************************
	if (col==1) // EDIT
	{
		if (VariablesGrid.cellById(row,4).getValue() == DEF_GENERAL_INPUT_VARIABLE)
			CreateGeneralVirtualWindow(VariablesGrid.cellById(row,0).getValue(),VariablesGrid.cellById(row,1).getValue(),VariablesGrid.cellById(row,5).getValue(),"Edit");
		if (VariablesGrid.cellById(row,4).getValue() == DEF_DIGITAL_INPUT_VARIABLE)
			CreateDigitalInputVirtualWindow(VariablesGrid.cellById(row,0).getValue(),VariablesGrid.cellById(row,1).getValue(),VariablesGrid.cellById(row,5).getValue(),"Edit");
		if (VariablesGrid.cellById(row,4).getValue() == DEF_DIGITAL_OUTPUT_VARIABLE)
			CreateDigitalOutputVirtualWindow(VariablesGrid.cellById(row,0).getValue(),VariablesGrid.cellById(row,1).getValue(),VariablesGrid.cellById(row,5).getValue(),"Edit");
		if (VariablesGrid.cellById(row,4).getValue() == DEF_DERIVED_VARIABLE)
			CreateDerivedVirtualWindow(VariablesGrid.cellById(row,0).getValue(),VariablesGrid.cellById(row,1).getValue(),VariablesGrid.cellById(row,5).getValue(),"Edit");
		if (VariablesGrid.cellById(row,4).getValue() == DEF_RAMP_VARIABLE)
			CreateRampVirtualWindow(VariablesGrid.cellById(row,0).getValue(),VariablesGrid.cellById(row,1).getValue(),VariablesGrid.cellById(row,5).getValue(),"Edit");
		if (VariablesGrid.cellById(row,4).getValue() == DEF_CONTROLLER_VARIABLE)
			CreateControllerVirtualWindow(VariablesGrid.cellById(row,0).getValue(),VariablesGrid.cellById(row,1).getValue(),VariablesGrid.cellById(row,5).getValue(),"Edit");
		if (VariablesGrid.cellById(row,4).getValue() == DEF_OUTPUT_DRIVER_VARIABLE)
			CreateOutputDriverVirtualWindow(VariablesGrid.cellById(row,0).getValue(),VariablesGrid.cellById(row,1).getValue(),VariablesGrid.cellById(row,5).getValue(),"Edit");
		if (VariablesGrid.cellById(row,4).getValue() == DEF_TIME_ENABLED_VARIABLE)
			CreateTimeVirtualWindow(VariablesGrid.cellById(row,0).getValue(),VariablesGrid.cellById(row,1).getValue(),VariablesGrid.cellById(row,5).getValue(),"Edit");

	}
	//*************************************
	if (col==3)
	{
		if (VariablesGrid.cellById(row,4).getValue() == DEF_DIGITAL_OUTPUT_VARIABLE)
		{
			if (VariablesGrid.cellById(row,6).getValue() == 0)
			{
				VariablesGrid.cells(row,3).setValue('<img src="./images/Perspective-Button-Stop-icon.png">');
				VariablesGrid.cells(row,6).setValue(1);
				OpenCloseReleCommand(1,VariablesGrid.cellById(row,5).getValue());
			}
			else
			{
				VariablesGrid.cells(row,3).setValue('<img src="./images/Perspective-Button-Go-icon.png">');
				VariablesGrid.cells(row,6).setValue(0);
				OpenCloseReleCommand(0,VariablesGrid.cellById(row,5).getValue());
			}
		}
	}
	
}

function VariablesGridLoaded()
{
	var i;
	for (i=0;i<DEF_MAXIMUM_VARIABLES;i++)
	{
		AllVirtualVariablesType[i]=0;
		AllVirtualVariablesName[i]='';
	}
	for (i=1;i<33;i++)
	{
		var MimicButtonID='MB'+i;
		document.getElementById(MimicButtonID).innerHTML=''+i;
	}
	
	var NumberOfRows = VariablesGrid.getRowsNum();
	for (i=1;i<=NumberOfRows;i++)
	{

		//VariablesGrid.setRowTextStyle(i, "font-size:x-large;color:#291919;font-family: digital-7, Arial, Helvetica, sans-serif;");
		VariablesGrid.cells(i,1).setValue(hex2a(VariablesGrid.cellById(i,1).getValue()));
		if (VariablesGrid.cellById(i,2).getValue() == DEF_GENERAL_INPUT_VARIABLE)
		{
			VariablesGrid.cells(i,1).setValue(VariablesGrid.cellById(i,1).getValue().replace(/~/g,' '));
			VariablesGrid.cells(i,2).setValue('<img src="./images/GINPUT.gif">');
			VariablesGrid.cells(i,4).setValue(DEF_GENERAL_INPUT_VARIABLE);
			AllVirtualVariablesType[VariablesGrid.cellById(i,0).getValue()]=DEF_GENERAL_INPUT_VARIABLE;
			AllVirtualVariablesName[VariablesGrid.cellById(i,0).getValue()]=VariablesGrid.cellById(i,1).getValue();
		}
		else if (VariablesGrid.cellById(i,2).getValue() == DEF_DIGITAL_INPUT_VARIABLE)
		{
			VariablesGrid.cells(i,1).setValue(VariablesGrid.cellById(i,1).getValue().replace(/~/g,' '));		
			VariablesGrid.cells(i,2).setValue('<img src="./images/DINPUT.gif">');
			VariablesGrid.cells(i,4).setValue(DEF_DIGITAL_INPUT_VARIABLE);
			VariablesGrid.cells(i,3).setValue('<img src="./images/red-off-16.png">');
			AllVirtualVariablesType[VariablesGrid.cellById(i,0).getValue()]=DEF_DIGITAL_INPUT_VARIABLE;
			AllVirtualVariablesName[VariablesGrid.cellById(i,0).getValue()]=VariablesGrid.cellById(i,1).getValue();
		}
		else if (VariablesGrid.cellById(i,2).getValue() == DEF_DIGITAL_OUTPUT_VARIABLE)
		{
			VariablesGrid.cells(i,1).setValue(VariablesGrid.cellById(i,1).getValue().replace(/~/g,' '));
			VariablesGrid.cells(i,2).setValue('<img src="./images/DOUTPUT.gif">');
			VariablesGrid.cells(i,4).setValue(DEF_DIGITAL_OUTPUT_VARIABLE);
			VariablesGrid.cells(i,3).setValue('<img src="./images/Perspective-Button-Go-icon.png">');
			AllVirtualVariablesType[VariablesGrid.cellById(i,0).getValue()]=DEF_DIGITAL_OUTPUT_VARIABLE;
			AllVirtualVariablesName[VariablesGrid.cellById(i,0).getValue()]=VariablesGrid.cellById(i,1).getValue();
			var MimicButtonID='MB'+VariablesGrid.cellById(i,5).getValue()
			if (document.getElementById(MimicButtonID))
			{
				document.getElementById(MimicButtonID).innerHTML=VariablesGrid.cellById(i,1).getValue();
			}

		}
		else if (VariablesGrid.cellById(i,2).getValue() == DEF_DERIVED_VARIABLE)
		{
			VariablesGrid.cells(i,1).setValue(VariablesGrid.cellById(i,1).getValue().replace(/~/g,' '));
			VariablesGrid.cells(i,2).setValue('<img src="./images/DERIVED.gif">');
			VariablesGrid.cells(i,4).setValue('8');
			AllVirtualVariablesType[VariablesGrid.cellById(i,0).getValue()]=DEF_DERIVED_VARIABLE;
			AllVirtualVariablesName[VariablesGrid.cellById(i,0).getValue()]=VariablesGrid.cellById(i,1).getValue();
		}
		else if (VariablesGrid.cellById(i,2).getValue() == DEF_RAMP_VARIABLE)
		{
			VariablesGrid.cells(i,1).setValue(VariablesGrid.cellById(i,1).getValue().replace(/~/g,' '));			
			VariablesGrid.cells(i,2).setValue('<img src="./images/RAMP.gif">');
			VariablesGrid.cells(i,4).setValue('16');
			AllVirtualVariablesType[VariablesGrid.cellById(i,0).getValue()]=DEF_RAMP_VARIABLE;
			AllVirtualVariablesName[VariablesGrid.cellById(i,0).getValue()]=VariablesGrid.cellById(i,1).getValue();
		}
		else if (VariablesGrid.cellById(i,2).getValue() == DEF_TIME_ENABLED_VARIABLE)
		{
			VariablesGrid.cells(i,1).setValue(VariablesGrid.cellById(i,1).getValue().replace(/~/g,' '));
			VariablesGrid.cells(i,2).setValue('<img src="./images/TIMEV.gif">');
			VariablesGrid.cells(i,4).setValue('32');
			AllVirtualVariablesType[VariablesGrid.cellById(i,0).getValue()]=DEF_TIME_ENABLED_VARIABLE;
			AllVirtualVariablesName[VariablesGrid.cellById(i,0).getValue()]=VariablesGrid.cellById(i,1).getValue();
		}
		else if (VariablesGrid.cellById(i,2).getValue() == DEF_CONTROLLER_VARIABLE)
		{
			VariablesGrid.cells(i,1).setValue(VariablesGrid.cellById(i,1).getValue().replace(/~/g,' '));			
			VariablesGrid.cells(i,2).setValue('<img src="./images/CONTROLV.gif">');
			VariablesGrid.cells(i,4).setValue('64');
			AllVirtualVariablesType[VariablesGrid.cellById(i,0).getValue()]=DEF_CONTROLLER_VARIABLE;
			AllVirtualVariablesName[VariablesGrid.cellById(i,0).getValue()]=VariablesGrid.cellById(i,1).getValue();
		}
		else if (VariablesGrid.cellById(i,2).getValue() == DEF_OUTPUT_DRIVER_VARIABLE)
		{
			VariablesGrid.cells(i,1).setValue(VariablesGrid.cellById(i,1).getValue().replace(/~/g,' '));
			VariablesGrid.cells(i,2).setValue('<img src="./images/OUTDRV.gif">');
			VariablesGrid.cells(i,4).setValue('128');
			AllVirtualVariablesType[VariablesGrid.cellById(i,0).getValue()]=DEF_OUTPUT_DRIVER_VARIABLE;
			AllVirtualVariablesName[VariablesGrid.cellById(i,0).getValue()]=VariablesGrid.cellById(i,1).getValue();
		}
		else if (VariablesGrid.cellById(i,2).getValue() == DEF_WEECK_VARIABLE)
		{
			VariablesGrid.cells(i,1).setValue(VariablesGrid.cellById(i,1).getValue().replace(/~/g,' '));
			VariablesGrid.cells(i,2).setValue('<img src="./images/WEECKV.gif">');
			VariablesGrid.cells(i,4).setValue('256');
			AllVirtualVariablesType[VariablesGrid.cellById(i,0).getValue()]=DEF_WEECK_VARIABLE;
			AllVirtualVariablesName[VariablesGrid.cellById(i,0).getValue()]=VariablesGrid.cellById(i,1).getValue();
		}
		else
		{
			//VariablesGrid.deleteRow(i);
			VariablesGrid.cells(i,1).setValue('KENO');
			VariablesGrid.cells(i,2).setValue('<img src="./images/icon3.gif">');
			VariablesGrid.cells(i,4).setValue('0');
			AllVirtualVariablesType[VariablesGrid.cellById(i,0).getValue()]=0;
			AllVirtualVariablesName[VariablesGrid.cellById(i,0).getValue()]=0;
		}
	}

	SetNamesOnMainScreenAfterVariablesIsLoaded();
	//VariablesGrid.setColHidden("2",true);
	//VariablesGrid.sortRows(2,"str","asc");    
}


function OpenCloseReleCommand(on_off,rid)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 008;'+on_off+';'+rid+';';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	
}
	