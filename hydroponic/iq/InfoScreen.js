// JavaScript Document
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
function UpDateVariablesOnMainScreen(Data)
{
	var Result;
	for (i=0;i<64;i++)
	{
		if(typeof MainScreenVariables[i] != "undefined") 
		{
			if (MainScreenVariables[i] != 0)
			{
				var ScreenValueID='SCV'+(i+1);
				Result=ExtractValueFromData(Data,MainScreenVariables[i]);
				document.getElementById(ScreenValueID).innerHTML= MyparseFloatWithFixed(Result)+'&nbsp;';
			}
		}
	}
	//UpdateOnLineGraph();
}
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
function EditScreen2Setup()
{
	StopDataAcquisition();
		var Parameters = new Array();
		if (FlagWindowIsCreated==0)
		{	
			var InfoScreenData = GetInfoScreenSetup();
			Parameters = InfoScreenData.split(";"); //ReadFileFromMBedAndReturnParametersArray('Screen2.txt');
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 5, 5, 850, 500);
			DialogWindow.setText("ΒΑΣΙΚΗ ΟΘΟΝΗ ΜΕΤΑΒΛΗΤΩΝ");
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
					{type: "button", position: "center", name: "OK" , value: "ΑΠΟΘΗΚΕΥΣΗ"}
				]},
				{type: "block", width: "auto", list:[
					//{type: "newcolumn", offset:0},
					{type: "select",   label: "V1:", labelWidth: "30", inputWidth: 160 , name:"V1" },
					{type: "select",   label: "V2:", labelWidth: "30", inputWidth: 160 , name:"V2" },
					{type: "select",   label: "V3:", labelWidth: "30", inputWidth: 160 , name:"V3" },
					{type: "select",   label: "V4:", labelWidth: "30", inputWidth: 160 , name:"V4" },
					{type: "select",   label: "V5:", labelWidth: "30", inputWidth: 160 , name:"V5" },
					{type: "select",   label: "V6:", labelWidth: "30", inputWidth: 160 , name:"V6" },
					{type: "select",   label: "V7:", labelWidth: "30", inputWidth: 160 , name:"V7" },
					{type: "select",   label: "V8:", labelWidth: "30", inputWidth: 160 , name:"V8" },
					{type: "select",   label: "V9:", labelWidth: "30", inputWidth: 160 , name:"V9" },
					{type: "select",   label: "V10:", labelWidth: "30", inputWidth: 160 , name:"V10" },
					{type: "select",   label: "V11:", labelWidth: "30", inputWidth: 160 , name:"V11" },
					{type: "select",   label: "V12:", labelWidth: "30", inputWidth: 160 , name:"V12" },
					{type: "select",   label: "V13:", labelWidth: "30", inputWidth: 160 , name:"V13" },
					{type: "select",   label: "V14:", labelWidth: "30", inputWidth: 160 , name:"V14" },
					{type: "select",   label: "V15:", labelWidth: "30", inputWidth: 160 , name:"V15" },
					{type: "select",   label: "V16:", labelWidth: "30", inputWidth: 160 , name:"V16" },
					{type: "newcolumn", offset:0},
					{type: "select",   label: "V17:", labelWidth: "30", inputWidth: 160 , name:"V17" },
					{type: "select",   label: "V18:", labelWidth: "30", inputWidth: 160 , name:"V18" },
					{type: "select",   label: "V19:", labelWidth: "30", inputWidth: 160 , name:"V19" },
					{type: "select",   label: "V20:", labelWidth: "30", inputWidth: 160 , name:"V20" },
					{type: "select",   label: "V21:", labelWidth: "30", inputWidth: 160 , name:"V21" },
					{type: "select",   label: "V22:", labelWidth: "30", inputWidth: 160 , name:"V22" },
					{type: "select",   label: "V23:", labelWidth: "30", inputWidth: 160 , name:"V23" },
					{type: "select",   label: "V24:", labelWidth: "30", inputWidth: 160 , name:"V24" },
					{type: "select",   label: "V25:", labelWidth: "30", inputWidth: 160 , name:"V25" },
					{type: "select",   label: "V26:", labelWidth: "30", inputWidth: 160 , name:"V26" },
					{type: "select",   label: "V27:", labelWidth: "30", inputWidth: 160 , name:"V27" },
					{type: "select",   label: "V28:", labelWidth: "30", inputWidth: 160 , name:"V28" },
					{type: "select",   label: "V29:", labelWidth: "30", inputWidth: 160 , name:"V29" },
					{type: "select",   label: "V30:", labelWidth: "30", inputWidth: 160 , name:"V30" },
					{type: "select",   label: "V31:", labelWidth: "30", inputWidth: 160 , name:"V31" },
					{type: "select",   label: "V32:", labelWidth: "30", inputWidth: 160 , name:"V32" },
					{type: "newcolumn", offset:0},
					{type: "select",   label: "V33:", labelWidth: "30", inputWidth: 160 , name:"V33" },
					{type: "select",   label: "V34:", labelWidth: "30", inputWidth: 160 , name:"V34" },
					{type: "select",   label: "V35:", labelWidth: "30", inputWidth: 160 , name:"V35" },
					{type: "select",   label: "V36:", labelWidth: "30", inputWidth: 160 , name:"V36" },
					{type: "select",   label: "V37:", labelWidth: "30", inputWidth: 160 , name:"V37" },
					{type: "select",   label: "V38:", labelWidth: "30", inputWidth: 160 , name:"V38" },
					{type: "select",   label: "V39:", labelWidth: "30", inputWidth: 160 , name:"V39" },
					{type: "select",   label: "V40:", labelWidth: "30", inputWidth: 160 , name:"V40" },
					{type: "select",   label: "V41:", labelWidth: "30", inputWidth: 160 , name:"V41" },
					{type: "select",   label: "V42:", labelWidth: "30", inputWidth: 160 , name:"V42" },
					{type: "select",   label: "V43:", labelWidth: "30", inputWidth: 160 , name:"V43" },
					{type: "select",   label: "V44:", labelWidth: "30", inputWidth: 160 , name:"V44" },
					{type: "select",   label: "V45:", labelWidth: "30", inputWidth: 160 , name:"V45" },
					{type: "select",   label: "V46:", labelWidth: "30", inputWidth: 160 , name:"V46" },
					{type: "select",   label: "V47:", labelWidth: "30", inputWidth: 160 , name:"V47" },
					{type: "select",   label: "V48:", labelWidth: "30", inputWidth: 160 , name:"V48" },
					{type: "newcolumn", offset:0},
					{type: "select",   label: "V49:", labelWidth: "30", inputWidth: 160 , name:"V49" },
					{type: "select",   label: "V50:", labelWidth: "30", inputWidth: 160 , name:"V50" },
					{type: "select",   label: "V51:", labelWidth: "30", inputWidth: 160 , name:"V51" },
					{type: "select",   label: "V52:", labelWidth: "30", inputWidth: 160 , name:"V52" },
					{type: "select",   label: "V53:", labelWidth: "30", inputWidth: 160 , name:"V53" },
					{type: "select",   label: "V54:", labelWidth: "30", inputWidth: 160 , name:"V54" },
					{type: "select",   label: "V55:", labelWidth: "30", inputWidth: 160 , name:"V55" },
					{type: "select",   label: "V56:", labelWidth: "30", inputWidth: 160 , name:"V56" },
					{type: "select",   label: "V57:", labelWidth: "30", inputWidth: 160 , name:"V57" },
					{type: "select",   label: "V58:", labelWidth: "30", inputWidth: 160 , name:"V58" },
					{type: "select",   label: "V59:", labelWidth: "30", inputWidth: 160 , name:"V59" },
					{type: "select",   label: "V60:", labelWidth: "30", inputWidth: 160 , name:"V60" },
					{type: "select",   label: "V61:", labelWidth: "30", inputWidth: 160 , name:"V61" },
					{type: "select",   label: "V62:", labelWidth: "30", inputWidth: 160 , name:"V62" },
					{type: "select",   label: "V63:", labelWidth: "30", inputWidth: 160 , name:"V63" },
					{type: "select",   label: "V64:", labelWidth: "30", inputWidth: 160 , name:"V64" }
				]},					
					
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
			FeelSelectWithAllVirtuals(myForm.getSelect("V27"),DEF_ALL_VIRTUALS_MASK);			
			FeelSelectWithAllVirtuals(myForm.getSelect("V28"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V29"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V30"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V31"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V32"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V33"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V34"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V35"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V36"),DEF_ALL_VIRTUALS_MASK);			
			FeelSelectWithAllVirtuals(myForm.getSelect("V37"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V38"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V39"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V40"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V41"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V42"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V43"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V44"),DEF_ALL_VIRTUALS_MASK);			
			FeelSelectWithAllVirtuals(myForm.getSelect("V45"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V46"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V47"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V48"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V49"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V50"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V51"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V52"),DEF_ALL_VIRTUALS_MASK);			
			FeelSelectWithAllVirtuals(myForm.getSelect("V53"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V54"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V55"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V56"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V57"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V58"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V59"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V60"),DEF_ALL_VIRTUALS_MASK);			
			FeelSelectWithAllVirtuals(myForm.getSelect("V61"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V62"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V63"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm.getSelect("V64"),DEF_ALL_VIRTUALS_MASK);

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
			SelectOptionInSelectByValue(myForm.getSelect("V27"),Parameters[26]);				
			SelectOptionInSelectByValue(myForm.getSelect("V28"),Parameters[27]);				
			SelectOptionInSelectByValue(myForm.getSelect("V29"),Parameters[28]);				
			SelectOptionInSelectByValue(myForm.getSelect("V30"),Parameters[29]);				
			SelectOptionInSelectByValue(myForm.getSelect("V31"),Parameters[30]);				
			SelectOptionInSelectByValue(myForm.getSelect("V32"),Parameters[31]);							

			SelectOptionInSelectByValue(myForm.getSelect("V33"),Parameters[32]);				
			SelectOptionInSelectByValue(myForm.getSelect("V34"),Parameters[33]);				
			SelectOptionInSelectByValue(myForm.getSelect("V35"),Parameters[34]);				
			SelectOptionInSelectByValue(myForm.getSelect("V36"),Parameters[35]);				
			SelectOptionInSelectByValue(myForm.getSelect("V37"),Parameters[36]);				
			SelectOptionInSelectByValue(myForm.getSelect("V38"),Parameters[37]);				
			SelectOptionInSelectByValue(myForm.getSelect("V39"),Parameters[38]);				
			SelectOptionInSelectByValue(myForm.getSelect("V40"),Parameters[39]);							
			SelectOptionInSelectByValue(myForm.getSelect("V41"),Parameters[40]);				
			SelectOptionInSelectByValue(myForm.getSelect("V42"),Parameters[41]);				
			SelectOptionInSelectByValue(myForm.getSelect("V43"),Parameters[42]);				
			SelectOptionInSelectByValue(myForm.getSelect("V44"),Parameters[43]);				
			SelectOptionInSelectByValue(myForm.getSelect("V45"),Parameters[44]);				
			SelectOptionInSelectByValue(myForm.getSelect("V46"),Parameters[45]);				
			SelectOptionInSelectByValue(myForm.getSelect("V47"),Parameters[46]);				
			SelectOptionInSelectByValue(myForm.getSelect("V48"),Parameters[47]);							
			SelectOptionInSelectByValue(myForm.getSelect("V49"),Parameters[48]);				
			SelectOptionInSelectByValue(myForm.getSelect("V50"),Parameters[49]);				
			SelectOptionInSelectByValue(myForm.getSelect("V51"),Parameters[50]);				
			SelectOptionInSelectByValue(myForm.getSelect("V52"),Parameters[51]);				
			SelectOptionInSelectByValue(myForm.getSelect("V53"),Parameters[52]);				
			SelectOptionInSelectByValue(myForm.getSelect("V54"),Parameters[53]);				
			SelectOptionInSelectByValue(myForm.getSelect("V55"),Parameters[54]);				
			SelectOptionInSelectByValue(myForm.getSelect("V56"),Parameters[55]);							
			SelectOptionInSelectByValue(myForm.getSelect("V57"),Parameters[56]);				
			SelectOptionInSelectByValue(myForm.getSelect("V58"),Parameters[57]);				
			SelectOptionInSelectByValue(myForm.getSelect("V59"),Parameters[58]);				
			SelectOptionInSelectByValue(myForm.getSelect("V60"),Parameters[59]);				
			SelectOptionInSelectByValue(myForm.getSelect("V61"),Parameters[60]);				
			SelectOptionInSelectByValue(myForm.getSelect("V62"),Parameters[61]);				
			SelectOptionInSelectByValue(myForm.getSelect("V63"),Parameters[62]);				
			SelectOptionInSelectByValue(myForm.getSelect("V64"),Parameters[63]);							

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
				Parameters[26]=myForm.getSelect("V27").options[myForm.getSelect("V27").selectedIndex].value;
				Parameters[27]=myForm.getSelect("V28").options[myForm.getSelect("V28").selectedIndex].value;
				Parameters[28]=myForm.getSelect("V29").options[myForm.getSelect("V29").selectedIndex].value;
				Parameters[29]=myForm.getSelect("V30").options[myForm.getSelect("V30").selectedIndex].value;
				Parameters[30]=myForm.getSelect("V31").options[myForm.getSelect("V31").selectedIndex].value;
				Parameters[31]=myForm.getSelect("V32").options[myForm.getSelect("V32").selectedIndex].value;				
				
				Parameters[32]=myForm.getSelect("V33").options[myForm.getSelect("V33").selectedIndex].value;
				Parameters[33]=myForm.getSelect("V34").options[myForm.getSelect("V34").selectedIndex].value;
				Parameters[34]=myForm.getSelect("V35").options[myForm.getSelect("V35").selectedIndex].value;
				Parameters[35]=myForm.getSelect("V36").options[myForm.getSelect("V36").selectedIndex].value;
				Parameters[36]=myForm.getSelect("V37").options[myForm.getSelect("V37").selectedIndex].value;
				Parameters[37]=myForm.getSelect("V38").options[myForm.getSelect("V38").selectedIndex].value;
				Parameters[38]=myForm.getSelect("V39").options[myForm.getSelect("V39").selectedIndex].value;
				Parameters[39]=myForm.getSelect("V40").options[myForm.getSelect("V40").selectedIndex].value;				
				Parameters[40]=myForm.getSelect("V41").options[myForm.getSelect("V41").selectedIndex].value;
				Parameters[41]=myForm.getSelect("V42").options[myForm.getSelect("V42").selectedIndex].value;
				Parameters[42]=myForm.getSelect("V43").options[myForm.getSelect("V43").selectedIndex].value;
				Parameters[43]=myForm.getSelect("V44").options[myForm.getSelect("V44").selectedIndex].value;
				Parameters[44]=myForm.getSelect("V45").options[myForm.getSelect("V45").selectedIndex].value;
				Parameters[45]=myForm.getSelect("V46").options[myForm.getSelect("V46").selectedIndex].value;
				Parameters[46]=myForm.getSelect("V47").options[myForm.getSelect("V47").selectedIndex].value;
				Parameters[47]=myForm.getSelect("V48").options[myForm.getSelect("V48").selectedIndex].value;				
				Parameters[48]=myForm.getSelect("V49").options[myForm.getSelect("V49").selectedIndex].value;
				Parameters[49]=myForm.getSelect("V50").options[myForm.getSelect("V50").selectedIndex].value;
				Parameters[50]=myForm.getSelect("V51").options[myForm.getSelect("V51").selectedIndex].value;
				Parameters[51]=myForm.getSelect("V52").options[myForm.getSelect("V52").selectedIndex].value;
				Parameters[52]=myForm.getSelect("V53").options[myForm.getSelect("V53").selectedIndex].value;
				Parameters[53]=myForm.getSelect("V54").options[myForm.getSelect("V54").selectedIndex].value;
				Parameters[54]=myForm.getSelect("V55").options[myForm.getSelect("V55").selectedIndex].value;
				Parameters[55]=myForm.getSelect("V56").options[myForm.getSelect("V56").selectedIndex].value;				
				Parameters[56]=myForm.getSelect("V57").options[myForm.getSelect("V57").selectedIndex].value;
				Parameters[57]=myForm.getSelect("V58").options[myForm.getSelect("V58").selectedIndex].value;
				Parameters[58]=myForm.getSelect("V59").options[myForm.getSelect("V59").selectedIndex].value;
				Parameters[59]=myForm.getSelect("V60").options[myForm.getSelect("V60").selectedIndex].value;
				Parameters[60]=myForm.getSelect("V61").options[myForm.getSelect("V61").selectedIndex].value;
				Parameters[61]=myForm.getSelect("V62").options[myForm.getSelect("V62").selectedIndex].value;
				Parameters[62]=myForm.getSelect("V63").options[myForm.getSelect("V63").selectedIndex].value;
				Parameters[63]=myForm.getSelect("V64").options[myForm.getSelect("V64").selectedIndex].value;				


				//WriteToFileOnmBed("Screen2.txt",Parameters,Parameters.length);
				SetInfoScreenSetup(Parameters,Parameters.length);
				WindowsViewPort.window("DialogWindow").close();
			})
		}

}
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
function SetNamesOnMainScreenAfterVariablesIsLoaded()
{
	for (i=1;i<65;i++)
	{
		var ScreenNameID='SCN'+i;
		document.getElementById(ScreenNameID).innerHTML='';
	}

	for (i=0;i<64;i++)
	{
		if(typeof MainScreenVariables[i] != "undefined") 
		{
			if (MainScreenVariables[i] != 0)
			{
				var ScreenNameID='SCN'+(i+1);
				document.getElementById(ScreenNameID).innerHTML=AllVirtualVariablesName[MainScreenVariables[i]];
			}
		}
	}
}
//**********************************************************************************
//**********************************************************************************
function GetInfoScreenSetup()
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 038;';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	return txt;
}

function SetInfoScreenSetup(Parameters,ParametersLenght)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 039;';
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
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
function MainScreenVariableClicked(SCID)
{
	
	if(typeof MainScreenVariables[SCID-1] != "undefined") 
	{
		if (MainScreenVariables[SCID-1] != 0)
		{
			var NumberOfRows = VariablesGrid.getRowsNum();
			for (i=2;i<=NumberOfRows;i++)
			{
				if (VariablesGrid.cellById(i,0).getValue() == MainScreenVariables[SCID-1]) 
				{
					if ( (VariablesGrid.cellById(i,4).getValue() == DEF_DERIVED_VARIABLE) //|| 
						 //(VariablesGrid.cellById(i,4).getValue() == DEF_RAMP_VARIABLE) ||
						 //(VariablesGrid.cellById(i,4).getValue() == DEF_TIME_ENABLED_VARIABLE)
						)															   
					RowClickedOnVariablesGrid(i,1,0);
				}
			}
		}
	}

}
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
