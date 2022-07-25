// JavaScript Document
function DoBeforeWindowCreation()
{
	document.getElementById('winVP').style.display = ''; 
}
//**********************************************************************************
function DoAfterWindowClose()
{
	document.getElementById('winVP').style.display = 'none'; 
}
//**********************************************************************************
function CreateWindowsViewPort(ViewPortDivID)
{
	WindowsViewPort = new dhtmlXWindows();
	//WindowsViewPort.enableAutoViewport(false);
	WindowsViewPort.attachViewportTo(ViewPortDivID);
	
	//WindowsViewPort.setViewport(5, 5, '100%', '100%', document.getElementById(ViewPortDivID))
	//WindowsViewPort.setImagePath("./common/windowsimg/");
}
//**********************************************************************************
function FeelSelectWithNumbersAndSelectValue(sel,from,to,step,value,fix)
{
	k=0;
	for (i=from;i<=to;i=i+step)
	{
		sel.options[sel.options.length] = new Option(i.toFixed(fix),i.toFixed(fix));
		if ( MyparseFloat(i.toFixed(fix)) == MyparseFloat(value) )
		{
			sel.selectedIndex=k;
		}
		k++;

	}
}
//**********************************************************************************
function FeelSelectWithAllVirtuals(sel,mask)
{
	sel.options[sel.options.length] = new Option('KENO', 0);
	for (i=1;i<DEF_MAXIMUM_VARIABLES;i++)
	{
		if (AllVirtualVariablesType[i] & mask)		
			sel.options[sel.options.length] = new Option(AllVirtualVariablesName[i],i);
	}
}
//**********************************************************************************
function SelectOptionInSelectByValue(sel,value)
{
	for (i=0;i<sel.options.length;i++)
	{
		if (sel.options[i].value == value)
		{
			sel.selectedIndex=i;
			break;
		}
	}
}
//**********************************************************************************
function FeelComboWithAllVirtuals(combo,mask)
{
	combo.addOption('0','KENO');
	for (i=1;i<DEF_MAXIMUM_VARIABLES;i++)
	{
		if (AllVirtualVariablesType[i] & mask)		
		combo.addOption(''+i,AllVirtualVariablesName[i]);
	}
}
//**********************************************************************************
function SelectOptionInComboByValue(combo,value)
{
	combo.selectOption(combo.getIndexByValue(value));
	//for (i=0;i<200;i++)
	//{
	//	if (combo.options[i].value == value)
	//	{
	//		combo.selectedIndex=i;
	//		break;
	//	}
	//}

}
//**********************************************************************************
function FeelComboWithDerivedVirtualsFunctions(combo)
{
	//var txt=''
	//var url='http://'+SystemIpAdress+'/'+SystemFileSystem+'/MATH_FU2.TXT ';
	//txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	//txt = decodeURIComponent(txt);
	//combo.loadXMLString(txt);
	combo.loadXMLString(Math_Fun_XML_File);
}
//**********************************************************************************
function FeelInputsWithMinuteTime(Form,in1,in2,value)
{
	var Hours   = Math.floor(value/60);
	var Minutes = (value%60);
	Form.setItemValue(in1, ''+Hours);
	Form.setItemValue(in2, ''+Minutes);
}
//**********************************************************************************
function GetInputsWithMinuteTime(Form,in1,in2)
{
	var ret=0;
	ret = parseInt(Form.getInput(in1).value,10) *60 + parseInt(Form.getInput(in2).value,10);
	return ret;
}
//**********************************************************************************
function CreateOutputDriverVirtualWindow(varid,varname,varindex,NewEdit)
{
		var Parameters = new Array();
		if (FlagWindowIsCreated==0)
		{	
			if (NewEdit == 'Edit')
			{
				var GeneralvariableSetup = GetVariableSetup(DEF_OUTPUT_DRIVER_VARIABLE,varindex);
				if (GeneralvariableSetup == "ERROR")
				{
					alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ");
					return;
				}
				Parameters = GeneralvariableSetup.split(";",25); // prosoxh sto 20
			}
			else
			{
				Parameters[0]=0;  Parameters[1]=0;  Parameters[2]=0;	Parameters[3]=0; Parameters[4]=0;
				Parameters[5]=0;  Parameters[6]=0;  Parameters[7]=0;	Parameters[8]=0; Parameters[9]=0;
				Parameters[10]=0; Parameters[11]=0; Parameters[12]=0;	Parameters[13]=0; Parameters[14]=0;
				Parameters[15]=0; Parameters[16]=0; Parameters[17]=0;	Parameters[18]=0; Parameters[19]=0;
			}
			DoBeforeWindowCreation();		
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 5, 5, 500, 550);
			DialogWindow.setText("ΟΔΗΓΟΣ ΕΞΟΔΟΥ");
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
			
			formData = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "input", label: "ID", name: "ID" , value: ''+varid , readonly:true ,style: "background-color:#CCCCCC " },
				{type: "label", labelWidth: "auto" , label: "ΟΔΗΓΟΣ ΕΞΟΔΟΥ"},
				{type: "settings", position:"label-left" , labelWidth: 150, inputWidth: 200 },
				{type: "input", label: "ONOMA:", name: "NAME" , maxLength :DEF_NAMES_MAX_LENGHT, value:varname },
				{type: "select", label: "Κατηγορία:", name: "CAT" ,options:[
						{text: "PDM", value: "1"},
						{text: "PWM", value: "2"},
						{text: "ON_OFF_ON", value: "3"},
						{text: "ON_OFF", value: "4"},
						{text: "ΘΕΣΗΣ", value: "5"},
						{text: "ΠΟΛΛΑΠΛΟΣ", value: "6"}
				]},
				
				{type: "combo", label: "ΕΞΟΔΟΣ ΟΝ:",  name:"RELEON" },
				{type: "combo", label: "ΕΞΟΔΟΣ ΟFF:", name:"RELEOFF"},
				
				{type: "block", width: 450, name:"PDMBLOCK" ,list:[
					{type: "fieldset",  name: "", label: "PDM ON", width:450, list:[
					{type: "input", label: "ton max:", name: "PDM_ON_TON_MAX" , maxLength :20, value:MyparseFloat(Parameters[3]) },
					{type: "input", label: "ton min:", name: "PDM_ON_TON_MIN" , maxLength :20, value:MyparseFloat(Parameters[4]) },
					{type: "input", label: "tcycle max:", name: "PDM_ON_TC_MAX" ,  maxLength :20, value:MyparseFloat(Parameters[5]) },
					{type: "input", label: "tcycle min:", name: "PDM_ON_TC_MIN" ,  maxLength :20, value:MyparseFloat(Parameters[6]) }
					]},
					{type: "fieldset",  name: "", label: "PDM OFF", width:450, list:[
					{type: "input", label: "ton max:", name: "PDM_OFF_TON_MAX" , maxLength :20, value:MyparseFloat(Parameters[7]) },
					{type: "input", label: "ton min:", name: "PDM_OFF_TON_MIN" , maxLength :20, value:MyparseFloat(Parameters[8]) },
					{type: "input", label: "tcycle max:", name: "PDM_OFF_TC_MAX" ,  maxLength :20, value:MyparseFloat(Parameters[9]) },
					{type: "input", label: "tcycle min:", name: "PDM_OFF_TC_MIN" ,  maxLength :20, value:MyparseFloat(Parameters[10]) }
					]}
				]},
				{type: "block", width: 450, name:"ON_OFF_ON_BLOCK" ,list:[
					{type: "fieldset",  name: "", label: "ON", width:450, list:[
					{type: "input", label: "Υστέρηση max:", name: "ONOFFON_ON_H_MAX" , maxLength :20, value:MyparseFloat(Parameters[3]) },
					{type: "input", label: "Υστέρηση min:", name: "ONOFFON_ON_H_MIN" , maxLength :20, value:MyparseFloat(Parameters[4]) }
					]},
					{type: "fieldset",  name: "", label: "OFF", width:450, list:[
					{type: "input", label: "Υστέρηση max:", name: "ONOFFON_OFF_H_MAX" , maxLength :20, value:MyparseFloat(Parameters[5]) },
					{type: "input", label: "Υστέρηση min:", name: "ONOFFON_OFF_H_MIN" , maxLength :20, value:MyparseFloat(Parameters[6]) }
					]}
				]},
				{type: "block", width: 450, name:"ON_OFF_BLOCK" ,list:[
					{type: "input", label: "Υστέρηση :", name: "ONOFF_H" , maxLength :20, value:MyparseFloat(Parameters[2]) }
				]},
				{type: "block", width: 450, name:"POSITION_BLOCK" ,list:[
					{type: "combo", label: "Θέση (0-1):", name:"POSITION_P"},
					{type: "input", label: "Νεκρή Περιοχή:", name: "POSITION_D" , maxLength :20, value:MyparseFloat(Parameters[4]) }
				]},

				{type: "block", width: 450, name:"MULTI_BLOCK" ,list:[
					{type: "input", label: "1", name: "AREA1" ,inputWidth: 50 , labelWidth: "10", maxLength :10, value:MyparseFloat(Parameters[1]) },
					{type: "input", label: "2", name: "AREA2" ,inputWidth: 50 , labelWidth: "10", maxLength :10, value:MyparseFloat(Parameters[2]) },
					{type: "input", label: "3", name: "AREA3" ,inputWidth: 50 , labelWidth: "10", maxLength :10, value:MyparseFloat(Parameters[3]) },
					{type: "input", label: "4", name: "AREA4" ,inputWidth: 50 , labelWidth: "10", maxLength :10, value:MyparseFloat(Parameters[4]) },
					{type: "input", label: "5", name: "AREA5" ,inputWidth: 50 , labelWidth: "10", maxLength :10, readonly:true ,style: "background-color:#CCCCCC " ,value:100 },
					{type: "newcolumn", offset:0},
					{type: "select", label: "-", inputWidth: 100 ,labelWidth: "10",name:"R11"},
					{type: "select", label: "-", inputWidth: 100 ,labelWidth: "10",name:"R12"},
					{type: "select", label: "-", inputWidth: 100 ,labelWidth: "10",name:"R13"},					
					{type: "select", label: "-", inputWidth: 100 ,labelWidth: "10",name:"R14"},
					{type: "select", label: "-", inputWidth: 100 ,labelWidth: "10",name:"R15"},					
					{type: "newcolumn", offset:0},
					{type: "select", label: "-", inputWidth: 100 ,labelWidth: "10",name:"R21"},
					{type: "select", label: "-", inputWidth: 100 ,labelWidth: "10",name:"R22"},
					{type: "select", label: "-", inputWidth: 100 ,labelWidth: "10",name:"R23"},					
					{type: "select", label: "-", inputWidth: 100 ,labelWidth: "10",name:"R24"},
					{type: "select", label: "-", inputWidth: 100 ,labelWidth: "10",name:"R25"},					
					{type: "newcolumn", offset:0},
					{type: "select", label: "-", inputWidth: 100 ,labelWidth: "10",name:"R31"},
					{type: "select", label: "-", inputWidth: 100 ,labelWidth: "10",name:"R32"},
					{type: "select", label: "-", inputWidth: 100 ,labelWidth: "10",name:"R33"},					
					{type: "select", label: "-", inputWidth: 100 ,labelWidth: "10",name:"R34"},
					{type: "select", label: "-", inputWidth: 100 ,labelWidth: "10",name:"R35"}					

				]},

				{type: "block", width: 450, name:"BUTTONSBLOCK" ,list:[
					{type: "button", position: "center", name: "OK" , value: "OK"},
					{type: "newcolumn", offset:0},
					{type: "button", position: "center", name: "DELETE" , value: "ΔΙΑΓΡΑΦΗ"}
				]}
				
			];
			//*************************************************************
			myForm = DialogWindow.attachForm(formData);
			FeelComboWithAllVirtuals(myForm.getCombo("RELEON"),DEF_DIGITAL_OUTPUT_VARIABLE);			
			FeelComboWithAllVirtuals(myForm.getCombo("RELEOFF"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelComboWithAllVirtuals(myForm.getCombo("POSITION_P"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("R11"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm.getSelect("R12"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm.getSelect("R13"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm.getSelect("R14"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm.getSelect("R15"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm.getSelect("R21"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm.getSelect("R22"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm.getSelect("R23"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm.getSelect("R24"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm.getSelect("R25"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm.getSelect("R31"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm.getSelect("R32"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm.getSelect("R33"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm.getSelect("R34"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm.getSelect("R35"),DEF_DIGITAL_OUTPUT_VARIABLE);
			//*************************************************************
			myForm.attachEvent("onChange", function(name,value,is_checked){
				if (name =='CAT')
				{
					
					if (value ==1) // PDM
					{
						myForm.showItem("RELEOFF");
						myForm.showItem("PDMBLOCK");
						myForm.hideItem("ON_OFF_ON_BLOCK");
						myForm.hideItem("ON_OFF_BLOCK");
						myForm.hideItem("POSITION_BLOCK");
						myForm.hideItem("MULTI_BLOCK");
					}
					else if (value ==2) // PWM
					{
						myForm.showItem("RELEOFF");
						myForm.hideItem("PDMBLOCK");
						myForm.hideItem("ON_OFF_ON_BLOCK");
						myForm.hideItem("ON_OFF_BLOCK");
						myForm.hideItem("POSITION_BLOCK");
						myForm.hideItem("MULTI_BLOCK");						
					}
					else if (value==3) // ON OFF ON
					{
						myForm.showItem("RELEOFF");
						myForm.hideItem("PDMBLOCK");
						myForm.showItem("ON_OFF_ON_BLOCK");
						myForm.hideItem("ON_OFF_BLOCK");
						myForm.hideItem("POSITION_BLOCK");
						myForm.hideItem("MULTI_BLOCK");						
					}
					else if (value==4) // ON OFF 
					{
						myForm.hideItem("RELEOFF");
						myForm.hideItem("PDMBLOCK");
						myForm.hideItem("ON_OFF_ON_BLOCK");
						myForm.showItem("ON_OFF_BLOCK");
						myForm.hideItem("POSITION_BLOCK");
						myForm.hideItem("MULTI_BLOCK");
					}
					else if (value==5) // POSITION
					{
						myForm.showItem("RELEOFF");
						myForm.hideItem("PDMBLOCK");
						myForm.hideItem("ON_OFF_ON_BLOCK");
						myForm.hideItem("ON_OFF_BLOCK");
						myForm.showItem("POSITION_BLOCK");
						myForm.hideItem("MULTI_BLOCK");
					}
					else if (value==6) // MULTI
					{
						myForm.hideItem("RELEON");
						myForm.hideItem("RELEOFF");
						myForm.hideItem("PDMBLOCK");
						myForm.hideItem("ON_OFF_ON_BLOCK");
						myForm.hideItem("ON_OFF_BLOCK");
						myForm.hideItem("POSITION_BLOCK");
						myForm.showItem("MULTI_BLOCK");
					}

				}
			});
			//*********************************************************
			if (NewEdit == 'Edit')
			{
				
				myForm.getSelect("CAT").options[Parameters[0]-1].selected=true
				if (Parameters[0] == 1) // PDM
				{
						myForm.showItem("RELEOFF");
						myForm.showItem("PDMBLOCK");
						myForm.hideItem("ON_OFF_ON_BLOCK");
						myForm.hideItem("ON_OFF_BLOCK");
						myForm.hideItem("POSITION_BLOCK");
						myForm.hideItem("MULTI_BLOCK");
						SelectOptionInComboByValue(myForm.getCombo("RELEON"),Parameters[1]);
						SelectOptionInComboByValue(myForm.getCombo("RELEOFF"),Parameters[2]);
				}
				else if (Parameters[0] == 2) //PWM
				{
						myForm.showItem("RELEOFF");
						myForm.hideItem("PDMBLOCK");
						myForm.hideItem("ON_OFF_ON_BLOCK");
						myForm.hideItem("ON_OFF_BLOCK");
						myForm.hideItem("POSITION_BLOCK");
						myForm.hideItem("MULTI_BLOCK");
						SelectOptionInComboByValue(myForm.getCombo("RELEON"),Parameters[1]);
						SelectOptionInComboByValue(myForm.getCombo("RELEOFF"),Parameters[2]);
				}
				else if (Parameters[0] == 3) // ON OFF ON
				{
						myForm.showItem("RELEOFF");
						myForm.hideItem("PDMBLOCK");
						myForm.showItem("ON_OFF_ON_BLOCK");
						myForm.hideItem("ON_OFF_BLOCK");
						myForm.hideItem("POSITION_BLOCK");	
						myForm.hideItem("MULTI_BLOCK");						
						SelectOptionInComboByValue(myForm.getCombo("RELEON"),Parameters[1]);
						SelectOptionInComboByValue(myForm.getCombo("RELEOFF"),Parameters[2]);
				}
				else if (Parameters[0] == 4)// ON OFF 
				{
						myForm.hideItem("RELEOFF");
						myForm.hideItem("PDMBLOCK");
						myForm.hideItem("ON_OFF_ON_BLOCK");
						myForm.showItem("ON_OFF_BLOCK");
						myForm.hideItem("POSITION_BLOCK");
						myForm.hideItem("MULTI_BLOCK");						
						SelectOptionInComboByValue(myForm.getCombo("RELEON"),Parameters[1]);
				}
				else if (Parameters[0] == 5)// POSITION
				{
						myForm.showItem("RELEOFF");
						myForm.hideItem("PDMBLOCK");
						myForm.hideItem("ON_OFF_ON_BLOCK");
						myForm.hideItem("ON_OFF_BLOCK");
						myForm.showItem("POSITION_BLOCK");
						myForm.hideItem("MULTI_BLOCK");						
						SelectOptionInComboByValue(myForm.getCombo("RELEON"),Parameters[1]);
						SelectOptionInComboByValue(myForm.getCombo("RELEOFF"),Parameters[2]);
						SelectOptionInComboByValue(myForm.getCombo("POSITION_P"),Parameters[3]);
				}
				else if (Parameters[0] == 6)// multi
				{
						myForm.hideItem("RELEON");
						myForm.hideItem("RELEOFF");
						myForm.hideItem("PDMBLOCK");
						myForm.hideItem("ON_OFF_ON_BLOCK");
						myForm.hideItem("ON_OFF_BLOCK");
						myForm.hideItem("POSITION_BLOCK");
						myForm.showItem("MULTI_BLOCK");			
						SelectOptionInSelectByValue(myForm.getSelect("R11"),Parameters[6]);
						SelectOptionInSelectByValue(myForm.getSelect("R21"),Parameters[7]);
						SelectOptionInSelectByValue(myForm.getSelect("R31"),Parameters[8]);
						SelectOptionInSelectByValue(myForm.getSelect("R12"),Parameters[9]);
						SelectOptionInSelectByValue(myForm.getSelect("R22"),Parameters[10]);
						SelectOptionInSelectByValue(myForm.getSelect("R32"),Parameters[11]);
						SelectOptionInSelectByValue(myForm.getSelect("R13"),Parameters[12]);
						SelectOptionInSelectByValue(myForm.getSelect("R23"),Parameters[13]);
						SelectOptionInSelectByValue(myForm.getSelect("R33"),Parameters[14]);
						SelectOptionInSelectByValue(myForm.getSelect("R14"),Parameters[15]);
						SelectOptionInSelectByValue(myForm.getSelect("R24"),Parameters[16]);
						SelectOptionInSelectByValue(myForm.getSelect("R34"),Parameters[17]);
						SelectOptionInSelectByValue(myForm.getSelect("R15"),Parameters[18]);
						SelectOptionInSelectByValue(myForm.getSelect("R25"),Parameters[19]);
						SelectOptionInSelectByValue(myForm.getSelect("R35"),Parameters[20]);
				}

			}
			else
			{
				myForm.hideItem("DELETE");
				myForm.getSelect("CAT").options[0].selected=true
				myForm.getCombo("RELEON").selectOption(0);
				myForm.getCombo("RELEOFF").selectOption(0);
				myForm.showItem("PDMBLOCK");
				myForm.hideItem("ON_OFF_ON_BLOCK");
				myForm.hideItem("ON_OFF_BLOCK");
				myForm.hideItem("POSITION_BLOCK");
				myForm.hideItem("MULTI_BLOCK");			
			}
			//*************************************************************
			myForm.setUserData('ID','NEWEDIT',varindex.toString());

			myForm.attachEvent("onButtonClick", function(name){
			 
			  if (name == 'OK')
			  {
			  	var Parameters = new Array();
			  	Parameters[0]=myForm.getSelect("CAT").options[myForm.getSelect("CAT").selectedIndex].value;
				if (Parameters[0] == 1) // PDM
				{
					Parameters[1]=myForm.getCombo("RELEON").getSelectedValue();
				  	Parameters[2]=myForm.getCombo("RELEOFF").getSelectedValue();
					Parameters[3]=myForm.getInput("PDM_ON_TON_MAX").value;
					Parameters[4]=myForm.getInput("PDM_ON_TON_MIN").value;
					Parameters[5]=myForm.getInput("PDM_ON_TC_MAX").value;
					Parameters[6]=myForm.getInput("PDM_ON_TC_MIN").value;					
					Parameters[7]=myForm.getInput("PDM_OFF_TON_MAX").value;
					Parameters[8]=myForm.getInput("PDM_OFF_TON_MIN").value;
					Parameters[9]=myForm.getInput("PDM_OFF_TC_MAX").value;
					Parameters[10]=myForm.getInput("PDM_OFF_TC_MIN").value;					
				}
				else if (Parameters[0] == 2) // PWM
				{
				  	Parameters[1]=myForm.getCombo("RELEON").getSelectedValue();
				  	Parameters[2]=myForm.getCombo("RELEOFF").getSelectedValue();
				}
				else if (Parameters[0] == 3)  // ON OFF ON 
				{
					Parameters[1]=myForm.getCombo("RELEON").getSelectedValue();
				  	Parameters[2]=myForm.getCombo("RELEOFF").getSelectedValue();
					Parameters[3]=myForm.getInput("ONOFFON_ON_H_MAX").value;
					Parameters[4]=myForm.getInput("ONOFFON_ON_H_MIN").value;
					Parameters[5]=myForm.getInput("ONOFFON_OFF_H_MAX").value;
					Parameters[6]=myForm.getInput("ONOFFON_OFF_H_MIN").value;					
				}
				else if (Parameters[0] == 4)  // ON OFF  
				{
					Parameters[1]=myForm.getCombo("RELEON").getSelectedValue();
					Parameters[2]=myForm.getInput("ONOFF_H").value;
					Parameters[3]=myForm.getInput("ONOFF_H").value; // TO STELNOYME DYO FORES
				}
				else if (Parameters[0] == 5)  // POSITION  
				{
					Parameters[1]=myForm.getCombo("RELEON").getSelectedValue();
				  	Parameters[2]=myForm.getCombo("RELEOFF").getSelectedValue();
				  	Parameters[3]=myForm.getCombo("POSITION_P").getSelectedValue();
					Parameters[4]=myForm.getInput("POSITION_D").value;
				}
				else if (Parameters[0] == 6)  // MULTI  
				{
					Parameters[1]=myForm.getInput("AREA1").value;
					Parameters[2]=myForm.getInput("AREA2").value;
					Parameters[3]=myForm.getInput("AREA3").value;
					Parameters[4]=myForm.getInput("AREA4").value;
					Parameters[5]=myForm.getInput("AREA5").value;					
					Parameters[6]=myForm.getSelect("R11").options[myForm.getSelect("R11").selectedIndex].value;
					Parameters[7]=myForm.getSelect("R21").options[myForm.getSelect("R21").selectedIndex].value;					
					Parameters[8]=myForm.getSelect("R31").options[myForm.getSelect("R31").selectedIndex].value;
					Parameters[9]=myForm.getSelect("R12").options[myForm.getSelect("R12").selectedIndex].value;
					Parameters[10]=myForm.getSelect("R22").options[myForm.getSelect("R22").selectedIndex].value;					
					Parameters[11]=myForm.getSelect("R32").options[myForm.getSelect("R32").selectedIndex].value;
					Parameters[12]=myForm.getSelect("R13").options[myForm.getSelect("R13").selectedIndex].value;
					Parameters[13]=myForm.getSelect("R23").options[myForm.getSelect("R23").selectedIndex].value;					
					Parameters[14]=myForm.getSelect("R33").options[myForm.getSelect("R33").selectedIndex].value;
					Parameters[15]=myForm.getSelect("R14").options[myForm.getSelect("R14").selectedIndex].value;
					Parameters[16]=myForm.getSelect("R24").options[myForm.getSelect("R24").selectedIndex].value;					
					Parameters[17]=myForm.getSelect("R34").options[myForm.getSelect("R34").selectedIndex].value;
					Parameters[18]=myForm.getSelect("R15").options[myForm.getSelect("R15").selectedIndex].value;
					Parameters[19]=myForm.getSelect("R25").options[myForm.getSelect("R25").selectedIndex].value;					
					Parameters[20]=myForm.getSelect("R35").options[myForm.getSelect("R35").selectedIndex].value;

				}

			  	SetVariableSetup(DEF_OUTPUT_DRIVER_VARIABLE,myForm.getInput("ID").value,myForm.getUserData('ID','NEWEDIT'),myForm.getInput("NAME").value,Parameters,Parameters.length);
			  }
			  else
			  {
				  DeleteVariable(myForm.getInput("ID").value);
			  }
			  WindowsViewPort.window("DialogWindow").close();
			  ReloadVariablesGrid();
			})
		}

}
//**********************************************************************************
function CreateControllerVirtualWindow(varid,varname,varindex,NewEdit)
{
		var Parameters = new Array();
		if (FlagWindowIsCreated==0)
		{	
			if (NewEdit == 'Edit')
			{
				var GeneralvariableSetup = GetVariableSetup(DEF_CONTROLLER_VARIABLE,varindex);
				if (GeneralvariableSetup == "ERROR")
				{
					alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ");
					return;
				}
				Parameters = GeneralvariableSetup.split(";",20); // prosoxh sto 20
			}
			else
			{
				Parameters[0]=0;  Parameters[1]=0;  Parameters[2]=0;	Parameters[3]=0; Parameters[4]=0;
				Parameters[5]=0;  Parameters[6]=0;  Parameters[7]=0;	Parameters[8]=0; Parameters[9]=0;
				Parameters[10]=0; Parameters[11]=0; Parameters[12]=0;	Parameters[13]=0; Parameters[14]=0;
				Parameters[15]=0; Parameters[16]=0; Parameters[17]=0;	Parameters[18]=0; Parameters[19]=0;
			}
			DoBeforeWindowCreation();				
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 10, 10, 500, 470);
			DialogWindow.setText("ΕΛΕΓΚΤΗΣ");
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
				{type: "input", label: "ID", name: "ID" , value: ''+varid , readonly:true ,style: "background-color:#CCCCCC " },
				{type: "label", labelWidth: "auto" , label: "ΕΛΕΓΚΤΗΣ"},
				{type: "settings", position:"label-left" , labelWidth: 150, inputWidth: 200 },
				{type: "input", label: "ONOMA:", name: "NAME" , maxLength :DEF_NAMES_MAX_LENGHT, value:varname },
				
				{type: "select", label: "Κατηγορία:", name: "CAT" ,options:[
						{text: "PID", value: "1"},
						{text: "Διακόπτης", value: "2"}
				]},
				{type: "block", width: 450, name:"PIDBLOCK" ,list:[
					{type: "input", label: "Kp:", name: "PID_KP" , maxLength :20, value:MyparseFloat(Parameters[1]) },
					{type: "input", label: "Ki:", name: "PID_KI" , maxLength :20, value:MyparseFloat(Parameters[2]) },
					{type: "input", label: "Kd:", name: "PID_KD" , maxLength :20, value:MyparseFloat(Parameters[3]) },
					{type: "input", label: "Νεκρή Ζώνη:", name: "PID_DZ" , maxLength :20, value:MyparseFloat(Parameters[4]) },
					{type: "select", label: "Τύπος PID", name: "PID_TYPE" ,options:[
						{text: "Κλασικός",  value: "0"},
						{text: "Επιτάχυνση", value: "1"}
					]},
					{type: "checkbox", label: "Διπολικός (-1..1)", name:"PID_BIP" ,checked: false}
					
				]},
				
				{type: "block", width: 450, name:"SWITCHBLOCK" ,list:[
					{type: "input", label: "Κατώφλι On:", name: "SWITCH_ON" , maxLength :20, value:MyparseFloat(Parameters[1]) },
					{type: "input", label: "Κατώφλι Off:", name: "SWITCH_OFF" , maxLength :20, value:MyparseFloat(Parameters[2]) },
					{type: "input", label: "Εξοδος On:", name: "SWITCH_OUT_ON" , maxLength :20, value:MyparseFloat(Parameters[3]) },			
					{type: "input", label: "Εξοδος Off:", name: "SWITCH_OUT_OFF" , maxLength :20, value:MyparseFloat(Parameters[4]) },
					{type: "input", label: "Καθυστέρηση On:", name: "SWITCH_DEL_ON" , maxLength :20, value:MyparseFloat(Parameters[5]) },			
					{type: "input", label: "Καθυστέρηση Off:", name: "SWITCH_DEL_OFF" , maxLength :20, value:MyparseFloat(Parameters[6]) }
					
				]},
				
				{type: "combo", label: "ΠΡΟΣΟΤΡΟΦΟΔΟΤΗΣΗ :", name:"FFOR" },
				{type: "input", label: "Δειγματοληψεία (sec):", name: "SEC" , maxLength :20, value: MyparseFloat(Parameters[8])},
				{type: "block", width: 450, name:"BUTTONSBLOCK" ,list:[
					{type: "button", position: "center", name: "OK" , value: "OK"},
					{type: "newcolumn", offset:0},
					{type: "button", position: "center", name: "DELETE" , value: "ΔΙΑΓΡΑΦΗ"}
				]}
			];
			//*************************************************************
			myForm = DialogWindow.attachForm(formData);
			FeelComboWithAllVirtuals(myForm.getCombo("FFOR"),DEF_ALL_VIRTUALS_MASK);
			//*************************************************************
			myForm.attachEvent("onChange", function(name,value,is_checked){
				if (name =='CAT')
				{
					if (value ==1) // PID
					{
						myForm.hideItem("SWITCHBLOCK");
						myForm.showItem("PIDBLOCK");
					}
					else // switch
					{
						myForm.hideItem("PIDBLOCK");
						myForm.showItem("SWITCHBLOCK");
					}
				}
			});
			//*********************************************************
			SelectOptionInComboByValue(myForm.getCombo("FFOR"),Parameters[7]);
			//myForm.getCombo("FFOR").selectOption(Parameters[7]);
			if (NewEdit == 'Edit')
			{
				//myForm.getSelect("CAT").options[Parameters[0]-1].selected=true
				SelectOptionInSelectByValue(myForm.getSelect("CAT"),Parameters[0]);
				if (Parameters[0] == 1) // PID
				{
						myForm.hideItem("SWITCHBLOCK");
						myForm.showItem("PIDBLOCK");
						myForm.getSelect("PID_TYPE").options[Parameters[5]].selected=true
						if (Parameters[6] ==1 )	myForm.checkItem("PID_BIP");
				}
				else
				{
						myForm.hideItem("PIDBLOCK");
						myForm.showItem("SWITCHBLOCK");
				}
			}
			else
			{
				myForm.hideItem("DELETE");
				myForm.getSelect("CAT").options[0].selected=true
				myForm.hideItem("SWITCHBLOCK");
			}
			myForm.setUserData('ID','NEWEDIT',varindex.toString());

			myForm.attachEvent("onButtonClick", function(name){
			 
			  if (name == 'OK')
			  {
			  	var Parameters = new Array();
			  	Parameters[0]=myForm.getSelect("CAT").options[myForm.getSelect("CAT").selectedIndex].value;
				if (Parameters[0] == 1) // PID
				{
					Parameters[1]=myForm.getInput("PID_KP").value;
					Parameters[2]=myForm.getInput("PID_KI").value;
					Parameters[3]=myForm.getInput("PID_KD").value;					
					Parameters[4]=myForm.getInput("PID_DZ").value;					
				  	Parameters[5]=myForm.getSelect("PID_TYPE").options[myForm.getSelect("PID_TYPE").selectedIndex].value;					
					if ( myForm.isItemChecked("PID_BIP") ) {Parameters[6]=1;} else {Parameters[6]=0;}
				  	Parameters[7]=myForm.getCombo("FFOR").getSelectedValue();
					Parameters[8]=myForm.getInput("SEC").value;	
				}
				else // SWITCH
				{
					Parameters[1]=myForm.getInput("SWITCH_ON").value;
					Parameters[2]=myForm.getInput("SWITCH_OFF").value;
					Parameters[3]=myForm.getInput("SWITCH_OUT_ON").value;					
					Parameters[4]=myForm.getInput("SWITCH_OUT_OFF").value;				
					Parameters[5]=myForm.getInput("SWITCH_DEL_ON").value;					
					Parameters[6]=myForm.getInput("SWITCH_DEL_OFF").value;				
				  	Parameters[7]=myForm.getCombo("FFOR").getSelectedValue();
					Parameters[8]=myForm.getInput("SEC").value;	
				}

			  	SetVariableSetup(DEF_CONTROLLER_VARIABLE,myForm.getInput("ID").value,myForm.getUserData('ID','NEWEDIT'),myForm.getInput("NAME").value,Parameters,Parameters.length);
			  }
			  else
			  {
				  DeleteVariable(myForm.getInput("ID").value);
			  }
			  WindowsViewPort.window("DialogWindow").close();
			  ReloadVariablesGrid();
			})
		}
		
}

//**********************************************************************************
function CreateRampVirtualWindow(varid,varname,varindex,NewEdit)
{
		var Parameters = new Array();
		if (FlagWindowIsCreated==0)
		{	
			if (NewEdit == 'Edit')
			{
				var GeneralvariableSetup = GetVariableSetup(DEF_RAMP_VARIABLE,varindex);
				if (GeneralvariableSetup == "ERROR")
				{
					alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ");
					return;
				}
				Parameters = GeneralvariableSetup.split(";",20);
			}
			else
			{
				Parameters[0]=0;  Parameters[1]=0;  Parameters[2]=0;	Parameters[3]=0; Parameters[4]=0;
				Parameters[5]=0;  Parameters[6]=0;  Parameters[7]=0;	Parameters[8]=0; Parameters[9]=0;
				Parameters[10]=0; Parameters[11]=0; Parameters[12]=0;	Parameters[13]=0; Parameters[14]=0;
				Parameters[15]=0; Parameters[16]=0; Parameters[17]=0;	Parameters[18]=0; Parameters[19]=0;
			}
			DoBeforeWindowCreation();					
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 10, 10, 500, 470);
			DialogWindow.setText("ΣΥΝΤΕΛΕΣΤΕΣ ΧΡΟΝΙΚΗΣ ΜΕΤΑΒΛΗΤΗΣ (ΕΠΙΠΕΔΟΥ)");
			FlagWindowIsCreated=1;
			DialogWindow.setModal(true);
			OnCloseEvent = DialogWindow.attachEvent("onClose", function(win){
				FlagWindowIsCreated=0;
				WindowsViewPort.window(win.getId()).detachEvent(OnCloseEvent);
				WindowsViewPort.window(win.getId()).close();
				DoAfterWindowClose();
    		});
			//w1.button("close").disable();
			DialogWindow.denyResize();
			DialogWindow.denyPark();
			DialogWindow.button("minmax1").hide();
			DialogWindow.button("minmax2").hide();
			//w1.button("park").hide();
			formData = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "input", label: "ID", name: "ID" , value: ''+varid , readonly:true ,style: "background-color:#CCCCCC " },
				{type: "label", labelWidth: "auto" , label: "ΣΥΝΤΕΛΕΣΤΕΣ ΧΡΟΝΙΚΗΣ ΜΕΤΑΒΛΗΤΗΣ (ΕΠΙΠΕΔΟΥ)"},
				{type: "settings", position:"label-left" , labelWidth: 100, inputWidth: 200 },
				{type: "input", label: "ONOMA:", name: "NAME" , maxLength :DEF_NAMES_MAX_LENGHT, value:varname },
				
				{type: "block", width: 450, list:[
					{type: "newcolumn", offset:0 },
					{type: "select", label: "ΜΕΤΑΒΛΗΤΗ 1 :", name:"X0" },
					{type: "select", label: "ΜΕΤΑΒΛΗΤΗ 2 :", name:"X1" },
					{type: "select", label: "ΜΕΤΑΒΛΗΤΗ 3 :", name:"X2" },
					{type: "select", label: "ΜΕΤΑΒΛΗΤΗ 4 :", name:"X3" },
					{type: "select", label: "ΜΕΤΑΒΛΗΤΗ 5 :", name:"X4" },
					{type: "select", label: "ΜΕΤΑΒΛΗΤΗ 6 :", name:"X5" },
					{type: "select", label: "ΜΕΤΑΒΛΗΤΗ 7 :", name:"X6" },
					{type: "select", label: "ΜΕΤΑΒΛΗΤΗ 8 :", name:"X7" },
					{type: "select", label: "ΜΕΤΑΒΛΗΤΗ 9 :", name:"X8" },
					{type: "select", label: "ΜΕΤΑΒΛΗΤΗ 10:", name:"X9" },
				
					{type: "newcolumn", offset:0},
					{type: "input", labelWidth: 45, inputWidth: 45 ,label: "HH:MM ", maxLength:5, name: "HA0" , value: "00:00"},
					{type: "input", labelWidth: 45, inputWidth: 45 ,label: "HH:MM ", maxLength:5, name: "HA1" , value: "00:00"},
					{type: "input", labelWidth: 45, inputWidth: 45 ,label: "HH:MM ", maxLength:5, name: "HA2" , value: "00:00"},
					{type: "input", labelWidth: 45, inputWidth: 45 ,label: "HH:MM ", maxLength:5, name: "HA3" , value: "00:00"},
					{type: "input", labelWidth: 45, inputWidth: 45 ,label: "HH:MM ", maxLength:5, name: "HA4" , value: "00:00"},				
					{type: "input", labelWidth: 45, inputWidth: 45 ,label: "HH:MM ", maxLength:5, name: "HA5" , value: "00:00"},
					{type: "input", labelWidth: 45, inputWidth: 45 ,label: "HH:MM ", maxLength:5, name: "HA6" , value: "00:00"},
					{type: "input", labelWidth: 45, inputWidth: 45 ,label: "HH:MM ", maxLength:5, name: "HA7" , value: "00:00"},
					{type: "input", labelWidth: 45, inputWidth: 45 ,label: "HH:MM ", maxLength:5, name: "HA8" , value: "00:00"},
					{type: "input", labelWidth: 45, inputWidth: 45 ,label: "HH:MM ", maxLength:5, name: "HA9" , value: "00:00"}				
				]},
				
				{type: "block", width: 450, name:"BUTTONSBLOCK" ,list:[
					{type: "button", position: "center", name: "OK" , value: "OK"},
					{type: "newcolumn", offset:0},
					{type: "button", position: "center", name: "DELETE" , value: "ΔΙΑΓΡΑΦΗ"}
				]}

				

			];
			myForm = DialogWindow.attachForm(formData);
			myForm.setItemValue("HA0", MinutesTo24Time(Parameters[10])); 
			myForm.setItemValue("HA1", MinutesTo24Time(Parameters[11])); 
			myForm.setItemValue("HA2", MinutesTo24Time(Parameters[12])); 
			myForm.setItemValue("HA3", MinutesTo24Time(Parameters[13])); 
			myForm.setItemValue("HA4", MinutesTo24Time(Parameters[14])); 
			myForm.setItemValue("HA5", MinutesTo24Time(Parameters[15])); 
			myForm.setItemValue("HA6", MinutesTo24Time(Parameters[16])); 
			myForm.setItemValue("HA7", MinutesTo24Time(Parameters[17])); 
			myForm.setItemValue("HA8", MinutesTo24Time(Parameters[18])); 
			myForm.setItemValue("HA9", MinutesTo24Time(Parameters[19])); 
			
			//FeelSelectWithAllVirtuals(myForm.getSelect("ENABLE"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("X0"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("X1"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("X2"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("X3"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("X4"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("X5"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("X6"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("X7"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("X8"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("X9"),DEF_ALL_VIRTUALS_MASK);
			//*********************************************************
			if (NewEdit == 'Edit')
			{
				myForm.getSelect("X0").options[Parameters[0]].selected=true
				myForm.getSelect("X1").options[Parameters[1]].selected=true
				myForm.getSelect("X2").options[Parameters[2]].selected=true
				myForm.getSelect("X3").options[Parameters[3]].selected=true
				myForm.getSelect("X4").options[Parameters[4]].selected=true
				myForm.getSelect("X5").options[Parameters[5]].selected=true
				myForm.getSelect("X6").options[Parameters[6]].selected=true
				myForm.getSelect("X7").options[Parameters[7]].selected=true
				myForm.getSelect("X8").options[Parameters[8]].selected=true
				myForm.getSelect("X9").options[Parameters[9]].selected=true
			}
			else
			{
				
				//myForm.getCombo("X0").selectOption(0);
				myForm.getSelect("X0").options[0].selected=true
				myForm.getSelect("X1").options[0].selected=true
				myForm.getSelect("X2").options[0].selected=true
				myForm.getSelect("X3").options[0].selected=true
				myForm.getSelect("X4").options[0].selected=true
				myForm.getSelect("X5").options[0].selected=true
				myForm.getSelect("X6").options[0].selected=true
				myForm.getSelect("X7").options[0].selected=true
				myForm.getSelect("X8").options[0].selected=true
				myForm.getSelect("X9").options[0].selected=true
			}
			myForm.setUserData('ID','NEWEDIT',varindex.toString());
			myForm.attachEvent("onButtonClick", function(name){
			  if (name == 'OK')
			  {
			  var Parameters = new Array();
			  Parameters[0]=myForm.getSelect("X0").options[myForm.getSelect("X0").selectedIndex].value;
			  Parameters[1]=myForm.getSelect("X1").options[myForm.getSelect("X1").selectedIndex].value;
			  Parameters[2]=myForm.getSelect("X2").options[myForm.getSelect("X2").selectedIndex].value;
			  Parameters[3]=myForm.getSelect("X3").options[myForm.getSelect("X3").selectedIndex].value;
			  Parameters[4]=myForm.getSelect("X4").options[myForm.getSelect("X4").selectedIndex].value;
			  Parameters[5]=myForm.getSelect("X5").options[myForm.getSelect("X5").selectedIndex].value;
			  Parameters[6]=myForm.getSelect("X6").options[myForm.getSelect("X6").selectedIndex].value;
			  Parameters[7]=myForm.getSelect("X7").options[myForm.getSelect("X7").selectedIndex].value;
			  Parameters[8]=myForm.getSelect("X8").options[myForm.getSelect("X8").selectedIndex].value;
			  Parameters[9]=myForm.getSelect("X9").options[myForm.getSelect("X9").selectedIndex].value;
			  Parameters[10]=H24ToMinutes(myForm.getInput("HA0").value);		
			  Parameters[11]=H24ToMinutes(myForm.getInput("HA1").value);		
			  Parameters[12]=H24ToMinutes(myForm.getInput("HA2").value);		
			  Parameters[13]=H24ToMinutes(myForm.getInput("HA3").value);		
			  Parameters[14]=H24ToMinutes(myForm.getInput("HA4").value);		
			  Parameters[15]=H24ToMinutes(myForm.getInput("HA5").value);		
			  Parameters[16]=H24ToMinutes(myForm.getInput("HA6").value);		
			  Parameters[17]=H24ToMinutes(myForm.getInput("HA7").value);		
			  Parameters[18]=H24ToMinutes(myForm.getInput("HA8").value);		
			  Parameters[19]=H24ToMinutes(myForm.getInput("HA9").value);		
			  SetVariableSetup(DEF_RAMP_VARIABLE,myForm.getInput("ID").value,myForm.getUserData('ID','NEWEDIT'),myForm.getInput("NAME").value,Parameters,Parameters.length);
			  }
			  else
			  {
				  DeleteVariable(myForm.getInput("ID").value);
			  }
			  WindowsViewPort.window("DialogWindow").close();
			  ReloadVariablesGrid();
			})
		}

}
//*************************************************************************************************************
function CreateDerivedVirtualWindow(varid,varname,varindex,NewEdit)
{
		StopDataAcquisition();
		//if(!MasterCodeIsOK) return;
		var Parameters = new Array();
		if (FlagWindowIsCreated==0)
		{	
			if ( (NewEdit == 'Edit') || (NewEdit == 'Copy') )
			{
				var GeneralvariableSetup = GetVariableSetup(DEF_DERIVED_VARIABLE,varindex);
				if (GeneralvariableSetup == "ERROR")
				{
					alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ");
					return;
				}
				Parameters = GeneralvariableSetup.split(";",11);
			}
			else
			{
				Parameters[0]=0;
				Parameters[1]=0;
				Parameters[2]=0;
				Parameters[3]=0;
				Parameters[4]=0;
				Parameters[5]=0;
				Parameters[6]=0;
				Parameters[7]=0;
				Parameters[8]=0;
				Parameters[9]=0;
				Parameters[10]=0;
			}
			DoBeforeWindowCreation();		
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 10, 10, 500, 550);
			DialogWindow.setText("ΔΙΟΡΘΩΣΗ ΜΑΘΗΜΑΤΙΚΗΣ ΜΕΤΑΒΛΗΤΗΣ");
			FlagWindowIsCreated=1;
			DialogWindow.setModal(true);
			OnCloseEvent = DialogWindow.attachEvent("onClose", function(win){
				FlagWindowIsCreated=0;
				WindowsViewPort.window(win.getId()).detachEvent(OnCloseEvent);
				WindowsViewPort.window(win.getId()).close();
				DoAfterWindowClose();
    		});
			//w1.button("close").disable();
			DialogWindow.denyResize();
			DialogWindow.denyPark();
			DialogWindow.button("minmax1").hide();
			DialogWindow.button("minmax2").hide();
			//w1.button("park").hide();
			var BackGroundColor = "background-color:#CCCCCC ";
			if (NewEdit != 'Edit') 
			{
				BackGroundColor = "background-color:#EE0000 ";
				DialogWindow.setText("ΝΕΑ ΜΑΘΗΜΑΤΙΚΗ ΜΕΤΑΒΛΗΤΗ");
				varindex=-1;
			}
			formData = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "input", label: "ID", name: "ID" , value: ''+varid , readonly:true ,style: BackGroundColor },
				{type: "label", labelWidth: "auto" , name: "LABELNAME" , label: "ΣΥΝΤΕΛΕΣΤΕΣ ΜΑΘΗΜΑΤΙΚΗΣ ΜΕΤΑΒΛΗΤΗΣ"},
				{type: "settings", position: "label-left", labelWidth: 120, inputWidth: 200 },
				{type: "input", label: "ONOMA:", name: "NAME" , labelWidth: 200, maxLength:DEF_NAMES_MAX_LENGHT, value:varname ,style: BackGroundColor },
				{type: "combo", label: "ΣΥΝΑΡΤΗΣΗ:",   name:"FUN", labelWidth: 200},
				{type: "combo", label: "ΜΕΤΑΒΛΗΤΗ 1:", name:"X0" , labelWidth: 200},
				{type: "combo", label: "ΜΕΤΑΒΛΗΤΗ 2:", name:"X1" , labelWidth: 200},
				{type: "combo", label: "ΜΕΤΑΒΛΗΤΗ 3:", name:"X2" , labelWidth: 200},
				{type: "combo", label: "ΜΕΤΑΒΛΗΤΗ 4:", name:"X3" , labelWidth: 200},
				{type: "combo", label: "ΜΕΤΑΒΛΗΤΗ 5:", name:"X4" , labelWidth: 200},
				{type: "input", label: "ΣΥΝΤΕΛΕΣΤΗΣ 1:", name: "A0" , labelWidth: 200, value: MyparseFloat(Parameters[1])},
				{type: "input", label: "ΣΥΝΤΕΛΕΣΤΗΣ 2:", name: "A1" , labelWidth: 200, value: MyparseFloat(Parameters[2])},
				{type: "input", label: "ΣΥΝΤΕΛΕΣΤΗΣ 3:", name: "A2" , labelWidth: 200, value: MyparseFloat(Parameters[3])},
				{type: "input", label: "ΣΥΝΤΕΛΕΣΤΗΣ 4:", name: "A3" , labelWidth: 200, value: MyparseFloat(Parameters[4])},
				{type: "input", label: "ΣΥΝΤΕΛΕΣΤΗΣ 5:", name: "A4" , labelWidth: 200, value: MyparseFloat(Parameters[5])},				

				{type: "block", width: 450, name:"BUTTONSBLOCK" ,list:[
					{type: "button", position: "center", name: "OK" , value: "OK"},
					{type: "newcolumn", offset:0},
					{type: "button", position: "center", name: "DELETE" , value: "ΔΙΑΓΡΑΦΗ"},
					{type: "newcolumn", offset:0},
					{type: "button", position: "center", name: "HELP" , value: "ΒΟΗΘΕΙΑ"}
				]}

			];
			myForm = DialogWindow.attachForm(formData);
			FeelComboWithDerivedVirtualsFunctions(myForm.getCombo("FUN"));
			FeelComboWithAllVirtuals(myForm.getCombo("X0"),DEF_ALL_VIRTUALS_MASK);
			FeelComboWithAllVirtuals(myForm.getCombo("X1"),DEF_ALL_VIRTUALS_MASK);
			FeelComboWithAllVirtuals(myForm.getCombo("X2"),DEF_ALL_VIRTUALS_MASK);
			FeelComboWithAllVirtuals(myForm.getCombo("X3"),DEF_ALL_VIRTUALS_MASK);
			FeelComboWithAllVirtuals(myForm.getCombo("X4"),DEF_ALL_VIRTUALS_MASK);
			//*********************************************************
			myForm.attachEvent("onChange", function(name,value,is_checked){
				if (name =='FUN')
				{
					var FUNData = new Array();
					FUNData=myForm.getCombo("FUN").getSelectedValue().split(";");
						if (FUNData[1] == 0)
						{
							myForm.hideItem("X0");myForm.hideItem("X1");myForm.hideItem("X2");myForm.hideItem("X3");myForm.hideItem("X4");
						}
						if (FUNData[1] == 1)
						{
							myForm.showItem("X0");myForm.hideItem("X1");myForm.hideItem("X2");myForm.hideItem("X3");myForm.hideItem("X4");
							myForm.setItemLabel("X0", FUNData[3]);
						}
						if (FUNData[1] == 2)
						{
							myForm.showItem("X0");myForm.showItem("X1");myForm.hideItem("X2");myForm.hideItem("X3");myForm.hideItem("X4");
							myForm.setItemLabel("X0", FUNData[3]);myForm.setItemLabel("X1", FUNData[4]);
						}
						if (FUNData[1] == 3)
						{
							myForm.showItem("X0");myForm.showItem("X1");myForm.showItem("X2");myForm.hideItem("X3");myForm.hideItem("X4");
							myForm.setItemLabel("X0", FUNData[3]);myForm.setItemLabel("X1", FUNData[4]);myForm.setItemLabel("X2", FUNData[5]);
						}
						if (FUNData[1] == 4)
						{
							myForm.showItem("X0");myForm.showItem("X1");myForm.showItem("X2");myForm.showItem("X3");myForm.hideItem("X4");
							myForm.setItemLabel("X0", FUNData[3]);myForm.setItemLabel("X1", FUNData[4]);myForm.setItemLabel("X2", FUNData[5]);myForm.setItemLabel("X3", FUNData[6]);
						}
						if (FUNData[1] == 5)
						{
							myForm.showItem("X0");myForm.showItem("X1");myForm.showItem("X2");myForm.showItem("X3");myForm.showItem("X4");
							myForm.setItemLabel("X0", FUNData[3]);myForm.setItemLabel("X1", FUNData[4]);myForm.setItemLabel("X2", FUNData[5]);myForm.setItemLabel("X3", FUNData[6]);myForm.setItemLabel("X4", FUNData[7]);
						}
						//***************************************************
						if(!MasterCodeIsOK)
						{
							myForm.hideItem("X0");myForm.hideItem("X1");myForm.hideItem("X2");myForm.hideItem("X3");myForm.hideItem("X4");
							myForm.hideItem("FUN");
							myForm.hideItem("DELETE");
							myForm.hideItem("HELP");
							myForm.hideItem("NAME");
							myForm.hideItem("ID");
							myForm.hideItem("LABELNAME");							
							
							DialogWindow.setText("");
						}
						
						
						//***************************************************
						if (FUNData[2] == 0)
						{
							myForm.hideItem("A0");myForm.hideItem("A1");myForm.hideItem("A2");myForm.hideItem("A3");myForm.hideItem("A4");
						}
						if (FUNData[2] == 1)
						{
							myForm.showItem("A0");myForm.hideItem("A1");myForm.hideItem("A2");myForm.hideItem("A3");myForm.hideItem("A4");
							myForm.setItemLabel("A0", FUNData[8]);
						}
						if (FUNData[2] == 2)
						{
							myForm.showItem("A0");myForm.showItem("A1");myForm.hideItem("A2");myForm.hideItem("A3");myForm.hideItem("A4");
							myForm.setItemLabel("A0", FUNData[8]);myForm.setItemLabel("A1", FUNData[9]);
						}
						if (FUNData[2] == 3)
						{
							myForm.showItem("A0");myForm.showItem("A1");myForm.showItem("A2");myForm.hideItem("A3");myForm.hideItem("A4");
							myForm.setItemLabel("A0", FUNData[8]);myForm.setItemLabel("A1", FUNData[9]);myForm.setItemLabel("A2", FUNData[10]);
						}
						if (FUNData[2] == 4)
						{
							myForm.showItem("A0");myForm.showItem("A1");myForm.showItem("A2");myForm.showItem("A3");myForm.hideItem("A4");
							myForm.setItemLabel("A0", FUNData[8]);myForm.setItemLabel("A1", FUNData[9]);myForm.setItemLabel("A2", FUNData[10]);myForm.setItemLabel("A3", FUNData[11]);
						}
						if (FUNData[2] == 5)
						{
							myForm.showItem("A0");myForm.showItem("A1");myForm.showItem("A2");myForm.showItem("A3");myForm.showItem("A4");
							myForm.setItemLabel("A0", FUNData[8]);myForm.setItemLabel("A1", FUNData[9]);myForm.setItemLabel("A2", FUNData[10]);myForm.setItemLabel("A3", FUNData[11]);myForm.setItemLabel("A4", FUNData[12]);
						}

					
				}
			});
			if ( (NewEdit == 'Edit') || (NewEdit == 'Copy') )
			{

				SelectOptionInComboByValue(myForm.getCombo("X0"),Parameters[6]);
				SelectOptionInComboByValue(myForm.getCombo("X1"),Parameters[7]);
				SelectOptionInComboByValue(myForm.getCombo("X2"),Parameters[8]);
				SelectOptionInComboByValue(myForm.getCombo("X3"),Parameters[9]);
				SelectOptionInComboByValue(myForm.getCombo("X4"),Parameters[10]);
				//SelectOptionInComboByValue(myForm.getCombo("FUN"),Parameters[0]-1);
				//myForm.getCombo("X0").selectOption(Parameters[6]);
				//myForm.getCombo("X1").selectOption(Parameters[7]);
				//myForm.getCombo("X2").selectOption(Parameters[8]);
				//myForm.getCombo("X3").selectOption(Parameters[9]);
				//myForm.getCombo("X4").selectOption(Parameters[10]);
				myForm.getCombo("FUN").selectOption(Parameters[0]-1);
			}
			else
			{
				myForm.getCombo("X0").selectOption(0);
				myForm.getCombo("X1").selectOption(0);
				myForm.getCombo("X2").selectOption(0);
				myForm.getCombo("X3").selectOption(0);
				myForm.getCombo("X4").selectOption(0);
				myForm.getCombo("FUN").selectOption(0);
			}
			//myForm.getCombo("PIN").attachEvent("onSelectionChange",onSelectionChangeFunc);
			//axilleas

			myForm.setUserData('ID','NEWEDIT',varindex.toString());
			myForm.attachEvent("onButtonClick", function(name){
			  if (name == 'HELP')
			  {
				 var FUNData = new Array();
			     FUNData=myForm.getCombo("FUN").getSelectedValue().split(";");
			     OpenMathFunctionHelpWindow(FUNData[0]);
				 return;
			  }
			  //****************************************
			  if (name == 'OK')
			  {
			  var Parameters = new Array();
			  var FUNData = new Array();
			  FUNData=myForm.getCombo("FUN").getSelectedValue().split(";");
			  Parameters[0]=FUNData[0];//myForm.getCombo("FUN").getSelectedValue();
			  Parameters[6]=myForm.getCombo("X0").getSelectedValue();
			  Parameters[7]=myForm.getCombo("X1").getSelectedValue();
			  Parameters[8]=myForm.getCombo("X2").getSelectedValue();
			  Parameters[9]=myForm.getCombo("X3").getSelectedValue();
			  Parameters[10]=myForm.getCombo("X4").getSelectedValue();
			  Parameters[1]=myForm.getInput("A0").value;			  
			  Parameters[2]=myForm.getInput("A1").value;
			  Parameters[3]=myForm.getInput("A2").value;
			  Parameters[4]=myForm.getInput("A3").value;
			  Parameters[5]=myForm.getInput("A4").value;
			  
			  	
  						if (FUNData[2] == 0)
						{
							Parameters[1]=0;Parameters[2]=0;Parameters[3]=0;Parameters[4]=0;Parameters[5]=0;
						}
						if (FUNData[2] == 1)
						{
							Parameters[2]=0;Parameters[3]=0;Parameters[4]=0;Parameters[5]=0;
						}
						if (FUNData[2] == 2)
						{
							Parameters[3]=0;Parameters[4]=0;Parameters[5]=0;
						}
						if (FUNData[2] == 3)
						{
							Parameters[4]=0;Parameters[5]=0;
						}
						if (FUNData[2] == 4)
						{
							Parameters[5]=0;
						}

			  SetVariableSetup(DEF_DERIVED_VARIABLE,myForm.getInput("ID").value,myForm.getUserData('ID','NEWEDIT'),myForm.getInput("NAME").value,Parameters,Parameters.length);
			  }
			  else
			  {
				   DeleteVariable(myForm.getInput("ID").value);
			  }
			  WindowsViewPort.window("DialogWindow").close();
			  ReloadVariablesGrid();
			})
		}

}
//**********************************************************************************
//**********************************************************************************
function CreateDigitalOutputVirtualWindow(varid,varname,varindex,NewEdit)
{
		if (FlagWindowIsCreated==0)
		{	
			DoBeforeWindowCreation();							
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 10, 10, 320, 200);
			DialogWindow.setText("ΨΗΦΙΑΚΗ ΕΞΟΔΟΣ");
			FlagWindowIsCreated=1;
			DialogWindow.setModal(true);
			OnCloseEvent = DialogWindow.attachEvent("onClose", function(win){
				FlagWindowIsCreated=0;
				WindowsViewPort.window(win.getId()).detachEvent(OnCloseEvent);
				WindowsViewPort.window(win.getId()).close();
				DoAfterWindowClose();
    		});
			//w1.button("close").disable();
			DialogWindow.denyResize();
			DialogWindow.denyPark();
			DialogWindow.button("minmax1").hide();
			DialogWindow.button("minmax2").hide();
			//w1.button("park").hide();
			formData = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "input", label: "ID", name: "ID" , value: ''+varid , readonly:true ,style: "background-color:#CCCCCC "},
				{type: "label", labelWidth: "auto" , label: "ΨΗΦΙΑΚΗ ΕΞΟΔΟΣ"},
				{type: "settings", position: "label-left", labelWidth: 80, inputWidth: 120 },
				{type: "input", label: "ONOMA:", name: "NAME" , maxLength:DEF_NAMES_MAX_LENGHT, value:varname },
				{type: "combo", label: "ΕΞΟΔΟΣ:", name:"PIN" },
				{type: "block", width: 250, name:"BUTTONSBLOCK" ,list:[
					{type: "button", position: "center", name: "OK" , value: "OK"},
					{type: "newcolumn", offset:0},
					{type: "button", position: "center", name: "DELETE" , value: "ΔΙΑΓΡΑΦΗ"}
				]}
			];
			myForm = DialogWindow.attachForm(formData);
			//alert(DEF_MAXIMUM_RELE);
			for (i=1;i<DEF_MAXIMUM_RELE;i++)
			{
				myForm.getCombo("PIN").addOption(''+i,''+i);
			}
			if (NewEdit == 'Edit')
				myForm.getCombo("PIN").selectOption(varindex-1);
			else
				myForm.getCombo("PIN").selectOption(0);
			//myForm.getCombo("PIN").attachEvent("onSelectionChange",onSelectionChangeFunc);
			myForm.attachEvent("onButtonClick", function(name){
			  if (name == 'OK')
			  {
			  	  var Parameters = new Array();
				  Name = myForm.getInput("NAME").value;
				  SetVariableSetup(DEF_DIGITAL_OUTPUT_VARIABLE,myForm.getInput("ID").value,myForm.getCombo("PIN").getSelectedValue(),myForm.getInput("NAME").value,Parameters,Parameters.length);
  			  }
			  else
			  {
				 DeleteVariable(myForm.getInput("ID").value);
			  }

			  WindowsViewPort.window("DialogWindow").close();
  			  ReloadVariablesGrid();
			})
		}
}
//**********************************************************************************
function CreateDigitalInputVirtualWindow(varid,varname,varindex,NewEdit)
{
		if (FlagWindowIsCreated==0)
		{	
			DoBeforeWindowCreation();		
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 10, 10, 320, 200);
			DialogWindow.setText("ΨΗΦΙΑΚΗ ΕΙΣΟΔΟΣ");
			FlagWindowIsCreated=1;
			DialogWindow.setModal(true);
			OnCloseEvent = DialogWindow.attachEvent("onClose", function(win){
				FlagWindowIsCreated=0;
				WindowsViewPort.window(win.getId()).detachEvent(OnCloseEvent);
				WindowsViewPort.window(win.getId()).close();
				DoAfterWindowClose();
    		});
			//w1.button("close").disable();
			DialogWindow.denyResize();
			DialogWindow.denyPark();
			DialogWindow.button("minmax1").hide();
			DialogWindow.button("minmax2").hide();
			//w1.button("park").hide();
			formData = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "input", label: "ID", name: "ID" , value: ''+varid , readonly:true ,style: "background-color:#CCCCCC "},
				{type: "label", labelWidth: "auto" , label: "ΨΗΦΙΑΚΗ ΕΙΣΟΔΟΣ"},
				{type: "settings", position: "label-left", labelWidth: 80, inputWidth: 120 },
				{type: "input", label: "ONOMA:", name: "NAME" , maxLength:DEF_NAMES_MAX_LENGHT, value:varname },
				{type: "combo", label: "ΕΙΣΟΔΟΣ:", name:"PIN" },
				{type: "block", width: 250, name:"BUTTONSBLOCK" ,list:[
					{type: "button", position: "center", name: "OK" , value: "OK"},
					{type: "newcolumn", offset:0},
					{type: "button", position: "center", name: "DELETE" , value: "ΔΙΑΓΡΑΦΗ"}
				]}

			];
			myForm = DialogWindow.attachForm(formData);
			for (i=0;i<32;i++)
			{
				myForm.getCombo("PIN").addOption(''+i,''+(i+1));
			}
			if (NewEdit == 'Edit')
				myForm.getCombo("PIN").selectOption(varindex);
			else
				myForm.getCombo("PIN").selectOption(0);
			//myForm.getCombo("PIN").attachEvent("onSelectionChange",onSelectionChangeFunc);
			myForm.attachEvent("onButtonClick", function(name){
			  if (name == 'OK')
			  {
				  var Parameters = new Array();
				  Name = myForm.getInput("NAME").value;
				  SetVariableSetup(DEF_DIGITAL_INPUT_VARIABLE,myForm.getInput("ID").value,myForm.getCombo("PIN").getSelectedValue(),myForm.getInput("NAME").value,Parameters,Parameters.length);
  			  }
			  else
			  {
				 DeleteVariable(myForm.getInput("ID").value);
			  }
			  WindowsViewPort.window("DialogWindow").close();
  			  ReloadVariablesGrid();
			})
		}
}
//**********************************************************************************
function CreateGeneralVirtualWindow(varid,varname,varindex,NewEdit)
{
		if (FlagWindowIsCreated==0)
		{	
			if ( (NewEdit == 'Edit') || (NewEdit == 'Copy'))
			{
				var GeneralvariableSetup = GetVariableSetup(DEF_GENERAL_INPUT_VARIABLE,varindex);
				if (GeneralvariableSetup == "ERROR")
				{
					alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ");
					return;
				}
				var Parameters = GeneralvariableSetup.split(";",5);
			}
			else
			{
				var Parameters = new Array();
				Parameters[0]=0;
				Parameters[1]=1;
				Parameters[2]=0;
				Parameters[3]=0;
				Parameters[4]=0;
			}
			DoBeforeWindowCreation();							
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 10, 10, 320, 350);
			DialogWindow.setText("ΣΥΝΤΕΛΕΣΤΕΣ ΓΕΝΙΚΗΣ ΕΙΣΟΔΟΥ");
			FlagWindowIsCreated=1;
			DialogWindow.setModal(true);
			OnCloseEvent = DialogWindow.attachEvent("onClose", function(win){
				FlagWindowIsCreated=0;
				WindowsViewPort.window(win.getId()).detachEvent(OnCloseEvent);
				WindowsViewPort.window(win.getId()).close();
				DoAfterWindowClose();
    		});
			//w1.button("close").disable();
			DialogWindow.denyResize();
			DialogWindow.denyPark();
			DialogWindow.button("minmax1").hide();
			DialogWindow.button("minmax2").hide();
			//w1.button("park").hide();
			var BackGroundColor = "background-color:#CCCCCC ";
			if (NewEdit != 'Edit') 
			{
				BackGroundColor = "background-color:#EE0000 ";
			}
			formData = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "input", label: "ID", name: "ID" , value: ''+varid , readonly:true ,style: BackGroundColor },
				{type: "label", labelWidth: "auto" , label: "ΣΥΝΤΕΛΕΣΤΕΣ ΓΕΝΙΚΗΣ ΕΙΣΟΔΟΥ"},
				{type: "settings", position: "label-left", labelWidth: 80, inputWidth: 120 },
				{type: "input", label: "ONOMA:", name: "NAME" , maxLength:DEF_NAMES_MAX_LENGHT, value:varname ,style: BackGroundColor},
				{type: "combo", label: "ΕΙΣΟΔΟΣ:", name:"PIN" },
				{type: "input", label: "A0:", name: "A0" , value: MyparseFloat(Parameters[0])},
				{type: "input", label: "A1:", name: "A1" , value: MyparseFloat(Parameters[1])},
				{type: "input", label: "A2:", name: "A2" , value: MyparseFloat(Parameters[2])},
				{type: "input", label: "A3:", name: "A3" , value: MyparseFloat(Parameters[3])},
				{type: "input", label: "A4:", name: "A4" , value: MyparseFloat(Parameters[4])},				
				{type: "block", width: 250, name:"BUTTONSBLOCK" ,list:[
					{type: "button", position: "center", name: "OK" , value: "OK"},
					{type: "newcolumn", offset:0},
					{type: "button", position: "center", name: "DELETE" , value: "ΔΙΑΓΡΑΦΗ"}
				]},
				{type: "block", width: 250, name:"BUTTONSBLOCK2" ,list:[
					{type: "select", label: "ΣΥΝΤΕΛΕΣΤΕΣ:", labelWidth: "auto" , inputWidth: 100 ,name: "PARAMETERSLIST" ,options:			[
						{text: "Reset 0-1",  value: "0"},
						{text: "T", value: "1"},
						{text: "RH", value: "2"},
						{text: "SOLAR", value: "3"}
					]},
					{type: "newcolumn", offset:0},
					{type: "button", position: "center", name: "CHANGEPARAMETERS" , value: "ΑΛΛΑΓΗ"}
				]}
			];
			myForm = DialogWindow.attachForm(formData);
			for (i=0;i<32;i++)
			{
				myForm.getCombo("PIN").addOption(''+i,''+(i+1));
			}
			if (NewEdit == 'Edit')
			{
				myForm.getCombo("PIN").selectOption(varindex);
			}
			else
			{
				myForm.getCombo("PIN").selectOption(0);
			}
			//myForm.getCombo("PIN").attachEvent("onSelectionChange",onSelectionChangeFunc);
			myForm.setUserData('A0','ID',varid.toString());
			myForm.attachEvent("onButtonClick", function(name){
			  if (name =='OK')
			  {
			  	  var Parameters = new Array();
				  Name = myForm.getInput("NAME").value;
				  Parameters[0]=myForm.getInput("A0").value;
			  	  Parameters[1]=myForm.getInput("A1").value;
				  Parameters[2]=myForm.getInput("A2").value;
				  Parameters[3]=myForm.getInput("A3").value;
				  Parameters[4]=myForm.getInput("A4").value;
				  SetVariableSetup(DEF_GENERAL_INPUT_VARIABLE,myForm.getInput("ID").value,myForm.getCombo("PIN").getSelectedValue(),myForm.getInput("NAME").value,Parameters,Parameters.length);
			  }
			  else if (name == 'CHANGEPARAMETERS')
			  {
				var ptype=parseInt(myForm.getSelect("PARAMETERSLIST").options[myForm.getSelect("PARAMETERSLIST").selectedIndex].value);  
				if (ptype==0)
				{
					myForm.getInput("A0").value='0';
					myForm.getInput("A1").value='1';
					myForm.getInput("A2").value='0';
					myForm.getInput("A3").value='0';
					myForm.getInput("A4").value='0';
				}
				if (ptype ==1)
				{
					myForm.getInput("A0").value='85.19';
					myForm.getInput("A1").value='-1.096098';
					myForm.getInput("A2").value='6.465651e-3';
					myForm.getInput("A3").value='-1.991565e-5';
					myForm.getInput("A4").value='2.347577e-8';
				}
				if (ptype ==2)
				{
					myForm.getInput("A0").value='-25.6';
					myForm.getInput("A1").value='0.1575';
					myForm.getInput("A2").value='0';
					myForm.getInput("A3").value='0';
					myForm.getInput("A4").value='0';
				}
				if (ptype ==3)
				{
					myForm.getInput("A0").value='0';
					myForm.getInput("A1").value='0.015';
					myForm.getInput("A2").value='0';
					myForm.getInput("A3").value='0';
					myForm.getInput("A4").value='0';
				}				
				return;
			  }
			  else
			  {
				 DeleteVariable(myForm.getInput("ID").value);
			  }
			  WindowsViewPort.window("DialogWindow").close();
 			  ReloadVariablesGrid();
			})
		}
}
//**********************************************************************************
//**********************************************************************************
function CreateTimeVirtualWindow(varid,varname,varindex,NewEdit)
{
		if (FlagWindowIsCreated==0)
		{	
			if (NewEdit == 'Edit')
			{
				var GeneralvariableSetup = GetVariableSetup(DEF_TIME_ENABLED_VARIABLE,varindex);
				if (GeneralvariableSetup == "ERROR")
				{
					alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ");
					return;
				}
				var Parameters = GeneralvariableSetup.split(";");
			}
			else
			{
				var Parameters = new Array();
				Parameters[0]=0;
				Parameters[1]=0;Parameters[2]=0;Parameters[3]=0;Parameters[4]=0;Parameters[5]=0;
				Parameters[6]=0;Parameters[7]=0;Parameters[8]=0;Parameters[9]=0;Parameters[10]=0;
				Parameters[11]=0;Parameters[12]=0;Parameters[13]=0;Parameters[14]=0;Parameters[15]=0;
				Parameters[16]=0;Parameters[17]=0;Parameters[18]=0;Parameters[19]=0;Parameters[20]=0;
				
			}
			DoBeforeWindowCreation();							
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 10, 10, 400, 500);
			DialogWindow.setText("ΣΥΝΤΕΛΕΣΤΕΣ ΧΡΟΝΙΚΗΣ ΜΕΤΑΒΛΗΤΗΣ");
			FlagWindowIsCreated=1;
			DialogWindow.setModal(true);
			OnCloseEvent = DialogWindow.attachEvent("onClose", function(win){
				FlagWindowIsCreated=0;
				WindowsViewPort.window(win.getId()).detachEvent(OnCloseEvent);
				WindowsViewPort.window(win.getId()).close();
				DoAfterWindowClose();
    		});
			//w1.button("close").disable();
			DialogWindow.denyResize();
			DialogWindow.denyPark();
			DialogWindow.button("minmax1").hide();
			DialogWindow.button("minmax2").hide();
			//w1.button("park").hide();
			formData = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "input", label: "ID", name: "ID" , value: ''+varid , readonly:true ,style: "background-color:#CCCCCC " },
				{type: "label", labelWidth: "auto" , label: "ΣΥΝΤΕΛΕΣΤΕΣ ΧΡΟΝΙΚΗΣ ΜΕΤΑΒΛΗΤΗΣ"},
				{type: "settings", position: "label-left", labelWidth: 80, inputWidth: 120 },
				{type: "input", label: "ONOMA:", name: "NAME" , maxLength:DEF_NAMES_MAX_LENGHT, value:varname },
				{type: "select", label: "ΓΕΝΙΚΗ ΕΝΕΡΓΟΠΟΙΗΣΗ:", labelWidth: "auto" , labelAlign:"right" ,inputWidth: 100 , name:"ENABLE" },
				{type: "block", width: 350, name:"BUTTONSBLOCK" ,list:[
					{type: "input", label: "1. ΑΠΟ:", inputWidth: 60 ,labelWidth: "70" ,name: "TF1" ,  value: "00:00"},
					{type: "input", label: "2. ΑΠΟ:", inputWidth: 60 ,labelWidth: "70" ,name: "TF2" ,  value: "00:00"},
					{type: "input", label: "3. ΑΠΟ:", inputWidth: 60 ,labelWidth: "70" ,name: "TF3" ,  value: "00:00"},
					{type: "input", label: "4. ΑΠΟ:", inputWidth: 60 ,labelWidth: "70" ,name: "TF4" ,  value: "00:00"},
					{type: "input", label: "5. ΑΠΟ:", inputWidth: 60 ,labelWidth: "70" ,name: "TF5" ,  value: "00:00"},
					{type: "input", label: "6. ΑΠΟ:", inputWidth: 60 ,labelWidth: "70" ,name: "TF6" ,  value: "00:00"},
					{type: "input", label: "7. ΑΠΟ:", inputWidth: 60 ,labelWidth: "70" ,name: "TF7" ,  value: "00:00"},
					{type: "input", label: "8. ΑΠΟ:", inputWidth: 60 ,labelWidth: "70" ,name: "TF8" ,  value: "00:00"},
					{type: "input", label: "9. ΑΠΟ:", inputWidth: 60 ,labelWidth: "70" ,name: "TF9" ,  value: "00:00"},
					{type: "input", label: "10.ΑΠΟ:", inputWidth: 60 ,labelWidth: "70" ,name: "TF10" , value: "00:00"},
					{type: "newcolumn", offset:0},
					{type: "input", label: "ΕΩΣ:", inputWidth: 60 ,labelWidth: "40" ,name: "TT1" ,  value: "00:00"},
					{type: "input", label: "ΕΩΣ:", inputWidth: 60 ,labelWidth: "40" ,name: "TT2" ,  value: "00:00"},
					{type: "input", label: "ΕΩΣ:", inputWidth: 60 ,labelWidth: "40" ,name: "TT3" ,  value: "00:00"},
					{type: "input", label: "ΕΩΣ:", inputWidth: 60 ,labelWidth: "40" ,name: "TT4" ,  value: "00:00"},
					{type: "input", label: "ΕΩΣ:", inputWidth: 60 ,labelWidth: "40" ,name: "TT5" ,  value: "00:00"},
					{type: "input", label: "ΕΩΣ:", inputWidth: 60 ,labelWidth: "40" ,name: "TT6" ,  value: "00:00"},
					{type: "input", label: "ΕΩΣ:", inputWidth: 60 ,labelWidth: "40" ,name: "TT7" ,  value: "00:00"},
					{type: "input", label: "ΕΩΣ:", inputWidth: 60 ,labelWidth: "40" ,name: "TT8" ,  value: "00:00"},
					{type: "input", label: "ΕΩΣ:", inputWidth: 60 ,labelWidth: "40" ,name: "TT9" ,  value: "00:00"},
					{type: "input", label: "ΕΩΣ:", inputWidth: 60 ,labelWidth: "40" ,name: "TT10" , value: "00:00"}

				]},
				{type: "block", width: 250, name:"BUTTONSBLOCK" ,list:[
					{type: "button", position: "center", name: "OK" , value: "OK"},
					{type: "newcolumn", offset:0},
					{type: "button", position: "center", name: "DELETE" , value: "ΔΙΑΓΡΑΦΗ"}
				]}
			];
			myForm = DialogWindow.attachForm(formData);
			//**************************************************
			myForm.setItemValue("TF1", MinutesTo24Time(Parameters[1]));myForm.setItemValue("TT1", MinutesTo24Time(Parameters[2]));
			myForm.setItemValue("TF2", MinutesTo24Time(Parameters[3]));myForm.setItemValue("TT2", MinutesTo24Time(Parameters[4]));
			myForm.setItemValue("TF3", MinutesTo24Time(Parameters[5]));myForm.setItemValue("TT3", MinutesTo24Time(Parameters[6]));
			myForm.setItemValue("TF4", MinutesTo24Time(Parameters[7]));myForm.setItemValue("TT4", MinutesTo24Time(Parameters[8]));
			myForm.setItemValue("TF5", MinutesTo24Time(Parameters[9]));myForm.setItemValue("TT5", MinutesTo24Time(Parameters[10]));			
			myForm.setItemValue("TF6", MinutesTo24Time(Parameters[11]));myForm.setItemValue("TT6", MinutesTo24Time(Parameters[12]));
			myForm.setItemValue("TF7", MinutesTo24Time(Parameters[13]));myForm.setItemValue("TT7", MinutesTo24Time(Parameters[14]));
			myForm.setItemValue("TF8", MinutesTo24Time(Parameters[15]));myForm.setItemValue("TT8", MinutesTo24Time(Parameters[16]));
			myForm.setItemValue("TF9", MinutesTo24Time(Parameters[17]));myForm.setItemValue("TT9", MinutesTo24Time(Parameters[18]));
			myForm.setItemValue("TF10", MinutesTo24Time(Parameters[19]));myForm.setItemValue("TT10", MinutesTo24Time(Parameters[20]));			
			//**************************************************			
			FeelSelectWithAllVirtuals(myForm.getSelect("ENABLE"),DEF_ALL_VIRTUALS_MASK);
			if (NewEdit == 'Edit')
			{
				SelectOptionInSelectByValue(myForm.getSelect("ENABLE"),Parameters[0]);
			}
			else
			{
				SelectOptionInSelectByValue(myForm.getSelect("ENABLE"),0);
			}
			//myForm.getCombo("PIN").attachEvent("onSelectionChange",onSelectionChangeFunc);
			myForm.setUserData('ID','NEWEDIT',varindex.toString());
			myForm.attachEvent("onButtonClick", function(name){
			  if (name =='OK')
			  {
			  	  var Parameters = new Array();
				  Parameters[0]=myForm.getSelect("ENABLE").options[myForm.getSelect("ENABLE").selectedIndex].value;
			  	  Parameters[1]=H24ToMinutes(myForm.getInput("TF1").value);		Parameters[2]=H24ToMinutes(myForm.getInput("TT1").value);	
			  	  Parameters[3]=H24ToMinutes(myForm.getInput("TF2").value);		Parameters[4]=H24ToMinutes(myForm.getInput("TT2").value);	
			  	  Parameters[5]=H24ToMinutes(myForm.getInput("TF3").value);		Parameters[6]=H24ToMinutes(myForm.getInput("TT3").value);	
			  	  Parameters[7]=H24ToMinutes(myForm.getInput("TF4").value);		Parameters[8]=H24ToMinutes(myForm.getInput("TT4").value);	
			  	  Parameters[9]=H24ToMinutes(myForm.getInput("TF5").value);		Parameters[10]=H24ToMinutes(myForm.getInput("TT5").value);					  
			  	  Parameters[11]=H24ToMinutes(myForm.getInput("TF6").value);	Parameters[12]=H24ToMinutes(myForm.getInput("TT6").value);	
			  	  Parameters[13]=H24ToMinutes(myForm.getInput("TF7").value);	Parameters[14]=H24ToMinutes(myForm.getInput("TT7").value);	
			  	  Parameters[15]=H24ToMinutes(myForm.getInput("TF8").value);	Parameters[16]=H24ToMinutes(myForm.getInput("TT8").value);	
			  	  Parameters[17]=H24ToMinutes(myForm.getInput("TF9").value);	Parameters[18]=H24ToMinutes(myForm.getInput("TT9").value);	
			  	  Parameters[19]=H24ToMinutes(myForm.getInput("TF10").value);	Parameters[20]=H24ToMinutes(myForm.getInput("TT10").value);					  
				  SetVariableSetup(DEF_TIME_ENABLED_VARIABLE,myForm.getInput("ID").value,myForm.getUserData('ID','NEWEDIT'),myForm.getInput("NAME").value,Parameters,Parameters.length);
			  }
			  else
			  {
				 DeleteVariable(myForm.getInput("ID").value);
			  }
			  WindowsViewPort.window("DialogWindow").close();
 			  ReloadVariablesGrid();
			})
		}
}
//**********************************************************************************
function onSelectionChangeFunc()
{
	alert("1");
}
//**********************************************************************************
function SetVariableSetup(type,vid,index,Name,Parameters,ParametersLenght)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run '+(DEF_SET_VARIABLE|type)+';'+vid+';'+index+';';
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
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);
	
}
//**********************************************************************************
function GetVariableSetup(type,vid)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run '+(DEF_GET_VARIABLE|type)+';'+vid+';';
	url=url+Math.random()+';';
	//alert(url);
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	return txt;
}
//**********************************************************************************
function DeleteVariable(vid)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 002;'+vid+';';
	alert(url);
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);
	//return txt;
}
//**********************************************************************************
function ConvertStringToHEX(st)
{
	var ret='';
    for (i=0;i<st.length;i++)
	{
		ret=ret+Convert.toHex(st.charAt(i));
	}
	return ret;
}
//**********************************************************************************
function EnterMasterCode()
{
		if (FlagWindowIsCreated==0)
		{	
			DoBeforeWindowCreation();		
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 5, 5, 620, 220);
			DialogWindow.setText("ΕΙΣΑΓΩΓΗ ΚΩΔΙΚΟΥ");
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
					{type: "password", label: "ΚΩΔΙΚΟΣ", name: "ID" ,inputWidth: 100 ,value: "" , className :'DialogInputClass' },
					{type: "newcolumn", offset:50},
					{type: "button", position: "center", name: "OK" , value: "OK" , className :'DialogOKButtonClass'},
					{type: "newcolumn", offset:50},
					{type: "button", position: "center", name: "CANCEL" , value: "ΑΚΥΡΟ", width:150 ,className :'DialogOKButtonClass'}
			];
			//*************************************************************
			myForm = DialogWindow.attachForm(formData);
			AttacheNumKeyboardToInput(myForm.getInput("ID").id,0);
			//*************************************************************
 			myForm.attachEvent("onButtonClick", function(name){
   				 if (name == 'CANCEL')
				 {
					WindowsViewPort.window("DialogWindow").close();	
					return;
				 }
				  if (myForm.getInput("ID").value == MasterCode)
				  {
					//alert("ΚΩΔΙΚΟΣ ΔΕΚΤΟΣ");  
					MasterCodeIsOK=1; 
					toolbar.showItem("Variables");
					MainAccord.cells("Variables").show();
					MainAccord.cells("Loops").show();	
					MainAccord.openItem("Variables");
					WindowsViewPort.window("DialogWindow").close();
					
					document.getElementById('Button1FeelClimateScreenDataListsWithVariableNames').style.visibility = "visible";
					document.getElementById('Button2FeelClimateScreenDataListsWithVariableNames').style.visibility = "visible";					
					document.getElementById('Button3FeelClimateScreenDataListsWithVariableNames').style.visibility = "visible";					
				  }
				  else
				  {
  					alert("ΛΑΘΟΣ ΚΩΔΙΚΟΣ");  
				  }
			  
			})
		}
}
//**********************************************************************************
function OpenMathFunctionHelpWindow(funid)
{
	//var url='http://'+SystemIpAdress+'/'+SystemFileSystem+'/fhelp.htm';
	var url='fhelp.htm'+'#_'+funid;
	//alert(url);
	window.open (url,"mywindow","menubar=1,resizable=1,scrollbars=1,width=500,height=400");
}
//**********************************************************************************