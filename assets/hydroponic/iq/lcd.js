// JavaScript Document
function LCDSetup()
{
		StopDataAcquisition();
		var Parameters = new Array();
		if (FlagWindowIsCreated==0)
		{	
			
			var GeneralHydroponicsSetup = GetLCDSetup();
			if (GeneralHydroponicsSetup == "ERROR")
			{
				alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ");
				return;
			}
			Parameters = GeneralHydroponicsSetup.split(";"); 
				
			//*********************************************			
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 0, 0, 720, 420);
			DialogWindow.setText("ΓΕΝΙΚΕΣ ΡΥΘΜΙΣΕΙΣ LCD");
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
				{type: "block", width: "auto", list:[
					{type: "button", position: "center", name: "OK" , value: "ΑΠΟΣΤΟΛΗ", width:150 ,className :'DialogOKButtonClass' },
					{type: "newcolumn", offset:50},
					{type: "button", position: "center", name: "CANCEL" , value: "ΑΚΥΡΟ", width:150 ,className :'DialogOKButtonClass'}
				]},
				{type: "block", width: "auto", list:[
					{type: "input", label: "ΓΡΑΜΜΗ 1:", labelWidth: "auto", labelAlign:"right" ,inputWidth: 300 ,name: "L1" ,  maxLength :20 , value:Parameters[0] , className :'DialogInputClass'},
					{type: "input", label: "ΓΡΑΜΜΗ 2:", labelWidth: "auto", labelAlign:"right" ,inputWidth: 300 ,name: "L2" ,  maxLength :20 , value:Parameters[1] , className :'DialogInputClass'},
					{type: "input", label: "ΓΡΑΜΜΗ 3:", labelWidth: "auto", labelAlign:"right" ,inputWidth: 300 ,name: "L3" ,  maxLength :20 , value:Parameters[2] , className :'DialogInputClass'},
					{type: "input", label: "ΓΡΑΜΜΗ 4:", labelWidth: "auto", labelAlign:"right" ,inputWidth: 300 ,name: "L4" ,  maxLength :20 , value:Parameters[3] , className :'DialogInputClass'}
				]},
				{type: "fieldset", width: "auto", label: "ΜΕΤΑΒΛΗΤΕΣ", list:[
					{type: "select", label: "M1:", labelWidth: "40", labelAlign:"right" , inputWidth: 260 ,name:"M1" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "M2:", labelWidth: "40", labelAlign:"right" , inputWidth: 260 ,name:"M2" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "M3:", labelWidth: "40", labelAlign:"right" , inputWidth: 260 ,name:"M3" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "M4:", labelWidth: "40", labelAlign:"right" , inputWidth: 260 ,name:"M4" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "M5:", labelWidth: "40", labelAlign:"right" , inputWidth: 260 ,name:"M5" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "M6:", labelWidth: "40", labelAlign:"right" , inputWidth: 260 ,name:"M6" , className :'DialogsSelectInput'},   // 3
					{type: "newcolumn", offset:20},
					{type: "select", label: "M7:", labelWidth: "40", labelAlign:"right" , inputWidth: 260 ,name:"M7" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "M8:", labelWidth: "40", labelAlign:"right" , inputWidth: 260 ,name:"M8" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "M9:",  labelWidth: "40", labelAlign:"right" , inputWidth: 260 ,name:"M9"  , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "M10:", labelWidth: "40", labelAlign:"right" , inputWidth: 260 ,name:"M10" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "M11:", labelWidth: "40", labelAlign:"right" , inputWidth: 260 ,name:"M11" , className :'DialogsSelectInput'},   // 3
					{type: "select", label: "M12:", labelWidth: "40", labelAlign:"right" , inputWidth: 260 ,name:"M12" , className :'DialogsSelectInput'}   // 3
				]}

			];
			//*************************************************************
			myForm = DialogWindow.attachForm(formData);
			AttacheKeyboardToInput(myForm.getInput("L1").id);
			AttacheKeyboardToInput(myForm.getInput("L2").id);
			AttacheKeyboardToInput(myForm.getInput("L3").id);
			AttacheKeyboardToInput(myForm.getInput("L4").id);
			//*************************************************************
			//************* FILL LIST BOXES *******************************
			//*************************************************************
			FeelSelectWithAllVirtuals(myForm.getSelect("M1"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("M2"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("M3"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("M4"),DEF_ALL_VIRTUALS_MASK);			
			FeelSelectWithAllVirtuals(myForm.getSelect("M5"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("M6"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("M7"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("M8"),DEF_ALL_VIRTUALS_MASK);			
			FeelSelectWithAllVirtuals(myForm.getSelect("M9"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("M10"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("M11"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("M12"),DEF_ALL_VIRTUALS_MASK);			
			//*************************************************************
			//************* SET VALUES ************************************
			//*************************************************************
			SelectOptionInSelectByValue(myForm.getSelect("M1"),Parameters[4]);
			SelectOptionInSelectByValue(myForm.getSelect("M2"),Parameters[5]);
			SelectOptionInSelectByValue(myForm.getSelect("M3"),Parameters[6]);
			SelectOptionInSelectByValue(myForm.getSelect("M4"),Parameters[7]);
			SelectOptionInSelectByValue(myForm.getSelect("M5"),Parameters[8]);
			SelectOptionInSelectByValue(myForm.getSelect("M6"),Parameters[9]);
			SelectOptionInSelectByValue(myForm.getSelect("M7"),Parameters[10]);
			SelectOptionInSelectByValue(myForm.getSelect("M8"),Parameters[11]);
			SelectOptionInSelectByValue(myForm.getSelect("M9"),Parameters[12]);
			SelectOptionInSelectByValue(myForm.getSelect("M10"),Parameters[13]);
			SelectOptionInSelectByValue(myForm.getSelect("M11"),Parameters[14]);
			SelectOptionInSelectByValue(myForm.getSelect("M12"),Parameters[15]);
			//*************************************************************
			myForm.attachEvent("onChange", function(name,value,is_checked){
			});
			//*************************************************************
			myForm.attachEvent("onButtonClick", function(name){
  			    if (name == 'CANCEL')
				{
					WindowsViewPort.window("DialogWindow").close();	
				}
				var Parameters = new Array();
				Parameters[0]=myForm.getInput("L1").value;
				Parameters[1]=myForm.getInput("L2").value;
				Parameters[2]=myForm.getInput("L3").value;
				Parameters[3]=myForm.getInput("L4").value;				
				SetLCDSetup(Parameters,Parameters.length);
				var Parameters2 = new Array();
				Parameters2[0]=myForm.getSelect("M1").options[myForm.getSelect("M1").selectedIndex].value;
				Parameters2[1]=myForm.getSelect("M2").options[myForm.getSelect("M2").selectedIndex].value;
				Parameters2[2]=myForm.getSelect("M3").options[myForm.getSelect("M3").selectedIndex].value;
				Parameters2[3]=myForm.getSelect("M4").options[myForm.getSelect("M4").selectedIndex].value;				
				Parameters2[4]=myForm.getSelect("M5").options[myForm.getSelect("M5").selectedIndex].value;
				Parameters2[5]=myForm.getSelect("M6").options[myForm.getSelect("M6").selectedIndex].value;
				Parameters2[6]=myForm.getSelect("M7").options[myForm.getSelect("M7").selectedIndex].value;
				Parameters2[7]=myForm.getSelect("M8").options[myForm.getSelect("M8").selectedIndex].value;				
				Parameters2[8]=myForm.getSelect("M9").options[myForm.getSelect("M9").selectedIndex].value;
				Parameters2[9]=myForm.getSelect("M10").options[myForm.getSelect("M10").selectedIndex].value;
				Parameters2[10]=myForm.getSelect("M11").options[myForm.getSelect("M11").selectedIndex].value;
				Parameters2[11]=myForm.getSelect("M12").options[myForm.getSelect("M12").selectedIndex].value;				
				SetLCDSetup2(Parameters2,Parameters2.length);
				WindowsViewPort.window("DialogWindow").close();
			})
		}
}

function GetLCDSetup()
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 020;';
	url=url+Math.random()+';';
	//alert(url);
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	return txt;
}

function SetLCDSetup(Parameters,ParametersLenght)
{
	var txt=''
	
	xmlHttp=GetXmlHttpObject()
	if (xmlHttp==null)
	{
		alert ("Browser does not support HTTP Request");
		return;
	}
	
	var LineLenght = Parameters[0].length;
    for (i=LineLenght;i<20;i++)
		Parameters[0]=Parameters[0]+'~';
	Parameters[0]=Parameters[0].replace(/ /g,'~');
	
	var LineLenght = Parameters[1].length;
    for (i=LineLenght;i<20;i++)
		Parameters[1]=Parameters[1]+'~';
	Parameters[1]=Parameters[1].replace(/ /g,'~');

	var LineLenght = Parameters[2].length;
    for (i=LineLenght;i<20;i++)
		Parameters[2]=Parameters[2]+'~';
	Parameters[2]=Parameters[2].replace(/ /g,'~');
	
	var LineLenght = Parameters[3].length;
    for (i=LineLenght;i<20;i++)
		Parameters[3]=Parameters[3]+'~';
	Parameters[3]=Parameters[3].replace(/ /g,'~');



	var url='http://'+SystemIpAdress+'/rpc/SetData/run 021;1;';
	for (i=0;i<ParametersLenght;i++)
	{
		url=url+Parameters[i]+';';
	}
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	//alert(txt);
}


function SetLCDSetup2(Parameters,ParametersLenght)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 021;2;';
	for (i=0;i<ParametersLenght;i++)
	{
		url=url+Parameters[i]+';';
	}
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);

}