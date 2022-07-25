// JavaScript Document

//**********************************************************************************
function GetClimateScreenSetup()
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 041;';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	return txt;
}

function SetClimateoScreenSetup(Parameters,ParametersLenght)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 042;';
	for (i=0;i<ParametersLenght;i++)
	{
		url=url+Parameters[i]+';';
	}
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);

}
//**********************************************************************************


function SaveFeelClimateScreenDataListsWithVariableNames()
{
	var Parameters = new Array();
	for (ki=0 ; ki<86 ; ki++)
	{
		var ElementID = 'ClimateDataListID_'+(ki+1).toString();
		Parameters[ki] = document.getElementById(ElementID).options[document.getElementById(ElementID).selectedIndex].value;			
	}
	SetClimateoScreenSetup(Parameters,Parameters.length)
	//WriteToFileOnmBed("Clima1.txt",Parameters,Parameters.length);
}

function ShowFeelClimateScreenDataListsWithVariableNames()
{
	for (ki=0 ; ki<86 ; ki++)
	{
		var ElementID = 'ClimateDataListID_'+(ki+1).toString();
		document.getElementById(ElementID).style.visibility = "visible";
	}
}

function HideFeelClimateScreenDataListsWithVariableNames()
{
	for (ki=0 ; ki<86 ; ki++)
	{
		var ElementID = 'ClimateDataListID_'+(ki+1).toString();
		document.getElementById(ElementID).style.visibility = "hidden";
	}
}

function FeelClimateScreenDataListsWithVariableNames()
{
	for (ki=0 ; ki<86 ; ki++)
	{
	var ElementID = 'ClimateDataListID_'+(ki+1).toString();
	FeelSelectWithAllVirtuals(document.getElementById(ElementID),DEF_ALL_VIRTUALS_MASK);
	SelectOptionInSelectByValue(document.getElementById(ElementID),Climate1ScreenVariables[ki]);
	document.getElementById(ElementID).style.width = '40px';
	document.getElementById(ElementID).style.visibility = "hidden";
	document.getElementById(ElementID).setAttribute('data-id',ki);
	document.getElementById(ElementID).onchange = 
			function(){
				//alert( this.getAttribute('data-id') ); //this.options[this.selectedIndex].value );
				Climate1ScreenVariables[this.getAttribute('data-id')] = this.options[this.selectedIndex].value;
			};		
	}
}


function EditClimateScreenSetup()
{
	StopDataAcquisition();
		var Parameters = new Array();
		if (FlagWindowIsCreated==0)
		{	
			Parameters = ReadFileFromMBedAndReturnParametersArray('Clima1.txt');
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 5, 5, 750, 500);
			DialogWindow.setText("ΒΑΣΙΚΗ ΟΘΟΝΗ ΚΛΙΜΑΤΟΣ");
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
				{type: "block", width: "350", list:[
					{type: "button", position: "center", name: "OK" , value: "ΑΠΟΘΗΚΕΥΣΗ"}
				]},
				{type: "fieldset", width: "700", label: "ΤΙΜΕΣ ΕΞΩΤΕΡΙΚΟΥ ΜΕΤΕΩΡΟΛΟΓΙΚΟΥ ΚΛΩΒΟΥ", list:[	
					{type: "select",   label: "ΕΞ. ΘΕΡΜΟΚΡΑΣΙΑ:", labelWidth: "120", inputWidth: 180 , name:"V1" },
					{type: "select",   label: "ΕΞ. ΥΓΡΑΣΙΑ:", labelWidth: "120", inputWidth: 180 , name:"V2" },
					{type: "select",   label: "ΤΑΧΥΤΑ ΑΝΕΜΟΥ:", labelWidth: "120", inputWidth: 180 , name:"V3" },
					{type: "newcolumn", offset:10},
					{type: "select",   label: "ΑΝΕΜΟΔΕΙΚΤΗΣ:", labelWidth: "120", inputWidth: 180 , name:"V4" },
					{type: "select",   label: "ΕΞ. ΗΛΙΟΦΑΝΕΙΑ:", labelWidth: "120", inputWidth: 180 , name:"V5" },
					{type: "select",   label: "ΕΝΔ. ΒΡΟΧΗΣ:", labelWidth: "120", inputWidth: 180 , name:"V6" }
				]},	
				{type: "fieldset", width: "700", label: "ΤΙΜΕΣ ΚΛΙΜΑΤΟΣ ΧΩΡΟΥ 1", list:[		
					{type: "select",   label: "ΘΕΡΜΟΚΡΑΣΙΑ:", labelWidth: "120", inputWidth: 180 , name:"V7" },
					{type: "select",   label: "ΥΓΡΑΣΙΑ:", labelWidth: "120", inputWidth: 180 , name:"V8" },
					{type: "select",   label: "ΗΛΙΟΦΑΝΕΙΑ:", labelWidth: "120", inputWidth: 180 , name:"V26" },
					{type: "select",   label: "ΘΕΣΗ ΠΑΡΑΘΥΡΟΥ:", labelWidth: "120", inputWidth: 180 , name:"V9" },
					{type: "select",   label: "ΘΕΣΗ ΚΟΥΡΤΙΝΑΣ:", labelWidth: "120", inputWidth: 180 , name:"V10" },
					{type: "select",   label: "ΘΕΡΜΑΝΣΗ 1:", labelWidth: "120", inputWidth: 180 , name:"V11" },
					{type: "select",   label: "ΘΕΡΜΑΝΣΗ 2:", labelWidth: "120", inputWidth: 180 , name:"V12" },
					{type: "select",   label: "ΑΝΤΛΙΑ PAD:", labelWidth: "120", inputWidth: 180 , name:"V13" },
					{type: "select",   label: "ΑΝΟΙΓΜΑ ΠΑΡΑΘ.:", labelWidth: "120", inputWidth: 180 , name:"V14" },
					{type: "select",   label: "ΚΛΕΙΣΙΜΟ ΠΑΡΑΘ.:", labelWidth: "120", inputWidth: 180 , name:"V15" },
					{type: "newcolumn", offset:10},
					{type: "select",   label: "ΤΡΑΒΗΓΜΑ ΚΟΥΡΤ:", labelWidth: "120", inputWidth: 180 , name:"V16" },
					{type: "select",   label: "ΑΠΛΩΜΑ ΚΟΥΡΤ:", labelWidth: "120", inputWidth: 180 , name:"V17" },
					{type: "select",   label: "ΑΝΕΜΙΣΤΗΡΑΣ 1:", labelWidth: "120", inputWidth: 180 , name:"V18" },
					{type: "select",   label: "ΑΝΕΜΙΣΤΗΡΑΣ 2:", labelWidth: "120", inputWidth: 180 , name:"V19" },
					{type: "select",   label: "ΑΝΕΜΙΣΤΗΡΑΣ 3:", labelWidth: "120", inputWidth: 180 , name:"V20" },
					{type: "select",   label: "ΑΝΕΜΙΣΤΗΡΑΣ 4:", labelWidth: "120", inputWidth: 180 , name:"V21" },
					{type: "select",   label: "ΑΝΕΜΙΣΤΗΡΑΣ 5:", labelWidth: "120", inputWidth: 180 , name:"V22" },
					{type: "select",   label: "ΑΝΕΜΙΣΤΗΡΑΣ 6:", labelWidth: "120", inputWidth: 180 , name:"V23" },
					{type: "select",   label: "ΑΝΕΜΙΣΤΗΡΑΣ 7:", labelWidth: "120", inputWidth: 180 , name:"V24" },
					{type: "select",   label: "ΑΝΕΜΙΣΤΗΡΑΣ 8:", labelWidth: "120", inputWidth: 180 , name:"V25" }
				]}	
			];
			//*************************************************************
			myForm = DialogWindow.attachForm(formData);
			//*************************************************************
			//************* FILL LIST BOXES *******************************
			//*************************************************************
			FeelSelectWithAllVirtuals(myForm.getSelect("V1"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V2"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V3"),DEF_ALL_VIRTUALS_MASK);			
			FeelSelectWithAllVirtuals(myForm.getSelect("V4"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V5"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V6"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V7"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V8"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V9"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V10"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V11"),DEF_ALL_VIRTUALS_MASK);			
			FeelSelectWithAllVirtuals(myForm.getSelect("V12"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V13"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V14"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V15"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V16"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V17"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V18"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V19"),DEF_ALL_VIRTUALS_MASK);			
			FeelSelectWithAllVirtuals(myForm.getSelect("V20"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V21"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V22"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V23"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V24"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V25"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V26"),DEF_ALL_VIRTUALS_MASK);
			//*************************************************************
			//************* SET VALUES ************************************
			//*************************************************************
			SelectOptionInSelectByValue(myForm.getSelect("V1"),Parameters[0]);				
			SelectOptionInSelectByValue(myForm.getSelect("V2"),Parameters[1]);				
			SelectOptionInSelectByValue(myForm.getSelect("V3"),Parameters[2]);				
			SelectOptionInSelectByValue(myForm.getSelect("V4"),Parameters[3]);				
			SelectOptionInSelectByValue(myForm.getSelect("V5"),Parameters[4]);				
			SelectOptionInSelectByValue(myForm.getSelect("V6"),Parameters[5]);				
			SelectOptionInSelectByValue(myForm.getSelect("V7"),Parameters[6]);				
			SelectOptionInSelectByValue(myForm.getSelect("V8"),Parameters[7]);							
			SelectOptionInSelectByValue(myForm.getSelect("V9"),Parameters[8]);				
			SelectOptionInSelectByValue(myForm.getSelect("V10"),Parameters[9]);				
			SelectOptionInSelectByValue(myForm.getSelect("V11"),Parameters[10]);				
			SelectOptionInSelectByValue(myForm.getSelect("V12"),Parameters[11]);				
			SelectOptionInSelectByValue(myForm.getSelect("V13"),Parameters[12]);				
			SelectOptionInSelectByValue(myForm.getSelect("V14"),Parameters[13]);				
			SelectOptionInSelectByValue(myForm.getSelect("V15"),Parameters[14]);				
			SelectOptionInSelectByValue(myForm.getSelect("V16"),Parameters[15]);							
			SelectOptionInSelectByValue(myForm.getSelect("V17"),Parameters[16]);				
			SelectOptionInSelectByValue(myForm.getSelect("V18"),Parameters[17]);				
			SelectOptionInSelectByValue(myForm.getSelect("V19"),Parameters[18]);				
			SelectOptionInSelectByValue(myForm.getSelect("V20"),Parameters[19]);				
			SelectOptionInSelectByValue(myForm.getSelect("V21"),Parameters[20]);				
			SelectOptionInSelectByValue(myForm.getSelect("V22"),Parameters[21]);				
			SelectOptionInSelectByValue(myForm.getSelect("V23"),Parameters[22]);				
			SelectOptionInSelectByValue(myForm.getSelect("V24"),Parameters[23]);							
			SelectOptionInSelectByValue(myForm.getSelect("V25"),Parameters[24]);
			SelectOptionInSelectByValue(myForm.getSelect("V26"),Parameters[25]);				
			//*************************************************************
			myForm.attachEvent("onChange", function(name,value,is_checked){
			});
			//*************************************************************
			myForm.attachEvent("onButtonClick", function(name){
				var Parameters = new Array();
				Parameters[0]=myForm.getSelect("V1").options[myForm.getSelect("V1").selectedIndex].value;
				Parameters[1]=myForm.getSelect("V2").options[myForm.getSelect("V2").selectedIndex].value;
				Parameters[2]=myForm.getSelect("V3").options[myForm.getSelect("V3").selectedIndex].value;
				Parameters[3]=myForm.getSelect("V4").options[myForm.getSelect("V4").selectedIndex].value;
				Parameters[4]=myForm.getSelect("V5").options[myForm.getSelect("V5").selectedIndex].value;
				Parameters[5]=myForm.getSelect("V6").options[myForm.getSelect("V6").selectedIndex].value;
				Parameters[6]=myForm.getSelect("V7").options[myForm.getSelect("V7").selectedIndex].value;
				Parameters[7]=myForm.getSelect("V8").options[myForm.getSelect("V8").selectedIndex].value;				
				Parameters[8]=myForm.getSelect("V9").options[myForm.getSelect("V9").selectedIndex].value;
				Parameters[9]=myForm.getSelect("V10").options[myForm.getSelect("V10").selectedIndex].value;
				Parameters[10]=myForm.getSelect("V11").options[myForm.getSelect("V11").selectedIndex].value;
				Parameters[11]=myForm.getSelect("V12").options[myForm.getSelect("V12").selectedIndex].value;
				Parameters[12]=myForm.getSelect("V13").options[myForm.getSelect("V13").selectedIndex].value;
				Parameters[13]=myForm.getSelect("V14").options[myForm.getSelect("V14").selectedIndex].value;
				Parameters[14]=myForm.getSelect("V15").options[myForm.getSelect("V15").selectedIndex].value;
				Parameters[15]=myForm.getSelect("V16").options[myForm.getSelect("V16").selectedIndex].value;				
				Parameters[16]=myForm.getSelect("V17").options[myForm.getSelect("V17").selectedIndex].value;
				Parameters[17]=myForm.getSelect("V18").options[myForm.getSelect("V18").selectedIndex].value;
				Parameters[18]=myForm.getSelect("V19").options[myForm.getSelect("V19").selectedIndex].value;
				Parameters[19]=myForm.getSelect("V20").options[myForm.getSelect("V20").selectedIndex].value;
				Parameters[20]=myForm.getSelect("V21").options[myForm.getSelect("V21").selectedIndex].value;
				Parameters[21]=myForm.getSelect("V22").options[myForm.getSelect("V22").selectedIndex].value;
				Parameters[22]=myForm.getSelect("V23").options[myForm.getSelect("V23").selectedIndex].value;
				Parameters[23]=myForm.getSelect("V24").options[myForm.getSelect("V24").selectedIndex].value;				
				Parameters[24]=myForm.getSelect("V25").options[myForm.getSelect("V25").selectedIndex].value;
				Parameters[25]=myForm.getSelect("V26").options[myForm.getSelect("V26").selectedIndex].value;
				WriteToFileOnmBed("Clima1.txt",Parameters,Parameters.length);
				WindowsViewPort.window("DialogWindow").close();
			})
		}

}


function UpDateVariablesOnClimate1Screen(Data)
{
	var Result;
	if (LightVersion)
	{
	}
	else
	{
		
		TemperatureGauge[0].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[6])) );
		HumidityGauge[0].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[7])) );
		SolarGauge[0].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[8])) );
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[9]),'CL_BU_1'); // win close		
		WindowPositionGauge[0].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[10])) );
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[11]),'CL_BU_2'); // win open
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[12]),'CL_BU_3'); // screen mazema
		ScreenGauge[0].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[13])) );
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[14]),'CL_BU_4'); // scrren aploma
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[15]),'CL_BU_5'); // heater 1
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[16]),'CL_BU_6'); // heater 2

		TemperatureGauge[1].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[17])) );
		HumidityGauge[1].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[18])) );
		SolarGauge[1].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[19])) );
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[20]),'CL_BU_7'); // win close		
		WindowPositionGauge[1].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[21])) );
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[22]),'CL_BU_8'); // win open
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[23]),'CL_BU_9'); // screen mazema
		ScreenGauge[1].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[24])) );
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[25]),'CL_BU_10'); // scrren aploma
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[26]),'CL_BU_11'); // heater 1
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[27]),'CL_BU_12'); // heater 2
		
		TemperatureGauge[2].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[28])) );
		HumidityGauge[2].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[29])) );
		SolarGauge[2].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[30])) );
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[31]),'CL_BU_13'); // win close		
		WindowPositionGauge[2].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[32])) );
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[33]),'CL_BU_14'); // win open
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[34]),'CL_BU_15'); // screen mazema
		ScreenGauge[2].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[35])) );
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[36]),'CL_BU_16'); // scrren aploma
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[37]),'CL_BU_17'); // heater 1
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[38]),'CL_BU_18'); // heater 2

		TemperatureGauge[3].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[39])) );
		HumidityGauge[3].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[40])) );
		SolarGauge[3].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[41])) );
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[42]),'CL_BU_19'); // win close		
		WindowPositionGauge[3].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[43])) );
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[44]),'CL_BU_20'); // win open
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[45]),'CL_BU_21'); // screen mazema
		ScreenGauge[3].setValue( parseFloat( ExtractValueFromData(Data,Climate1ScreenVariables[46])) );
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[47]),'CL_BU_22'); // scrren aploma
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[48]),'CL_BU_23'); // heater 1
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[49]),'CL_BU_24'); // heater 2

		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[50]),'Climate1Fan1');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[51]),'Climate1Fan2');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[52]),'Climate1Fan3');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[53]),'Climate1Fan4');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[54]),'Climate1Fan5');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[55]),'Climate1Fan6');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[56]),'Climate1Fan7');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[57]),'Climate1Fan8');
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[58]),'CL_BU_25'); // Pump

		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[59]),'Climate2Fan1');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[60]),'Climate2Fan2');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[61]),'Climate2Fan3');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[62]),'Climate2Fan4');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[63]),'Climate2Fan5');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[64]),'Climate2Fan6');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[65]),'Climate2Fan7');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[66]),'Climate2Fan8');
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[67]),'CL_BU_26'); // Pump

		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[68]),'Climate3Fan1');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[69]),'Climate3Fan2');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[70]),'Climate3Fan3');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[71]),'Climate3Fan4');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[72]),'Climate3Fan5');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[73]),'Climate3Fan6');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[74]),'Climate3Fan7');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[75]),'Climate3Fan8');
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[76]),'CL_BU_27'); // Pump

		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[77]),'Climate4Fan1');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[78]),'Climate4Fan2');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[79]),'Climate4Fan3');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[80]),'Climate4Fan4');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[81]),'Climate4Fan5');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[82]),'Climate4Fan6');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[83]),'Climate4Fan7');
		SetOnOffFanScreens(ExtractValueFromData(Data,Climate1ScreenVariables[84]),'Climate4Fan8');
		SetOnOffButtonsOnClimateScreens(ExtractValueFromData(Data,Climate1ScreenVariables[85]),'CL_BU_28'); // Pump


	}
	//******************************************************************************	
}
//************************************************************************************
function UpDateVariablesOnExternalClimateScreen(Data)
{
	var Result;
	if (LightVersion)
	{
	}
	else
	{
		Result=ExtractValueFromData(Data,Climate1ScreenVariables[0]);
		ExternalTemperatureGauge.setValue( parseFloat( Result) );

		Result=ExtractValueFromData(Data,Climate1ScreenVariables[1]);	
		ExternalHumidityGauge.setValue( parseFloat( Result) );

		Result=ExtractValueFromData(Data,Climate1ScreenVariables[2]);	
		ExternalSolarGauge.setValue( parseFloat( Result) );
		
		Result=ExtractValueFromData(Data,Climate1ScreenVariables[3]);	
		ExternalWindSpeedGauge.setValue( parseFloat( Result) );

		Result=ExtractValueFromData(Data,Climate1ScreenVariables[4]);	
		ExternalWindDirectionGauge.setValue( parseFloat( Result) );
		
		Result=ExtractValueFromData(Data,Climate1ScreenVariables[5]);	
		if (Result > 0)
			document.getElementById('ExternalRainImageID').src = "./images/rain_animated.gif";
		else
			document.getElementById('ExternalRainImageID').src = "./images/sun.png";
	}
}
//************************************************************************************
function SetOnOffLedOnScreens(value,LedID)
{
	if (value > 0)
		document.getElementById(LedID).src = "./images/red-on-16.png";
	else
		document.getElementById(LedID).src = "./images/red-off-16.png";
}
//************************************************************************************
function SetOnOffFanScreens(value,LedID)
{
	if (value > 0)
		document.getElementById(LedID).src = "./images/fan_on.gif";
	else
		document.getElementById(LedID).src = "./images/fan_off.gif";
}
//************************************************************************************
function SetOnOffButtonsOnClimateScreens(value,ButtonID)
{
	if (value > 0)
	{
		document.getElementById(ButtonID).setAttribute("className", "button_ON");
		document.getElementById(ButtonID).setAttribute("class", "button_ON");
	}
	else
	{
		document.getElementById(ButtonID).setAttribute("className", "button");
		document.getElementById(ButtonID).setAttribute("class", "button");
	}
}
//************************************************************************************
function ClimateButtonPressed(but)
{
	var ReleValue = but.id.substr(6,but.id.length-2);
	//alert(but.className);
	if ( but.className == "button")
	{
		//alert(ReleValue);
		//OpenCloseReleCommand(1,ReleValue);
		//but.setAttribute("className", "button_ON");
		//but.setAttribute("class", "button_ON");		
	}
	else
	{
		//alert(ReleValue);
		//OpenCloseReleCommand(0,ReleValue);
		//but.setAttribute("className", "button");
		//but.setAttribute("class", "button");		
	}
}		