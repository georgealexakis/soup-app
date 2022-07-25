// JavaScript Document

function CreateCalibrationWindow()
{
		
		if (DataAcqusitionIsActive==false)
		{
			DataAcquisitionIndex=0;
			DataAcqusitionIsActive=true;
			DataAcquisitionTimer = setTimeout("GetAcquisitionData()", 2000);
			toolbar.setItemState("autosave", true);
		}
		
		if (FlagWindowIsCreated==0)
		{	
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 5, 5, 820, 420);
			DialogWindow.setText("ΒΑΘΜΟΝΟΜΗΣΗ EC-pH");
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
					{type: "radio",name: "ctype", value: "0", label: "	ΒΑΘΜΟΝΟΜΗΣΗ EC", checked: true , className :'DialogCheckBoxClass'},
					{type: "newcolumn", offset:50},
					{type: "radio",name: "ctype", value: "1", label: "	ΒΑΘΜΟΝΟΜΗΣΗ pH", checked: false , className :'DialogCheckBoxClass'},
					{type: "newcolumn", offset:50},
					{type: "button", position: "center", name: "CANCEL" , value: "ΑΚΥΡΟ", width:150 ,className :'DialogOKButtonClass'}
				]},	
				{type: "block", width: "auto", list:[
					{type: "select", label: "ΑΙΣΘΗΤΗΡΙΟ:", labelWidth: "auto" , inputWidth: 280 ,name:"SENSOR" , className :'DialogsSelectInput'},
					{type: "newcolumn", offset:20},
					{type: "input", label: "TIMH", labelWidth: "50", inputWidth: 100 ,name: "SENSORVALUE" ,readonly:true ,style: "background-color:#CCCCCC" , value:"NA" }
				]},
				{type: "fieldset", width:"auto", label: "ΒΑΘΜΟΝΟΜΗΣΗ EC" ,name:"ECBLOCK" ,list:[
			  		{type: "label", label: "ΒΗΜΑ 1: ΟΡΙΣΤΕ ΤΗ ΘΕΡΜΟΚΡΑΣΙΑ ΤΟΥ ΔΙΑΛΥΜΑΤΟΣ ΒΑΘΜΟΝΟΜΗΣΗΣ.", labelWidth:"auto"},
					{type: "input", label: "ΘΕΡΜΟΚΡΑΣΙΑ ΔΙΑΛΥΜΑΤΟΣ:", labelWidth: 550, inputWidth: 100 ,name: "ECT" , value:"25" , className :'DialogInputClass' },
					{type: "label", label: "ΒΗΜΑ 2: ΟΡΙΣΤΕ ΤΗΝ ΑΓΩΓΙΜΟΤΗΤΑ ΤΟΥ ΔΙΑΛΥΜΑΤΟΣ ΒΑΘΜΟΝΟΜΗΣΗΣ.", labelWidth:"auto"},					
					{type: "input", label: "ΑΓΩΓΙΜΟΤΗΤΑ ΔΙΑΛΥΜΑΤΟΣ ΒΑΘΜΟΝΟΜΗΣΗΣ:", labelWidth: 550, inputWidth: 100 ,name: "EC"  , value:"2.5" , className :'DialogInputClass'},
					{type: "label", label: "ΒΗΜΑ 3: ΟΡΙΣΤΕ ΤΗΝ ΕΝΔΕΙΞΗ ΤΟΥ ΑΙΣΘΗΤΗΡΙΟΥ ΣΕ ΑΓΩΓΙΜΟΤΗΤΑ 0.", labelWidth:"auto"},					
					{type: "input", label: "ΕΝΔΕΙΞΗ ΑΙΣΘΗΤHΡΙΟΥ ΣΕ ΑΓΩΓΙΜΟΤΗΤΑ 0:", labelWidth: 550, inputWidth: 100 ,name: "ECAT0"  , style: "background-color:#FFCCCC" , value:"11" ,className :'DialogInputClass'},
					{type: "label", label: "ΒΗΜΑ 4: ΠΑΤΗΣΤΕ ΤΟ ΚΟΥΜΠΙ ΒΑΘΜΟΝΟΜΗΣΗ ΕC.", labelWidth:"auto"},					
					{type: "button", position: "center", name: "CALIBEC" , value: "ΒΑΘΜΟΝΟΜΗΣΗ EC", className :'DialogOKButtonClass'}
				]},																							  
				{type: "fieldset", width:"auto", label: "ΒΑΘΜΟΝΟΜΗΣΗ pH" ,name:"PHBLOCK" ,list:[
			  		{type: "label", label: "BHMA 1: ΤΟΠΟΘΕΤΗΣΤΕ ΤΟ ΑΙΣΘΗΤΗΡΙΟ ΣΕ BUFFER 4 ΚΑΙ ΠΑΤΗΣΤΕ ΤΟ ΚΟΥΜΠΙ pH4", labelWidth:"auto"},
			  		{type: "input", label: "TIMH ΣΤΟ BUFFER 4", labelWidth:"auto", inputWidth: 80 ,readonly:false ,style: "background-color:#CCCCCC" ,name: "PH4" , value:"0" , className :'DialogInputClass'},
					{type: "label", label: "BHMA 2: ΤΟΠΟΘΕΤΗΣΤΕ ΤΟ ΑΙΣΘΗΤΗΡΙΟ ΣΕ BUFFER 7 ΚΑΙ ΠΑΤΗΣΤΕ ΤΟ ΚΟΥΜΠΙ pH7", labelWidth:"auto" },
			  		{type: "input", label: "TIMH ΣΤΟ BUFFER 7" , labelWidth:"auto", inputWidth: 80 ,readonly:false ,style: "background-color:#CCCCCC" ,name: "PH7" , value:"0" , className :'DialogInputClass'},
					
					{type: "block",  width: "auto" , list:[
						{type: "button", position: "center", name: "PHON4" , value: "pH4" ,className :'DialogOKButtonClass'},
						{type: "newcolumn", offset:50},
						{type: "button", position: "center", name: "PHON7" , value: "pH7" ,className :'DialogOKButtonClass'},
						{type: "newcolumn", offset:50},						
						{type: "button", position: "center", name: "CALIBPH" , value: "ΒΑΘΜΟΝΟΜΗΣΗ pH" ,className :'DialogOKButtonClass'}		
					]}	
				]}	
			];
			//*************************************************************
			myForm = DialogWindow.attachForm(formData);
			AttacheNumKeyboardToInput(myForm.getInput("ECT").id,1);
			AttacheNumKeyboardToInput(myForm.getInput("EC").id,1);
			AttacheNumKeyboardToInput(myForm.getInput("ECAT0").id,1);			
			AttacheNumKeyboardToInput(myForm.getInput("PH4").id,1);
			AttacheNumKeyboardToInput(myForm.getInput("PH7").id,1);			

			//*************************************************************
			//************* FILL LIST BOXES *******************************
			//*************************************************************
			FeelSelectWithAllVirtuals(myForm.getSelect("SENSOR"),DEF_GENERAL_INPUT_VARIABLE);
			//*************************************************************
			myForm.hideItem("PHBLOCK");
			//*************************************************************
			myForm.attachEvent("onChange", function(name,value,is_checked){
				if (name == "ctype")
				{
					if (value ==0)
					{
						myForm.hideItem("PHBLOCK");
						myForm.showItem("ECBLOCK");
					}
					else
					{
						myForm.hideItem("ECBLOCK");
						myForm.showItem("PHBLOCK");
					}

				}
			});
			//*************************************************************
			myForm.attachEvent("onButtonClick", function(name,value){
				if (name == 'CANCEL')
				{
					StopDataAcquisition();
					WindowsViewPort.window("DialogWindow").close();	
					return;
				}
				var Parameters = new Array();
				 if (name =='CALIBEC')
				 {
					Parameters[0]=0; // EC
					Parameters[1]=myForm.getSelect("SENSOR").options[myForm.getSelect("SENSOR").selectedIndex].value;
					Parameters[2]=myForm.getInput("SENSORVALUE").value;
					Parameters[3]=myForm.getInput("ECT").value;
					Parameters[4]=myForm.getInput("EC").value;
					Parameters[5]=myForm.getInput("ECAT0").value;
					SendCalibrationCommand(Parameters,Parameters.length);	
					WindowsViewPort.window("DialogWindow").close();
				 }
				 else if (name =='PHON4')
				 {
					 myForm.setItemValue("PH4", myForm.getInput("SENSORVALUE").value);
				 }
 				 else if (name =='PHON7')
				 {
 					 myForm.setItemValue("PH7", myForm.getInput("SENSORVALUE").value);
				 }
				 else if (name =='CALIBPH')
				 {
 					Parameters[0]=1; // ph
					Parameters[1]=myForm.getSelect("SENSOR").options[myForm.getSelect("SENSOR").selectedIndex].value;
					Parameters[2]=myForm.getInput("PH4").value;
					Parameters[3]=myForm.getInput("PH7").value;
					Parameters[4]=0;
					Parameters[5]=0;
					SendCalibrationCommand(Parameters,Parameters.length);	
				    WindowsViewPort.window("DialogWindow").close();
				 }
			})
		}

}
//**********************************************************************************
function SendCalibrationCommand(Parameters,ParametersLenght)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 018;';
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
