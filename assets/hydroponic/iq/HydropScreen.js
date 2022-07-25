// JavaScript Document
//*********************************************************************************************************************
//*********************************************************************************************************************
//*********************************************************************************************************************
//*********************************************************************************************************************
function UpDateVariablesOnMainHydroponicsScreen(Data)
{
	var Result;
	Result=ExtractValueFromData(Data,MainHydroponicsScreen[0]);
	if (LightVersion)
		document.getElementById('ECGaugeDivID').innerHTML  = MyparseFloatWithFixed(Result) ;
	else
	{
		ECGauge.value = parseFloat( Result);
	}
	
	FlawGauge.value = ExtractValueFromData(Data,MainHydroponicsScreen[11]);
	
	UpdateOnLineGraphs(Data);
	UpdateMimicGraphs(Data);
	
	Result=ExtractValueFromData(Data,MainHydroponicsScreen[1]);	
	
	if (LightVersion)
		document.getElementById('PHGaugeDivID').innerHTML  = MyparseFloatWithFixed(Result) ;
	else
	{
		PHGauge.value = parseFloat(Result) ;
	}
	Result=ExtractValueFromData(Data,MainHydroponicsScreen[2]);
	document.getElementById('MainHydroponiceScreenWT').innerHTML  = MyparseFloatWithFixed(Result) ;
	Result=ExtractValueFromData(Data,MainHydroponicsScreen[3]);
	document.getElementById('MainHydroponiceScreenWP').innerHTML  = MyparseFloatWithFixed(Result) ;
	
	Result=ExtractValueFromData(Data,MainHydroponicsScreen[4]);
	if (Result > 0)
		document.getElementById('MainHydroponiceScreenDEH').src = "./images/red-on.png";
	else
		document.getElementById('MainHydroponiceScreenDEH').src = "./images/red-off.png";
	Result=ExtractValueFromData(Data,MainHydroponicsScreen[5]);
	if (Result > 0)
		document.getElementById('MainHydroponiceScreenLL').src = "./images/red-on.png";
	else
		document.getElementById('MainHydroponiceScreenLL').src = "./images/red-off.png";
	//**********************************************************************************
	Result=ExtractValueFromData(Data,MainHydroponicsScreen[12]);
	document.getElementById('MainHydroponiceScreenPR').innerHTML  = MyparseFloatWithFixed(Result) ;
	/*
	Result=ExtractValueFromData(Data,MainHydroponicsScreen[6]);
	if (Result > 0)
		document.getElementById('MainHydroponiceScreenUL').src = "./images/red-on.png";
	else
		document.getElementById('MainHydroponiceScreenUL').src = "./images/red-off.png";
	*/	
	//**********************************************************************************	
	document.getElementById('MainHydroponiceScreenEC1').innerHTML  = MyparseFloatWithFixed(ExtractValueFromData(Data,MainHydroponicsScreen[7])) ;
	document.getElementById('MainHydroponiceScreenEC2').innerHTML  = MyparseFloatWithFixed(ExtractValueFromData(Data,MainHydroponicsScreen[8])) ;
	document.getElementById('MainHydroponiceScreenPH1').innerHTML  = MyparseFloatWithFixed(ExtractValueFromData(Data,MainHydroponicsScreen[9])) ;	
	document.getElementById('MainHydroponiceScreenPH2').innerHTML  = MyparseFloatWithFixed(ExtractValueFromData(Data,MainHydroponicsScreen[10])) ;	
	
	//document.getElementById('MainHydroponicScreenDESECPH').innerHTML = 'ASD';
}
//*********************************************************************************************************************
//*********************************************************************************************************************
//*********************************************************************************************************************
//*********************************************************************************************************************
function EditScreen1Setup()
{
	
		var Parameters = new Array();
		if (FlagWindowIsCreated==0)
		{	
			var HydroponicsScreenSetup = GetHydroponicScreenSetup();
			Parameters = HydroponicsScreenSetup.split(";"); //ReadFileFromMBedAndReturnParametersArray('Screen1.txt');
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 5, 5, 400, 400);
			DialogWindow.setText("ΒΑΣΙΚΗ ΟΘΟΝΗ ΥΔΡΟΠΟΝΙΑΣ");
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
				//{type: "fieldset", width: "550", label: "ΤΙΜΗ ΠΟΥ ΘΑ ΕΜΦΑΝΙΖΕΤΑΙ:", list:[
					{type: "select",   label: "ΕΝΔΕΙΚΤΙΚΟ ΕC:", labelWidth: "140", inputWidth: 180 , name:"ECGAUGE" },
					{type: "select",   label: "ΕΝΔΕΙΚΤΙΚΟ pH:", labelWidth: "140", inputWidth: 180 , name:"PHGAUGE" },
					{type: "select",   label: "ΘΕΡΜΟΚΡΑΣΙΑ ΝΕΡΟΥ:", labelWidth: "140", inputWidth: 180 , name:"WATERTEMP" },
					{type: "select",   label: "ΗΜΕΡΗΣΙΑ ΠΑΡΟΧΗ:", labelWidth: "140", inputWidth: 180 , name:"DAILYFLOW" },
					{type: "select",   label: "ΑΠΩΛΕΙΑ ΡΕΥΜΑΤΟΣ:", labelWidth: "140", inputWidth: 180 , name:"POWER" },
					{type: "select",   label: "ΠΑΝΩ ΟΡΙΟ ΣΤΑΘΜΗΣ:", labelWidth: "140", inputWidth: 180 , name:"LL" },
					{type: "select",   label: "ΚΑΤΩ ΟΡΙΟ ΣΤΑΘΜΗΣ:", labelWidth: "140", inputWidth: 180 , name:"UL" },
					{type: "select",   label: "EC1:", labelWidth: "140", inputWidth: 180 , name:"EC1" },
					{type: "select",   label: "EC2:", labelWidth: "140", inputWidth: 180 , name:"EC2" },
					{type: "select",   label: "PH1:", labelWidth: "140", inputWidth: 180 , name:"PH1" },
					{type: "select",   label: "PH2:", labelWidth: "140", inputWidth: 180 , name:"PH2" },
					{type: "select",   label: "ΠΑΡΟΧΟΜΕΤΡΟ (m3/h):", labelWidth: "140", inputWidth: 180 , name:"FLOWMETER" },
					{type: "select",   label: "ΜΑΝΟΜΕΤΡΟ:", labelWidth: "140", inputWidth: 180 , name:"PRESSUREMETER" }
				//]}

			];
			//*************************************************************
			myForm = DialogWindow.attachForm(formData);
			//*************************************************************
			//************* FILL LIST BOXES *******************************
			//*************************************************************
			FeelSelectWithAllVirtuals(myForm.getSelect("ECGAUGE"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("PHGAUGE"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("WATERTEMP"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("DAILYFLOW"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("POWER"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("LL"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("UL"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("EC1"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("EC2"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("PH1"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("PH2"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("FLOWMETER"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("PRESSUREMETER"),DEF_ALL_VIRTUALS_MASK);
			//*************************************************************
			//************* SET VALUES ************************************
			//*************************************************************
			SelectOptionInSelectByValue(myForm.getSelect("ECGAUGE"),Parameters[0]);
			SelectOptionInSelectByValue(myForm.getSelect("PHGAUGE"),Parameters[1]);
			SelectOptionInSelectByValue(myForm.getSelect("WATERTEMP"),Parameters[2]);
			SelectOptionInSelectByValue(myForm.getSelect("DAILYFLOW"),Parameters[3]);
			SelectOptionInSelectByValue(myForm.getSelect("POWER"),Parameters[4]);
			SelectOptionInSelectByValue(myForm.getSelect("LL"),Parameters[5]);
			SelectOptionInSelectByValue(myForm.getSelect("UL"),Parameters[6]);
			SelectOptionInSelectByValue(myForm.getSelect("EC1"),Parameters[7]);
			SelectOptionInSelectByValue(myForm.getSelect("EC2"),Parameters[8]);
			SelectOptionInSelectByValue(myForm.getSelect("PH1"),Parameters[9]);
			SelectOptionInSelectByValue(myForm.getSelect("PH2"),Parameters[10]);
			SelectOptionInSelectByValue(myForm.getSelect("FLOWMETER"),Parameters[11]);
			SelectOptionInSelectByValue(myForm.getSelect("PRESSUREMETER"),Parameters[12]);
			//*************************************************************
			myForm.attachEvent("onChange", function(name,value,is_checked){
			});
			//*************************************************************
			myForm.attachEvent("onButtonClick", function(name){
				var Parameters = new Array();
				//if ( myForm.isItemChecked("ENABLE") ) {Parameters[0]=1;} else {Parameters[0]=0;}
				Parameters[0]=myForm.getSelect("ECGAUGE").options[myForm.getSelect("ECGAUGE").selectedIndex].value;
				Parameters[1]=myForm.getSelect("PHGAUGE").options[myForm.getSelect("PHGAUGE").selectedIndex].value;
				Parameters[2]=myForm.getSelect("WATERTEMP").options[myForm.getSelect("WATERTEMP").selectedIndex].value;
				Parameters[3]=myForm.getSelect("DAILYFLOW").options[myForm.getSelect("DAILYFLOW").selectedIndex].value;
				Parameters[4]=myForm.getSelect("POWER").options[myForm.getSelect("POWER").selectedIndex].value;
				Parameters[5]=myForm.getSelect("LL").options[myForm.getSelect("LL").selectedIndex].value;
				Parameters[6]=myForm.getSelect("UL").options[myForm.getSelect("UL").selectedIndex].value;
				Parameters[7]=myForm.getSelect("EC1").options[myForm.getSelect("EC1").selectedIndex].value;
				Parameters[8]=myForm.getSelect("EC2").options[myForm.getSelect("EC2").selectedIndex].value;
				Parameters[9]=myForm.getSelect("PH1").options[myForm.getSelect("PH1").selectedIndex].value;				
				Parameters[10]=myForm.getSelect("PH2").options[myForm.getSelect("PH2").selectedIndex].value;				
				Parameters[11]=myForm.getSelect("FLOWMETER").options[myForm.getSelect("FLOWMETER").selectedIndex].value;	
				Parameters[12]=myForm.getSelect("PRESSUREMETER").options[myForm.getSelect("PRESSUREMETER").selectedIndex].value;	
				SetHydroponicScreenSetup(Parameters,Parameters.length);
				//WriteToFileOnmBed("Screen1.txt",Parameters,Parameters.length);
				WindowsViewPort.window("DialogWindow").close();
			})
		}

}
//*********************************************************************************************************************
//*********************************************************************************************************************
//*********************************************************************************************************************
//*********************************************************************************************************************
//**********************************************************************************
function InfoStartProgram()
{
	var sel = document.getElementById('InfoProgramList');
	var pid = parseInt(sel.options[sel.selectedIndex].value,10)+1;
	if ( (pid <1) || (pid > DEF_MAXIMUM_TIME_PROGRAMS) ) return;
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 011;'+pid+';1;';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);
}

function InfoStopProgram()
{
	var sel = document.getElementById('InfoProgramList');
	var pid = parseInt(sel.options[sel.selectedIndex].value,10)+1;
	if ( (pid <1) || (pid > DEF_MAXIMUM_TIME_PROGRAMS) ) return;
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 011;'+pid+';2;';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);

}

function InfoPauseProgram()
{
	var sel = document.getElementById('InfoProgramList');
	var pid = parseInt(sel.options[sel.selectedIndex].value,10)+1;
	if ( (pid <1) || (pid > DEF_MAXIMUM_TIME_PROGRAMS) ) return;
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 011;'+pid+';3;';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);

}

function InfoNextProgram()
{
	var sel = document.getElementById('InfoProgramList');
	var pid = parseInt(sel.options[sel.selectedIndex].value,10)+1;
	if ( (pid <1) || (pid > DEF_MAXIMUM_TIME_PROGRAMS) ) return;
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 011;'+pid+';4;';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);

}

function InfoEditProgram()
{
	var sel = document.getElementById('InfoProgramList');
	var pid = parseInt(sel.options[sel.selectedIndex].value,10)+1;
	if ( (pid <1) || (pid > DEF_MAXIMUM_TIME_PROGRAMS) ) return;
	SetGUIOnSynchronousHttpRequest();
	setTimeout(function() {
		CreateTimeProgramWindow(parseInt(pid,10),sel.options[sel.selectedIndex].text);
	}, 100)
	
}

function InfoEditFerti()
{
	var sel = document.getElementById('InfoFertiList');
	var pid = parseInt(sel.options[sel.selectedIndex].value,10)+1;
	if ( (pid <1) || (pid > DEF_MAXIMUM_FERTIGATION_PROGRAMS) ) return;
	SetGUIOnSynchronousHttpRequest();
	
	setTimeout(function() {
		CreateFertigationProgramWindow(parseInt(pid,10),sel.options[sel.selectedIndex].text);
	}, 100)
}

function GetHydroponicScreenSetup()
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 036;';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	return txt;
}

function SetHydroponicScreenSetup(Parameters,ParametersLenght)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 037;';
	for (i=0;i<ParametersLenght;i++)
	{
		url=url+Parameters[i]+';';
	}
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);

}
//*********************************************************************************************************************
//*********************************************************************************************************************
//*********************************************************************************************************************
//*********************************************************************************************************************
//**********************************************************************************
