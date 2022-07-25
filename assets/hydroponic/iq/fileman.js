// JavaScript Document
function IQErrorWindow()
{
	var	requestDate = new Date();
	
	var m = requestDate.getMonth()+1;
	var y= requestDate.getFullYear();
	var sd1 = String(m); if (m<10) sd1='0'+sd1;
	var nurl='/SD/ERRORS/'+sd1+'_'+y+'/ERRORS.TXT';
	var url='http://'+SystemIpAdress+nurl;
	//alert(url);
	window.open(url);
	
}


function IQFileManager()
{
		StopDataAcquisition();
		var url='http://'+SystemIpAdress+FILE_MANAGER_FILE_NAME_IN_FLASH;
		window.open(url);
		return;

		var Parameters = new Array();
		if (FlagWindowIsCreated==0)
		{	
			
			//*********************************************			
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 5, 5, 700, 500);
			DialogWindow.setText("File Manager");
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
					{type: "input", inputWidth: 180 ,name: "FM_L1" ,  maxLength :20 , value:'/LOCALFS' },
					{type: "newcolumn", offset:0},
					{type: "input", inputWidth: 180 ,name: "FM_L2" ,  maxLength :20 , value:'/SD' }
				]},
				{type: "block", width: "550", list:[
					{type: "multiselect",  inputHeight:300 ,inputWidth: 180 ,name:"FM_F1" },   // 3
					{type: "newcolumn", offset:0},
					{type: "multiselect",  inputHeight:300 ,inputWidth: 180 ,name:"FM_F2" },   // 3
				]},
				{type: "block", width: "550", list:[
					{type: "button", position: "left",inputWidth: 180, name: "FM_B1" , value: "ΑΝΑΝΕΩΣΗ"},
					{type: "newcolumn", offset:80},
					{type: "button", position: "left", name: "FM_B2" , value: "ΑΝΑΝΕΩΣΗ"}
				]},
				{type: "block", width: "550", list:[
					{type: "button", position: "left",inputWidth: 180, name: "FM_BCOPY1" , value: "COPY >>>"},
					{type: "newcolumn", offset:80},
					{type: "button", position: "left", name: "FM_BCOPY2" , value: "<<< COPY"}
				]},
				{type: "block", width: "550", list:[
					{type: "button", position: "left",inputWidth: 180, name: "FM_BDELETE1" , value: "ΔΙΑΓΡΑΦΗ  "},
					{type: "newcolumn", offset:80},
					{type: "button", position: "left", name: "FM_BDELETE2" , value: "ΔΙΑΓΡΑΦΗ  "}
				]}
				

			];
			//*************************************************************
			myForm = DialogWindow.attachForm(formData);
			//*************************************************************
			//************* FILL LIST BOXES *******************************
			//*************************************************************
			FeelSelectWithDirectoryFromIQ("/LOCALFS",myForm.getSelect("FM_F1"));
			FeelSelectWithDirectoryFromIQ("/SD",myForm.getSelect("FM_F2"));
			//*************************************************************
			//************* SET VALUES ************************************
			//*************************************************************
			SelectOptionInSelectByValue(myForm.getSelect("FM_F1"),0);
			SelectOptionInSelectByValue(myForm.getSelect("FM_F2"),0);
			//*************************************************************
			myForm.attachEvent("onChange", function(name,value,is_checked){
				if (name == 'FM_F2')
				{
					var TextOnL2 = myForm.getSelect("FM_F2").options[myForm.getSelect("FM_F2").selectedIndex].text;
					if (TextOnL2.indexOf("/") != -1) 
					{
						if (myForm.getInput("FM_L2").value.indexOf(TextOnL2) == -1)
							myForm.getInput("FM_L2").value = myForm.getInput("FM_L2").value +  myForm.getSelect("FM_F2").options[myForm.getSelect("FM_F2").selectedIndex].text;
						
					}
					
				}
													
			});
			//*************************************************************
			myForm.attachEvent("onButtonClick", function(name){
				if (name == 'FM_B1')
				{
					//alert(myForm.getInput("FM_L1").value);
					FeelSelectWithDirectoryFromIQ(myForm.getInput("FM_L1").value,myForm.getSelect("FM_F1"));
				}
				else if (name == 'FM_B2')
				{
					//alert(myForm.getInput("FM_L2").value);
					FeelSelectWithDirectoryFromIQ(myForm.getInput("FM_L2").value,myForm.getSelect("FM_F2"));
				}
				else if (name == 'FM_BCOPY1')
				{
					var from = myForm.getInput("FM_L1").value ;
					var to   = myForm.getInput("FM_L2").value ;
					r=confirm("Αντιγραφη:"+from+'\r\nΣε :'+to);
					if (r==true) 
					{
						var sel=myForm.getSelect("FM_F1");
						for(i=0 ; i<sel.options.length ; i++)
						{
							if (sel.options[i].selected) 
							{
								var from = myForm.getInput("FM_L1").value + '/' + myForm.getSelect("FM_F1").options[i].text;
								var to   = myForm.getInput("FM_L2").value + '/' + myForm.getSelect("FM_F1").options[i].text;
								CopyFile(from,to);
								break;
							}
						}
						FeelSelectWithDirectoryFromIQ(myForm.getInput("FM_L2").value,myForm.getSelect("FM_F2"));
					}
				}
				else if (name == 'FM_BCOPY2')
				{
					var from = myForm.getInput("FM_L2").value ;
					var to   = myForm.getInput("FM_L1").value ;
					r=confirm("Αντιγραφη:"+from+'\r\nΣε :'+to);
					if (r==true) 
					{

						var sel=myForm.getSelect("FM_F2");
						for(i=0 ; i<sel.options.length ; i++)
						{
							if (sel.options[i].selected) 
							{
								var from = myForm.getInput("FM_L2").value + '/' + myForm.getSelect("FM_F2").options[i].text;
								var to   = myForm.getInput("FM_L1").value + '/' + myForm.getSelect("FM_F2").options[i].text;
								CopyFile(from,to);
								break;
							}
						}
						FeelSelectWithDirectoryFromIQ(myForm.getInput("FM_L1").value,myForm.getSelect("FM_F1"));
					}
				}
				else if (name == 'FM_BDELETE1')
				{
					r=confirm("ΠΡΟΣΟΧΗ ! Διαγραφή Αρχείου Από Τον Βασικό Φάκελο ?");
					if (r==true)
					{
						r=confirm("ΠΡΟΣΟΧΗ ! \r\nΠΡΟΣΟΧΗ ! \r\nΔιαγραφή Αρχείου Από Τον Βασικό Φάκελο ?\r\nΠΡΟΣΟΧΗ ! \r\nΠΡΟΣΟΧΗ ! \r\n");
					}
					if (r==true)
					{
						var sel=myForm.getSelect("FM_F1");
						for(i=0 ; i<sel.options.length ; i++)
						{
							if (sel.options[i].selected) 
							{
								var from = myForm.getInput("FM_L1").value + '/' + myForm.getSelect("FM_F1").options[i].text;
								DeleteFile(from);
								break;
							}
						}
						FeelSelectWithDirectoryFromIQ(myForm.getInput("FM_L1").value,myForm.getSelect("FM_F1"));
					}
				}
				else if (name == 'FM_BDELETE2')
				{
					r=confirm("Διαγραφή ?");
					if (r==true)
					{
						var sel=myForm.getSelect("FM_F2");
						for(i=0 ; i<sel.options.length ; i++)
						{
							if (sel.options[i].selected) 
							{
								var from = myForm.getInput("FM_L2").value + '/' + myForm.getSelect("FM_F2").options[i].text;
								DeleteFile(from);
								break;
							}
						}
						FeelSelectWithDirectoryFromIQ(myForm.getInput("FM_L2").value,myForm.getSelect("FM_F2"));	
					}
				}

			})
		}
}
//********************************************************************************************************
function FeelSelectWithDirectoryFromIQ(directory,sel)
{
	var txt=''
	var url='http://'+SystemIpAdress+directory;
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	//alert(txt);
	var Files = new Array();	
	Files = txt.split(";");
	
	for(i=sel.options.length-1;i>=0;i--)
    {
        sel.remove(i);
    }
	//sel.options[sel.options.length] = new Option('KENO', 0);
	for (i=0;i<Files.length;i++)
	{
		sel.options[sel.options.length] = new Option(Files[i],i);
	}
}
//********************************************************************************************************
function CopyFile(from,to)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 027 '+from+' '+to+' ';
	url=url+Math.random()+';';
	//alert(url);
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);
}
//********************************************************************************************************
function DeleteFile(from)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 028 '+from+' ';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	alert(txt);
}
//********************************************************************************************************