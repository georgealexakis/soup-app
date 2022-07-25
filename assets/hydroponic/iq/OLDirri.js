// JavaScript Document

function SetCheckValue(form,name,val)
{
	if (val > 0)
		form.checkItem(name); 
	else	
		form.uncheckItem(name);
}

function SetCheckValuesInDaysInTimeProgramSetup(form,val)
{
	if ( val & ((0x0001) ) )
		form.checkItem("D1"); 
	if ( val & ((0x0001)<<1) )
		form.checkItem("D2"); 
	if ( val & ((0x0001)<<2) )
		form.checkItem("D3"); 
	if ( val & ((0x0001)<<3) )
		form.checkItem("D4"); 
	if ( val & ((0x0001)<<4) )
		form.checkItem("D5"); 
	if ( val & ((0x0001)<<5) )
		form.checkItem("D6"); 
	if ( val & ((0x0001)<<6) )
		form.checkItem("D7"); 

}

function GetCheckValuesInDaysInTimeProgramSetup(form)
{
	var ret=0;
	if ( form.isItemChecked("D1") ) ret=ret | 1;
	if ( form.isItemChecked("D2") ) ret=ret | 2;
	if ( form.isItemChecked("D3") ) ret=ret | 4;
	if ( form.isItemChecked("D4") ) ret=ret | 8;
	if ( form.isItemChecked("D5") ) ret=ret | 16;
	if ( form.isItemChecked("D6") ) ret=ret | 32;
	if ( form.isItemChecked("D7") ) ret=ret | 64;
	return ret;
}


function SetCheckValuesInStartTimesinTimeProgramSetup(form,val)
{
	if ( val & ((0x0001) ) ) 	{	form.checkItem("ATE1"); form.checkItem("BTE1");	}
	if ( val & ((0x0001)<<1) )	{	form.checkItem("ATE2");	form.checkItem("BTE2");	}
	if ( val & ((0x0001)<<2) )	{	form.checkItem("ATE3"); form.checkItem("BTE3"); }
	if ( val & ((0x0001)<<3) )	{	form.checkItem("ATE4"); form.checkItem("BTE4");	}
	if ( val & ((0x0001)<<4) )	{	form.checkItem("ATE5"); form.checkItem("BTE5");	}
	if ( val & ((0x0001)<<5) )	{	form.checkItem("ATE6"); 	}
	if ( val & ((0x0001)<<6) )	{	form.checkItem("ATE7"); 	}
	if ( val & ((0x0001)<<7) )	{	form.checkItem("ATE8"); 	}
	if ( val & ((0x0001)<<8) )	{	form.checkItem("ATE9"); 	}
	if ( val & ((0x0001)<<9) )	{	form.checkItem("ATE10"); 	}
}

function GetCheckValuesInStartTimesinTimeProgramSetup(form,type)
{
	var ret=0;
	if (type == 1) return ret;  		// manua;
	if ( (type == 2) || (type == 3) || (type == 5) || (type == 6) )   // sensor , period, solar, external
	{
		if ( form.isItemChecked("BTE1") ) ret=ret | 1;
		if ( form.isItemChecked("BTE2") ) ret=ret | 2;
		if ( form.isItemChecked("BTE3") ) ret=ret | 4;
		if ( form.isItemChecked("BTE4") ) ret=ret | 8;
		if ( form.isItemChecked("BTE5") ) ret=ret | 16;
	}
	if ( type == 4 )   // TIME
	{
		if ( form.isItemChecked("ATE1") ) ret=ret | 1;
		if ( form.isItemChecked("ATE2") ) ret=ret | 2;
		if ( form.isItemChecked("ATE3") ) ret=ret | 4;
		if ( form.isItemChecked("ATE4") ) ret=ret | 8;
		if ( form.isItemChecked("ATE5") ) ret=ret | 16;
		if ( form.isItemChecked("ATE6") ) ret=ret | 32;
		if ( form.isItemChecked("ATE7") ) ret=ret | 64;
		if ( form.isItemChecked("ATE8") ) ret=ret | 128;
		if ( form.isItemChecked("ATE9") ) ret=ret | 256;
		if ( form.isItemChecked("ATE10") ) ret=ret | 512;
			
	}
	
	return ret;
}


function CreateTimeProgramWindow(varid,varname)
{
		var Parameters1 = new Array();
		var Parameters2 = new Array();
		var Parameters3 = new Array();
		if (FlagWindowIsCreated==0)
		{	
			
			//document.getElementById('winVP').style.height= "800px";
			var TimeProgramSetup1 = GetProgramSetup(1,varid);
			if (TimeProgramSetup1 == "ERROR")
			{
				alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ 1");
				return;
			}
			Parameters1 = TimeProgramSetup1.split(";"); 
			//*********************************************
			var TimeProgramSetup2 = GetProgramSetup(2,varid);
			if (TimeProgramSetup2 == "ERROR")
			{
				alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ 2");
				return;
			}
			Parameters2 = TimeProgramSetup2.split(";"); 
			//*********************************************
			var TimeProgramSetup3 = GetProgramSetup(3,varid);
			if (TimeProgramSetup3 == "ERROR")
			{
				alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ 3");
				return;
			}
			Parameters3 = TimeProgramSetup3.split(";"); 
			//*********************************************
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 2, 2, 1150, 600);
			DialogWindow.setText("ΠΡΟΓΡΑΜΜΑ ΑΡΔΕΥΣΗΣ");
			FlagWindowIsCreated=1;
			DialogWindow.setModal(true);
			OnCloseEvent = DialogWindow.attachEvent("onClose", function(win){
				FlagWindowIsCreated=0;
				WindowsViewPort.window(win.getId()).detachEvent(OnCloseEvent);
				WindowsViewPort.window(win.getId()).close();
				DoAfterWindowClose()
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
			//TabBar.addTab("t4","Οθόνη 4","100px");
		    TabBar.setTabActive("t1");
			
			formData1 = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "block", width:'auto', list:[
					{type: "input", label: "AA:", name: "ID" , labelWidth: "30", inputWidth: 120 , value: ''+varid , readonly:true ,style: "background-color:#CCCCCC " },
					{type: "newcolumn", offset:50},
					{type: "button", position: "center", name: "OK" , value: "ΑΠΟΣΤΟΛΗ", width:150 ,className :'DialogOKButtonClass' },
					{type: "newcolumn", offset:50},
					{type: "button", position: "center", name: "CANCEL" , value: "ΑΚΥΡΟ", width:150 ,className :'DialogOKButtonClass'}
				]},
				{type: "fieldset", width:'auto', label: "ΜΕΘΟΔΟΣ ΕΝΑΡΞΗΣ & ΕΝΕΡΓΟΠΟΙΗΣΗ", list:[
					{type: "label", labelWidth: "auto" , label: "ΟΝΟΜΑ:"   ,labelHeight:'auto',offsetTop:5},
					{type: "label", labelWidth: "auto" , label: "ΛΙΠΑΝΣΗ:" ,labelHeight:'auto',offsetTop:5},					
					{type: "label", labelWidth: "auto" , label: "ΜΕΘΟΔΟΣ ΕΝΑΡΞΗΣ:" ,labelHeight:'auto',offsetTop:5},					
					{type: "label", labelWidth: "auto" , label: "ΜΕΤΡΗΤΗΣ ΠΑΡΟΧΗΣ:" ,labelHeight:'auto',offsetTop:5},										
					{type: "newcolumn", offset:0},
					{type: "input", labelWidth: "0", inputWidth:250 ,name: "NAME" , className :'DialogInputClass' ,maxLength :DEF_NAMES_MAX_LENGHT , value:varname , style: "background-color:#ffff99; "},
					{type: "select", labelWidth: "0", inputWidth: 250 ,name:"FERTPROGRAM" , className :'DialogsSelectInput'},
					{type: "select", labelWidth: "0", inputWidth: 250 ,name:"STARTM" , className :'DialogsSelectInput' ,options:[
						{text: "ΧΕΙΡΟΚΙΝΗΤΑ", value: "1"},
						{text: "ΑΙΣΘΗΤΗΡΙΟ", value: "2"},
						{text: "ΠΕΡΙΟΔΙΚΑ", value: "3"},
						{text: "ΧΡΟΝΙΚΑ", value: "4"},
						{text: "ΗΛΙΟΜΕΤΡΟ", value: "5"},
						{text: "ΕΞΩΤΕΡΙΚΗ ΕΝΤΟΛΗ", value: "6"}
					]},
					{type: "select", labelWidth: "0", inputWidth: 250 , name:"FLOWMETER" , className :'DialogsSelectInput'},
					{type: "newcolumn", offset:50},
					{type: "checkbox", label: "ΕΝΕΡΓΟΠΟΙΗΣΗ:", labelWidth: "auto" , labelAlign:"left" , name:"ACTIVE" ,checked: false , className:'DialogCheckBoxClass'}
				]},
				{type: "fieldset", width:'auto' , label: "ΚΡΗΤΙΡΙΟ ΕΝΑΡΞΗΣ" , name:"KRHTIRIOENARJHS", list:[
					{type: "block", width: "auto", name:"STARTSENSORBLOCK" ,list:[
						{type: "label", labelWidth: "auto" , label: "ΕΝΑΡΞΗ ΟΤΑΝ:"   ,labelHeight:30},
						{type: "newcolumn", offset:0},
						{type: "select", labelWidth:0, name:"SENSOR1" , inputWidth: 250 , className :'DialogsSelectInput', readonly:true},
						{type: "newcolumn", offset:0},
						{type: "label", labelWidth: "auto" , label: " > "   ,labelHeight:30},
						{type: "newcolumn", offset:0},						
						{type: "select",labelWidth:0 , name:"SENSOR2" , inputWidth: 250, className :'DialogsSelectInput'}
					]},
					{type: "block", width: "auto", name:"STARTPERIODBLOCK" ,list:[
						{type: "label", labelWidth: "auto" , label: "ΠΕΡΙΟΔΟΣ (δευτερόλεπτα):"   ,labelHeight:30},
						{type: "newcolumn", offset:0},						
						{type: "input",labelWidth:0 , inputWidth: 250 ,name: "PERIOD" , maxLength :50, className :'DialogInputClass' , value:Parameters1[4] }
					]}
				]},
				{type: "fieldset", width:'auto', label: "ΕΝΑΡΞΗ ΑΛΛΩΝ ΠΡΟΓΡΑΜΜΑΤΩΝ ΣΤΗΝ:", list:[
						{type: "label", labelWidth: "auto" , label: "ΕΝΑΡΞΗ:"   ,labelHeight:30},
						{type: "newcolumn", offset:0},
						{type: "select",labelWidth: 0 , inputWidth: 250 , name:"ONSTART" , className :'DialogsSelectInput' },
						{type: "newcolumn", offset:0},
						{type: "label", labelWidth: "auto" , label: "ΛΗΞΗ:"   ,labelHeight:30},
						{type: "newcolumn", offset:0},
						{type: "select", labelWidth: 0,  inputWidth: 250 , name:"ONEND" , className :'DialogsSelectInput'}
					]},
				{type: "fieldset", width:'auto', label: "ΑΝΤΛΙΕΣ (MASTER):", list:[
						{type: "label", labelWidth: "auto" , label: "1:"   ,labelHeight:30},
						{type: "newcolumn", offset:0},
						{type: "select", labelWidth: 0 ,  inputWidth: 180 , name:"MASTER1" ,labelAlign:"right" , className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},
						{type: "label", labelWidth: "auto" , label: "2:"   ,labelHeight:30},
						{type: "newcolumn", offset:0},
						{type: "select", labelWidth: 0 ,  inputWidth: 180 , name:"MASTER2" ,labelAlign:"right" , className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},
						{type: "label", labelWidth: "auto" , label: "3:"   ,labelHeight:30},
						{type: "newcolumn", offset:0},
						{type: "select", labelWidth: 0 ,  inputWidth: 180 , name:"MASTER3" ,labelAlign:"right" , className :'DialogsSelectInput'}
					]}

				];
				//******************************************************************************************************************
				formData2 = [
				{type: "fieldset", width:'auto', label: "ΗΜΕΡΕΣ ΛΕΙΤΟΥΡΓΙΑΣ", name:"DAYSBLOCK" ,list:[
					{type: "label", labelWidth:"auto" , label:"ΚΥ" , labelAlign:"right" },
					{type: "newcolumn", offset:10},
					{type: "checkbox", label: "", name:"D1" ,labelWidth: "0" ,checked: false},
					{type: "newcolumn", offset:30},
					{type: "label", labelWidth: "auto" , label: "ΔΕ" , labelAlign:"right"},
					{type: "newcolumn", offset:10},
					{type: "checkbox", label: "", name:"D2" ,labelWidth: "0" ,checked: false},
					{type: "newcolumn", offset:30},
					{type: "label", labelWidth: "auto" , label: "ΤΡ"},
					{type: "newcolumn", offset:10},
					{type: "checkbox", label: "", name:"D3" ,labelWidth: "0" ,checked: false},
					{type: "newcolumn", offset:30},
					{type: "label", labelWidth: "auto" , label: "ΤΕ"},
					{type: "newcolumn", offset:10},
					{type: "checkbox", label: "", name:"D4" ,labelWidth: "0" ,checked: false},
					{type: "newcolumn", offset:30},
					{type: "label", labelWidth: "auto" , label: "ΠΕ"},
					{type: "newcolumn", offset:10},
					{type: "checkbox", label: "", name:"D5" ,labelWidth: "0" ,checked: false},
					{type: "newcolumn", offset:30},
					{type: "label", labelWidth: "auto" , label: "ΠΑ"},
					{type: "newcolumn", offset:10},
					{type: "checkbox", label: "", name:"D6" ,labelWidth: "0" ,checked: false},
					{type: "newcolumn", offset:30},
					{type: "label", labelWidth: "auto" , label: "ΣΑ"},
					{type: "newcolumn", offset:10},
					{type: "checkbox", label: "", name:"D7" ,labelWidth: "0" ,checked: false}
				]},
				{type: "fieldset", width:'auto', label: "ΩΡΕΣ ΕΝΑΡΞΗΣ (ΧΡΟΝΙΚΑ)", name:"TIMESBLOCK1" ,list:[
					{type: "block", list:[
						{type: "label", label: "1"},
						{type: "newcolumn", offset:0},
						{type: "checkbox", label: " ", name:"ATE1"   ,labelWidth: "10" ,checked: false},
						{type: "newcolumn", offset:20},
						{type: "input", label: " ", labelWidth: "10", inputWidth: 80 ,name: "ATS1" , readonly:true , maxLength :5, value:"00:00" ,readonly:true,  className :'DialogInputClass'},
						{type: "newcolumn", offset:20},
						{type: "label", label: "6"},
						{type: "newcolumn", offset:0},
						{type: "checkbox", label: " ", name:"ATE6"   ,labelWidth: "10" ,checked: false},
						{type: "newcolumn", offset:25},
						{type: "input", label: " ", labelWidth: "10", inputWidth: 80 ,name: "ATS6" ,  readonly:true ,maxLength :5, value:"00:00" ,readonly:true,  className :'DialogInputClass'},
					]},
					{type: "block", list:[
						{type: "label", label: "2"},
						{type: "newcolumn", offset:0},
						{type: "checkbox", label: " ", name:"ATE2"   ,labelWidth: "10" ,checked: false},
						{type: "newcolumn", offset:20},
						{type: "input", label: " ", labelWidth: "10", inputWidth: 80 ,name: "ATS2" , readonly:true , maxLength :5, value:"00:00" ,readonly:true,  className :'DialogInputClass'},
						{type: "newcolumn", offset:20},
						{type: "label", label: "7"},
						{type: "newcolumn", offset:0},
						{type: "checkbox", label: " ", name:"ATE7"   ,labelWidth: "10" ,checked: false},
						{type: "newcolumn", offset:25},
						{type: "input", label: " ", labelWidth: "10", inputWidth: 80 ,name: "ATS7" ,  readonly:true ,maxLength :5, value:"00:00" ,readonly:true,  className :'DialogInputClass'},
					]},
					{type: "block", list:[
						{type: "label", label: "3"},
						{type: "newcolumn", offset:0},
						{type: "checkbox", label: " ", name:"ATE3"   ,labelWidth: "10" ,checked: false},
						{type: "newcolumn", offset:20},
						{type: "input", label: " ", labelWidth: "10", inputWidth: 80 ,name: "ATS3" , readonly:true , maxLength :5, value:"00:00" ,readonly:true,  className :'DialogInputClass'},
						{type: "newcolumn", offset:20},
						{type: "label", label: "8"},
						{type: "newcolumn", offset:0},
						{type: "checkbox", label: " ", name:"ATE8"   ,labelWidth: "10" ,checked: false},
						{type: "newcolumn", offset:25},
						{type: "input", label: " ", labelWidth: "10", inputWidth: 80 ,name: "ATS8" ,  readonly:true ,maxLength :5, value:"00:00" ,readonly:true,  className :'DialogInputClass'},
					]},
					{type: "block", list:[
						{type: "label", label: "4"},
						{type: "newcolumn", offset:0},
						{type: "checkbox", label: " ", name:"ATE4"   ,labelWidth: "10" ,checked: false},
						{type: "newcolumn", offset:20},
						{type: "input", label: " ", labelWidth: "10", inputWidth: 80 ,name: "ATS4" , readonly:true , maxLength :5, value:"00:00" ,readonly:true,  className :'DialogInputClass'},
						{type: "newcolumn", offset:20},
						{type: "label", label: "9"},
						{type: "newcolumn", offset:0},
						{type: "checkbox", label: " ", name:"ATE9"   ,labelWidth: "10" ,checked: false},
						{type: "newcolumn", offset:25},
						{type: "input", label: " ", labelWidth: "10", inputWidth: 80 ,name: "ATS9" ,  readonly:true ,maxLength :5, value:"00:00" ,readonly:true,  className :'DialogInputClass'},
					]},
					{type: "block", list:[
						{type: "label", label: "5"},
						{type: "newcolumn", offset:0},
						{type: "checkbox", label: " ", name:"ATE5"   ,labelWidth: "10" ,checked: false},
						{type: "newcolumn", offset:20},
						{type: "input", label: " ", labelWidth: "10", inputWidth: 80 ,name: "ATS5" , readonly:true , maxLength :5, value:"00:00" ,readonly:true,  className :'DialogInputClass'},
						{type: "newcolumn", offset:20},
						{type: "label", label: "10"},
						{type: "newcolumn", offset:0},
						{type: "checkbox", label: " ", name:"ATE10"   ,labelWidth: "10" ,checked: false},
						{type: "newcolumn", offset:20},
						{type: "input", label: " ", labelWidth: "10", inputWidth: 80 ,name: "ATS10" ,  readonly:true ,maxLength :5, value:"00:00" ,readonly:true,  className :'DialogInputClass'},
					]}

				]},
				{type: "fieldset", width: 'auto', label: "ΩΡΕΣ ΛΕΙΤΟΥΡΓΙΑΣ (ΑΙΣΘΗΤΗΡΙΟ - ΠΕΡΙΟΔΙΚΑ)", name:"TIMESBLOCK2" ,list:[
					{type: "block", list:[
						{type: "label", label: "1"},
						{type: "newcolumn", offset:10},
						{type: "checkbox", label: "", name:"BTE1" ,labelWidth: "10" ,checked: false},
						{type: "newcolumn", offset:10},
						{type: "label", label: "ΑΠΟ:"},
						{type: "newcolumn", offset:10},
						{type: "input", labelWidth:0, inputWidth: 80 ,name: "BTS1" , maxLength :5, value:"00:00" ,readonly:true , className :'DialogInputClass'},						
						{type: "newcolumn", offset:10},
						{type: "label", label: "ΕΩΣ:"},
						{type: "newcolumn", offset:10},
						{type: "input", labelWidth:0 , inputWidth: 80 ,name: "BTS6" , maxLength :5, value:"00:00" ,readonly:true , className :'DialogInputClass'},
						{type: "newcolumn", offset:0}
					]},
					{type: "block", list:[
						{type: "label", label: "2"},
						{type: "newcolumn", offset:10},
						{type: "checkbox", label: "", name:"BTE2" ,labelWidth: "10" ,checked: false},
						{type: "newcolumn", offset:10},
						{type: "label", label: "ΑΠΟ:"},
						{type: "newcolumn", offset:10},
						{type: "input", labelWidth:0, inputWidth: 80 ,name: "BTS2" , maxLength :5, value:"00:00" ,readonly:true , className :'DialogInputClass'},						
						{type: "newcolumn", offset:10},
						{type: "label", label: "ΕΩΣ:"},
						{type: "newcolumn", offset:10},
						{type: "input", labelWidth:0 , inputWidth: 80 ,name: "BTS7" , maxLength :5, value:"00:00" ,readonly:true , className :'DialogInputClass'},
						{type: "newcolumn", offset:0}
					]},
					{type: "block", list:[
						{type: "label", label: "3"},
						{type: "newcolumn", offset:10},
						{type: "checkbox", label: "", name:"BTE3" ,labelWidth: "10" ,checked: false},
						{type: "newcolumn", offset:10},
						{type: "label", label: "ΑΠΟ:"},
						{type: "newcolumn", offset:10},
						{type: "input", labelWidth:0, inputWidth: 80 ,name: "BTS3" , maxLength :5, value:"00:00" ,readonly:true , className :'DialogInputClass'},						
						{type: "newcolumn", offset:10},
						{type: "label", label: "ΕΩΣ:"},
						{type: "newcolumn", offset:10},
						{type: "input", labelWidth:0 , inputWidth: 80 ,name: "BTS8" , maxLength :5, value:"00:00" ,readonly:true , className :'DialogInputClass'},
						{type: "newcolumn", offset:0}
					]},
					{type: "block", list:[
						{type: "label", label: "4"},
						{type: "newcolumn", offset:10},
						{type: "checkbox", label: "", name:"BTE4" ,labelWidth: "10" ,checked: false},
						{type: "newcolumn", offset:10},
						{type: "label", label: "ΑΠΟ:"},
						{type: "newcolumn", offset:10},
						{type: "input", labelWidth:0, inputWidth: 80 ,name: "BTS4" , maxLength :5, value:"00:00" ,readonly:true , className :'DialogInputClass'},						
						{type: "newcolumn", offset:10},
						{type: "label", label: "ΕΩΣ:"},
						{type: "newcolumn", offset:10},
						{type: "input", labelWidth:0 , inputWidth: 80 ,name: "BTS9" , maxLength :5, value:"00:00" ,readonly:true , className :'DialogInputClass'},
						{type: "newcolumn", offset:0}
					]},
					{type: "block", list:[
						{type: "label", label: "5"},
						{type: "newcolumn", offset:10},
						{type: "checkbox", label: "", name:"BTE5" ,labelWidth: "10" ,checked: false},
						{type: "newcolumn", offset:10},
						{type: "label", label: "ΑΠΟ:"},
						{type: "newcolumn", offset:10},
						{type: "input", labelWidth:0, inputWidth: 80 ,name: "BTS5" , maxLength :5, value:"00:00" ,readonly:true , className :'DialogInputClass'},						
						{type: "newcolumn", offset:10},
						{type: "label", label: "ΕΩΣ:"},
						{type: "newcolumn", offset:10},
						{type: "input", labelWidth:0 , inputWidth: 80 ,name: "BTS10" , maxLength :5, value:"00:00" ,readonly:true , className :'DialogInputClass'},
						{type: "newcolumn", offset:0}
					]}

				]}
				];				
				//**************************************************************************************************
				formData3 = [

				{type: "fieldset", width:'auto', label: "ΑΛΛΗΛΟΥΧΙΑ ΒΑΛΒΙΔΩΝ ΑΡΔΕΥΣΗΣ" ,name:"RELEBLOCK" ,list:[
					{type: "block", list:[
						{type: "label", labelWidth: "5" , label: "1"},
						{type: "newcolumn", offset:0},{type: "checkbox", label: "", name:"RE1" ,labelWidth: "7" ,checked: false},
						{type: "newcolumn", offset:0},{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R11", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R21", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},{type: "label", label: "ON"},
						{type: "newcolumn", offset:0},{type: "input", labelWidth: "auto", inputWidth: 90 ,name: "RON1" , maxLength :8, value:"00:00:00" ,readonly:true, className :'DialogInputClass'},
						{type: "newcolumn", offset:0},{type: "label", label: "OFF"},						
						{type: "newcolumn", offset:0},{type: "input", labelWidth: "auto", inputWidth: 40 ,name: "ROF1" , maxLength :5, value:"0" , className :'DialogInputClass'}
					]},
					{type: "block", list:[
						{type: "label", labelWidth: "5" , label: "2"},
						{type: "newcolumn", offset:0},{type: "checkbox", label: "", name:"RE2" ,labelWidth: "7" ,checked: false},
						{type: "newcolumn", offset:0},{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R12", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R22", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},{type: "label", label: "ON"},
						{type: "newcolumn", offset:0},{type: "input", label: "", labelWidth: "20", inputWidth: 90 ,name: "RON2" , maxLength :8, value:"00:00:00" ,readonly:true, className :'DialogInputClass'},
						{type: "newcolumn", offset:0},{type: "label", label: "OFF"},
						{type: "newcolumn", offset:0},{type: "input", label: "", labelWidth: "auto", inputWidth: 40 ,name: "ROF2" , maxLength :5, value:"0", className :'DialogInputClass' }
					]},
					{type: "block", list:[
						{type: "label", labelWidth: "5" , label: "3"},
						{type: "newcolumn", offset:0},{type: "checkbox", label: "", name:"RE3" ,labelWidth: "7" ,checked: false},
						{type: "newcolumn", offset:0},{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R13", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},{type: "select", label: "", inputWidth: 130, labelWidth: "0",name:"R23", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},{type: "label", label: "ON"},
						{type: "newcolumn", offset:0},{type: "input", label: "", labelWidth: "20", inputWidth: 90 ,name: "RON3" , maxLength :8, value:"00:00:00",readonly:true , className :'DialogInputClass'},
						{type: "newcolumn", offset:0},{type: "label", label: "OFF"},
						{type: "newcolumn", offset:0},{type: "input", label: "", labelWidth: "auto", inputWidth: 40 ,name: "ROF3" , maxLength :5, value:"0" , className :'DialogInputClass'}
					]},
					{type: "block", list:[
						{type: "label", labelWidth: "5" , label: "4"},
						{type: "newcolumn", offset:0},{type: "checkbox", label: "", name:"RE4" ,labelWidth: "7" ,checked: false},
						{type: "newcolumn", offset:0},{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R14", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R24", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},{type: "label", label: "ON"},
						{type: "newcolumn", offset:0},{type: "input", label: "", labelWidth: "20", inputWidth: 90 ,name: "RON4" , maxLength :8, value:"00:00:00" ,readonly:true, className :'DialogInputClass'},
						{type: "newcolumn", offset:0},{type: "label", label: "OFF"},
						{type: "newcolumn", offset:0},{type: "input", label: "", labelWidth: "auto", inputWidth: 40 ,name: "ROF4" , maxLength :5, value:"0", className :'DialogInputClass' }
					]},
					{type: "block", list:[
						{type: "label", labelWidth: "5" , label: "5"},
						{type: "newcolumn", offset:0},{type: "checkbox", label: "", name:"RE5" ,labelWidth: "7" ,checked: false},
						{type: "newcolumn", offset:0},{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R15", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R25", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},{type: "label", label: "ON"},
						{type: "newcolumn", offset:0},{type: "input", label: "", labelWidth: "20", inputWidth: 90 ,name: "RON5" , maxLength :8, value:"00:00:00",readonly:true , className :'DialogInputClass'},
						{type: "newcolumn", offset:0},{type: "label", label: "OFF"},
						{type: "newcolumn", offset:0},{type: "input", label: "", labelWidth: "auto", inputWidth: 40 ,name: "ROF5" , maxLength :5, value:"0", className :'DialogInputClass' }
					]},
						{type: "block", list:[
						{type: "label", labelWidth: "5" , label: "6"},
						{type: "newcolumn", offset:0},	{type: "checkbox", label: "", name:"RE6" ,labelWidth: "7" ,checked: false},
						{type: "newcolumn", offset:0},	{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R16", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},	{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R26", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},{type: "label", label: "ON"},
						{type: "newcolumn", offset:0},  {type: "input", label: "", labelWidth: "20", inputWidth: 90 ,name: "RON6" , maxLength :8, value:"00:00:00",readonly:true , className :'DialogInputClass'},
						{type: "newcolumn", offset:0},{type: "label", label: "OFF"},
						{type: "newcolumn", offset:0},	{type: "input", label: "", labelWidth: "auto", inputWidth: 40 ,name: "ROF6" , maxLength :5, value:"0" , className :'DialogInputClass'}
					]},
					{type: "block", list:[
						{type: "label", labelWidth: "5" , label: "7"},
						{type: "newcolumn", offset:0},	{type: "checkbox", label: "", name:"RE7" ,labelWidth: "7" ,checked: false},
						{type: "newcolumn", offset:0},	{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R17", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},	{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R27", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},{type: "label", label: "ON"},
						{type: "newcolumn", offset:0},  {type: "input", label: "", labelWidth: "20", inputWidth: 90 ,name: "RON7" , maxLength :8, value:"00:00:00",readonly:true , className :'DialogInputClass'},
						{type: "newcolumn", offset:0},{type: "label", label: "OFF"},
						{type: "newcolumn", offset:0},	{type: "input", label: "", labelWidth: "auto", inputWidth: 40 ,name: "ROF7" , maxLength :5, value:"0" , className :'DialogInputClass'}
					]},
					{type: "block", list:[
						{type: "label", labelWidth: "5" , label: "8"},
						{type: "newcolumn", offset:0},	{type: "checkbox", label: "", name:"RE8" ,labelWidth: "7" ,checked: false},
						{type: "newcolumn", offset:0},	{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R18", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},	{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R28", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},{type: "label", label: "ON"},
						{type: "newcolumn", offset:0},  {type: "input", label: "", labelWidth: "20", inputWidth: 90 ,name: "RON8" , maxLength :8, value:"00:00:00",readonly:true , className :'DialogInputClass'},
						{type: "newcolumn", offset:0},{type: "label", label: "OFF"},
						{type: "newcolumn", offset:0},	{type: "input", label: "", labelWidth: "auto", inputWidth: 40 ,name: "ROF8" , maxLength :5, value:"0" , className :'DialogInputClass'}
					]},
					{type: "block", list:[
						{type: "label", labelWidth: "5" , label: "9"},
						{type: "newcolumn", offset:0},	{type: "checkbox", label: "", name:"RE9" ,labelWidth: "7" ,checked: false},
						{type: "newcolumn", offset:0},	{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R19", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},	{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R29", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},{type: "label", label: "ON"},
						{type: "newcolumn", offset:0},  {type: "input", label: "", labelWidth: "20", inputWidth: 90 ,name: "RON9" , maxLength :8, value:"00:00:00",readonly:true , className :'DialogInputClass'},
						{type: "newcolumn", offset:0},{type: "label", label: "OFF"},
						{type: "newcolumn", offset:0},	{type: "input", label: "", labelWidth: "auto", inputWidth: 40 ,name: "ROF9" , maxLength :5, value:"0", className :'DialogInputClass' }
					]},
					{type: "block", list:[
						{type: "label", labelWidth: "5" , label: "10"},
						{type: "newcolumn", offset:0},	{type: "checkbox", label: "", name:"RE10" ,labelWidth: "7" ,checked: false},
						{type: "newcolumn", offset:0},	{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R110", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},	{type: "select", label: "", inputWidth: 130 ,labelWidth: "0",name:"R210", className :'DialogsSelectInput'},
						{type: "newcolumn", offset:0},{type: "label", label: "ON"},
						{type: "newcolumn", offset:0},  {type: "input", label: "", labelWidth: "20", inputWidth: 90 ,name: "RON10" , maxLength :8, value:"00:00:00",readonly:true , className :'DialogInputClass'},
						{type: "newcolumn", offset:0},{type: "label", label: "OFF"},
						{type: "newcolumn", offset:0},	{type: "input", label: "", labelWidth: "auto", inputWidth: 40 ,name: "ROF10" , maxLength :5, value:"0" , className :'DialogInputClass'}
					]}
					]},
					{type: "fieldset", width: 'auto', label: "ΕΠΙΠΡΟΣΘΕΤΑ", list:[
					    {type: "label", labelWidth: "5" , label: "ΠΡΟΣΑΡΜΟΓΗ ΧΡΟΝΟΥ ΟΝ:" ,   labelWidth:200,labelHeight:'auto',offsetTop:5},
						{type: "label", labelWidth: "5" , label: "ΚΑΘYΣΤΕΡΗΣΗ ΣΤΗΝ ΕΝΑΡΞΗ:", labelWidth:200,labelHeight:'auto',offsetTop:5},
						{type: "label", labelWidth: "5" , label: "ΕΠΑΝΑΛΗΨΕΙΣ:" ,labelWidth:200,labelHeight:'auto',offsetTop:5 },
						{type: "newcolumn", offset:0},
						{type: "select", labelWidth: "auto",  inputWidth: 200 , name:"FACTORD" ,className :'DialogsSelectInput'},
						{type: "input",  labelWidth: "auto",  inputWidth: 200 , name:"DELAY"   , maxLength :4, value:"0" , className :'DialogInputClass'},			
						{type: "input",  labelWidth: "auto",  inputWidth: 200 , name:"REPEATS" , maxLength :3, value:"0" , className :'DialogInputClass'}
					]}

			];
			//*************************************************************
			//myForm = DialogWindow.attachForm(formData);
			myForm1 = TabBar.cells("t1").attachForm(formData1);
			myForm2 = TabBar.cells("t2").attachForm(formData2);
			myForm3 = TabBar.cells("t3").attachForm(formData3);			
			myForm4 = TabBar.cells("t4").attachForm(formData4);			
			//myForm1.setFontSize('15px');
			//myForm2.setFontSize('15px');
			//myForm3.setFontSize('15px');
			//*************************************************************
			//************* FILL LIST BOXES *******************************
			//*************************************************************
			FeelSelectWithAllVirtuals(myForm1.getSelect("SENSOR1"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm1.getSelect("SENSOR2"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm3.getSelect("FACTORD"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm1.getSelect("FLOWMETER"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm1.getSelect("MASTER1"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm1.getSelect("MASTER2"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm1.getSelect("MASTER3"),DEF_DIGITAL_OUTPUT_VARIABLE);
			
			FeelSelectWithAllVirtuals(myForm3.getSelect("R11"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("R21"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R31"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R41"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R51"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R61"),DEF_DIGITAL_OUTPUT_VARIABLE);			

			FeelSelectWithAllVirtuals(myForm3.getSelect("R12"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("R22"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R32"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R42"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R52"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R62"),DEF_DIGITAL_OUTPUT_VARIABLE);

			FeelSelectWithAllVirtuals(myForm3.getSelect("R13"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("R23"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R33"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R43"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R53"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R63"),DEF_DIGITAL_OUTPUT_VARIABLE);
			
			FeelSelectWithAllVirtuals(myForm3.getSelect("R14"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("R24"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R34"),DEF_DIGITAL_OUTPUT_VARIABLE);			
			FeelSelectWithAllVirtuals(myForm4.getSelect("R44"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R54"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R64"),DEF_DIGITAL_OUTPUT_VARIABLE);			

			FeelSelectWithAllVirtuals(myForm3.getSelect("R15"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("R25"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R35"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R45"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R55"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R65"),DEF_DIGITAL_OUTPUT_VARIABLE);

			FeelSelectWithAllVirtuals(myForm3.getSelect("R16"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("R26"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R36"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R46"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R56"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R66"),DEF_DIGITAL_OUTPUT_VARIABLE);

			FeelSelectWithAllVirtuals(myForm3.getSelect("R17"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("R27"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R37"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R47"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R57"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R67"),DEF_DIGITAL_OUTPUT_VARIABLE);

			FeelSelectWithAllVirtuals(myForm3.getSelect("R18"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("R28"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R38"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R48"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R58"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R68"),DEF_DIGITAL_OUTPUT_VARIABLE);

			FeelSelectWithAllVirtuals(myForm3.getSelect("R19"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("R29"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R39"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R49"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R59"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R69"),DEF_DIGITAL_OUTPUT_VARIABLE);

			FeelSelectWithAllVirtuals(myForm3.getSelect("R110"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("R210"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R310"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R410"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R510"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("R610"),DEF_DIGITAL_OUTPUT_VARIABLE);

			FeelSelectWithAllTimePrograms(myForm1.getSelect("ONSTART"));
			FeelSelectWithAllTimePrograms(myForm1.getSelect("ONEND"));
			FeelSelectWithFertigationPrograms(myForm1.getSelect("FERTPROGRAM"));
			
			//*************************************************************
			//************* SET VALUES ************************************
			//*************************************************************
			SetCheckValue(myForm1,"ACTIVE",Parameters1[0]);
			if (Parameters1[1] > 0)
				myForm1.getSelect("STARTM").options[Parameters1[1]-1].selected=true;
			else
				myForm1.getSelect("STARTM").options[0].selected=true;
			
			SelectOptionInSelectByValue(myForm1.getSelect("SENSOR1"),Parameters1[2]);
			SelectOptionInSelectByValue(myForm1.getSelect("SENSOR2"),Parameters1[3]);
			myForm1.setItemValue("PERIOD", Parameters1[4]);
			SetCheckValuesInDaysInTimeProgramSetup(myForm2,Parameters1[5]);
			SelectOptionInSelectByValue(myForm1.getSelect("ONSTART"),Parameters1[6]);
			SelectOptionInSelectByValue(myForm1.getSelect("ONEND"),Parameters1[7]);
			SelectOptionInSelectByValue(myForm1.getSelect("MASTER1"),Parameters1[8]);
			myForm3.setItemValue("DELAY", Parameters1[9]);
			myForm3.setItemValue("REPEATS", Parameters1[10]);
			SelectOptionInSelectByValue(myForm3.getSelect("FACTORD"),Parameters1[11]);
			SelectOptionInSelectByValue(myForm1.getSelect("MASTER2"),Parameters1[12]);
			SelectOptionInSelectByValue(myForm1.getSelect("MASTER3"),Parameters1[13]);		
			SelectOptionInSelectByValue(myForm1.getSelect("FERTPROGRAM"),Parameters1[14]);		
			SelectOptionInSelectByValue(myForm1.getSelect("FLOWMETER"),Parameters1[15]);		
			
			if (Parameters1[15] != 0) // flowmeter
			{
				myForm3.setItemLabel("RELEBLOCK", "ΑΛΛΗΛΟΥΧΙΑ ΒΑΛΒΙΔΩΝ ΑΡΔΕΥΣΗΣ (σε ΛΙΤΡΑ)");
				myForm3.setItemValue("RON1", (Parameters2[20]));
			    myForm3.setItemValue("RON2", (Parameters2[21]));
			    myForm3.setItemValue("RON3", (Parameters2[22]));
			    myForm3.setItemValue("RON4", (Parameters2[23]));
			    myForm3.setItemValue("RON5", (Parameters2[24]));
				myForm3.setItemValue("RON6", (Parameters2[25]));
			    myForm3.setItemValue("RON7", (Parameters2[26]));
			    myForm3.setItemValue("RON8", (Parameters2[27]));
			    myForm3.setItemValue("RON9", (Parameters2[28]));
			    myForm3.setItemValue("RON10",(Parameters2[29]));
				
				myForm3.setReadonly('RON1', false);
				myForm3.setReadonly('RON2', false);
				myForm3.setReadonly('RON3', false);
				myForm3.setReadonly('RON4', false);
				myForm3.setReadonly('RON5', false);
				myForm3.setReadonly('RON6', false);
				myForm3.setReadonly('RON7', false);
				myForm3.setReadonly('RON8', false);
				myForm3.setReadonly('RON9', false);
				myForm3.setReadonly('RON10', false);				
				
			}
			else
			{
				myForm3.setItemLabel("RELEBLOCK", "ΑΛΛΗΛΟΥΧΙΑ ΒΑΛΒΙΔΩΝ ΑΡΔΕΥΣΗΣ (σε χρόνο ΩΩ:ΛΛ:ΔΔ)");
				myForm3.setItemValue("RON1", SecondsToTimeFormat(Parameters2[20]));
			    myForm3.setItemValue("RON2", SecondsToTimeFormat(Parameters2[21]));
			    myForm3.setItemValue("RON3", SecondsToTimeFormat(Parameters2[22]));
			    myForm3.setItemValue("RON4", SecondsToTimeFormat(Parameters2[23]));
			    myForm3.setItemValue("RON5", SecondsToTimeFormat(Parameters2[24]));
				myForm3.setItemValue("RON6", SecondsToTimeFormat(Parameters2[25]));
			    myForm3.setItemValue("RON7", SecondsToTimeFormat(Parameters2[26]));
			    myForm3.setItemValue("RON8", SecondsToTimeFormat(Parameters2[27]));
			    myForm3.setItemValue("RON9", SecondsToTimeFormat(Parameters2[28]));
			    myForm3.setItemValue("RON10",SecondsToTimeFormat(Parameters2[29]));
				
				AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON1"));
				AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON2"));
				AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON3"));
				AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON4"));
				AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON5"));
				AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON6"));
				AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON7"));
				AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON8"));
				AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON9"));
				AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON10"));
				
				myForm3.setReadonly('RON1', true);
				myForm3.setReadonly('RON2', true);
				myForm3.setReadonly('RON3', true);
				myForm3.setReadonly('RON4', true);
				myForm3.setReadonly('RON5', true);
				myForm3.setReadonly('RON6', true);
				myForm3.setReadonly('RON7', true);
				myForm3.setReadonly('RON8', true);
				myForm3.setReadonly('RON9', true);
				myForm3.setReadonly('RON10', true);				
			}
			
			SetCheckValuesInStartTimesinTimeProgramSetup(myForm2,Parameters1[16]);
			// start times
			myForm2.setItemValue("ATS1", MinutesTo24Time(Parameters2[0]));  myForm2.setItemValue("BTS1", MinutesTo24Time(Parameters2[0]));
			myForm2.setItemValue("ATS2", MinutesTo24Time(Parameters2[1]));  myForm2.setItemValue("BTS2", MinutesTo24Time(Parameters2[1]));
			myForm2.setItemValue("ATS3", MinutesTo24Time(Parameters2[2]));  myForm2.setItemValue("BTS3", MinutesTo24Time(Parameters2[2]));
			myForm2.setItemValue("ATS4", MinutesTo24Time(Parameters2[3]));  myForm2.setItemValue("BTS4", MinutesTo24Time(Parameters2[3]));
			myForm2.setItemValue("ATS5", MinutesTo24Time(Parameters2[4]));  myForm2.setItemValue("BTS5", MinutesTo24Time(Parameters2[4]));
			myForm2.setItemValue("ATS6", MinutesTo24Time(Parameters2[5]));  myForm2.setItemValue("BTS6", MinutesTo24Time(Parameters2[5]));
			myForm2.setItemValue("ATS7", MinutesTo24Time(Parameters2[6]));  myForm2.setItemValue("BTS7", MinutesTo24Time(Parameters2[6]));
			myForm2.setItemValue("ATS8", MinutesTo24Time(Parameters2[7]));  myForm2.setItemValue("BTS8", MinutesTo24Time(Parameters2[7]));
			myForm2.setItemValue("ATS9", MinutesTo24Time(Parameters2[8]));  myForm2.setItemValue("BTS9", MinutesTo24Time(Parameters2[8]));
			myForm2.setItemValue("ATS10",MinutesTo24Time(Parameters2[9]));  myForm2.setItemValue("BTS10", MinutesTo24Time(Parameters2[9]));
			
			AttachMouseClickEventForTimeSelect(myForm2.getInput("ATS1"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("ATS2"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("ATS3"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("ATS4"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("ATS5"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("ATS6"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("ATS7"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("ATS8"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("ATS9"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("ATS10"),myForm2);
			
			AttachMouseClickEventForTimeSelect(myForm2.getInput("BTS1"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("BTS2"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("BTS3"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("BTS4"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("BTS5"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("BTS6"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("BTS7"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("BTS8"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("BTS9"),myForm2);
			AttachMouseClickEventForTimeSelect(myForm2.getInput("BTS10"),myForm2);
			
			
			SetCheckValue(myForm3,"RE1", Parameters2[10]);
			SetCheckValue(myForm3,"RE2", Parameters2[11]);
			SetCheckValue(myForm3,"RE3", Parameters2[12]);
			SetCheckValue(myForm3,"RE4", Parameters2[13]);
			SetCheckValue(myForm3,"RE5", Parameters2[14]);
			SetCheckValue(myForm3,"RE6", Parameters2[15]);
			SetCheckValue(myForm3,"RE7", Parameters2[16]);
			SetCheckValue(myForm3,"RE8", Parameters2[17]);
			SetCheckValue(myForm3,"RE9", Parameters2[18]);
			SetCheckValue(myForm3,"RE10", Parameters2[19]);
	
			myForm3.setItemValue("ROF1", Parameters2[30]);
			myForm3.setItemValue("ROF2", Parameters2[31]);
			myForm3.setItemValue("ROF3", Parameters2[32]);
			myForm3.setItemValue("ROF4", Parameters2[33]);
			myForm3.setItemValue("ROF5", Parameters2[34]);
			myForm3.setItemValue("ROF6", Parameters2[35]);
			myForm3.setItemValue("ROF7", Parameters2[36]);
			myForm3.setItemValue("ROF8", Parameters2[37]);
			myForm3.setItemValue("ROF9", Parameters2[38]);
			myForm3.setItemValue("ROF10", Parameters2[39]);


			SelectOptionInSelectByValue(myForm3.getSelect("R11"),Parameters3[0]);
			SelectOptionInSelectByValue(myForm3.getSelect("R21"),Parameters3[1]);
			SelectOptionInSelectByValue(myForm4.getSelect("R31"),Parameters3[2]);
			SelectOptionInSelectByValue(myForm4.getSelect("R41"),Parameters3[3]);
			SelectOptionInSelectByValue(myForm4.getSelect("R51"),Parameters3[4]);
			SelectOptionInSelectByValue(myForm4.getSelect("R61"),Parameters3[5]);

			SelectOptionInSelectByValue(myForm3.getSelect("R12"),Parameters3[6]);
			SelectOptionInSelectByValue(myForm3.getSelect("R22"),Parameters3[7]);
			SelectOptionInSelectByValue(myForm4.getSelect("R32"),Parameters3[8]);
			SelectOptionInSelectByValue(myForm4.getSelect("R42"),Parameters3[9]);
			SelectOptionInSelectByValue(myForm4.getSelect("R52"),Parameters3[10]);
			SelectOptionInSelectByValue(myForm4.getSelect("R62"),Parameters3[11]);

			SelectOptionInSelectByValue(myForm3.getSelect("R13"),Parameters3[12]);
			SelectOptionInSelectByValue(myForm3.getSelect("R23"),Parameters3[13]);
			SelectOptionInSelectByValue(myForm4.getSelect("R33"),Parameters3[14]);
			SelectOptionInSelectByValue(myForm4.getSelect("R43"),Parameters3[15]);
			SelectOptionInSelectByValue(myForm4.getSelect("R53"),Parameters3[16]);
			SelectOptionInSelectByValue(myForm4.getSelect("R63"),Parameters3[17]);

			SelectOptionInSelectByValue(myForm3.getSelect("R14"),Parameters3[18]);
			SelectOptionInSelectByValue(myForm3.getSelect("R24"),Parameters3[19]);
			SelectOptionInSelectByValue(myForm4.getSelect("R34"),Parameters3[20]);
			SelectOptionInSelectByValue(myForm4.getSelect("R44"),Parameters3[21]);
			SelectOptionInSelectByValue(myForm4.getSelect("R54"),Parameters3[22]);
			SelectOptionInSelectByValue(myForm4.getSelect("R64"),Parameters3[23]);

			SelectOptionInSelectByValue(myForm3.getSelect("R15"),Parameters3[24]);
			SelectOptionInSelectByValue(myForm3.getSelect("R25"),Parameters3[25]);
			SelectOptionInSelectByValue(myForm4.getSelect("R35"),Parameters3[26]);
			SelectOptionInSelectByValue(myForm4.getSelect("R45"),Parameters3[27]);
			SelectOptionInSelectByValue(myForm4.getSelect("R55"),Parameters3[28]);
			SelectOptionInSelectByValue(myForm4.getSelect("R65"),Parameters3[29]);

			SelectOptionInSelectByValue(myForm3.getSelect("R16"),Parameters3[30]);
			SelectOptionInSelectByValue(myForm3.getSelect("R26"),Parameters3[31]);
			SelectOptionInSelectByValue(myForm4.getSelect("R36"),Parameters3[32]);
			SelectOptionInSelectByValue(myForm4.getSelect("R46"),Parameters3[33]);
			SelectOptionInSelectByValue(myForm4.getSelect("R56"),Parameters3[34]);
			SelectOptionInSelectByValue(myForm4.getSelect("R66"),Parameters3[35]);

			SelectOptionInSelectByValue(myForm3.getSelect("R17"),Parameters3[36]);
			SelectOptionInSelectByValue(myForm3.getSelect("R27"),Parameters3[37]);
			SelectOptionInSelectByValue(myForm4.getSelect("R37"),Parameters3[38]);
			SelectOptionInSelectByValue(myForm4.getSelect("R47"),Parameters3[39]);
			SelectOptionInSelectByValue(myForm4.getSelect("R57"),Parameters3[40]);
			SelectOptionInSelectByValue(myForm4.getSelect("R67"),Parameters3[41]);

			SelectOptionInSelectByValue(myForm3.getSelect("R18"),Parameters3[42]);
			SelectOptionInSelectByValue(myForm3.getSelect("R28"),Parameters3[43]);
			SelectOptionInSelectByValue(myForm4.getSelect("R38"),Parameters3[44]);
			SelectOptionInSelectByValue(myForm4.getSelect("R48"),Parameters3[45]);
			SelectOptionInSelectByValue(myForm4.getSelect("R58"),Parameters3[46]);
			SelectOptionInSelectByValue(myForm4.getSelect("R68"),Parameters3[47]);

			SelectOptionInSelectByValue(myForm3.getSelect("R19"),Parameters3[48]);
			SelectOptionInSelectByValue(myForm3.getSelect("R29"),Parameters3[49]);
			SelectOptionInSelectByValue(myForm4.getSelect("R39"),Parameters3[50]);
			SelectOptionInSelectByValue(myForm4.getSelect("R49"),Parameters3[51]);
			SelectOptionInSelectByValue(myForm4.getSelect("R59"),Parameters3[52]);
			SelectOptionInSelectByValue(myForm4.getSelect("R69"),Parameters3[53]);

			SelectOptionInSelectByValue(myForm3.getSelect("R110"),Parameters3[54]);
			SelectOptionInSelectByValue(myForm3.getSelect("R210"),Parameters3[55]);
			SelectOptionInSelectByValue(myForm4.getSelect("R310"),Parameters3[56]);
			SelectOptionInSelectByValue(myForm4.getSelect("R410"),Parameters3[57]);
			SelectOptionInSelectByValue(myForm4.getSelect("R510"),Parameters3[58]);
			SelectOptionInSelectByValue(myForm4.getSelect("R610"),Parameters3[59]);


			//*************************************************************
					if ( (Parameters1[1] ==1) || (Parameters1[1] ==0) )// manual
					{
						myForm1.hideItem("STARTSENSORBLOCK");
						myForm1.hideItem("STARTPERIODBLOCK");
						myForm1.hideItem("KRHTIRIOENARJHS");						
						myForm2.hideItem("TIMESBLOCK1");
						myForm2.hideItem("TIMESBLOCK2");
						myForm2.hideItem("DAYSBLOCK");
					}
					else if (Parameters1[1] ==2) // model
					{
						myForm1.showItem("STARTSENSORBLOCK");
						myForm1.hideItem("STARTPERIODBLOCK");
						myForm1.showItem("KRHTIRIOENARJHS");						
						myForm2.hideItem("TIMESBLOCK1");
						myForm2.showItem("TIMESBLOCK2");
						myForm2.showItem("DAYSBLOCK");
					}
					else if (Parameters1[1]==3) // period
					{
						myForm1.hideItem("STARTSENSORBLOCK");
						myForm1.showItem("STARTPERIODBLOCK");
						myForm1.showItem("KRHTIRIOENARJHS");
						myForm2.hideItem("TIMESBLOCK1");
						myForm2.showItem("TIMESBLOCK2");
						myForm2.showItem("DAYSBLOCK");						
					}
					else if (Parameters1[1]==4) // time
					{
						myForm1.hideItem("STARTSENSORBLOCK");
						myForm1.hideItem("STARTPERIODBLOCK");
						myForm1.hideItem("KRHTIRIOENARJHS");												
						myForm2.hideItem("TIMESBLOCK2");
						myForm2.showItem("TIMESBLOCK1");
						myForm2.showItem("DAYSBLOCK");						
					}
					else if (Parameters1[1]==5) // hlios
					{
						myForm1.hideItem("STARTSENSORBLOCK");
						myForm1.showItem("STARTPERIODBLOCK");
						myForm1.showItem("KRHTIRIOENARJHS");
						myForm2.hideItem("TIMESBLOCK1");
						myForm2.showItem("TIMESBLOCK2");
						myForm2.showItem("DAYSBLOCK");						
					}
					else if (Parameters1[1]==6) // external command
					{
						myForm1.hideItem("STARTSENSORBLOCK");
						myForm1.showItem("STARTPERIODBLOCK");
						myForm1.showItem("KRHTIRIOENARJHS");
						myForm2.hideItem("TIMESBLOCK1");
						myForm2.showItem("TIMESBLOCK2");
						myForm2.showItem("DAYSBLOCK");						
					}

			//*************************************************************
			myForm1.attachEvent("onChange", function(name,value,is_checked){
				if (name =='STARTM')
				{
					if (value ==1) // manual
					{
						myForm1.hideItem("STARTSENSORBLOCK");
						myForm1.hideItem("STARTPERIODBLOCK");
						myForm1.hideItem("KRHTIRIOENARJHS");												
						myForm2.hideItem("TIMESBLOCK1");
						myForm2.hideItem("TIMESBLOCK2");
						myForm2.hideItem("DAYSBLOCK");
					}
					else if (value ==2) // model
					{
						myForm1.showItem("STARTSENSORBLOCK");
						myForm1.hideItem("STARTPERIODBLOCK");
						myForm1.showItem("KRHTIRIOENARJHS");
						myForm2.hideItem("TIMESBLOCK1");
						myForm2.showItem("TIMESBLOCK2");
						myForm2.showItem("DAYSBLOCK");
					}
					else if (value==3) // period
					{
						myForm1.hideItem("STARTSENSORBLOCK");
						myForm1.showItem("STARTPERIODBLOCK");
						myForm1.showItem("KRHTIRIOENARJHS");
						myForm2.hideItem("TIMESBLOCK1");
						myForm2.showItem("TIMESBLOCK2");
						myForm2.showItem("DAYSBLOCK");						
					}
					else if (value==4) // time
					{
						myForm1.hideItem("STARTSENSORBLOCK");
						myForm1.hideItem("STARTPERIODBLOCK");
						myForm1.hideItem("KRHTIRIOENARJHS");												
						myForm2.hideItem("TIMESBLOCK2");
						myForm2.showItem("TIMESBLOCK1");
						myForm2.showItem("DAYSBLOCK");						
					}
					else if (value==5) // Hlios
					{
						myForm1.hideItem("STARTSENSORBLOCK");
						myForm1.showItem("STARTPERIODBLOCK");
						myForm1.showItem("KRHTIRIOENARJHS");
						myForm2.hideItem("TIMESBLOCK1");
						myForm2.showItem("TIMESBLOCK2");
						myForm2.showItem("DAYSBLOCK");						
					}
					else if (value==6) // external command
					{
						myForm1.hideItem("STARTSENSORBLOCK");
						myForm1.showItem("STARTPERIODBLOCK");
						myForm1.showItem("KRHTIRIOENARJHS");
						myForm2.hideItem("TIMESBLOCK1");
						myForm2.showItem("TIMESBLOCK2");
						myForm2.showItem("DAYSBLOCK");						
					}
				}
				//*********************************************
				if (name =='FLOWMETER')
				{
					if (value != 0) // no flowmeter
					{
						myForm3.setItemLabel("RELEBLOCK", "ΑΛΛΗΛΟΥΧΙΑ ΒΑΛΒΙΔΩΝ ΑΡΔΕΥΣΗΣ (σε ΛΙΤΡΑ)");
						myForm3.setItemValue("RON1", '0');
						myForm3.setItemValue("RON2", '0');
						myForm3.setItemValue("RON3", '0');
						myForm3.setItemValue("RON4", '0');
						myForm3.setItemValue("RON5", '0');																		
						myForm3.setItemValue("RON6", '0');
						myForm3.setItemValue("RON7", '0');
						myForm3.setItemValue("RON8", '0');
						myForm3.setItemValue("RON9", '0');
						myForm3.setItemValue("RON10", '0');																		

						DettachMouseClickEventForFullTimeSelect(myForm3.getInput("RON1"));
						DettachMouseClickEventForFullTimeSelect(myForm3.getInput("RON2"));
						DettachMouseClickEventForFullTimeSelect(myForm3.getInput("RON3"));
						DettachMouseClickEventForFullTimeSelect(myForm3.getInput("RON4"));
						DettachMouseClickEventForFullTimeSelect(myForm3.getInput("RON5"));
						DettachMouseClickEventForFullTimeSelect(myForm3.getInput("RON6"));
						DettachMouseClickEventForFullTimeSelect(myForm3.getInput("RON7"));
						DettachMouseClickEventForFullTimeSelect(myForm3.getInput("RON8"));
						DettachMouseClickEventForFullTimeSelect(myForm3.getInput("RON9"));
						DettachMouseClickEventForFullTimeSelect(myForm3.getInput("RON10"));
						
						myForm3.setReadonly('RON1', false);
						myForm3.setReadonly('RON2', false);
						myForm3.setReadonly('RON3', false);
						myForm3.setReadonly('RON4', false);
						myForm3.setReadonly('RON5', false);
						myForm3.setReadonly('RON6', false);
						myForm3.setReadonly('RON7', false);
						myForm3.setReadonly('RON8', false);
						myForm3.setReadonly('RON9', false);
						myForm3.setReadonly('RON10', false);				
					}
					else
					{
						myForm3.setItemLabel("RELEBLOCK", "ΑΛΛΗΛΟΥΧΙΑ ΒΑΛΒΙΔΩΝ ΑΡΔΕΥΣΗΣ (σε χρόνο ΩΩ:ΛΛ:ΔΔ)");
						myForm3.setItemValue("RON1", SecondsToTimeFormat(0));
						myForm3.setItemValue("RON2", SecondsToTimeFormat(0));
						myForm3.setItemValue("RON3", SecondsToTimeFormat(0));
						myForm3.setItemValue("RON4", SecondsToTimeFormat(0));
						myForm3.setItemValue("RON5", SecondsToTimeFormat(0));
						myForm3.setItemValue("RON6", SecondsToTimeFormat(0));
						myForm3.setItemValue("RON7", SecondsToTimeFormat(0));
						myForm3.setItemValue("RON8", SecondsToTimeFormat(0));
						myForm3.setItemValue("RON9", SecondsToTimeFormat(0));
						myForm3.setItemValue("RON10", SecondsToTimeFormat(0));
						
						AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON1"));
						AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON2"));
						AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON3"));
						AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON4"));
						AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON5"));
						AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON6"));
						AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON7"));
						AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON8"));
						AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON9"));
						AttachMouseClickEventForFullTimeSelect(myForm3.getInput("RON10"));
						
						myForm3.setReadonly('RON1', true);
						myForm3.setReadonly('RON2', true);
						myForm3.setReadonly('RON3', true);
						myForm3.setReadonly('RON4', true);
						myForm3.setReadonly('RON5', true);
						myForm3.setReadonly('RON6', true);
						myForm3.setReadonly('RON7', true);
						myForm3.setReadonly('RON8', true);
						myForm3.setReadonly('RON9', true);
						myForm3.setReadonly('RON10', true);				
						
					}
				}
			});
			//*************************************************************
			myForm1.attachEvent("onButtonClick", function(name){
			if (name == 'CANCEL')
			{
				WindowsViewPort.window("DialogWindow").close();	
				return;
			}
			var Parameters = new Array();
			if ( myForm1.isItemChecked("ACTIVE") ) {Parameters[0]=1;} else {Parameters[0]=0;}
			Parameters[1]=myForm1.getSelect("STARTM").options[myForm1.getSelect("STARTM").selectedIndex].value;
			Parameters[2]=myForm1.getSelect("SENSOR1").options[myForm1.getSelect("SENSOR1").selectedIndex].value;
			Parameters[3]=myForm1.getSelect("SENSOR2").options[myForm1.getSelect("SENSOR2").selectedIndex].value;
			Parameters[4]=myForm1.getInput("PERIOD").value;	
			Parameters[5]=GetCheckValuesInDaysInTimeProgramSetup(myForm2);
			Parameters[6]=myForm1.getSelect("ONSTART").options[myForm1.getSelect("ONSTART").selectedIndex].value;
			Parameters[7]=myForm1.getSelect("ONEND").options[myForm1.getSelect("ONEND").selectedIndex].value;

			Parameters[8]=myForm1.getSelect("MASTER1").options[myForm1.getSelect("MASTER1").selectedIndex].value;
			Parameters[9]=myForm3.getInput("DELAY").value;	
			Parameters[10]=myForm3.getInput("REPEATS").value;	
			Parameters[11]=myForm3.getSelect("FACTORD").options[myForm3.getSelect("FACTORD").selectedIndex].value;
			Parameters[12]=myForm1.getSelect("MASTER2").options[myForm1.getSelect("MASTER2").selectedIndex].value;
			Parameters[13]=myForm1.getSelect("MASTER3").options[myForm1.getSelect("MASTER3").selectedIndex].value;
			
			Parameters[14]=myForm1.getSelect("FERTPROGRAM").options[myForm1.getSelect("FERTPROGRAM").selectedIndex].value;
			Parameters[15]=myForm1.getSelect("FLOWMETER").options[myForm1.getSelect("FLOWMETER").selectedIndex].value;
			Parameters[16]=GetCheckValuesInStartTimesinTimeProgramSetup(myForm2,myForm1.getSelect("STARTM").options[myForm1.getSelect("STARTM").selectedIndex].value);

			SetProgramSetup(myForm1.getInput("ID").value,myForm1.getInput("NAME").value,Parameters,Parameters.length,1);
			//****************************************************************************************
			var Parameters = new Array();
			
			if ( (myForm1.getSelect("STARTM").options[myForm1.getSelect("STARTM").selectedIndex].value == 2) || (myForm1.getSelect("STARTM").options[myForm1.getSelect("STARTM").selectedIndex].value == 3) || (myForm1.getSelect("STARTM").options[myForm1.getSelect("STARTM").selectedIndex].value == 5) || (myForm1.getSelect("STARTM").options[myForm1.getSelect("STARTM").selectedIndex].value == 6) )
			{	
				Parameters[0]=H24ToMinutes(myForm2.getInput("BTS1").value);	
				Parameters[1]=H24ToMinutes(myForm2.getInput("BTS2").value);	
				Parameters[2]=H24ToMinutes(myForm2.getInput("BTS3").value);	
				Parameters[3]=H24ToMinutes(myForm2.getInput("BTS4").value);	
				Parameters[4]=H24ToMinutes(myForm2.getInput("BTS5").value);	
				Parameters[5]=H24ToMinutes(myForm2.getInput("BTS6").value);	
				Parameters[6]=H24ToMinutes(myForm2.getInput("BTS7").value);	
				Parameters[7]=H24ToMinutes(myForm2.getInput("BTS8").value);	
				Parameters[8]=H24ToMinutes(myForm2.getInput("BTS9").value);	
				Parameters[9]=H24ToMinutes(myForm2.getInput("BTS10").value);	
								
			}
			else if (myForm1.getSelect("STARTM").options[myForm1.getSelect("STARTM").selectedIndex].value == 4) 
			{	
				Parameters[0]=H24ToMinutes(myForm2.getInput("ATS1").value);	
				Parameters[1]=H24ToMinutes(myForm2.getInput("ATS2").value);	
				Parameters[2]=H24ToMinutes(myForm2.getInput("ATS3").value);	
				Parameters[3]=H24ToMinutes(myForm2.getInput("ATS4").value);	
				Parameters[4]=H24ToMinutes(myForm2.getInput("ATS5").value);	
				Parameters[5]=H24ToMinutes(myForm2.getInput("ATS6").value);	
				Parameters[6]=H24ToMinutes(myForm2.getInput("ATS7").value);	
				Parameters[7]=H24ToMinutes(myForm2.getInput("ATS8").value);	
				Parameters[8]=H24ToMinutes(myForm2.getInput("ATS9").value);	
				Parameters[9]=H24ToMinutes(myForm2.getInput("ATS10").value);	
			}
			else  
			{	
				Parameters[0]=0;Parameters[1]=0;Parameters[2]=0;Parameters[3]=0;Parameters[4]=0;	
				Parameters[5]=0;Parameters[6]=0;Parameters[7]=0;Parameters[8]=0;Parameters[9]=0;	
			}
			if ( myForm3.isItemChecked("RE1") )  {Parameters[10]=1;} else {Parameters[10]=0;}	
			if ( myForm3.isItemChecked("RE2") )  {Parameters[11]=1;} else {Parameters[11]=0;}	
			if ( myForm3.isItemChecked("RE3") )  {Parameters[12]=1;} else {Parameters[12]=0;}	
			if ( myForm3.isItemChecked("RE4") )  {Parameters[13]=1;} else {Parameters[13]=0;}	
			if ( myForm3.isItemChecked("RE5") )  {Parameters[14]=1;} else {Parameters[14]=0;}				
			if ( myForm3.isItemChecked("RE6") )  {Parameters[15]=1;} else {Parameters[15]=0;}	
			if ( myForm3.isItemChecked("RE7") )  {Parameters[16]=1;} else {Parameters[16]=0;}	
			if ( myForm3.isItemChecked("RE8") )  {Parameters[17]=1;} else {Parameters[17]=0;}	
			if ( myForm3.isItemChecked("RE9") )  {Parameters[18]=1;} else {Parameters[18]=0;}	
			if ( myForm3.isItemChecked("RE10") ) {Parameters[19]=1;} else {Parameters[19]=0;}				
			
			if (myForm1.getSelect("FLOWMETER").options[myForm1.getSelect("FLOWMETER").selectedIndex].value ==0)
			{
				Parameters[20]=TimeFormatToSeconds(myForm3.getInput("RON1").value);
				Parameters[21]=TimeFormatToSeconds(myForm3.getInput("RON2").value);				
				Parameters[22]=TimeFormatToSeconds(myForm3.getInput("RON3").value);	
				Parameters[23]=TimeFormatToSeconds(myForm3.getInput("RON4").value);	
				Parameters[24]=TimeFormatToSeconds(myForm3.getInput("RON5").value);				
				Parameters[25]=TimeFormatToSeconds(myForm3.getInput("RON6").value);
				Parameters[26]=TimeFormatToSeconds(myForm3.getInput("RON7").value);				
				Parameters[27]=TimeFormatToSeconds(myForm3.getInput("RON8").value);	
				Parameters[28]=TimeFormatToSeconds(myForm3.getInput("RON9").value);	
				Parameters[29]=TimeFormatToSeconds(myForm3.getInput("RON10").value);				

			}
			else
			{
				Parameters[20]=(myForm3.getInput("RON1").value);
				Parameters[21]=(myForm3.getInput("RON2").value);				
				Parameters[22]=(myForm3.getInput("RON3").value);	
				Parameters[23]=(myForm3.getInput("RON4").value);	
				Parameters[24]=(myForm3.getInput("RON5").value);				
				Parameters[25]=(myForm3.getInput("RON6").value);
				Parameters[26]=(myForm3.getInput("RON7").value);				
				Parameters[27]=(myForm3.getInput("RON8").value);	
				Parameters[28]=(myForm3.getInput("RON9").value);	
				Parameters[29]=(myForm3.getInput("RON10").value);				
			}
			
			Parameters[30]=myForm3.getInput("ROF1").value;	
			Parameters[31]=myForm3.getInput("ROF2").value;				
			Parameters[32]=myForm3.getInput("ROF3").value;	
			Parameters[33]=myForm3.getInput("ROF4").value;	
			Parameters[34]=myForm3.getInput("ROF5").value;				
			Parameters[35]=myForm3.getInput("ROF6").value;	
			Parameters[36]=myForm3.getInput("ROF7").value;				
			Parameters[37]=myForm3.getInput("ROF8").value;	
			Parameters[38]=myForm3.getInput("ROF9").value;	
			Parameters[39]=myForm3.getInput("ROF10").value;				

			SetProgramSetup(myForm1.getInput("ID").value,myForm1.getInput("NAME").value,Parameters,Parameters.length,2);
			//****************************************************************************************
			var Parameters = new Array();
			var pc=0;
			for (i=1;i<=10;i++)
			{
				for (k=1;k<=6;k++)
				{
					var Name = 'R'+k.toString()+i.toString();
					Parameters[pc]=myForm3.getSelect(Name).options[myForm3.getSelect(Name).selectedIndex].value;			
					pc++;
				}
			}
			
			/*
			Parameters[0]=myForm3.getSelect("R11").options[myForm3.getSelect("R11").selectedIndex].value;
			Parameters[1]=myForm3.getSelect("R21").options[myForm3.getSelect("R21").selectedIndex].value;
			Parameters[2]=myForm3.getSelect("R31").options[myForm3.getSelect("R31").selectedIndex].value;
			
			Parameters[3]=myForm3.getSelect("R12").options[myForm3.getSelect("R12").selectedIndex].value;
			Parameters[4]=myForm3.getSelect("R22").options[myForm3.getSelect("R22").selectedIndex].value;
			Parameters[5]=myForm3.getSelect("R32").options[myForm3.getSelect("R32").selectedIndex].value;
			
			Parameters[6]=myForm3.getSelect("R13").options[myForm3.getSelect("R13").selectedIndex].value;
			Parameters[7]=myForm3.getSelect("R23").options[myForm3.getSelect("R23").selectedIndex].value;
			Parameters[8]=myForm3.getSelect("R33").options[myForm3.getSelect("R33").selectedIndex].value;

			Parameters[9] =myForm3.getSelect("R14").options[myForm3.getSelect("R14").selectedIndex].value;
			Parameters[10]=myForm3.getSelect("R24").options[myForm3.getSelect("R24").selectedIndex].value;
			Parameters[11]=myForm3.getSelect("R34").options[myForm3.getSelect("R34").selectedIndex].value;

			Parameters[12]=myForm3.getSelect("R15").options[myForm3.getSelect("R15").selectedIndex].value;
			Parameters[13]=myForm3.getSelect("R25").options[myForm3.getSelect("R25").selectedIndex].value;
			Parameters[14]=myForm3.getSelect("R35").options[myForm3.getSelect("R35").selectedIndex].value;

			Parameters[15]=myForm3.getSelect("R16").options[myForm3.getSelect("R16").selectedIndex].value;
			Parameters[16]=myForm3.getSelect("R26").options[myForm3.getSelect("R26").selectedIndex].value;
			Parameters[17]=myForm3.getSelect("R36").options[myForm3.getSelect("R36").selectedIndex].value;

			Parameters[18]=myForm3.getSelect("R17").options[myForm3.getSelect("R17").selectedIndex].value;
			Parameters[19]=myForm3.getSelect("R27").options[myForm3.getSelect("R27").selectedIndex].value;
			Parameters[20]=myForm3.getSelect("R37").options[myForm3.getSelect("R37").selectedIndex].value;

			Parameters[21]=myForm3.getSelect("R18").options[myForm3.getSelect("R18").selectedIndex].value;
			Parameters[22]=myForm3.getSelect("R28").options[myForm3.getSelect("R28").selectedIndex].value;
			Parameters[23]=myForm3.getSelect("R38").options[myForm3.getSelect("R38").selectedIndex].value;

			Parameters[24]=myForm3.getSelect("R19").options[myForm3.getSelect("R19").selectedIndex].value;
			Parameters[25]=myForm3.getSelect("R29").options[myForm3.getSelect("R29").selectedIndex].value;
			Parameters[26]=myForm3.getSelect("R39").options[myForm3.getSelect("R39").selectedIndex].value;

			Parameters[27]=myForm3.getSelect("R110").options[myForm3.getSelect("R110").selectedIndex].value;
			Parameters[28]=myForm3.getSelect("R210").options[myForm3.getSelect("R210").selectedIndex].value;
			Parameters[29]=myForm3.getSelect("R310").options[myForm3.getSelect("R310").selectedIndex].value;
			*/
			SetProgramSetup(myForm1.getInput("ID").value,myForm1.getInput("NAME").value,Parameters,Parameters.length,3);
			
			WindowsViewPort.window("DialogWindow").close();
			ReloadTimeProgramsGrid();
			})
		}

}
//**********************************************************************************
function SetProgramSetup(pid,Name,Parameters,ParametersLenght,part)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 010;'+pid+';'+part+';';
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
	//alert(url);
	//alert(url.length);
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	if (part==3)
		alert(txt);
	
}
//**********************************************************************************
function GetProgramSetup(part,pid)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 009;'+pid+';'+part+';';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	//alert(txt.length);
	return txt;
}
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
function CreateTimeProgramsGrid()
{
	//VariablesGrid = new dhtmlXGridObject(GridDivId);
	TimeProgramsGrid.setHeader("ID,ONOMA, , ");
	TimeProgramsGrid.setInitWidths("50,300,60,0")
	TimeProgramsGrid.setColAlign("left,left,center,center")
	TimeProgramsGrid.setColTypes("ro,ro,ro,ro");
	//mygrid.setColSorting("str,str,str")
	TimeProgramsGrid.setSkin("dhx_skyblue")
	TimeProgramsGrid.enableKeyboardSupport(false); 
	TimeProgramsGrid.enableLightMouseNavigation(false);
	TimeProgramsGrid.init();
	TimeProgramsGrid.attachEvent("onRowSelect", RowClickedOnTimeProgramsGrid);
	TimeProgramsGrid.attachEvent("onRightClick", RowClickedOnTimeProgramsGrid);
	
	TimeProgramsGrid.attachEvent("onHeaderClick", HeaderClickedOnTimeProgramsGrid);

	var url='http://'+SystemIpAdress+'/'+SystemFileSystem+'/iri.txt ';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	TimeProgramsGrid.parse(txt,"csv");
	TimeProgramsGridLoaded();
	
}

function ReloadTimeProgramsGrid()
{
	//VariablesGrid.clearAndLoad('http://'+SystemIpAdress+'/'+SystemFileSystem+'/vir.txt',VariablesGridLoaded,"csv");
	TimeProgramsGrid.clearAll(false);
	var url='http://'+SystemIpAdress+'/'+SystemFileSystem+'/iri.txt ';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	TimeProgramsGrid.parse(txt,"csv");
	TimeProgramsGridLoaded();
}



function TimeProgramsGridLoaded()
{
	for (i=0;i<DEF_MAXIMUM_TIME_PROGRAMS;i++)
	{
		AllTimeProgramsNames[i]='';
	}
	
	var NumberOfRows = TimeProgramsGrid.getRowsNum();
	for (i=1;i<=NumberOfRows;i++)
	{
		TimeProgramsGrid.setRowTextStyle(i, "font-size:x-large;color:#291919;font-family: digital-7, Arial, Helvetica, sans-serif;");
		TimeProgramsGrid.cells(i,1).setValue(hex2a(TimeProgramsGrid.cellById(i,1).getValue()));
		TimeProgramsGrid.cells(i,1).setValue(TimeProgramsGrid.cellById(i,1).getValue().replace(/~/g,' '));
		TimeProgramsGrid.cells(i,2).setValue('<img width="25" height="25" src="./images/control_stop_blue.png">');
		AllTimeProgramsNames[i-1]=TimeProgramsGrid.cellById(i,1).getValue();
	}
	FeelSelectWithAllTimePrograms(document.getElementById('InfoProgramList'));
	ConvertSelectToMobiScrollSelect(document.getElementById('InfoProgramList').id,document.getElementById('InfoProgramList').className);
	//TimeProgramsGrid.setRowColor(1, 0xdddddd);
    //TimeProgramsGrid.enableAlterCss("even","uneven");
	//TimeProgramsGrid.setRowTextBold(1);
	//TimeProgramsGrid.setRowTextNormal("row1");
}


function HeaderClickedOnTimeProgramsGrid(ind,obj)
{
	//	alert(ind+' '+obj);
	if  (ind ==0)
		TimeProgramsGrid.sortRows(ind,"int","asc");    
	else	
		TimeProgramsGrid.sortRows(ind,"str","asc");    
}

function RowClickedOnTimeProgramsGrid(row,col,ev)
{
	if (col==0)
	{
		CreateTimeProgramWindow(TimeProgramsGrid.cellById(row,0).getValue(),TimeProgramsGrid.cellById(row,1).getValue());
	}
	//*************************************
	if (col==2)
	{
		StartStopTimeProgramDialog(TimeProgramsGrid.cellById(row,0).getValue());
	}
	
}


function StartStopTimeProgramDialog(pid)
{
		if (FlagWindowIsCreated==0)
		{	
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 5, 5, 400, 200);
			DialogWindow.setText("ΕΝΑΡΞΗ - ΤΕΡΜΑΤΙΣΜΟΣ ΠΡΟΓΡΑΜΜΑΤΟΣ");
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
				{type: "input", label: "ID", name: "ID" ,inputWidth: 30 ,value: ''+pid , readonly:true ,style: "background-color:#CCCCCC " },
				{type: "button", position: "center", name: "START" , value: "ΕΝΑΡΞΗ"},
				{type: "newcolumn", offset:0},
				{type: "input", label: "ΟΝΟΜΑ:", name: "NAME" , value: AllTimeProgramsNames[pid-1] , readonly:true ,style: "background-color:#CCCCCC " },
				{type: "button", position: "center", name: "STOP" ,  value: "ΤΕΡΜΑΤΙΣΜΟΣ"}
			];
			//*************************************************************
			myForm = DialogWindow.attachForm(formData);
			//*************************************************************
			myForm.attachEvent("onButtonClick", function(name){
			  if (name == 'START')
			  {
					var url='http://'+SystemIpAdress+'/rpc/SetData/run 011;'+myForm.getInput("ID").value+';1;';
					url=url+Math.random()+';';
					txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
					txt = decodeURIComponent(txt);
					alert(txt);
			  }
			  if (name == 'STOP')
			  {
					var url='http://'+SystemIpAdress+'/rpc/SetData/run 011;'+myForm.getInput("ID").value+';2;';
					url=url+Math.random()+';';
					txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
					txt = decodeURIComponent(txt);
					alert(txt);
			  }
			  WindowsViewPort.window("DialogWindow").close();
			})
		}

	
}


function UpdateIconsOnTimeProgramsGrid(data)
{
	var NumberOfRows = TimeProgramsGrid.getRowsNum();
	var TimeProgramID=0;
	document.getElementById('InfoCurrentProgram').innerHTML = "";
	document.getElementById('MainHydroponicScreenDESECPH').innerHTML = '';
	
	for (i=1;i<=NumberOfRows;i++)
	{
		TimeProgramID=TimeProgramsGrid.cellById(i,0).getValue()-1;
		ECDataPosision = parseInt(DEF_MAXIMUM_TIME_PROGRAMS) + 2;
		PHDataPosision = parseInt(DEF_MAXIMUM_TIME_PROGRAMS) + 3;

		if (data[TimeProgramID] == 0) // STOP
		{
			TimeProgramsGrid.cells(i,2).setValue('<img width="25" height="25" src="./images/control_stop_blue.png">');
		}
		else if (data[TimeProgramID] == 1) // RUN 
		{
			//alert(DEF_MAXIMUM_TIME_PROGRAMS);
			ECDataPosision = parseInt(DEF_MAXIMUM_TIME_PROGRAMS) + 2;
			PHDataPosision = parseInt(DEF_MAXIMUM_TIME_PROGRAMS) + 3;
			TimeProgramsGrid.cells(i,2).setValue('<img width="25" height="25" src="./images/control_play_blue.png">');
			if (data[DEF_MAXIMUM_TIME_PROGRAMS] != 0xFF)
			{
				document.getElementById('InfoCurrentProgram').innerHTML = 'Πρόγραμμα Αρδευσης που Εκτελείται: <strong>'+AllTimeProgramsNames[TimeProgramID]+'</strong> Πρόγραμμα Λίπανσης: <strong>'+AllFertigationProgramsNames[data[DEF_MAXIMUM_TIME_PROGRAMS]]+'</strong> (EC:'+MyparseFloat(data[ECDataPosision])+' pH:'+MyparseFloat(data[PHDataPosision])+')';
				document.getElementById('MainHydroponicScreenDESECPH').innerHTML = MyparseFloat(data[ECDataPosision]) + ' / ' + MyparseFloat(data[PHDataPosision]);
			}
		}
		else if (data[TimeProgramID] == 2) // POWER FAILURE
		{
			TimeProgramsGrid.cells(i,2).setValue('<img width="25" height="25" src="./images/winamp.png">');
			if (data[DEF_MAXIMUM_TIME_PROGRAMS] != 0xFF)
			{
				document.getElementById('InfoCurrentProgram').innerHTML = '<strong>ΔΙΑΚΟΠΗ ΡΕΥΜΑΤΟΣ</strong> Πρόγραμμα Αρδευσης: '+AllTimeProgramsNames[TimeProgramID]+' Πρόγραμμα Λίπανσης: '+AllFertigationProgramsNames[data[DEF_MAXIMUM_TIME_PROGRAMS]]+' (EC:'+MyparseFloat(data[ECDataPosision])+' pH:'+MyparseFloat(data[PHDataPosision])+')';
				document.getElementById('MainHydroponicScreenDESECPH').innerHTML = MyparseFloat(data[ECDataPosision]) + ' / ' + MyparseFloat(data[PHDataPosision]);
			}

		}
		else if (data[TimeProgramID] == 4) // PAUSE BY HYDROPONIC ERROR 
		{
			if (data[DEF_MAXIMUM_TIME_PROGRAMS] != 0xFF)
			{
				document.getElementById('InfoCurrentProgram').innerHTML = '<strong>ΔΙΑΛΥΜΑ ΕΚΤΟΣ ΟΡΙΩΝ</strong> Πρόγραμμα Αρδευσης: '+AllTimeProgramsNames[TimeProgramID]+' Πρόγραμμα Λίπανσης: '+AllFertigationProgramsNames[data[DEF_MAXIMUM_TIME_PROGRAMS]]+' (EC:'+MyparseFloat(data[ECDataPosision])+' pH:'+MyparseFloat(data[PHDataPosision])+')';
				document.getElementById('MainHydroponicScreenDESECPH').innerHTML = MyparseFloat(data[ECDataPosision]) + ' / ' + MyparseFloat(data[PHDataPosision]);
			}
			TimeProgramsGrid.cells(i,2).setValue('<img width="25" height="25" src="./images/control_pause_blue2.png">');
		}
		else if (data[TimeProgramID] == 6) // WAITING OTHER PROGRAM
			TimeProgramsGrid.cells(i,2).setValue('<img width="25" height="25" src="./images/control_pause_blue.png">');
	}

	var NumberOfRows = FertigationProgramsGrid.getRowsNum();
	for (i=1;i<=NumberOfRows;i++)
	{
		//TimeProgramsGrid.setRowTextBold(1);
		FertigationProgramsGrid.setRowTextNormal(i);
		FertigationProgramID = FertigationProgramsGrid.cellById(i,0).getValue()-1;
		if (FertigationProgramID == data[DEF_MAXIMUM_TIME_PROGRAMS])
			FertigationProgramsGrid.setRowTextBold(i);

	}


}

function SecondsToTimeFormat(sec)
{
	var hours    = Math.floor(sec/3600);
	var minutes  = Math.floor((sec%3600)/60);
	var seconds  = ((sec%3600)%60);
	if (hours < 10)   hours = '0'+hours;
	if (minutes < 10) minutes = '0'+minutes;
	if (seconds < 10) seconds = '0'+seconds;
	return hours+':'+minutes+':'+seconds;
}

function MinutesTo24Time(sec)
{
	var hours   = Math.floor(sec/60);
	var minutes = sec%60;
	if (hours < 10)   hours = '0'+hours;
	if (minutes < 10) minutes = '0'+minutes;
	return hours+':'+minutes;
}


function TimeFormatToSeconds(h24)
{
	var NumbersData = new Array();
	NumbersData=h24.split(":");
	if (NumbersData.length != 3)
	{
		alert("ΣΦΑΛΜΑ ΣΤOΝ ΧΡΟΝΟ");
		return '*';
	}
	if ( (is_int(NumbersData[0])) && (is_int(NumbersData[1])) && (is_int(NumbersData[2])) )
	{														
		if ( (NumbersData[0] < 24) && (NumbersData[1]<60) && (NumbersData[2]<60) )
		{
			var ret=parseInt(NumbersData[0],10)*3600+parseInt(NumbersData[1],10)*60+parseInt(NumbersData[2],10);
			if (ret <= 64800) 
				return ret;		
			else
			{
				alert("ΣΦΑΛΜΑ! ΜΕΓΙΣΤΟΣ ΕΠΙΤΡΕΠΟΜΕΝΟΣ ΧΡΟΝΟΣ ΑΡΔΕΥΣΗΣ 18:00:00 ");
				return '*';
			}

		}
		else
		{
			alert("ΣΦΑΛΜΑ ΣΤΟΝ ΧΡΟΝΟ");
			return '*';
		}
	}
	alert("ΣΦΑΛΜΑ ΣΤΟΝ ΧΡΟΝΟ");
	return '*';
	
}



function H24ToMinutes(h24)
{
	var NumbersData = new Array();
	NumbersData=h24.split(":");
	if (NumbersData.length != 2)
	{
		alert("ΣΦΑΛΜΑ ΣΤΗΝ ΩΡΑ ");
		return '*';
	}
	if ( (is_int(NumbersData[0])) && (is_int(NumbersData[1])) )
	{														
		if ( (NumbersData[0] < 24) && (NumbersData[1]<60) )
		{
			var ret=parseInt(NumbersData[0],10)*60+parseInt(NumbersData[1],10);
			return ret;
		}
		else
		{
			alert("ΣΦΑΛΜΑ ΣΤΗΝ ΩΡΑ ");
			return '*';
		}
	}

	alert("ΣΦΑΛΜΑ ΣΤΗΝ ΩΡΑ ");
	return '*';
	
}

//****************************************************************************
//****************************************************************************

function is_int(value){ 
  if((parseFloat(value) == parseInt(value,10)) && !isNaN(value)){
	  
       return true;
   } else { 
       return false;
   } 
}