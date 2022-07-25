// JavaScript Document
function CreateMainAccord(AccordDivID)
{
		//MainAccord = new dhtmlXAccordion(AccordDivID);
		MainAccord = MainTabBar.cells("MainTabA3").attachAccordion();
		//dhxAccord.setSkin("dhx_skyblue");
		MainAccord.addItem("Variables", "ΜΕΤΑΒΛΗΤΕΣ ΣΥΣΤΗΜΑΤΟΣ");
		MainAccord.addItem("TimePrograms", "ΠΡΟΓΡΑΜΜΑΤΑ ΑΡΔΕΥΣΗΣ");
		MainAccord.addItem("FertigationPrograms", "ΠΡΟΓΡΑΜΜΑΤΑ ΛΙΠΑΝΣΗΣ");
		MainAccord.addItem("Loops", "ΓΕΝΙΚΑ ΣΥΣΤΗΜΑΤΑ ΕΛΕΓΧΟΥ");
		//MainAccord.enableMultiMode(true);
		//MainAccord.cells("TimePrograms").setHeight(200);
		if (ClimateControlVersion) { MainAccord.addItem("ClimateControl", "ΕΛΕΓΧΟΣ ΚΛΙΜΑΤΟΣ"); }
		
		MainAccord.openItem("Variables");
		MainAccord.setIcon("Variables", "./images/control_center.png");
		MainAccord.setIcon("TimePrograms", "./images/brysh.png");
		MainAccord.setIcon("FertigationPrograms", "./images/Bag_of_Fertilizer-icon.png");
		MainAccord.setIcon("Loops", "./images/control_panel.png");		
		if (ClimateControlVersion) { MainAccord.setIcon("ClimateControl", "./images/weather256.png"); }
		//MainAccord._enableOpenEffect = true;
		//MainAccord.setEffect(true);
		VariablesGrid = MainAccord.cells("Variables").attachGrid();
		TimeProgramsGrid = MainAccord.cells("TimePrograms").attachGrid();
		FertigationProgramsGrid = MainAccord.cells("FertigationPrograms").attachGrid();
		LoopsGrid = MainAccord.cells("Loops").attachGrid();
		
		if (ClimateControlVersion) ClimateControlGrid = MainAccord.cells("ClimateControl").attachGrid();

		//MainAccord.cells("Variables").hide();
		if (ClimateControlVersion)
			MainAccord.openItem("ClimateControl");
		else
			MainAccord.openItem("TimePrograms");
		
		MainAccord.cells("Variables").hide();	
		MainAccord.cells("Loops").hide();	

		

		//MainAccord.setSizes();//


}		
