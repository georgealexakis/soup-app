function GetWarningMessagesSetup()
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 049;';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	return txt;
}

function SetWarningMessagesSetup(Parameters,ParametersLenght)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 050;';
	for (i=0;i<ParametersLenght;i++)
	{
		url=url+Parameters[i]+' ';
	}
	url=url+Math.random()+';';
    alert(url);
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);

}

function GetFromEmailLine(line,type)
{
	var mail_part = new Array();
	mail_part = line.split(" "); 
	
	if (type==0)
		return mail_part[0];		
	else
	{
		if (mail_part.length > 0)
			return mail_part[1].replace(/_/g, " ");		
		else
			return '*';
	}
}

function EditEmailSetup()
{
		StopDataAcquisition();
		if (FlagWindowIsCreated==0)
		{	
			var lines = new Array();
			var WarningMessagesSetup = GetWarningMessagesSetup();
			if (WarningMessagesSetup == "ERROR")
			{
				alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ");
				return;
			}
			alert(WarningMessagesSetup);
			lines = WarningMessagesSetup.split("\r"); 

			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 5, 5, 750, 400);
			DialogWindow.setText("ΔΙΑΜΟΡΦΩΣΗ ΜΥΝΗΜΑΤΩΝ");
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
					{type: "button", position: "center", name: "OK" , value: "ΑΠΟΘΗΚΕΥΣΗ", className :'DialogOKButtonClass'}
				]},
				{type: "block", width: "700", label: "", list:[	
					{type: "label", label: "", labelWidth: "10" },
					{type: "newcolumn", offset:0},
					{type: "label", label: "Διέυθυνση (email)", labelWidth: "260"  },
					{type: "newcolumn", offset:0},
					{type: "label", label: "Μήνυμα (ΠΡΟΣΟΧΗ: ΜΟΝΟ ΑΓΓΛΙΚΟΙ ΧΑΡΑΚΤΗΡΕΣ)"}
				]},
				{type: "block", width: "700", label: "", list:[	
					{type: "label", label: "1"},
					{type: "newcolumn", offset:0},
					{type:"input", width: "250" , name:"email_file_mail_1",label:"",value:GetFromEmailLine(lines[0],0),
					maxLength :20},	
					{type: "newcolumn", offset:0},
					{type:"input", width: "400" , name:"email_file_body_1",label:"",value:GetFromEmailLine(lines[0],1),
					maxLength :30 }	
				]},
				{type: "block", width: "700", label: "", list:[	
					{type: "label", label: "2"},
					{type: "newcolumn", offset:0},
					{type:"input", width: "250" , name:"email_file_mail_2",label:"",value:GetFromEmailLine(lines[1],0),
					maxLength :20},	
					{type: "newcolumn", offset:0},
					{type:"input", width: "400" , name:"email_file_body_2",label:"",value:GetFromEmailLine(lines[1],1),
					maxLength :30 }	
				]},
				{type: "block", width: "700", label: "", list:[	
					{type: "label", label: "3"},
					{type: "newcolumn", offset:0},
					{type:"input", width: "250" , name:"email_file_mail_3",label:"",value:GetFromEmailLine(lines[2],0),
					maxLength :20 },	
					{type: "newcolumn", offset:0},
					{type:"input", width: "400" , name:"email_file_body_3",label:"",value:GetFromEmailLine(lines[2],1),
					maxLength :30 }	
				]},
				{type: "block", width: "700", label: "", list:[	
					{type: "label", label: "4"},
					{type: "newcolumn", offset:0},
					{type:"input", width: "250" , name:"email_file_mail_4",label:"",value:GetFromEmailLine(lines[3],0),
					maxLength :20},	
					{type: "newcolumn", offset:0},
					{type:"input", width: "400" , name:"email_file_body_4",label:"",value:GetFromEmailLine(lines[3],1),
					maxLength :30}	
				]},
				{type: "block", width: "700", label: "", list:[	
					{type: "label", label: "5"},
					{type: "newcolumn", offset:0},
					{type:"input", width: "250" , name:"email_file_mail_5",label:"",value:GetFromEmailLine(lines[4],0),
					maxLength :20},	
					{type: "newcolumn", offset:0},
					{type:"input", width: "400" , name:"email_file_body_5",label:"",value:GetFromEmailLine(lines[4],1),
					maxLength :30}	
				]}
			];
			//*************************************************************
			myForm = DialogWindow.attachForm(formData);
			//*************************************************************
			//************* FILL LIST BOXES *******************************
			//*************************************************************
			//*************************************************************
			//************* SET VALUES ************************************
			//*************************************************************
			//*************************************************************
			myForm.attachEvent("onChange", function(name,value,is_checked){
			});
			//*************************************************************
			myForm.attachEvent("onButtonClick", function(name){
				var Parameters = new Array();
				
				Parameters[0] = myForm.getInput("email_file_mail_1").value;
				Parameters[1] = myForm.getInput("email_file_body_1").value;
				Parameters[2] = myForm.getInput("email_file_mail_2").value;
				Parameters[3] = myForm.getInput("email_file_body_2").value;
				Parameters[4] = myForm.getInput("email_file_mail_3").value;
				Parameters[5] = myForm.getInput("email_file_body_3").value;
				Parameters[6] = myForm.getInput("email_file_mail_4").value;
				Parameters[7] = myForm.getInput("email_file_body_4").value;
				Parameters[8] = myForm.getInput("email_file_mail_5").value;
				Parameters[9] = myForm.getInput("email_file_body_5").value;
				
				for (i=0;i<	Parameters.length;i++)
				{
					Parameters[i] = Parameters[i].replace(/ /g, "_"); 	
				}
				SetWarningMessagesSetup(Parameters,Parameters.length);
				WindowsViewPort.window("DialogWindow").close();
			})
		}
}

function EditNetWorkSetupSetup()
{
		if (FlagWindowIsCreated==0)
		{	
			//var emailfile = ReadFileFromMBedAndReturnPeriexomeno('IPSET.TXT');
		
			var emailfile='';
			var url='http://'+SystemIpAdress+'/rpc/SetData/run 034;';
			url=url+Math.random()+';';
			var emailfile = XmlSynchronousHttpRequest(url,3000,timeoutFired);
			var emailfile = decodeURIComponent(emailfile);
			//return txt;
			
			var lines = new Array();
			lines = emailfile.split(";"); 
			for (i=0;i<6;i++)
			{
				if ( (lines[i] == null)  || (lines[i].length < 2) )
				lines[i]="*";
			}
			
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 5, 5, 550, 300);
			DialogWindow.setText("ΔΙΑΜΟΡΦΩΣΗ NETWORK & RS485");
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
					{type: "button", position: "center", name: "OK" , value: "ΑΠΟΘΗΚΕΥΣΗ", className :'DialogOKButtonClass'},
 					{type: "newcolumn", offset:0}
				]},
				{type: "block", width: "500", label: "", list:[	
					{type: "label", label: "IP", labelWidth: "80",name:"network_file_line_1_label_id"},
					{type: "newcolumn", offset:0},
					{type:"input", width: "250" , name:"network_file_line_1",label:"",value:lines[0],maxLength :20}	
				]},
				{type: "block", width: "500", label: "", list:[	
					{type: "label", label: "NM", labelWidth: "80"},
					{type: "newcolumn", offset:0},
					{type: "input", width: "250" , name:"network_file_line_2",label:"",value:lines[1],maxLength :20}	
				]},
				{type: "block", width: "500", label: "", list:[	
					{type: "label", label: "GW", labelWidth: "80"},
					{type: "newcolumn", offset:0},
					{type:"input", width: "250" , name:"network_file_line_3",label:"",value:lines[2],maxLength :20}	
				]},
				{type: "block", width: "500", label: "", list:[	
					{type: "label", label: "DNS", labelWidth: "80"},
					{type: "newcolumn", offset:0},
					{type:"input", width: "250" , name:"network_file_line_4",label:"",value:lines[3],maxLength :20}	
				]},
				{type: "block", width: "500", label: "", list:[	
					{type: "label", label: "PORT", labelWidth: "80"},
					{type: "newcolumn", offset:0},
					{type:"input", width: "250" , name:"network_file_line_5",label:"",value:lines[4],maxLength :20}	
				]},
				{type: "block", width: "500", label: "", list:[	
					{type: "label", label: "DHCP", labelWidth: "80"},
					{type: "newcolumn", offset:0},
					{type:"input", width: "250" , name:"network_file_line_6",label:"",value:lines[5],maxLength :20}	
				]}
			];
			//*************************************************************
			myForm = DialogWindow.attachForm(formData);
			//*************************************************************
			//************* FILL LIST BOXES *******************************
			//*************************************************************
			//*************************************************************
			//************* SET VALUES ************************************
			//*************************************************************
			//*************************************************************
			myForm.attachEvent("onChange", function(name,value,is_checked){
			});
			//*************************************************************
			myForm.attachEvent("onButtonClick", function(name){
				
				var txt=''
				var url='http://'+SystemIpAdress+'/rpc/SetData/run 035;';
				for (num=1;num<=6;num++)
				{
					var lineidtext = 'network_file_line_'+num.toString();
					url =  url + myForm.getInput(lineidtext).value + ' ';
				}
				//url = url.replace(/ /g, "_");
				//url = url.replace("~"," "); 
				url=url+Math.random()+';';
				alert(url);
				txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
				txt = decodeURIComponent(txt);
				alert(txt);
				WindowsViewPort.window("DialogWindow").close();
			})
		}
	
	
}