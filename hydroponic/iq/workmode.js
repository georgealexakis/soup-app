// JavaScript Document

function GetGeneralWorkingParametersSetup()
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 047;';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	return txt;
}

function SetGeneralWorkingParametersSetup(Parameters,ParametersLenght)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 048;';
	for (i=0;i<ParametersLenght;i++)
	{
		url=url+Parameters[i]+';';
	}
	url=url+Math.random()+';';
	//alert(url);
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);

}

function CreateGeneralWorkingParametersDialog()
{
		StopDataAcquisition();
		var Parameters = new Array();
		if (FlagWindowIsCreated==0)
		{	
			
			var WorkingModeSetup = GetGeneralWorkingParametersSetup();
			if (WorkingModeSetup == "ERROR")
			{
				alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ");
				return;
			}
			Parameters = WorkingModeSetup.split(";"); 
			//alert(WorkingModeSetup);
			//*********************************************			
			//return;
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 0, 0, 720, 420);
			DialogWindow.setText("ΓΕΝΙΚΕΣ ΡΥΘΜΙΣΕΙΣ");
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
			//*********************************************************
			formData = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "block", width: "auto", list:[
					{type: "button", position: "center", name: "OK" , value: "ΑΠΟΣΤΟΛΗ", width:150 ,className :'DialogOKButtonClass' },
					{type: "newcolumn", offset:50},
					{type: "button", position: "center", name: "CANCEL" , value: "ΑΚΥΡΟ", width:150 ,className :'DialogOKButtonClass'}													
				]},
				{type: "fieldset", width: "auto", label: "ΑΝΑΓΝΩΣΗ ΕΞΩΤΕΡΙΚΩΝ ΚΑΡΤΩΝ:", list:[
					{type: "checkbox", label: "ΚΑΡΤΑ 1:", labelWidth: "auto" , labelAlign:"right" , name:"WM_READ1" ,checked: false, className :'DialogCheckBoxClass'},
					{type: "checkbox", label: "ΚΑΡΤΑ 2:", labelWidth: "auto" , labelAlign:"right" , name:"WM_READ2" ,checked: false, className :'DialogCheckBoxClass'},
					{type: "checkbox", label: "ΚΑΡΤΑ 3:", labelWidth: "auto" , labelAlign:"right" , name:"WM_READ3" ,checked: false, className :'DialogCheckBoxClass'},
					{type: "checkbox", label: "ΚΑΡΤΑ 4:", labelWidth: "auto" , labelAlign:"right" , name:"WM_READ4" ,checked: false, className :'DialogCheckBoxClass'},
					{type: "checkbox", label: "AUTO SAVE ON FLASH:", labelWidth: "auto" , labelAlign:"right" , name:"WM_USEGSM" ,checked: false, className :'DialogCheckBoxClass'},
					{type: "newcolumn", offset:50},	
					{type: "checkbox", label: "ΚΑΡΤΑ 5:", labelWidth: "auto" , labelAlign:"right" , name:"WM_READ5" ,checked: false, className :'DialogCheckBoxClass'},
					{type: "checkbox", label: "ΚΑΡΤΑ 6:", labelWidth: "auto" , labelAlign:"right" , name:"WM_READ6" ,checked: false, className :'DialogCheckBoxClass'},
					{type: "checkbox", label: "ΚΑΡΤΑ 7:", labelWidth: "auto" , labelAlign:"right" , name:"WM_READ7" ,checked: false, className :'DialogCheckBoxClass'},
					{type: "checkbox", label: "ΚΑΡΤΑ 8:", labelWidth: "auto" , labelAlign:"right" , name:"WM_READ8" ,checked: false, className :'DialogCheckBoxClass'}
				]},
				{type: "fieldset", width: "auto", label: "MyIQ URL:", list:[
					{type: "input", label: "URL", labelWidth:"auto", labelAlign:"right" ,inputWidth:500 ,name: "MYIQURL" , className :'DialogInputClass' , value:Parameters[11] ,maxLength :100 }
				]},
				{type: "fieldset", width: "auto", label: "ΓΙΑ ΜΕΛΟΝΤΙΚΗ ΧΡΗΣΗ:", list:[
					{type: "select",   label: ":", labelWidth: "auto", inputWidth: 250 , name:"SOLARSENSOR" ,className :'DialogsSelectInput' },
					{type: "newcolumn", offset:50},
					{type: "input", label: ":", labelWidth:"auto", labelAlign:"right" ,inputWidth:70 ,name: "SOLARSENSORINPUTID" , className :'DialogInputClass' , value:Parameters[1] }
				]}
			];
			myForm = DialogWindow.attachForm(formData);
			SetCheckValue(myForm,"WM_READ1",Parameters[3]);
			SetCheckValue(myForm,"WM_READ2",Parameters[4]);
			SetCheckValue(myForm,"WM_READ3",Parameters[5]);
			SetCheckValue(myForm,"WM_READ4",Parameters[6]);
			SetCheckValue(myForm,"WM_READ5",Parameters[7]);
			SetCheckValue(myForm,"WM_READ6",Parameters[8]);
			SetCheckValue(myForm,"WM_READ7",Parameters[9]);
			SetCheckValue(myForm,"WM_READ8",Parameters[10]);
			SetCheckValue(myForm,"WM_USEGSM",Parameters[2]);
			FeelSelectWithAllVirtuals(myForm.getSelect("SOLARSENSOR"),DEF_ALL_VIRTUALS_MASK);
			SelectOptionInSelectByValue(myForm.getSelect("SOLARSENSOR"),Parameters[0]);
			
			myForm.attachEvent("onButtonClick", function(name){
				if (name == 'CANCEL')
				{
					WindowsViewPort.window("DialogWindow").close();	
					return;
				}
				var Parameters = new Array();
				Parameters[0]=myForm.getSelect("SOLARSENSOR").options[myForm.getSelect("SOLARSENSOR").selectedIndex].value;
				Parameters[1]=parseInt(myForm.getInput("SOLARSENSORINPUTID").value);	
				if ( myForm.isItemChecked("WM_USEGSM") ) {Parameters[2]=1;} else {Parameters[2]=0;}
				if ( myForm.isItemChecked("WM_READ1") ) {Parameters[3]=1;} else {Parameters[3]=0;}
				if ( myForm.isItemChecked("WM_READ2") ) {Parameters[4]=1;} else {Parameters[4]=0;}
				if ( myForm.isItemChecked("WM_READ3") ) {Parameters[5]=1;} else {Parameters[5]=0;}
				if ( myForm.isItemChecked("WM_READ4") ) {Parameters[6]=1;} else {Parameters[6]=0;}
				if ( myForm.isItemChecked("WM_READ5") ) {Parameters[7]=1;} else {Parameters[7]=0;}
				if ( myForm.isItemChecked("WM_READ6") ) {Parameters[8]=1;} else {Parameters[8]=0;}
				if ( myForm.isItemChecked("WM_READ7") ) {Parameters[9]=1;} else {Parameters[9]=0;}				
				if ( myForm.isItemChecked("WM_READ8") ) {Parameters[10]=1;} else {Parameters[10]=0;}
				Parameters[11]=myForm.getInput("MYIQURL").value+' ';	
				SetGeneralWorkingParametersSetup(Parameters,Parameters.length);
				WindowsViewPort.window("DialogWindow").close();
			})//myForm.attachEvent

		}
}


function CreateDataStorageModeDialog()
{
		StopDataAcquisition();
		var Parameters = new Array();
		if (FlagWindowIsCreated==0)
		{	
			
			var WorkingModeSetup = GetDataStorageModeSetup();
			if (WorkingModeSetup == "ERROR")
			{
				alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ");
				return;
			}
			Parameters = WorkingModeSetup.split(";"); 
				
			//*********************************************			
			//return;
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 0, 0, 720, 420);
			DialogWindow.setText("ΓΕΝΙΚΕΣ ΡΥΘΜΙΣΕΙΣ ΑΠΟΘΗΚΕΥΣΗΣ");
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
			TabBar.setTabActive("t1");


			formData = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "block", width: "auto", list:[
					{type: "button", position: "center", name: "OK" , value: "ΑΠΟΣΤΟΛΗ", width:150 ,className :'DialogOKButtonClass' },
					{type: "newcolumn", offset:50},
					{type: "button", position: "center", name: "CANCEL" , value: "ΑΚΥΡΟ", width:150 ,className :'DialogOKButtonClass'}													
				]},
				{type: "fieldset", width: "auto", label: "ΑΠΟΘΗΚΕΥΣΗ ΜΕΤΑΒΛΗΤΩΝ", list:[
					
					{type: "select", label: "ΜΕΘΟΔΟΣ ΑΠΟΘΗΚΕΥΣΗΣ:", labelWidth: "auto" , inputWidth: 300 ,name: "WM_SM" ,className :'DialogsSelectInput' ,options:[
						{text: "ΧΩΡΙΣ ΑΠΟΘΗΚΕΥΣΗ", value: "0"},
						{text: "ΤΡΕΧΟΥΣΕΣ ΤΙΜΕΣ", value: "1"},
						{text: "ΜΕΣΟΣ ΟΡΟΣ", value: "2"}
					]},
					{type: "select", label: "ΠΕΡΙΟΔΟΣ ΑΠΟΘΗΚΕΥΣΗΣ:", labelWidth: "auto" , inputWidth: 300 ,name: "WM_ST" ,className :'DialogsSelectInput' ,options:[
						{text: "ΚΑΘΕ 1  ΛΕΠΤ0", value: "1"},
						{text: "ΚΑΘΕ 2  ΛΕΠΤΑ", value: "2"},
						{text: "ΚΑΘΕ 5  ΛΕΠΤΑ", value: "5"},
						{text: "ΚΑΘΕ 10 ΛΕΠΤΑ", value: "10"},
						{text: "ΚΑΘΕ 15 ΛΕΠΤΑ (ΠΡΟΤΕΙΝΟΜΕΝΟ)", value: "15"},
						{text: "ΚΑΘΕ 20 ΛΕΠΤΑ", value: "20"},
						{text: "ΚΑΘΕ 30 ΛΕΠΤΑ", value: "30"},
						{text: "ΚΑΘΕ 60 ΛΕΠΤΑ", value: "60"}
					]},
					{type: "select", label: "ΑΠΟΘΗΚΕΥΣΗ:", labelWidth: "auto" , inputWidth: 300 ,name: "WM_SP" ,className :'DialogsSelectInput' ,options:[
						{text: "ΜΟΝΟ SD",  value: "4"},
						{text: "MONO WEB", value: "8"},
						{text: "SD & WEB", value: "12"}
					]},
				]},
				{type: "checkbox", label: "ΑΥΤΟΜΑΤΟ BACKUP ΣΤΗΝ ΚΑΡΤΑ SD ΚΑΘΕ ΠΡΩΤΗ ΤΟΥ ΜΗΝΑ:", labelWidth: "auto" , labelAlign:"right" , name:"WM_AUTOB" ,checked: false, className :'DialogCheckBoxClass'}
			];
			//*************************************************************
			formData2 = [
				{type: "fieldset", width: "auto", label: "ΜΕΤΑΒΛΗΤΕΣ ΠΡΟΣ ΑΠΟΘΗΚΕΥΣΗ", list:[
					{type: "select", label: "1:", labelWidth: "20", labelAlign:"right" , inputWidth: 280 ,name:"WM_V1" ,className :'DialogsSelectInput'},   // 3
					{type: "select", label: "2:", labelWidth: "20", labelAlign:"right" , inputWidth: 280 ,name:"WM_V2" ,className :'DialogsSelectInput'},   // 3
					{type: "select", label: "3:", labelWidth: "20", labelAlign:"right" , inputWidth: 280 ,name:"WM_V3" ,className :'DialogsSelectInput'},   // 3
					{type: "select", label: "4:", labelWidth: "20", labelAlign:"right" , inputWidth: 280 ,name:"WM_V4" ,className :'DialogsSelectInput'},   // 3
					{type: "select", label: "5:", labelWidth: "20", labelAlign:"right" , inputWidth: 280 ,name:"WM_V5" ,className :'DialogsSelectInput'},   // 3
					{type: "select", label: "6:", labelWidth: "20", labelAlign:"right" , inputWidth: 280 ,name:"WM_V6" ,className :'DialogsSelectInput'},   // 3
					{type: "select", label: "7:", labelWidth: "20", labelAlign:"right" , inputWidth: 280 ,name:"WM_V7" ,className :'DialogsSelectInput'},   // 3
					{type: "select", label: "8:", labelWidth: "20", labelAlign:"right" , inputWidth: 280 ,name:"WM_V8" ,className :'DialogsSelectInput'},   // 3
					{type: "newcolumn", offset:30},
					{type: "select", label: "9:", labelWidth: "20", labelAlign:"right" , inputWidth: 280 ,name:"WM_V9" ,className :'DialogsSelectInput'},   // 3
					{type: "select", label: "10:", labelWidth: "20", labelAlign:"right" , inputWidth: 280 ,name:"WM_V10" ,className :'DialogsSelectInput'},   // 3
					{type: "select", label: "11:", labelWidth: "20", labelAlign:"right" , inputWidth: 280 ,name:"WM_V11" ,className :'DialogsSelectInput'},   // 3
					{type: "select", label: "12:", labelWidth: "20", labelAlign:"right" , inputWidth: 280 ,name:"WM_V12" ,className :'DialogsSelectInput'},   // 3
					{type: "select", label: "13:", labelWidth: "20", labelAlign:"right" , inputWidth: 280 ,name:"WM_V13" ,className :'DialogsSelectInput'},   // 3
					{type: "select", label: "14:", labelWidth: "20", labelAlign:"right" , inputWidth: 280 ,name:"WM_V14" ,className :'DialogsSelectInput'},   // 3
					{type: "select", label: "15:", labelWidth: "20", labelAlign:"right" , inputWidth: 280 ,name:"WM_V15" ,className :'DialogsSelectInput'}   // 3

				]}
						
			];			
			//*************************************************************
			//myForm = DialogWindow.attachForm(formData);
			myForm  = TabBar.cells("t1").attachForm(formData);
			myForm2 = TabBar.cells("t2").attachForm(formData2);
			//*************************************************************
			//************* FILL LIST BOXES *******************************
			//*************************************************************
			FeelSelectWithAllVirtuals(myForm2.getSelect("WM_V1"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm2.getSelect("WM_V2"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm2.getSelect("WM_V3"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm2.getSelect("WM_V4"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm2.getSelect("WM_V5"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm2.getSelect("WM_V6"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm2.getSelect("WM_V7"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm2.getSelect("WM_V8"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm2.getSelect("WM_V9"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm2.getSelect("WM_V10"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm2.getSelect("WM_V11"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm2.getSelect("WM_V12"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm2.getSelect("WM_V13"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm2.getSelect("WM_V14"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm2.getSelect("WM_V15"),DEF_ALL_VIRTUALS_MASK);

			//*************************************************************
			//************* SET VALUES ************************************
			//*************************************************************
			SetCheckValue(myForm,"WM_AUTOB",Parameters[17]);
			//alert(Parameters[0]);
			var ForSMSelect = Parameters[0] & 3;
			var ForSPSelect = Parameters[0] & 12;
			//alert(Parameters[0]);
			SelectOptionInSelectByValue(myForm.getSelect("WM_SM"),ForSMSelect);
			SelectOptionInSelectByValue(myForm.getSelect("WM_SP"),ForSPSelect);
			SelectOptionInSelectByValue(myForm.getSelect("WM_ST"),Parameters[1]);
			
			SelectOptionInSelectByValue(myForm2.getSelect("WM_V1"),Parameters[2]);
			SelectOptionInSelectByValue(myForm2.getSelect("WM_V2"),Parameters[3]);
			SelectOptionInSelectByValue(myForm2.getSelect("WM_V3"),Parameters[4]);
			SelectOptionInSelectByValue(myForm2.getSelect("WM_V4"),Parameters[5]);
			SelectOptionInSelectByValue(myForm2.getSelect("WM_V5"),Parameters[6]);			
			SelectOptionInSelectByValue(myForm2.getSelect("WM_V6"),Parameters[7]);
			SelectOptionInSelectByValue(myForm2.getSelect("WM_V7"),Parameters[8]);
			SelectOptionInSelectByValue(myForm2.getSelect("WM_V8"),Parameters[9]);
			SelectOptionInSelectByValue(myForm2.getSelect("WM_V9"),Parameters[10]);
			SelectOptionInSelectByValue(myForm2.getSelect("WM_V10"),Parameters[11]);			
			SelectOptionInSelectByValue(myForm2.getSelect("WM_V11"),Parameters[12]);
			SelectOptionInSelectByValue(myForm2.getSelect("WM_V12"),Parameters[13]);
			SelectOptionInSelectByValue(myForm2.getSelect("WM_V13"),Parameters[14]);
			SelectOptionInSelectByValue(myForm2.getSelect("WM_V14"),Parameters[15]);
			SelectOptionInSelectByValue(myForm2.getSelect("WM_V15"),Parameters[16]);			
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
				Parameters[0]=parseInt(myForm.getSelect("WM_SM").options[myForm.getSelect("WM_SM").selectedIndex].value) |parseInt(myForm.getSelect("WM_SP").options[myForm.getSelect("WM_SP").selectedIndex].value);

				//alert(Parameters[0]);
				Parameters[1]=myForm.getSelect("WM_ST").options[myForm.getSelect("WM_ST").selectedIndex].value;
				Parameters[2]=myForm2.getSelect("WM_V1").options[myForm2.getSelect("WM_V1").selectedIndex].value;
				Parameters[3]=myForm2.getSelect("WM_V2").options[myForm2.getSelect("WM_V2").selectedIndex].value;
				Parameters[4]=myForm2.getSelect("WM_V3").options[myForm2.getSelect("WM_V3").selectedIndex].value;
				Parameters[5]=myForm2.getSelect("WM_V4").options[myForm2.getSelect("WM_V4").selectedIndex].value;
				Parameters[6]=myForm2.getSelect("WM_V5").options[myForm2.getSelect("WM_V5").selectedIndex].value;
				Parameters[7]=myForm2.getSelect("WM_V6").options[myForm2.getSelect("WM_V6").selectedIndex].value;
				Parameters[8]=myForm2.getSelect("WM_V7").options[myForm2.getSelect("WM_V7").selectedIndex].value;
				Parameters[9]=myForm2.getSelect("WM_V8").options[myForm2.getSelect("WM_V8").selectedIndex].value;
				Parameters[10]=myForm2.getSelect("WM_V9").options[myForm2.getSelect("WM_V9").selectedIndex].value;
				Parameters[11]=myForm2.getSelect("WM_V10").options[myForm2.getSelect("WM_V10").selectedIndex].value;
				Parameters[12]=myForm2.getSelect("WM_V11").options[myForm2.getSelect("WM_V11").selectedIndex].value;
				Parameters[13]=myForm2.getSelect("WM_V12").options[myForm2.getSelect("WM_V12").selectedIndex].value;
				Parameters[14]=myForm2.getSelect("WM_V13").options[myForm2.getSelect("WM_V13").selectedIndex].value;
				Parameters[15]=myForm2.getSelect("WM_V14").options[myForm2.getSelect("WM_V14").selectedIndex].value;
				Parameters[16]=myForm2.getSelect("WM_V15").options[myForm2.getSelect("WM_V15").selectedIndex].value;
				

				if ( myForm.isItemChecked("WM_AUTOB") ) {Parameters[17]=1;} else {Parameters[17]=0;}
				SetDataStorageModeSetup(Parameters,Parameters.length);
				WindowsViewPort.window("DialogWindow").close();
			})
		}
}

function GetDataStorageModeSetup()
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 029;';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
		alert(txt);
	return txt;
}

function SetDataStorageModeSetup(Parameters,ParametersLenght)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 030;';
	for (i=0;i<ParametersLenght;i++)
	{
		url=url+Parameters[i]+';';
	}
	url=url+Math.random()+';';
	alert(url);
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);

}