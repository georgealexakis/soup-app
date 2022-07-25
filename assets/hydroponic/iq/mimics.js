// JavaScript Document
var MimicLedOn = new Image();
var MimicLedOff = new Image();
MimicLedOn.src =  "./images/led/red-on-256.png";
MimicLedOff.src = "./images/led/red-off-256.png";

var MAX_MIMIC_ITEMS = 140;


var ActiveMimicItemID=null;

function MimicItemStruct(Active,MimicIndex,type,posx,posy,w,h,VariableID) {
    this.Active 	= Active;
	this.MimicIndex = MimicIndex;
	this.type		= type;
    this.posx       = posx;
    this.posy	    = posy;
	this.w		    = w;
	this.h		    = h;
	this.VariableID = VariableID;
}


var AllMimicItems = new Array();

function LoadMimics()
{
	
	var Parameters = new Array();
	var c=0;
	Parameters = ReadFileFromMBedAndReturnParametersArray('MIGR.TXT');
	for (i=0;i<MAX_MIMIC_ITEMS;i++)
	{
		if (Parameters[c])
		{
		AllMimicItems[i].Active 	= parseInt(Parameters[c]);		c++;
		AllMimicItems[i].MimicIndex = parseInt(Parameters[c]);		c++;
		AllMimicItems[i].type 		= Parameters[c];				c++;			
    	AllMimicItems[i].posx 		= parseInt(Parameters[c]);		c++;			
		AllMimicItems[i].posy 		= parseInt(Parameters[c]);		c++;			
		AllMimicItems[i].w 			= parseInt(Parameters[c]);		c++;				
		AllMimicItems[i].h 			= parseInt(Parameters[c]);		c++;				
		AllMimicItems[i].VariableID = parseInt(Parameters[c]);		c++;

		if ( (AllMimicItems[i].Active >0) && ( (AllMimicItems[i].Active & 1)==0) )  
		{
			//alert('Mimic Active Load Error:'+i);
			AllMimicItems[i].Active =0;
			AllMimicItems[i].MimicIndex = 1;
			AllMimicItems[i].type 		= 'L';			
    		AllMimicItems[i].posx 		= 100;			
			AllMimicItems[i].posy 		= 100;			
			AllMimicItems[i].w 			= 16;				
			AllMimicItems[i].h 			= 16;				
			AllMimicItems[i].VariableID = 1;

		}
		if ( (AllMimicItems[i].type	!= 'L') && (AllMimicItems[i].type	!= 'B') && (AllMimicItems[i].type	!= 'T') )  
		{
			//alert('Mimic Type Load Error:'+i);
			AllMimicItems[i].Active =0;
			AllMimicItems[i].MimicIndex = 1;
			AllMimicItems[i].type 		= 'L';			
    		AllMimicItems[i].posx 		= 100;			
			AllMimicItems[i].posy 		= 100;			
			AllMimicItems[i].w 			= 16;				
			AllMimicItems[i].h 			= 16;				
			AllMimicItems[i].VariableID = 1;
			
		}
		}
	}
}

/*
function LoadMimics()
{
	var Parameters = new Array();
	var c=0;
	Parameters = ReadFileFromMBedAndReturnParametersArray('migr.txt');
	py=20; px=0;
	for (i=0;i<MAX_MIMIC_ITEMS;i++)
	{
	    px++;		
		if (Parameters[c])
		{
		AllMimicItems[i].Active 	= 1;//parseInt(Parameters[c]);		c++;
		AllMimicItems[i].MimicIndex = 1;//parseInt(Parameters[c]);		c++;
		AllMimicItems[i].type 		= 'L';//Parameters[c];				c++;			
    	AllMimicItems[i].posx 		= 20+px*20;//parseInt(Parameters[c]);		c++;			
		AllMimicItems[i].posy 		= py;//parseInt(Parameters[c]);		c++;			
		AllMimicItems[i].w 			= 16;//parseInt(Parameters[c]);		c++;				
		AllMimicItems[i].h 			= 16;//parseInt(Parameters[c]);		c++;				
		AllMimicItems[i].VariableID = 1;//parseInt(Parameters[c]);		c++;
		if ((i%10) ==0) 
		{ 
			py=py+20;
			px=0;
		}
		}
	}
}
*/
function SaveMimics()
{
	var Parameters = new Array();
	var c=0;
	var ret='';
	var counter=0;
	for (i=0;i<MAX_MIMIC_ITEMS;i++)
	{
		
		Parameters[c] = AllMimicItems[i].Active;		c++;
		Parameters[c] = AllMimicItems[i].MimicIndex;	c++;
		Parameters[c] = AllMimicItems[i].type;			c++;
    	Parameters[c] = AllMimicItems[i].posx;			c++;
	    Parameters[c] = AllMimicItems[i].posy;			c++;
		Parameters[c] = AllMimicItems[i].w;				c++;	
		Parameters[c] = AllMimicItems[i].h;				c++;
		Parameters[c] = AllMimicItems[i].VariableID;	c++;	
		
			if (i==19) 
			{
				var url='http://'+SystemIpAdress+'/rpc/SetData/run 031;1;migr.txt'+' ';
				for (k=0;k<Parameters.length;k++)
				{
					url=url+Parameters[k]+';';
				}
				ret = XmlSynchronousHttpRequest(url,3000,timeoutFired);
				ret = decodeURIComponent(ret);
				//ret=WriteToFileOnmBed2("migr.txt",1,Parameters,Parameters.length);	// NEW FILE
				if (ret != 'OK')
					alert('ERROR SAVING GROUP 1');
				else
					counter++;
	
				Parameters = new Array();
				c=0;
			}
			else if (i==39)
			{
				//ret=WriteToFileOnmBed2("migr.txt",2,Parameters,Parameters.length);	// NEW FILE
				var url='http://'+SystemIpAdress+'/rpc/SetData/run 031;2;migr.txt'+' ';
				for (k=0;k<Parameters.length;k++)
				{
					url=url+Parameters[k]+';';
				}
				ret = XmlSynchronousHttpRequest(url,3000,timeoutFired);
				ret = decodeURIComponent(ret);
				//ret=WriteToFileOnmBed2("migr.txt",1,Parameters,Parameters.length);	// NEW FILE
				if (ret != 'OK') 
					alert('ERROR SAVING GROUP 2');
				else
					counter++;

				Parameters = new Array();
				c=0;
			}
			else if (i==59)
			{
				//ret=WriteToFileOnmBed2("migr.txt",2,Parameters,Parameters.length);	// NEW FILE
				var url='http://'+SystemIpAdress+'/rpc/SetData/run 031;2;migr.txt'+' ';
				for (k=0;k<Parameters.length;k++)
				{
					url=url+Parameters[k]+';';
				}
				ret = XmlSynchronousHttpRequest(url,3000,timeoutFired);
				ret = decodeURIComponent(ret);
				//ret=WriteToFileOnmBed2("migr.txt",1,Parameters,Parameters.length);	// NEW FILE
				if (ret != 'OK') 
					alert('ERROR SAVING GROUP 3');
				else
					counter++;

				Parameters = new Array();
				c=0;
			}
			else if (i==79)
			{
				//ret=WriteToFileOnmBed2("migr.txt",2,Parameters,Parameters.length);	// NEW FILE
				var url='http://'+SystemIpAdress+'/rpc/SetData/run 031;2;migr.txt'+' ';
				for (k=0;k<Parameters.length;k++)
				{
					url=url+Parameters[k]+';';
				}
				ret = XmlSynchronousHttpRequest(url,3000,timeoutFired);
				ret = decodeURIComponent(ret);
				//ret=WriteToFileOnmBed2("migr.txt",1,Parameters,Parameters.length);	// NEW FILE
				if (ret != 'OK') 
					alert('ERROR SAVING GROUP 4');
				else
					counter++;

				Parameters = new Array();
				c=0;
			}
			else if (i==99)
			{
				//ret=WriteToFileOnmBed2("migr.txt",2,Parameters,Parameters.length);	// NEW FILE
				var url='http://'+SystemIpAdress+'/rpc/SetData/run 031;2;migr.txt'+' ';
				for (k=0;k<Parameters.length;k++)
				{
					url=url+Parameters[k]+';';
				}
				ret = XmlSynchronousHttpRequest(url,3000,timeoutFired);
				ret = decodeURIComponent(ret);
				//ret=WriteToFileOnmBed2("migr.txt",1,Parameters,Parameters.length);	// NEW FILE
				if (ret != 'OK') 
					alert('ERROR SAVING GROUP 5');
				else
					counter++;

				Parameters = new Array();
				c=0;
			}
			else if (i==119)
			{
				//ret=WriteToFileOnmBed2("migr.txt",2,Parameters,Parameters.length);	// NEW FILE
				var url='http://'+SystemIpAdress+'/rpc/SetData/run 031;2;migr.txt'+' ';
				for (k=0;k<Parameters.length;k++)
				{
					url=url+Parameters[k]+';';
				}
				ret = XmlSynchronousHttpRequest(url,3000,timeoutFired);
				ret = decodeURIComponent(ret);
				//ret=WriteToFileOnmBed2("migr.txt",1,Parameters,Parameters.length);	// NEW FILE
				if (ret != 'OK') 
					alert('ERROR SAVING GROUP 6');
				else
					counter++;

				Parameters = new Array();
				c=0;
			}
			else if (i==139)
			{
				//ret=WriteToFileOnmBed2("migr.txt",2,Parameters,Parameters.length);	// NEW FILE
				var url='http://'+SystemIpAdress+'/rpc/SetData/run 031;2;migr.txt'+' ';
				for (k=0;k<Parameters.length;k++)
				{
					url=url+Parameters[k]+';';
				}
				ret = XmlSynchronousHttpRequest(url,3000,timeoutFired);
				ret = decodeURIComponent(ret);
				//ret=WriteToFileOnmBed2("migr.txt",1,Parameters,Parameters.length);	// NEW FILE
				if (ret != 'OK') 
					alert('ERROR SAVING GROUP 7');
				else
					counter++;

				Parameters = new Array();
				c=0;
			}


	}
	//alert(counter);
	if (counter == 7) alert('OK');
	//WriteToFileOnmBed2("migr.txt",1,Parameters,Parameters.length);	// NEW FILE
}



function CreateMimics()
{
	
	for (i=0;i<MAX_MIMIC_ITEMS;i++)
	{
		AllMimicItems[i] = new MimicItemStruct(0,1,'L',100,100,16,16,1);
	}
	LoadMimics();

	
	if (SHOW_MIMIC_PICTURE_1 != 0)
	{
		//document.getElementById('Mimic_1_DIVID').style.backgroundImage = MIMIC_1_IMAGE;
		//CreateGlass(1,'Mimic_1_DIVID');
		document.getElementById('Mimic_1_IMAGE_ID').src = MIMIC_1_IMAGE;
		//document.getElementById('Mimic_1_IMAGE_ID').width  = '100%';
		//document.getElementById('Mimic_1_IMAGE_ID').height = '100%';
		CreateGlass(1,'Mimic_1_IMAGE_ID');

	}
	if (SHOW_MIMIC_PICTURE_2 != 0)
	{
		//document.getElementById('Mimic_2_IMAGE_ID').style.backgroundImage = MIMIC_2_IMAGE;
		document.getElementById('Mimic_2_IMAGE_ID').src = MIMIC_2_IMAGE;
		CreateGlass(2,'Mimic_2_IMAGE_ID');
	}
	if (SHOW_MIMIC_PICTURE_3 != 0)
	{
		//document.getElementById('Mimic_3_IMAGE_ID').style.backgroundImage = MIMIC_3_IMAGE;
		document.getElementById('Mimic_3_IMAGE_ID').src = MIMIC_3_IMAGE;
		CreateGlass(3,'Mimic_3_IMAGE_ID');
	}
	if (SHOW_MIMIC_PICTURE_4 != 0)
	{
		//document.getElementById('Mimic_4_IMAGE_ID').style.backgroundImage = MIMIC_4_IMAGE;
		document.getElementById('Mimic_4_IMAGE_ID').src = MIMIC_4_IMAGE;
		CreateGlass(4,'Mimic_4_IMAGE_ID');
	}
	
	DrawMimicItems();
}

function DeleteAllMimicItems()
{
	for (i=0;i<MAX_MIMIC_ITEMS;i++)
	{
		var MimicItem = document.getElementById(i+' _M');
		if (MimicItem)
		{
			MimicItem.parentNode.removeChild(MimicItem);	
		}
	}
}


function DrawMimicItems()
{
	DeleteAllMimicItems();
	for (i=0;i<AllMimicItems.length;i++)
	{
		var MimicTabIsOK=0;
		if ( (AllMimicItems[i].MimicIndex == 1) && (SHOW_MIMIC_PICTURE_1 != 0) ) { MimicTabIsOK=1; }
		if ( (AllMimicItems[i].MimicIndex == 2) && (SHOW_MIMIC_PICTURE_2 != 0) ) { MimicTabIsOK=1; }		
		if ( (AllMimicItems[i].MimicIndex == 3) && (SHOW_MIMIC_PICTURE_3 != 0) ) { MimicTabIsOK=1; }
		if ( (AllMimicItems[i].MimicIndex == 4) && (SHOW_MIMIC_PICTURE_4 != 0) ) { MimicTabIsOK=1; }		
		
		if ( (AllMimicItems[i].Active) && (MimicTabIsOK) )
		{
			if (AllMimicItems[i].type == 'L')
			{
				drawMimicLed(i,AllMimicItems[i]);//1,100,100,16,16,'Title')
			}
			else if (AllMimicItems[i].type == 'B')	
			{
				drawMimicButton(i,AllMimicItems[i]);//1,100,100,16,16,'Title')
			}
			else if (AllMimicItems[i].type == 'T')	
			{
				drawMimicText(i,AllMimicItems[i]);//1,100,100,16,16,'Title')
			}
			else
			{
				alert('Mimic Type Create Error:'+i);
			}
		}
	}
	
}



function CreateGlass(index,id)
{
	ma=document.getElementById(id);

	ma.style.cursor = 'crosshair';
	ma.onmousedown  = function() { MouseDownOnGlass(id,index);}
	ma.onmousemove  = function() { MouseMoveOnGlass(id,index); }
	
	return;

	_tagGlass     =  document.createElement('div');
	_tagGlass.id  =  index+' _GL';
	_tagGlass.style.position   = 'absolute';
	_tagGlass.style.overflow   = 'auto';
    _tagGlass.style.display    = 'none';
    _tagGlass.style.border     = '2px dashed #000000';
    _tagGlass.style.margin     = '0px'; 
	_tagGlass.style.padding    = '0px';
    _tagGlass.style.lineHeight = '0';
    _tagGlass.style.background = '#ffffff';	         //'#f0f0f0';
    _tagGlass.style.opacity    = '0.18';               // Gecko
    _tagGlass.style.filter     = 'alpha(opacity=18)';  // Windows
    _tagGlass.style.fontSize   = '1'; // 20061012 bugfix by Rodrigo
	
	var mapos = findPos(ma);
	_tagGlass.style.left = ma.style.left
    _tagGlass.style.top  = ma.style.top
	_tagGlass.style.width  = 800; //parseInt(ma.style.width);
	_tagGlass.style.height = 500; //parseInt(ma.style.height);
    _tagGlass.style.display = '';
	_tagGlass.style.cursor = 'crosshair';
	_tagGlass.onmousedown  = function() { MouseDownOnGlass(id,index);}
	_tagGlass.onmousemove  = function() { MouseMoveOnGlass(id,index); }
	 ma.appendChild(_tagGlass);
	 
	 
	 
	 
	 
}


function MouseMoveOnGlass(id)
{
		var e = window.event;
   		var posX = e.offsetX ;
    	var posY = e.offsetY ;
		//document.getElementById('DataAcquisitonDIV').innerHTML=posX+' '+posY;
}


function MouseDownOnGlass(id,gindex)
{
	//if(!MasterCodeIsOK) return;
	switch (window.event.which) {
        case 1: // left
			if ( (ActiveMimicItemID != null) && (MasterCodeIsOK) )
			{
				glass=document.getElementById(id);
				var e = window.event;
		   		var posX = e.offsetX + glass.offsetLeft;
		    	var posY = e.offsetY + glass.offsetTop;
				//alert(posX+' '+posY);
				MimicItem = document.getElementById(ActiveMimicItemID);
				MimicItem.style.border = '0px dashed #ffffff';
				//alert(glass.offsetLeft+' '+posX+' '+posY);
				//MimicItem.style.left = posX + glass.offsetLeft - (parseInt(MimicItem.style.width)/2);
				//MimicItem.style.top  = posY + glass.offsetTop  - (parseInt(MimicItem.style.height)/2);
				
				MimicItem.style.left = posX - (parseInt(MimicItem.style.width)/2);
				MimicItem.style.top  = posY - (parseInt(MimicItem.style.height)/2);

				//AllMimicItems[parseInt(MimicItem.id)].posx = MimicItem.offsetLeft+(parseInt(MimicItem.style.width)/2);
				//AllMimicItems[parseInt(MimicItem.id)].posy = MimicItem.offsetTop +(parseInt(MimicItem.style.height)/2);
				AllMimicItems[parseInt(MimicItem.id)].posx = posX;
				AllMimicItems[parseInt(MimicItem.id)].posy = posY;

				ActiveMimicItemID = null;
				//document.getElementById('DataAcquisitonDIV').innerHTML='NO ACTIVE '+posX+' '+posY;
				DrawMimicItems();
			}

        break;
        case 2: // Midle

        break;
        case 3: // Right
			if(!MasterCodeIsOK) return;
			if ( (ActiveMimicItemID == null) )
			{
				glassIndex=parseInt(gindex);
				//alert(id+' '+glassIndex);
				var found=0;
				for (i=0;i<AllMimicItems.length;i++)
				{
					if (!AllMimicItems[i].Active)
					{
						glass=document.getElementById(id);
						AllMimicItems[i].MimicIndex=glassIndex;
						AllMimicItems[i].type = 'L';
						AllMimicItems[i].w=16;
						AllMimicItems[i].h=16
						AllMimicItems[i].VariableID = 0;
						//alert(window.event.offsetX+' '+glass.offsetLeft);
						AllMimicItems[i].posx = window.event.offsetX + glass.offsetLeft;
						AllMimicItems[i].posy = window.event.offsetY + glass.offsetTop;
						alert(i);
						CreateEditMimicItemDialog(AllMimicItems[i]);
						found=1;
						break;
					}
				}
				if ( found==0)
				{
					alert("ΔΕΝ ΜΠΟΡΕΙΤΕ ΝΑΣ ΦΤΙΑΞΕΤΕ ΕΠΙΠΛΕΟΝ ΑΝΤΙΚΕΙΜΕΝΑ.");
				}
			}
        break;
        default:
    }
}


function drawMimicLed(ItemIndex,MimicItem)//   MimicIndex,x,y,w,h,title)
{
	var ReadID=''
	ma=document.getElementById('Mimic_'+MimicItem.MimicIndex+'_DIVID');
	var target = document.createElement('img');
	target.id = ItemIndex+' _M';
	target.style.position   = 'absolute';
	target.style.overflow   = 'auto';
    target.style.border     = '0px dashed #ffffff';
    target.style.margin     = '0px'; 
	target.style.padding    = '0px';
    target.style.lineHeight = '0';
    target.style.z = 1000;
    //target.style.background = '#ffffff';	         //'#f0f0f0';
    target.style.opacity    = '0.99';               // Gecko
    target.style.filter     = 'alpha(opacity=99)';  // Windows
    target.style.fontSize   = '1'; // 20061012 bugfix by Rodrigo
	ma.appendChild(target);

	target.style.left = ma.offsetLeft  + MimicItem.posx-parseInt(MimicItem.w/2);//ma.style.left
    target.style.top  = ma.offsetTop   + MimicItem.posy-parseInt(MimicItem.h/2);//ma.style.top
	//alert( MimicItem.posx + '  '  + MimicItem.posy ); 
	target.style.width  = MimicItem.w;
	target.style.height = MimicItem.h;
    target.style.display = '';
	target.src = MimicLedOff.src;
	target.onmousedown  = function(){MouseDownOnMimicItem(target.id);}
	//target.onmouseup  = function(){MouseUpOnMimicItem(target.id);}
	target.title=AllVirtualVariablesName[MimicItem.VariableID];
}


function drawMimicButton(ItemIndex,MimicItem)//   MimicIndex,x,y,w,h,title)
{
	var ReadID=''
	ma=document.getElementById('Mimic_'+MimicItem.MimicIndex+'_DIVID');
	
	var target = document.createElement('input');
	target.type = 'button';
	target.id = ItemIndex+' _M';
	target.style.position   = 'absolute';
	target.style.overflow   = 'auto';
    target.className  = 'MimicButtonOff';
    if (MimicItem.Active & 2)
		target.value = AllVirtualVariablesName[MimicItem.VariableID];
	else	
		target.value = '';
	ma.appendChild(target);
	target.style.left    = ma.offsetLeft  + MimicItem.posx-parseInt(MimicItem.w/2);//ma.style.left
    target.style.top     = ma.offsetTop   + MimicItem.posy-parseInt(MimicItem.h/2);//ma.style.top
	target.style.width   = MimicItem.w;
	target.style.height  = MimicItem.h;
    target.style.display = '';
	target.style.cursor  = 'pointer';//'url(./images/cursors/Bug1.cur)';//'hand'; //hand help crosshair
	//target.onmouseover   = function(){ShowTargetInfo(targedid);}
	//target.src = MimicLedOff.src;
	target.onmousedown  = function(){MouseDownOnMimicItem(target.id);}
	//target.onmouseup  = function(){MouseUpOnMimicItem(target.id);}
	target.title=AllVirtualVariablesName[MimicItem.VariableID];
}

function drawMimicText(ItemIndex,MimicItem)//   MimicIndex,x,y,w,h,title)
{
	var ReadID=''
	ma=document.getElementById('Mimic_'+MimicItem.MimicIndex+'_DIVID');
	
	var target = document.createElement('input');
	target.type = 'button';
	target.id = ItemIndex+' _M';
	target.style.position   = 'absolute';
	target.style.overflow   = 'auto';
    target.className  = 'MimicText';
	if (MimicItem.Active & 2)
		target.value = AllVirtualVariablesName[MimicItem.VariableID];
	else
		target.value = '';
	ma.appendChild(target);
	target.style.left    = ma.offsetLeft  + MimicItem.posx-parseInt(MimicItem.w/2);//ma.style.left
    target.style.top     = ma.offsetTop   + MimicItem.posy-parseInt(MimicItem.h/2);//ma.style.top
	target.style.width   = MimicItem.w;
	target.style.height  = MimicItem.h;
    target.style.display = '';
	//target.style.cursor  = 'pointer';//'url(./images/cursors/Bug1.cur)';//'hand'; //hand help crosshair
	//target.onmouseover   = function(){ShowTargetInfo(targedid);}
	//target.src = MimicLedOff.src;
	target.onmousedown  = function(){MouseDownOnMimicItem(target.id);}
	//target.onmouseup  = function(){MouseUpOnMimicItem(target.id);}
	target.title=AllVirtualVariablesName[MimicItem.VariableID];
}



function MouseDownOnMimicItem(ItemID)
{
	//var e = window.event;
	//if(!MasterCodeIsOK) return;
	switch (window.event.which) {
        case 1: // left
			if (MasterCodeIsOK)
			{
				if (ActiveMimicItemID != null)
				{
					MimicItem=document.getElementById(ActiveMimicItemID);
					MimicItem.style.border = '0px dashed #ffffff';
					ActiveMimicItemID = null;
					//alert("end move");
					//document.getElementById('DataAcquisitonDIV').innerHTML='NO ACTIVE';
				}	
				else
				{
					ActiveMimicItemID = ItemID;
					MimicItem=document.getElementById(ActiveMimicItemID);
					MimicItem.style.border = '1px dashed #000000';
					//alert("select for move");
				}
			}
			else
			{
				var VariableID = AllMimicItems[parseInt(ItemID)].VariableID;
				if ( (AllMimicItems[parseInt(ItemID)].type == 'B') && ( AllVirtualVariablesType[VariableID] == DEF_DIGITAL_OUTPUT_VARIABLE ) )
				{
					if (document.getElementById(ItemID).className == 'MimicButtonOff')
					{
						document.getElementById(ItemID).className = 'MimicButtonON';
						OpenCloseReleCommand(1,VariablesGrid.cellById(VariableID,5).getValue());
					}
					else
					{
						document.getElementById(ItemID).className = 'MimicButtonOff';
						OpenCloseReleCommand(0,VariablesGrid.cellById(VariableID,5).getValue());
					}
				}
			}
			//alert(parseInt(ItemID)+' '+document.getElementById(ItemID).offsetLeft+' '+document.getElementById(ItemID).offsetTop);
        break;
        case 2: // Midle

        break;
        case 3: // Right
			if(!MasterCodeIsOK) return;
			MimicItem=document.getElementById(ItemID);
			CreateEditMimicItemDialog(AllMimicItems[parseInt(MimicItem.id)]);
		
        break;
        default:
    }
}

function UpdateMimicGraphs(Data)
{
	for (i=0;i<MAX_MIMIC_ITEMS;i++)
	{
		var MimicItem = document.getElementById(i+' _M');
		var MimicTabIsOK=0;
		if ( (AllMimicItems[i].MimicIndex == 1) && (SHOW_MIMIC_PICTURE_1 != 0) ) { MimicTabIsOK=1; }
		if ( (AllMimicItems[i].MimicIndex == 2) && (SHOW_MIMIC_PICTURE_2 != 0) ) { MimicTabIsOK=1; }		
		if ( (AllMimicItems[i].MimicIndex == 3) && (SHOW_MIMIC_PICTURE_3 != 0) ) { MimicTabIsOK=1; }
		if ( (AllMimicItems[i].MimicIndex == 4) && (SHOW_MIMIC_PICTURE_4 != 0) ) { MimicTabIsOK=1; }		

		if ( (MimicItem) && (MimicTabIsOK) )
		{
			if ( AllMimicItems[parseInt(MimicItem.id)].VariableID >0)
			{
				var Result=ExtractValueFromData(Data,AllMimicItems[parseInt(MimicItem.id)].VariableID);
				if (AllMimicItems[parseInt(MimicItem.id)].type == 'L')
				{
					if (Result > 0) 
						MimicItem.src = MimicLedOn.src 
					else
						MimicItem.src = MimicLedOff.src 
				}
				else if (AllMimicItems[parseInt(MimicItem.id)].type == 'B')
				{
					if (Result > 0) 
						MimicItem.className = 'MimicButtonON'; 
					else
						MimicItem.className = 'MimicButtonOff'; 
				}
				else if (AllMimicItems[parseInt(MimicItem.id)].type == 'T')
				{
						if (AllMimicItems[parseInt(MimicItem.id)].Active & 2 )
							MimicItem.value = AllVirtualVariablesName[AllMimicItems[parseInt(MimicItem.id)].VariableID]+' : '+Result; 
						else
							MimicItem.value = Result; 
				}
			} //if VariableID >0
		} // if (MimicItem)
	}//for
}
//*********************************************************************************
function CreateEditMimicItemDialog(m)
{
		if (FlagWindowIsCreated==0)
		{	
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 5, 5, 500, 300);
			DialogWindow.setText("ΔΙΑΜΟΡΦΩΣΗ ΑΝΤΙΚΕΙΜΕΝΟΥ");
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
					{type: "button", position: "center", name: "OK" , value: "OK"},
					{type: "newcolumn", offset:0},
					{type: "button", position: "center", name: "DELETE" , value: "ΔΙΑΓΡΑΦΗ"}
				]},
				{type: "fieldset", width: "480", label: "", list:[	
					{type: "select",   label: "ΜΕΤΑΒΛΗΤΗ:", labelWidth: "120", inputWidth: 180 , name:"V1" },
					{type: "select",   label: "ΤΥΠΟΣ:", labelWidth: "120" , inputWidth: 180 ,name: "V2" ,options:[
						{text: "LED", value: "L"},
						{text: "BUTTON", value: "B"},
						{text: "ΚΕΙΜΕΝΟ", value: "T"}
					]},
 					{type: "input",   label: "ΠΛΑΤΟΣ:", labelWidth: "120", inputWidth: 180 ,     name:"V3" ,value:m.w},
					{type: "input",   label: "ΥΨΟΣ:", labelWidth: "120", inputWidth: 180 ,       name:"V4" ,value:m.h},
					{type: "checkbox", label: "Εμφάνιση Ονόματος:", labelWidth: "auto" , labelAlign:"right" , name:"V5" ,checked: false}
				]}	
			];
			//*************************************************************
			myForm = DialogWindow.attachForm(formData);
			//*************************************************************
			//************* FILL LIST BOXES *******************************
			//*************************************************************
			FeelSelectWithAllVirtuals(myForm.getSelect("V1"),DEF_ALL_VIRTUALS_MASK);
			//*************************************************************
			//************* SET VALUES ************************************
			//*************************************************************
			SelectOptionInSelectByValue(myForm.getSelect("V1"),m.VariableID);				
			SelectOptionInSelectByValue(myForm.getSelect("V2"),m.type);			
			if (m.Active & 2)
				SetCheckValue(myForm,"V5",1);
			else
				SetCheckValue(myForm,"V5",0);
			//*************************************************************
			myForm.attachEvent("onChange", function(name,value,is_checked){
			});
			//*************************************************************
			myForm.attachEvent("onButtonClick", function(name){
				if (name == 'OK')
				{
					m.Active     =1;
					if ( myForm.isItemChecked("V5") )
					{
						m.Active     = m.Active | 2;
					} 
					m.VariableID =myForm.getSelect("V1").options[myForm.getSelect("V1").selectedIndex].value;
					m.type		 =myForm.getSelect("V2").options[myForm.getSelect("V2").selectedIndex].value;
					m.w			 =myForm.getInput("V3").value;
					m.h			 =myForm.getInput("V4").value;
				}
				if (name == 'DELETE')
				{
					m.VariableID =1;
					m.type		 ='L';
					m.w			 =20;
					m.h			 =20;
					m.Active     =0;
					m.posx		 =100;
					m.posy		 =100;
				}
				
				DrawMimicItems();
				WindowsViewPort.window("DialogWindow").close();
			})
		}
	
}
//*********************************************************************************
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}
//*********************************************************************************
function getPos(el) {
    // yay readability
    for (var lx=0, ly=0;
         el != null;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {x: lx,y: ly};
}
//*********************************************************************************