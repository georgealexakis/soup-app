// JavaScript Document
	
function ButtonPressed(but)
{
	var ReleValue = but.id.substr(2,but.id.length-2);
	//alert(but.className);
	if ( but.className == "button")
	{
		OpenCloseReleCommand(1,ReleValue);
		but.setAttribute("className", "button_ON");
		but.setAttribute("class", "button_ON");		
	}
	else
	{
		OpenCloseReleCommand(0,ReleValue);
		but.setAttribute("className", "button");
		but.setAttribute("class", "button");		
	}
}		









