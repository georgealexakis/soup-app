// JavaScript Document

function CreateClimateControlWindow(varid,varname)
{
		StopDataAcquisition();
		var Parameters = new Array();
		if (FlagWindowIsCreated==0)
		{	
			
			var ClimateProgram = GetClimateControlSetup(varid);
			if (ClimateProgram == "ERROR")
			{
				alert("ΣΦΑΛΜΑ ΣΤΗ ΛΗΨΗ ΤΩΝ ΔΕΔΟΜΕΝΩΝ 1");
				return;
			}
			Parameters = ClimateProgram.split(";"); 
				
			//*********************************************			
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 0, 0, 1000,500);
			DialogWindow.setText("ΠΡΟΓΡΑΜΜΑ ΕΛΕΓΧΟΥ ΚΛΙΜΑΤΟΣ");
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

			TabBar.addTab("t1","Παράθυρα","100px");
			TabBar.addTab("t2","Θέρμανση","100px");
			TabBar.addTab("t3","WetPad","100px");
			TabBar.addTab("t5","Κουρτίνα","100px");
			TabBar.addTab("t6","Υδρονέφωση","100px");
			TabBar.addTab("t4","P","100px");			
		    TabBar.setTabActive("t1");

			if (!MasterCodeIsOK) TabBar.hideTab("t4")
			
			formData1 = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "block", width: "auto", list:[
					{type: "input", label: "ID", name: "ID" , labelWidth: "auto", inputWidth: 30 , value: ''+varid , readonly:true ,style: "background-color:#CCCCCC " },
					{type: "newcolumn", offset:0},
					{type: "input", label: "ONOMA:", labelWidth: "auto", labelAlign:"right" ,inputWidth:'auto'  ,name: "NAME" , className :'DialogInputClass' , maxLength :DEF_NAMES_MAX_LENGHT , value:varname },
					{type: "newcolumn", offset:20},
					{type: "button", position: "center", name: "OK" , value: "ΑΠΟΣΤΟΛΗ" , width:150 , className :'DialogOKButtonClass'},
					{type: "newcolumn", offset:20},
					{type: "button", position: "center", name: "CANCEL" , value: "ΑΚΥΡΟ", width:150 ,className :'DialogOKButtonClass'}

				]},
					{type: "fieldset", width: "auto", label: "", list:[
					{type: "checkbox", label: "ΓΕΝΙΚΗ ΕΝΕΡΓΟΠΟΙΗΣΗ:", labelWidth: "auto" , labelAlign:"right" , name:"ENABLE" ,className :'DialogCheckBoxClass' , checked: false}
				]},
				{type: "fieldset", width: "auto", label: "ΕΠΙΘΥΜΗΤΗ ΘΕΣΗ ΠΑΡΑΘΥΡΟΥ ΜΕ ΒΑΣΗ ΤΗ ΘΕΡΜΟΚΡΑΣΙΑ", list:[
					{type: "input", label: "Χαμηλή Θερμοκρασία", labelWidth: "220", inputWidth: 60 ,name: "LOWT"   , maxLength :50, className :'DialogInputClass' , value:Parameters[1] },
					{type: "newcolumn", offset:5},
					{type: "input", label: "Θέση %"	, labelWidth: "auto", inputWidth: 60 ,name: "WLOWT"  , maxLength :50, className :'DialogInputClass' , value:Parameters[3] },
					{type: "newcolumn", offset:25},
					{type: "input", label: "- Υψηλή Θερμοκρασία" , labelWidth: "220", inputWidth: 60 ,name: "HIGHT"  , maxLength :50, className :'DialogInputClass' , value:Parameters[2] },
					{type: "newcolumn", offset:5},
					{type: "input", label: "Θέση %"  , labelWidth: "auto", inputWidth: 60 ,name: "WHIGHT" , maxLength :50, className :'DialogInputClass', value:Parameters[4] }
				]},
				{type: "fieldset", width: "auto", label: "ΠΡΟΣΤΙΘΕΜΕΝΗ ΘΕΣΗ ΠΑΡΑΘΥΡΟΥ ΜΕ ΒΑΣΗ ΤΗΝ ΥΓΡΑΣΙΑ (ΠΡΟΣΤΙΘΕΤΑΙ ΣΤΗ ΘΕΣΗ ΘΕΡΜΟΚΡΑΣΙΑΣ)", list:[
					{type: "input", label: "Χαμηλή Υγρασία" , labelWidth: "220", inputWidth: 60 ,name: "LOWRH"   , maxLength :50, className :'DialogInputClass', value:Parameters[5] },
					{type: "newcolumn", offset:5},
					{type: "input", label: "Θέση %" , labelWidth: "auto", inputWidth: 60 ,name: "WLOWRH" , maxLength :50, className :'DialogInputClass', value:Parameters[7] },
					{type: "newcolumn", offset:25},
					{type: "input", label: "- Υψηλή Υγρασία"  , labelWidth: "220", inputWidth: 60 ,name: "HIGHRH"  , maxLength :50, className :'DialogInputClass', value:Parameters[6] },
					{type: "newcolumn", offset:5},
					{type: "input", label: "Θέση %" , labelWidth: "auto", inputWidth: 60 ,name: "WHIGHRH"  , maxLength :50, className :'DialogInputClass', value:Parameters[8] }	
				]},
				{type: "fieldset", width: "auto", label: "ΜΕΓΙΣΤΗ ΕΠΙΤΡΕΠΟΜΕΝΗ ΘΕΣΗ ΠΑΡΑΘΥΡΟΥ ΜΕ ΒΑΣΗ ΤΗΝ TAXYTHTA ANEMOY ", list:[
					{type: "input", label: "Χαμηλή Ταχύτητα Ανέμου" , labelWidth: "220", inputWidth: 60 ,name: "LOWWS"   , maxLength :50, className :'DialogInputClass', value:Parameters[9] },
					{type: "newcolumn", offset:5},
					{type: "input", label: "Θέση %"  , labelWidth: "auto", inputWidth: 60 ,name: "WLOWWS" , maxLength :50, className :'DialogInputClass', value:Parameters[11] },
					{type: "newcolumn", offset:25},
					{type: "input", label: "Υψηλή Ταχύτητα Ανέμου"  , labelWidth: "220", inputWidth: 60 ,name: "HIGHWS"  , maxLength :50, className :'DialogInputClass', value:Parameters[10] },
					{type: "newcolumn", offset:5},
					{type: "input", label: "Θέση %"  , labelWidth: "auto", inputWidth: 60 ,name: "WHIGHWS"  , maxLength :50, className :'DialogInputClass', value:Parameters[12] }	
				]},
				{type: "fieldset", width: "auto", label: "ΜΕΓΙΣΤΗ ΕΠΙΤΡΕΠΟΜΕΝΗ ΘΕΣΗ ΠΑΡΑΘΥΡΟΥ ΣΕ ΚΑΤΑΣΤΑΣΗ: ", list:[
					{type: "input", label: "Κατάσταση Βροχής"   , labelWidth: "auto", inputWidth: 60 ,name: "WMAXRAIN"   , maxLength :50, className :'DialogInputClass', value:Parameters[13] },
					{type: "newcolumn", offset:30},
					{type: "input", label: "Ειδική Κατάσταση 1"   , labelWidth: "auto", inputWidth: 60 ,name: "WMAXEXTRA1" , maxLength :50, className :'DialogInputClass', value:Parameters[14] },
					{type: "newcolumn", offset:30},
					{type: "input", label: "Ειδική Κατάσταση 2"   , labelWidth: "auto", inputWidth: 60 ,name: "WMAXEXTRA2" , maxLength :50, className :'DialogInputClass', value:Parameters[15] }
				]}


			];
			formData2 = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "fieldset", width: "auto", label: "ΘΕΡΜΑΝΣΗ 1", list:[
					{type: "checkbox", label: "ΕΝΕΡΓΟΠΟΙΗΣΗ:", labelWidth: "auto" , labelAlign:"left" , name:"H1ENABLE" ,className :'DialogCheckBoxClass' ,checked: false},
					{type: "block", width: "auto", list:[
						{type: "input",  label: "Οριο Λειτουργίας Θέρμανσης", labelWidth: "auto", inputWidth: 80 ,name: "H1TSET" , maxLength :10, className :'DialogInputClass' ,value:Parameters[16] },
						{type: "newcolumn", offset:5},			
						{type: "select", label: " + ", labelWidth: "30", labelAlign:"left" , inputWidth: 150 ,className :'DialogsSelectInput',name:"H1TADJ" }  //18
					]},
				]},
				{type: "fieldset", width: "700", label: "ΘΕΡΜΑΝΣΗ 2", list:[
					{type: "checkbox", label: "ΕΝΕΡΓΟΠΟΙΗΣΗ:", labelWidth: "auto" , labelAlign:"left" , name:"H2ENABLE" , className :'DialogCheckBoxClass' ,checked: false},
					{type: "block", width: "550", list:[
						{type: "input",  label: "Οριο Λειτουργίας Θέρμανσης", labelWidth: "auto", inputWidth: 80 ,name: "H2TSET" , maxLength :10,  className :'DialogInputClass' , value:Parameters[17] },
						{type: "newcolumn", offset:5},			
						{type: "select", label: " + ", labelWidth: "30", labelAlign:"left" , inputWidth: 150 , className :'DialogsSelectInput' ,name:"H2TADJ" }  //19
					]},
				]}

			];
			formData4 = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "fieldset", width: "700", label: "ΕΝΕΡΓΟΠΟΙΗΣΗ", list:[
					{type: "select", label: "ΓΕΝΙΚΗ ΕΝΕΡΓΟΠΟΙΗΣΗ", labelWidth: "250", labelAlign:"left" , inputWidth: 150 ,name:"ADGEN" },  //20
					{type: "select", label: "ΕΝΕΡΓΟΠΟΙΗΣΗ ΕΛΕΓΧΟΥ ΠΑΡΑΘΥΡΩΝ", labelWidth: "250", labelAlign:"left" , inputWidth: 150 ,name:"ADENWINDOWS" },  //55
					{type: "select", label: "ΕΝΕΡΓΟΠΟΙΗΣΗ ΕΛΕΓΧΟΥ ΘΕΡΜΑΝΣΗ 1", labelWidth: "250", labelAlign:"left" , inputWidth: 150 ,name:"ADENHEATER1" },  //56
					{type: "select", label: "ΕΝΕΡΓΟΠΟΙΗΣΗ ΕΛΕΓΧΟΥ ΘΕΡΜΑΝΣΗ 2", labelWidth: "250", labelAlign:"left" , inputWidth: 150 ,name:"ADENHEATER2" },  //57
					{type: "select", label: "ΕΝΕΡΓΟΠΟΙΗΣΗ ΕΛΕΓΧΟΥ ΚΟΥΡΤΙΝΑΣ ", labelWidth: "250", labelAlign:"left" , inputWidth: 150 ,name:"ADENSCREEN" },  //62
					{type: "select", label: "ΕΝΕΡΓΟΠΟΙΗΣΗ ΕΛΕΓΧΟΥ ΥΔΡΟΝΕΦΩΣΗ", labelWidth: "250", labelAlign:"left" , inputWidth: 150 ,name:"ADENFOG" }   //63
				]},
				{type: "fieldset", width: "700", label: "ΕΛΕΓΧΟΣ", list:[
					{type: "select", label: "ΜΕΤΡΗΣΗ ΘΕΡΜΟΚΡΑΣΙΑΣ", labelWidth: "250", labelAlign:"left" , inputWidth: 150 ,name:"ADT" },  //21
					{type: "select", label: "ΜΕΤΡΗΣΗ ΥΓΡΑΣΙΑΣ"    , labelWidth: "250", labelAlign:"left" , inputWidth: 150 ,name:"ADRH" },  //22
					{type: "select", label: "ΜΕΤΡΗΣΗ ΤΑΧΥΤΗΤΑΣ ΑΝΕΜΟΥ", labelWidth: "250", labelAlign:"left" , inputWidth: 150 ,name:"ADWS" },  //23
					{type: "select", label: "ΜΕΤΡΗΣΗ ΗΛΙΟΦΑΝΕΙΑΣ", labelWidth: "250", labelAlign:"left" , inputWidth: 150 ,name:"ADSO" },  //60
					{type: "select", label: "ΚΑΤΑΣΤΑΣΗ ΒΡΟΧΗΣ", labelWidth: "250", labelAlign:"left" , inputWidth: 150 ,name:"ADRAIN" },  //24
					{type: "select", label: "ΚΑΤΑΣΤΑΣΗ ΕΧΤΡΑ1", labelWidth: "250", labelAlign:"left" , inputWidth: 150 ,name:"ADEX1" },  //25
					{type: "select", label: "ΚΑΤΑΣΤΑΣΗ ΕΧΤΡΑ2", labelWidth: "250", labelAlign:"left" , inputWidth: 150 ,name:"ADEX2" }  //26

				]},
				{type: "fieldset", width: "700", label: "ΕΞΟΔΟΙ", list:[
					{type: "select", label: "ΠΑΡΑΘΥΡΑ"  , labelWidth: "250", labelAlign:"left" , inputWidth: 150 ,name:"ADWOD" },  //27
					{type: "select", label: "ΘΕΡΜΑΝΣΗ 1", labelWidth: "250", labelAlign:"left" , inputWidth: 150 ,name:"ADH1OD" },  //28
					{type: "select", label: "ΘΕΡΜΑΝΣΗ 2", labelWidth: "250", labelAlign:"left" , inputWidth: 150 ,name:"ADH2OD" },  //29
					{type: "select", label: "KOYRTINA",   labelWidth: "250", labelAlign:"left" , inputWidth: 150 ,name:"ADSCOD" }  //61
				]}

			];
			formData3 = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "fieldset", width: "auto", label: "ΛΕΙΤΟΥΡΓΙΑ", list:[
					{type: "checkbox", label: "Ενεργοποίηση WET-PAD:", labelWidth: "auto" , labelAlign:"right" , name:"WPENABLE" ,className :'DialogCheckBoxClass',checked: false}, //30
					{type: "checkbox", label: "Κλείσιμο Αντλίας σε Συνθήκες Υψηλής Υγρασίας:", labelWidth: "auto" , labelAlign:"right" , name:"WPENRH" ,className :'DialogCheckBoxClass',checked: false}, //53
					{type: "checkbox", label: "Κλέισιμο Παραθύρων όταν λειτουργεί το WetPad:", labelWidth: "auto" , labelAlign:"right" , name:"WPENCW" ,className :'DialogCheckBoxClass',checked: false} //54
				]},
				{type: "fieldset", width: "auto", label: "ΑΝΕΜΙΣΤΗΡΕΣ", list:[
					{type: "input",  label: "Θέρμοκρασία 1", labelWidth: "auto", inputWidth: 80 ,name: "WPT1"   , maxLength :10,  className :'DialogInputClass', value:Parameters[31] },
					{type: "input",  label: "Θέρμοκρασία 2", labelWidth: "auto", inputWidth: 80 ,name: "WPT2"   , maxLength :10,  className :'DialogInputClass', value:Parameters[32] },
					{type: "input",  label: "Θέρμοκρασία 3", labelWidth: "auto", inputWidth: 80 ,name: "WPT3"   , maxLength :10,  className :'DialogInputClass', value:Parameters[33] },
					{type: "input",  label: "Θέρμοκρασία 4", labelWidth: "auto", inputWidth: 80 ,name: "WPT4"   , maxLength :10,  className :'DialogInputClass', value:Parameters[34] },
					{type: "input",  label: "Θέρμοκρασία 5", labelWidth: "auto", inputWidth: 80 ,name: "WPT5"   , maxLength :10,  className :'DialogInputClass', value:Parameters[35] },
					{type: "input",  label: "Υστέρηση " , labelWidth: "auto", inputWidth: 80 ,name: "WPOFFSET"  , maxLength :10,  className :'DialogInputClass', value:Parameters[58] },
					{type: "newcolumn", offset:10},			
					{type: "select", label: "-", labelWidth: "10", labelAlign:"left" , inputWidth: 120, className :'DialogsSelectInput' ,name:"WPF11" },  //38
					{type: "select", label: "-", labelWidth: "10", labelAlign:"left" , inputWidth: 120, className :'DialogsSelectInput' ,name:"WPF12" },  //41
					{type: "select", label: "-", labelWidth: "10", labelAlign:"left" , inputWidth: 120, className :'DialogsSelectInput' ,name:"WPF13" },  //44
					{type: "select", label: "-", labelWidth: "10", labelAlign:"left" , inputWidth: 120, className :'DialogsSelectInput' ,name:"WPF14" },  //47
					{type: "select", label: "-", labelWidth: "10", labelAlign:"left" , inputWidth: 120, className :'DialogsSelectInput' ,name:"WPF15" },  //50
					{type: "newcolumn", offset:10},			
					{type: "select", label: "-", labelWidth: "10", labelAlign:"left" , inputWidth: 120, className :'DialogsSelectInput' ,name:"WPF21" },  //39
					{type: "select", label: "-", labelWidth: "10", labelAlign:"left" , inputWidth: 120, className :'DialogsSelectInput' ,name:"WPF22" },  //42
					{type: "select", label: "-", labelWidth: "10", labelAlign:"left" , inputWidth: 120, className :'DialogsSelectInput' ,name:"WPF23" },  //45
					{type: "select", label: "-", labelWidth: "10", labelAlign:"left" , inputWidth: 120, className :'DialogsSelectInput' ,name:"WPF24" },  //48
					{type: "select", label: "-", labelWidth: "10", labelAlign:"left" , inputWidth: 120, className :'DialogsSelectInput' ,name:"WPF25" },  //51
					{type: "newcolumn", offset:10},			
					{type: "select", label: "-", labelWidth: "10", labelAlign:"left" , inputWidth: 120, className :'DialogsSelectInput' ,name:"WPF31" },  //40
					{type: "select", label: "-", labelWidth: "10", labelAlign:"left" , inputWidth: 120, className :'DialogsSelectInput' ,name:"WPF32" },  //43
					{type: "select", label: "-", labelWidth: "10", labelAlign:"left" , inputWidth: 120, className :'DialogsSelectInput' ,name:"WPF33" },  //46
					{type: "select", label: "-", labelWidth: "10", labelAlign:"left" , inputWidth: 120, className :'DialogsSelectInput' ,name:"WPF34" },  //49
					{type: "select", label: "-", labelWidth: "10", labelAlign:"left" , inputWidth: 120, className :'DialogsSelectInput' ,name:"WPF35" }   //52
					
				]},
				{type: "fieldset", width: "auto", label: "ΑΝΤΛΙΑ WET-PAD", list:[
					{type: "input",  label: "Οριο Υγρασίας < ", labelWidth: "auto", inputWidth: 80 ,name: "WPRH" , maxLength :10,  className :'DialogInputClass', value:Parameters[36] }, //36
					{type: "newcolumn", offset:50},	
					{type: "select", label: "Αντλία Wet-Pad", labelWidth: "auto", labelAlign:"left" , inputWidth: 150, className :'DialogsSelectInput' ,name:"WPPUMP" }  //37
				]},
			];
			formData5 = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "fieldset", width: "auto", label: "ΚΟΥΡΤΙΝΑ ΣΚΙΑΣΗΣ", list:[
					{type: "checkbox", label: "Ενεργοποίηση Ελέγχου Κουρτίνας:", labelWidth: "auto" , labelAlign:"left" , name:"SCENABLE",className :'DialogCheckBoxClass' ,checked: false},//65
					{type: "block", width: "auto", list:[
						{type: "input", label: "Λειτουργία Ημέρας Από: ", labelWidth: "auto", inputWidth: 80 ,name: "SCFROM" , maxLength :5 ,  className :'DialogInputClass', value:"00:00" ,readonly:true}, //66						
						{type: "newcolumn", offset:50},						
						{type: "input", label: " ΕΩΣ: ", labelWidth: "100", inputWidth: 80 ,name: "SCTO" , maxLength :5, className :'DialogInputClass' , value:"00:00" ,readonly:true}, //67
					]},
					{type: "input",  label: "Απλωμα Κουρτίνας Οταν Ηλιακή Ακτινοβολία > ", labelWidth: "400", inputWidth: 150 ,name: "SCSOE"   , maxLength :10 ,  className :'DialogInputClass', value:Parameters[68] },
					{type: "input",  label: "και Θερμοκρασία     > ", labelWidth: "400", inputWidth: 150 ,name: "SCTEX"   , maxLength :50 ,  className :'DialogInputClass', value:Parameters[70] },
					{type: "input",  label: "Μάζεμα Κουρτίνας Οταν Ηλιακή Ακτινοβολία < ", labelWidth: "400", inputWidth: 150 ,name: "SCSOR"   , maxLength :10 ,  className :'DialogInputClass', value:Parameters[69] },
					{type: "select", label: "Κατά την Διάρκεια της Νύχτας:", labelWidth: "400" , inputWidth: 150 ,name: "SCDN" , className :'DialogsSelectInput' ,options:[
						{text: "ΑΠΛΩΜΕΝΗ", value: "1"},
						{text: "ΜΑΖΕΜΕΝΗ", value: "2"},
						{text: "ΕΛΕΥΘΕΡΗ", value: "3"}
					]} //71
				]}
			];
			formData6 = [
				{type: "settings", position: "label-left", labelWidth: "auto", inputWidth: 120 },
				{type: "fieldset", width: "auto", label: "", list:[
					{type: "checkbox", label: "Ενεργοποίηση Υδρονέφωσης:", labelWidth: "auto" , labelAlign:"left" , name:"FOGENABLE" ,className :'DialogCheckBoxClass' ,checked: false},//72
					{type: "input",  label: "Εναρξη Προγράμματος Υδρονέφωσης Οταν Θερμοκρασία > ", labelWidth: "500", inputWidth: 80 ,name: "FOGTS"   , maxLength :50 ,  className :'DialogInputClass', value:Parameters[74] },
					{type: "input",  label: "και Υγρασία < ", labelWidth: "500", inputWidth: 80 ,name: "FOGHS"   , maxLength :50 ,  className :'DialogInputClass', value:Parameters[75] },
					{type: "input",  label: "Ελάχιστος Χρόνος Μεταξύ Δύο Ενάρξεων (Δευτερόλεπτα)", labelWidth: "500", inputWidth: 80 ,name: "FOGTB"   , maxLength :50,  className :'DialogInputClass' , value:Parameters[73] },
					{type: "select", label: "Πρόγραμμα Υδρονέφωσης", labelWidth: "500", labelAlign:"left" , inputWidth:250 , className :'DialogsSelectInput' ,name:"FOGPR" }  //76
				]}
			];
			//*************************************************************
			myForm1 = TabBar.cells("t1").attachForm(formData1);
			myForm2 = TabBar.cells("t2").attachForm(formData2);
			myForm3 = TabBar.cells("t3").attachForm(formData3);
			myForm4 = TabBar.cells("t4").attachForm(formData4);
			myForm5 = TabBar.cells("t5").attachForm(formData5);
			myForm6 = TabBar.cells("t6").attachForm(formData6);
			
			AttacheKeyboardToInput(myForm1.getInput("NAME").id);
			AttacheNumKeyboardToInput(myForm1.getInput("LOWT").id,1);
			AttacheNumKeyboardToInput(myForm1.getInput("WLOWT").id,1);
			AttacheNumKeyboardToInput(myForm1.getInput("HIGHT").id,1);
			AttacheNumKeyboardToInput(myForm1.getInput("WHIGHT").id,1);
			AttacheNumKeyboardToInput(myForm1.getInput("LOWRH").id,1);
			AttacheNumKeyboardToInput(myForm1.getInput("WLOWRH").id,1);
			AttacheNumKeyboardToInput(myForm1.getInput("HIGHRH").id,1);
			AttacheNumKeyboardToInput(myForm1.getInput("WHIGHRH").id,1);
			AttacheNumKeyboardToInput(myForm1.getInput("LOWWS").id,1);
			AttacheNumKeyboardToInput(myForm1.getInput("WLOWWS").id,1);
			AttacheNumKeyboardToInput(myForm1.getInput("HIGHWS").id,1);
			AttacheNumKeyboardToInput(myForm1.getInput("WHIGHWS").id,1);
			AttacheNumKeyboardToInput(myForm1.getInput("WMAXRAIN").id,1);
			AttacheNumKeyboardToInput(myForm1.getInput("WMAXEXTRA1").id,1);
			AttacheNumKeyboardToInput(myForm1.getInput("WMAXEXTRA2").id,1);
			AttacheNumKeyboardToInput(myForm2.getInput("H1TSET").id,1);
			AttacheNumKeyboardToInput(myForm2.getInput("H2TSET").id,1);
			
			AttacheNumKeyboardToInput(myForm3.getInput("WPT1").id,1);
			AttacheNumKeyboardToInput(myForm3.getInput("WPT2").id,1);
			AttacheNumKeyboardToInput(myForm3.getInput("WPT3").id,1);
			AttacheNumKeyboardToInput(myForm3.getInput("WPT4").id,1);
			AttacheNumKeyboardToInput(myForm3.getInput("WPT5").id,1);
			AttacheNumKeyboardToInput(myForm3.getInput("WPOFFSET").id,1);
			AttacheNumKeyboardToInput(myForm3.getInput("WPRH").id,1);			

			AttacheNumKeyboardToInput(myForm5.getInput("SCSOE").id,1);
			AttacheNumKeyboardToInput(myForm5.getInput("SCTEX").id,1);
			AttacheNumKeyboardToInput(myForm5.getInput("SCSOR").id,1);			

			AttacheNumKeyboardToInput(myForm6.getInput("FOGTS").id,1);
			AttacheNumKeyboardToInput(myForm6.getInput("FOGHS").id,1);
			AttacheNumKeyboardToInput(myForm6.getInput("FOGTB").id,1);			

			//*************************************************************
			//************* FILL LIST BOXES *******************************
			//*************************************************************
			if (Parameters[71] > 0)
				myForm5.getSelect("SCDN").options[Parameters[71]-1].selected=true;
			else
				myForm5.getSelect("SCDN").options[0].selected=true;
			
			
			FeelSelectWithAllVirtuals(myForm2.getSelect("H1TADJ"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm2.getSelect("H2TADJ"),DEF_ALL_VIRTUALS_MASK);
			
			FeelSelectWithAllVirtuals(myForm4.getSelect("ADGEN"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm4.getSelect("ADENWINDOWS"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm4.getSelect("ADENHEATER1"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm4.getSelect("ADENHEATER2"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm4.getSelect("ADENSCREEN"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm4.getSelect("ADENFOG"),DEF_ALL_VIRTUALS_MASK);

			FeelSelectWithAllVirtuals(myForm4.getSelect("ADT"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm4.getSelect("ADRH"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm4.getSelect("ADWS"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm4.getSelect("ADSO"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm4.getSelect("ADRAIN"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm4.getSelect("ADEX1"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm4.getSelect("ADEX2"),DEF_ALL_VIRTUALS_MASK);
			FeelSelectWithAllVirtuals(myForm4.getSelect("ADWOD"),DEF_OUTPUT_DRIVER_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("ADH1OD"),DEF_OUTPUT_DRIVER_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("ADH2OD"),DEF_OUTPUT_DRIVER_VARIABLE);
			FeelSelectWithAllVirtuals(myForm4.getSelect("ADSCOD"),DEF_OUTPUT_DRIVER_VARIABLE);
			
			FeelSelectWithAllVirtuals(myForm3.getSelect("WPF11"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("WPF12"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("WPF13"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("WPF14"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("WPF15"),DEF_DIGITAL_OUTPUT_VARIABLE);

			FeelSelectWithAllVirtuals(myForm3.getSelect("WPF21"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("WPF22"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("WPF23"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("WPF24"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("WPF25"),DEF_DIGITAL_OUTPUT_VARIABLE)
			
			FeelSelectWithAllVirtuals(myForm3.getSelect("WPF31"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("WPF32"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("WPF33"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("WPF34"),DEF_DIGITAL_OUTPUT_VARIABLE);
			FeelSelectWithAllVirtuals(myForm3.getSelect("WPF35"),DEF_DIGITAL_OUTPUT_VARIABLE);
			
			FeelSelectWithAllVirtuals(myForm3.getSelect("WPPUMP"),DEF_DIGITAL_OUTPUT_VARIABLE);
			
			FeelSelectWithAllTimePrograms(myForm6.getSelect("FOGPR"));
			
			//*************************************************************
			//************* SET VALUES ************************************
			//*************************************************************
			myForm5.setItemValue("SCFROM", MinutesTo24Time(Parameters[66]));
			myForm5.setItemValue("SCTO", MinutesTo24Time(Parameters[67]));
			AttachMouseClickEventForTimeSelect(myForm5.getInput("SCFROM"),myForm5);
			AttachMouseClickEventForTimeSelect(myForm5.getInput("SCTO"),myForm5);
			
			
			SetCheckValue(myForm1,"ENABLE",Parameters[0]);
			SetCheckValue(myForm3,"WPENABLE",Parameters[30]);
			SetCheckValue(myForm3,"WPENRH",Parameters[53]);
			SetCheckValue(myForm3,"WPENCW",Parameters[54]);			
			SetCheckValue(myForm2,"H1ENABLE",Parameters[59]);
			SetCheckValue(myForm2,"H2ENABLE",Parameters[60]);
			SetCheckValue(myForm6,"FOGENABLE",Parameters[72]);
			SetCheckValue(myForm5,"SCENABLE",Parameters[65]);

			SelectOptionInSelectByValue(myForm2.getSelect("H1TADJ"),Parameters[18]);
			SelectOptionInSelectByValue(myForm2.getSelect("H2TADJ"),Parameters[19]);
			SelectOptionInSelectByValue(myForm4.getSelect("ADGEN"),Parameters[20]);
			SelectOptionInSelectByValue(myForm4.getSelect("ADENWINDOWS"),Parameters[55]);
			SelectOptionInSelectByValue(myForm4.getSelect("ADENHEATER1"),Parameters[56]);
			SelectOptionInSelectByValue(myForm4.getSelect("ADENHEATER2"),Parameters[57]);			
			SelectOptionInSelectByValue(myForm4.getSelect("ADENSCREEN"),Parameters[63]);
			SelectOptionInSelectByValue(myForm4.getSelect("ADENFOG"),Parameters[64]);			
			
			
			SelectOptionInSelectByValue(myForm4.getSelect("ADT"),Parameters[21]);
			SelectOptionInSelectByValue(myForm4.getSelect("ADRH"),Parameters[22]);
			SelectOptionInSelectByValue(myForm4.getSelect("ADWS"),Parameters[23]);
			SelectOptionInSelectByValue(myForm4.getSelect("ADSO"),Parameters[61]);
			SelectOptionInSelectByValue(myForm4.getSelect("ADRAIN"),Parameters[24]);
			SelectOptionInSelectByValue(myForm4.getSelect("ADEX1"),Parameters[25]);
			SelectOptionInSelectByValue(myForm4.getSelect("ADEX2"),Parameters[26]);
			SelectOptionInSelectByValue(myForm4.getSelect("ADWOD"),Parameters[27]);
			SelectOptionInSelectByValue(myForm4.getSelect("ADH1OD"),Parameters[28]);
			SelectOptionInSelectByValue(myForm4.getSelect("ADH2OD"),Parameters[29]);
			SelectOptionInSelectByValue(myForm4.getSelect("ADSCOD"),Parameters[62]);
			
			SelectOptionInSelectByValue(myForm3.getSelect("WPF11"),Parameters[38]);
			SelectOptionInSelectByValue(myForm3.getSelect("WPF12"),Parameters[41]);
			SelectOptionInSelectByValue(myForm3.getSelect("WPF13"),Parameters[44]);
			SelectOptionInSelectByValue(myForm3.getSelect("WPF14"),Parameters[47]);
			SelectOptionInSelectByValue(myForm3.getSelect("WPF15"),Parameters[50]);
			
			SelectOptionInSelectByValue(myForm3.getSelect("WPF21"),Parameters[39]);
			SelectOptionInSelectByValue(myForm3.getSelect("WPF22"),Parameters[42]);
			SelectOptionInSelectByValue(myForm3.getSelect("WPF23"),Parameters[45]);
			SelectOptionInSelectByValue(myForm3.getSelect("WPF24"),Parameters[48]);
			SelectOptionInSelectByValue(myForm3.getSelect("WPF25"),Parameters[51]);
			
			SelectOptionInSelectByValue(myForm3.getSelect("WPF31"),Parameters[40]);
			SelectOptionInSelectByValue(myForm3.getSelect("WPF32"),Parameters[43]);
			SelectOptionInSelectByValue(myForm3.getSelect("WPF33"),Parameters[46]);
			SelectOptionInSelectByValue(myForm3.getSelect("WPF34"),Parameters[49]);
			SelectOptionInSelectByValue(myForm3.getSelect("WPF35"),Parameters[52]);

			SelectOptionInSelectByValue(myForm3.getSelect("WPPUMP"),Parameters[37]);

			SelectOptionInSelectByValue(myForm6.getSelect("FOGPR"),Parameters[76]);

			//*************************************************************
			myForm1.attachEvent("onButtonClick", function(name){
				if (name == 'CANCEL')
				{
					WindowsViewPort.window("DialogWindow").close();	
					return;
				}
				var Parameters = new Array();
				if ( myForm1.isItemChecked("ENABLE") ) {Parameters[0]=1;} else {Parameters[0]=0;}
				Parameters[1]=myForm1.getInput("LOWT").value;
				Parameters[2]=myForm1.getInput("HIGHT").value;
				Parameters[3]=myForm1.getInput("WLOWT").value;
				Parameters[4]=myForm1.getInput("WHIGHT").value;
				Parameters[5]=myForm1.getInput("LOWRH").value;
				Parameters[6]=myForm1.getInput("HIGHRH").value;
				Parameters[7]=myForm1.getInput("WLOWRH").value;
				Parameters[8]=myForm1.getInput("WHIGHRH").value;
				Parameters[9]=myForm1.getInput("LOWWS").value;
				Parameters[10]=myForm1.getInput("HIGHWS").value;
				Parameters[11]=myForm1.getInput("WLOWWS").value;
				Parameters[12]=myForm1.getInput("WHIGHWS").value;
				Parameters[13]=myForm1.getInput("WMAXRAIN").value;
				Parameters[14]=myForm1.getInput("WMAXEXTRA1").value;
				Parameters[15]=myForm1.getInput("WMAXEXTRA2").value;
				//************************************************
				Parameters[16]=myForm2.getInput("H1TSET").value;
				Parameters[17]=myForm2.getInput("H2TSET").value;
				Parameters[18]=myForm2.getSelect("H1TADJ").options[myForm2.getSelect("H1TADJ").selectedIndex].value;
				Parameters[19]=myForm2.getSelect("H2TADJ").options[myForm2.getSelect("H2TADJ").selectedIndex].value;
				//************************************************
				Parameters[20]=myForm4.getSelect("ADGEN").options[myForm4.getSelect("ADGEN").selectedIndex].value;
				Parameters[21]=myForm4.getSelect("ADT").options[myForm4.getSelect("ADT").selectedIndex].value;
				Parameters[22]=myForm4.getSelect("ADRH").options[myForm4.getSelect("ADRH").selectedIndex].value;
				Parameters[23]=myForm4.getSelect("ADWS").options[myForm4.getSelect("ADWS").selectedIndex].value;
				Parameters[24]=myForm4.getSelect("ADRAIN").options[myForm4.getSelect("ADRAIN").selectedIndex].value;
				Parameters[25]=myForm4.getSelect("ADEX1").options[myForm4.getSelect("ADEX1").selectedIndex].value;
				Parameters[26]=myForm4.getSelect("ADEX2").options[myForm4.getSelect("ADEX2").selectedIndex].value;
				Parameters[27]=myForm4.getSelect("ADWOD").options[myForm4.getSelect("ADWOD").selectedIndex].value;
				Parameters[28]=myForm4.getSelect("ADH1OD").options[myForm4.getSelect("ADH1OD").selectedIndex].value;
				Parameters[29]=myForm4.getSelect("ADH2OD").options[myForm4.getSelect("ADH2OD").selectedIndex].value;
				//************************************************
				if ( myForm3.isItemChecked("WPENABLE") ) {Parameters[30]=1;} else {Parameters[30]=0;}
				Parameters[31]=myForm3.getInput("WPT1").value;
				Parameters[32]=myForm3.getInput("WPT2").value;
				Parameters[33]=myForm3.getInput("WPT3").value;
				Parameters[34]=myForm3.getInput("WPT4").value;				
				Parameters[35]=myForm3.getInput("WPT5").value;
				Parameters[36]=myForm3.getInput("WPRH").value;
				Parameters[37]=myForm3.getSelect("WPPUMP").options[myForm3.getSelect("WPPUMP").selectedIndex].value;
				
				Parameters[38]=myForm3.getSelect("WPF11").options[myForm3.getSelect("WPF11").selectedIndex].value;
				Parameters[41]=myForm3.getSelect("WPF12").options[myForm3.getSelect("WPF12").selectedIndex].value;
				Parameters[44]=myForm3.getSelect("WPF13").options[myForm3.getSelect("WPF13").selectedIndex].value;
				Parameters[47]=myForm3.getSelect("WPF14").options[myForm3.getSelect("WPF14").selectedIndex].value;
				Parameters[50]=myForm3.getSelect("WPF15").options[myForm3.getSelect("WPF15").selectedIndex].value;				
				
				Parameters[39]=myForm3.getSelect("WPF21").options[myForm3.getSelect("WPF21").selectedIndex].value;
				Parameters[42]=myForm3.getSelect("WPF22").options[myForm3.getSelect("WPF22").selectedIndex].value;
				Parameters[45]=myForm3.getSelect("WPF23").options[myForm3.getSelect("WPF23").selectedIndex].value;
				Parameters[48]=myForm3.getSelect("WPF24").options[myForm3.getSelect("WPF24").selectedIndex].value;
				Parameters[51]=myForm3.getSelect("WPF25").options[myForm3.getSelect("WPF25").selectedIndex].value;				

				Parameters[40]=myForm3.getSelect("WPF31").options[myForm3.getSelect("WPF31").selectedIndex].value;
				Parameters[43]=myForm3.getSelect("WPF32").options[myForm3.getSelect("WPF32").selectedIndex].value;
				Parameters[46]=myForm3.getSelect("WPF33").options[myForm3.getSelect("WPF33").selectedIndex].value;
				Parameters[49]=myForm3.getSelect("WPF34").options[myForm3.getSelect("WPF34").selectedIndex].value;
				Parameters[52]=myForm3.getSelect("WPF35").options[myForm3.getSelect("WPF35").selectedIndex].value;				
				
				if ( myForm3.isItemChecked("WPENRH") ) {Parameters[53]=1;} else {Parameters[53]=0;}
				if ( myForm3.isItemChecked("WPENCW") ) {Parameters[54]=1;} else {Parameters[54]=0;}
				Parameters[55]=myForm4.getSelect("ADENWINDOWS").options[myForm4.getSelect("ADENWINDOWS").selectedIndex].value;
				Parameters[56]=myForm4.getSelect("ADENHEATER1").options[myForm4.getSelect("ADENHEATER1").selectedIndex].value;				
				Parameters[57]=myForm4.getSelect("ADENHEATER2").options[myForm4.getSelect("ADENHEATER2").selectedIndex].value;
				Parameters[58]=myForm3.getInput("WPOFFSET").value;
				//*************************************************************************
				if ( myForm2.isItemChecked("H1ENABLE") ) {Parameters[59]=1;} else {Parameters[59]=0;}
				if ( myForm2.isItemChecked("H2ENABLE") ) {Parameters[60]=1;} else {Parameters[60]=0;}
				
				Parameters[61]=myForm4.getSelect("ADSO").options[myForm4.getSelect("ADSO").selectedIndex].value;			
				Parameters[62]=myForm4.getSelect("ADSCOD").options[myForm4.getSelect("ADSCOD").selectedIndex].value;			
				Parameters[63]=myForm4.getSelect("ADENSCREEN").options[myForm4.getSelect("ADENSCREEN").selectedIndex].value;			
				Parameters[64]=myForm4.getSelect("ADENFOG").options[myForm4.getSelect("ADENFOG").selectedIndex].value;							
				
				if ( myForm5.isItemChecked("SCENABLE") ) {Parameters[65]=1;} else {Parameters[65]=0;}
				Parameters[66]=H24ToMinutes(myForm5.getInput("SCFROM").value);	
				Parameters[67]=H24ToMinutes(myForm5.getInput("SCTO").value);	
				Parameters[68]=myForm5.getInput("SCSOE").value;
				Parameters[69]=myForm5.getInput("SCSOR").value;
				Parameters[70]=myForm5.getInput("SCTEX").value;				
				Parameters[71]=myForm5.getSelect("SCDN").options[myForm5.getSelect("SCDN").selectedIndex].value;			
			
				if ( myForm6.isItemChecked("FOGENABLE") ) {Parameters[72]=1;} else {Parameters[72]=0;}
				Parameters[73]=myForm6.getInput("FOGTB").value;
				Parameters[74]=myForm6.getInput("FOGTS").value;
				Parameters[75]=myForm6.getInput("FOGHS").value;				
				Parameters[76]=myForm6.getSelect("FOGPR").options[myForm6.getSelect("FOGPR").selectedIndex].value;
				
				SetClimateControlSetup(myForm1.getInput("ID").value,myForm1.getInput("NAME").value,Parameters,Parameters.length);
				WindowsViewPort.window("DialogWindow").close();
				ReloadClimateControlGrid();
			})
		}

}
//**********************************************************************************
function SetClimateControlSetup(pid,Name,Parameters,ParametersLenght)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 025;'+pid+';';
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
	//alert(url.length);
	//alert(url);
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);
	
}
//**********************************************************************************
function GetClimateControlSetup(pid)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 024;'+pid+';';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	//alert(txt.length);
	//alert(txt);
	return txt;
}
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
//**********************************************************************************
function CreateClimateControlGrid()
{
	//VariablesGrid = new dhtmlXGridObject(GridDivId);
	if (ClimateControlVersion == 0) return;
	ClimateControlGrid.setHeader("ID,ONOMA, ");
	ClimateControlGrid.setInitWidths("50,300,0")
	ClimateControlGrid.setColAlign("left,left,center")
	ClimateControlGrid.setColTypes("ro,ro,ro");
	//mygrid.setColSorting("str,str,str")
	ClimateControlGrid.setSkin("dhx_skyblue")
	ClimateControlGrid.enableKeyboardSupport(false); 
	ClimateControlGrid.enableLightMouseNavigation(false);
	ClimateControlGrid.init();
	ClimateControlGrid.attachEvent("onRightClick", RowClickedOnClimateControlGrid);
	ClimateControlGrid.attachEvent("onRowSelect", RowClickedOnClimateControlGrid);
	ClimateControlGrid.attachEvent("onHeaderClick", HeaderClickedOnClimateControlGrid);
	
	var url='http://'+SystemIpAdress+'/'+SystemFileSystem+CLIMATE_NAMES_RAM_FILE_NAME;
	//url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	ClimateControlGrid.parse(txt,"csv");
	ClimateControlGridLoaded();
	
}

function ReloadClimateControlGrid()
{
	//VariablesGrid.clearAndLoad('http://'+SystemIpAdress+'/'+SystemFileSystem+'/vir.txt',VariablesGridLoaded,"csv");
	ClimateControlGrid.clearAll(false);
	var url='http://'+SystemIpAdress+'/'+SystemFileSystem+CLIMATE_NAMES_RAM_FILE_NAME;
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	ClimateControlGrid.parse(txt,"csv");
	ClimateControlGridLoaded();
}

function ClimateControlGridLoaded()
{
	for (i=0;i<MAX_CLIMATE_CONTROL;i++)
	{
		AllClimateControlNames[i]='';
	}
	
	var NumberOfRows = ClimateControlGrid.getRowsNum();
	for (i=1;i<=NumberOfRows;i++)
	{
		ClimateControlGrid.setRowTextStyle(i, "font-size:x-large;color:#291919;font-family: digital-7, Arial, Helvetica, sans-serif;");
		ClimateControlGrid.cells(i,1).setValue(hex2a(ClimateControlGrid.cellById(i,1).getValue()));
		ClimateControlGrid.cells(i,1).setValue(ClimateControlGrid.cellById(i,1).getValue().replace(/~/g,' '));
		AllClimateControlNames[i-1]=ClimateControlGrid.cellById(i,1).getValue();
	}
	FeelSelectWithClimatePrograms(document.getElementById('InfoClimaList'))
	ConvertSelectToMobiScrollSelect(document.getElementById('InfoClimaList').id,document.getElementById('InfoClimaList').className);
}

function FeelSelectWithClimatePrograms(sel)
{
	sel.options.length = 0;
	sel.options[sel.options.length] = new Option('KENO', 0xFF);
	for (i=0;i<MAX_CLIMATE_CONTROL;i++)
	{
		sel.options[sel.options.length] = new Option(AllClimateControlNames[i],i);
	}
}



function HeaderClickedOnClimateControlGrid(ind,obj)
{
	//	alert(ind+' '+obj);
	if  (ind ==0)
		ClimateControlGrid.sortRows(ind,"int","asc");    
	else	
		ClimateControlGrid.sortRows(ind,"str","asc");    
}

function RowClickedOnClimateControlGrid(row,col,ev)
{
	if (col==0)
	{
		SetGUIOnSynchronousHttpRequest();
		setTimeout(function() {
			CreateClimateControlWindow(ClimateControlGrid.cellById(row,0).getValue(),ClimateControlGrid.cellById(row,1).getValue());
		}, 100)
	
	}

}

function InfoEditClima()
{
	var sel = document.getElementById('InfoClimaList');
	var pid = parseInt(sel.options[sel.selectedIndex].value,10)+1;
	if ( (pid <1) || (pid > MAX_CLIMATE_CONTROL) ) return;
			SetGUIOnSynchronousHttpRequest();
			setTimeout(function() {
			CreateClimateControlWindow(parseInt(pid,10),sel.options[sel.selectedIndex].text);
	}, 100)
}
