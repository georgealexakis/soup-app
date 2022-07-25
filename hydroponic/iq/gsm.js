// JavaScript Document
function GSMSetup()
{
		StopDataAcquisition();
		var Parameters = new Array();
		if (FlagWindowIsCreated==0)
		{	
			
			var SMSSetupVar = GetGSMSetup(1);
			if (SMSSetupVar == "ERROR")
			{
				alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ");
				return;
			}
			Parameters = SMSSetupVar.split(";"); 
				
			//*********************************************			
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 5, 5, 620, 350);
			DialogWindow.setText("ΡΥΘΜΙΣΕΙΣ ΑΠΟΣΤΟΛΗΣ SMS");
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
					{type: "button", position: "center", name: "OK" , value: "ΑΠΟΣΤΟΛΗ"}
				]},
				{type: "fieldset", width: "550", label: "ΜΗΝΥΜΑ", list:[
					{type: "select", label: "ΕΠΙΛΟΓΗ ΜΗΝΥΜΑΤΟΣ:", labelWidth: "180", labelAlign:"right" , inputWidth: 200 ,name:"MINDEX" },   // 3
				]},
				{type: "fieldset", width: "550",label: "ΣΤΟΙΧΕΙΑ ΜΗΝΥΜΑΤΟΣ", list:[
					{type: "input", label: "ΤΗΛΕΦΩΝΟ:", labelWidth: "100", labelAlign:"right" ,inputWidth: 180 ,name: "PN" ,  maxLength :13 , value:Parameters[3] },
					{type: "input", label: "MHNYMA  :", labelWidth: "100", labelAlign:"right" ,inputWidth: 180 ,name: "ME" ,  maxLength :20 , value:Parameters[4] }
				]},
				{type: "fieldset", width: "550", label: "", list:[
					{type: "select", label: "ΠΡΟΣΘΗΚΗ ΜΕΤΑΒΛΗΤΗΣ:", labelWidth: "180", labelAlign:"right" , inputWidth: 100 ,name:"VADD" }   // 3
				]},
				{type: "fieldset", width: "550", label: "ΚΡΙΤΗΡΙΟ ΑΠΟΣΤΟΛΗΣ", list:[
					{type: "select", label: "ΟΤΑΝ :", labelWidth: "auto", labelAlign:"right" , inputWidth: 200 ,name:"V1" },   // 3
					{type: "newcolumn", offset:0},
					{type: "select", label: " > ", labelWidth: "auto", labelAlign:"right" ,  inputWidth: 200 ,name:"V2"  }   // 3
				]}

			];
			//*************************************************************
			myForm = DialogWindow.attachForm(formData);
			//*************************************************************
			//************* FILL LIST BOXES *******************************
			//*************************************************************
			for (i=0;i<5;i++)
			{
				myForm.getSelect("MINDEX").options[i] = new Option("MHNYMA "+(i+1),i+1);
			}
			FeelSelectWithAllVirtuals(myForm.getSelect("VADD"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V1"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V2"),DEF_ALL_VIRTUALS_MASK);
			//SelectOptionInSelectByValue(myForm.getSelect("MINDEX"),i+1);
			//*************************************************************
			//************* SET VALUES ************************************
			//*************************************************************
			SelectOptionInSelectByValue(myForm.getSelect("VADD"),Parameters[0]);
			SelectOptionInSelectByValue(myForm.getSelect("V1"),Parameters[1]);
			SelectOptionInSelectByValue(myForm.getSelect("V2"),Parameters[2]);
			//*************************************************************
			myForm.attachEvent("onChange", function(name,value,is_checked){
				if (name == "MINDEX")
				{
					var SMSSetupVar = GetGSMSetup(value);
					if (SMSSetupVar == "ERROR")
					{
						alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ");
						return;
					}
					Parameters = SMSSetupVar.split(";"); 
					SelectOptionInSelectByValue(myForm.getSelect("VADD"),Parameters[0]);
					SelectOptionInSelectByValue(myForm.getSelect("V1"),Parameters[1]);
					SelectOptionInSelectByValue(myForm.getSelect("V2"),Parameters[2]);
					myForm.setItemValue("PN", Parameters[3]);
					myForm.setItemValue("ME", Parameters[4]);					
				}
			});
			//*************************************************************
			myForm.attachEvent("onButtonClick", function(name){
				var Parameters = new Array();
				Parameters[0]=myForm.getSelect("MINDEX").options[myForm.getSelect("MINDEX").selectedIndex].value;
				Parameters[1]=myForm.getSelect("VADD").options[myForm.getSelect("VADD").selectedIndex].value;
				Parameters[2]=myForm.getSelect("V1").options[myForm.getSelect("V1").selectedIndex].value;
				Parameters[3]=myForm.getSelect("V2").options[myForm.getSelect("V2").selectedIndex].value;
				Parameters[4]=myForm.getInput("PN").value;
				Parameters[5]=myForm.getInput("ME").value;
				SetGSMSetup(Parameters,Parameters.length);
				WindowsViewPort.window("DialogWindow").close();
			})
		}
}

function GetGSMSetup(index)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 022;'+index+';';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	return txt;
}

function SetGSMSetup(Parameters,ParametersLenght)
{
	var txt=''
	var LineLenght = Parameters[4].length;
    for (i=LineLenght;i<14;i++)
		Parameters[4]=Parameters[4]+'~';
	Parameters[4]=Parameters[4].replace(/ /g,'~');
	
	var LineLenght = Parameters[5].length;
    for (i=LineLenght;i<20;i++)
		Parameters[5]=Parameters[5]+'~';
	Parameters[5]=Parameters[5].replace(/ /g,'~');

	var url='http://'+SystemIpAdress+'/rpc/SetData/run 023;';
	for (i=0;i<ParametersLenght;i++)
	{
		url=url+Parameters[i]+';';
	}
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);

}


