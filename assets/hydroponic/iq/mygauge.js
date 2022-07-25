0 // JavaScript Document

function CreateProgessGauge(ProgressGaugeDiv)
{
	ProgressGauge = new LinearGauge({
    renderTo: ProgressGaugeDiv,
    width: 250,
    height:80,
   // units: "m3/h",
    minValue: 0,
    maxValue: 100,
    majorTicks: [
        "0",
        "10",
        "20",
        "30",
        "40",
        "50",
		"60",
		"70",
		"80",
		"90",
		"100"
    ],
    minorTicks: 1,
    strokeTicks: true,
    highlights: [
	        { from : 0,  to : 10,   color : '#2a3faa' },
			{ from : 10,  to : 90,  color : '#55ff55' },
			{ from : 90,  to : 100, color : '#d40000' }
    ],
    colorPlate: "#5c85d6",
    borderShadowWidth: 0,
    borders: false,
	borderWidth: 0,
    needleType: "arrow",
    needleWidth: 4,
    animationDuration: 1500,
    animationRule: "linear",
    //tickSide: "left",
    //numberSide: "right",
    //needleSide: "left",
    barStrokeWidth: 1,
    barBeginCircle: false,
    value: 1,
	fontNumbersSize: 30,
    //fontUnitsSize: 30,
    fontValueSize: 20,
	//colorUnits: "#ccc",
    colorNumbers: "#ffffff",
	valueBox: true
}).draw();
	
}


function CreateFlawGauge(FlawGaugeDiv,mv)
{
	FlawGauge = new LinearGauge({
    renderTo: FlawGaugeDiv,
    width: 250,
    height:80,
   // units: "m3/h",
    minValue: 0,
    maxValue: mv,
    majorTicks: [
        "0",
        "2",
        "4",
        "6",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20"
    ],
    minorTicks: 1,
    strokeTicks: true,
    highlights: [
	        { from : 0,  to : 5,  color : '#2a3faa' },
			{ from : 5,  to : 15, color : '#55ff55' },
			{ from : 15, to : 30, color : '#d40000' }
    ],
    colorPlate: "#5c85d6",
    borderShadowWidth: 0,
    borders: false,
	borderWidth: 0,
    needleType: "arrow",
    needleWidth: 4,
    animationDuration: 1500,
    animationRule: "linear",
    //tickSide: "left",
    //numberSide: "right",
    //needleSide: "left",
    barStrokeWidth: 1,
    barBeginCircle: false,
    value: 10,
	fontNumbersSize: 30,
    //fontUnitsSize: 30,
    fontValueSize: 20,
	//colorUnits: "#ccc",
    colorNumbers: "#ffffff",
	valueBox: true
}).draw();
	
}


function CreateECGauge(ECGaugeDiv)
{

	ECGauge = new LinearGauge({
    renderTo: ECGaugeDiv,
    width: 250,
    height:80,
    //units: "EC",
    minValue: 0,
    maxValue: 6,
    majorTicks: [
        "0",
		"0.5",
        "1",
		"1.5",
        "2",
		"2.5",
        "3",
		"3.5",
        "4",
		"4.5",
        "5",
		"5.5",
        "6"
    ],
    minorTicks: 1,
    strokeTicks: true,
    highlights: [
	        { from : 0,  to : 1,  color : '#2a3faa' },
			{ from : 1,  to : 4, color : '#55ff55' },
			{ from : 4,  to : 6, color : '#d40000' }
    ],
    colorPlate: "#5c85d6",
    borderShadowWidth: 0,
    borders: false,
	borderWidth: 0,
    needleType: "arrow",
    needleWidth: 4,
    animationDuration: 1500,
    animationRule: "linear",
    //tickSide: "left",
    //numberSide: "right",
    //needleSide: "left",
    barStrokeWidth: 1,
    barBeginCircle: false,
    value: 1,
	fontNumbersSize: 30,
    //fontUnitsSize: 30,
    fontValueSize: 20,
	//colorUnits: "#ccc",
    colorNumbers: "#ffffff"
}).draw();

}

function CreatePHGauge(PHGaugeDiv)
{

	PHGauge = new LinearGauge({
    renderTo: PHGaugeDiv,
    width: 250,
    height:80,
    //units: "EC",
    minValue: 2,
    maxValue: 12,
    majorTicks: [
        "2",
		"3",
        "4",
        "5",
        "6",
        "7",
        "8",
		"9",
		"10",
		"11",
        "12"
    ],
    minorTicks: 1,
    strokeTicks: true,
    highlights: [
	        { from : 2,  to : 4,  color : '#d40000' },
			{ from : 4,  to : 6, color : '#55ff55' },
			{ from : 6,  to : 12, color : '#2a3faa' }
    ],
    colorPlate: "#5c85d6",
    borderShadowWidth: 0,
    borders: false,
	borderWidth: 0,
    needleType: "arrow",
    needleWidth: 4,
    animationDuration: 1500,
    animationRule: "linear",
    //tickSide: "left",
    //numberSide: "right",
    //needleSide: "left",
    barStrokeWidth: 1,
    barBeginCircle: false,
    value: 7,
	fontNumbersSize: 30,
    //fontUnitsSize: 30,
    fontValueSize: 20,
	//colorUnits: "#ccc",
    colorNumbers: "#ffffff"
}).draw();
}
//*************************************************************************************************
function CreateTemperatureGauge(TemperatureGaugeDiv,ind)
{
  	TemperatureGauge[ind] = new Gauge({
		renderTo    : TemperatureGaugeDiv,
		width       : 140,
		height      : 140,
		glow        : true,
		units       : 'oC',
		title       : false,
		minValue    : 0,
		maxValue    : 50,
		majorTicks  : ['0','5','10','15','20','25','30','35','40','45','50'],
		minorTicks  : 2,
		strokeTicks : false,
		animation : false,
		highlights  : [
			{ from : 0,  to : 15,  color : '#2a3faa' },
			{ from : 15, to : 30,  color : '#55ff55' },
			{ from : 30, to : 50,  color : '#d40000' }
		],
		colors      : {
			plate      : '#cccccc',
			majorTicks : '#f5f5f5',
			minorTicks : '#ddd',
			title      : '#fff',
			units      : '#000000',
			numbers    : '#000000',
			needle     : { start : 'rgba(240, 128, 128, 1)', end : 'rgba(255, 160, 122, .9)' }
		}
	});
	//PHGauge.setValue(7);
	TemperatureGauge[ind].draw();
}

function CreateHumidityGauge(HumidityGaugeDiv,ind)
{
  HumidityGauge[ind] = new Gauge({
		renderTo    : HumidityGaugeDiv,
		width       : 140,
		height      : 140,
		glow        : true,
		units       : '%',
		title       : false,
		minValue    : 0,
		maxValue    : 100,
		majorTicks  : ['0','10','20','30','40','50','60','70','80','90','100'],
		minorTicks  : 2,
		strokeTicks : false,
		animation : false,
		highlights  : [
			{ from : 0,  to : 30,  color : '#2a3faa' },
			{ from : 30, to : 70,  color : '#55ff55' },
			{ from : 70, to : 100,  color : '#d40000' }
		],
		colors      : {
			plate      : '#00CCFF',
			majorTicks : '#f5f5f5',
			minorTicks : '#ddd',
			title      : '#fff',
			units      : '#000000',
			numbers    : '#000000',
			needle     : { start : 'rgba(240, 128, 128, 1)', end : 'rgba(255, 160, 122, .9)' }
		}
	});
	//PHGauge.setValue(7);
	HumidityGauge[ind].draw();
}


function CreateSolarGauge(SolarGaugeDiv,ind)
{
  SolarGauge[ind] = new Gauge({
		renderTo    : SolarGaugeDiv,
		width       : 140,
		height      : 140,
		glow        : true,
		units       : '%',
		title       : false,
		minValue    : 0,
		maxValue    : 1000,
		majorTicks  : ['0','100','200','300','400','500','600','700','800','900','1000'],
		minorTicks  : 2,
		strokeTicks : false,
		animation : false,
		highlights  : [
			{ from : 0,   to : 200,  color : '#2a3faa' },
			{ from : 200, to : 600,  color : '#55ff55' },
			{ from : 600, to : 1000,  color : '#d40000' }
		],
		colors      : {
			plate      : '#FFFF99',
			majorTicks : '#f5f5f5',
			minorTicks : '#ddd',
			title      : '#fff',
			units      : '#000000',
			numbers    : '#000000',
			needle     : { start : 'rgba(240, 128, 128, 1)', end : 'rgba(255, 160, 122, .9)' }
		}
	});
	//PHGauge.setValue(7);
	SolarGauge[ind].draw();
}


function CreateScreenPositionGauge(ScreenGaugeDiv,ind)
{
  ScreenGauge[ind] = new Gauge({
		renderTo    : ScreenGaugeDiv,
		width       : 140,
		height      : 140,
		glow        : true,
		units       : '%',
		title       : false,
		minValue    : 0,
		maxValue    : 100,
		majorTicks  : ['0','10','20','30','40','50','60','70','80','90','100'],
		minorTicks  : 2,
		strokeTicks : false,
		animation : false,
		highlights  : [
			{ from : 0,  to : 10,  color : '#2a3faa' },
			{ from : 10, to : 90,  color : '#55ff55' },
			{ from : 90, to : 100,  color : '#d40000' }
		],
		colors      : {
			plate      : '#222',
			majorTicks : '#f5f5f5',
			minorTicks : '#ddd',
			title      : '#fff',
			units      : '#ccc',
			numbers    : '#ffffff',
			needle     : { start : 'rgba(240, 128, 128, 1)', end : 'rgba(255, 160, 122, .9)' }
		}
	});
	//PHGauge.setValue(7);
	ScreenGauge[ind].draw();
}

function CreateWindowPositionGauge(WindowPositionGaugeDiv,ind)
{
  WindowPositionGauge[ind] = new Gauge({
		renderTo    : WindowPositionGaugeDiv,
		width       : 140,
		height      : 140,
		glow        : true,
		units       : '%',
		title       : false,
		minValue    : 0,
		maxValue    : 100,
		majorTicks  : ['0','10','20','30','40','50','60','70','80','90','100'],
		minorTicks  : 2,
		strokeTicks : false,
		animation : false,
		highlights  : [
			{ from : 0,  to : 20,  color : '#2a3faa' },
			{ from : 20, to : 80,  color : '#55ff55' },
			{ from : 80, to : 100,  color : '#d40000' }
		],
		colors      : {
			plate      : '#222',
			majorTicks : '#f5f5f5',
			minorTicks : '#ddd',
			title      : '#fff',
			units      : '#ccc',
			numbers    : '#ffffff',
			needle     : { start : 'rgba(240, 128, 128, 1)', end : 'rgba(255, 160, 122, .9)' }
		}
	});
	//PHGauge.setValue(7);
	WindowPositionGauge[ind].draw();
}


function CreateExternalClimateGauges(ExternalTemperatureGaugeDiv,Humdiv,SolarGaugeDiv,WinSpeedGauge,WinDirectionGauge)
{
  ExternalTemperatureGauge = new Gauge({
		renderTo    : ExternalTemperatureGaugeDiv,
		width       : 140,
		height      : 140,
		glow        : true,
		units       : 'oC',
		title       : false,
		minValue    : 0,
		maxValue    : 50,
		majorTicks  : ['0','5','10','15','20','25','30','35','40','45','50'],
		minorTicks  : 2,
		strokeTicks : false,
		animation : false,
		highlights  : [
			{ from : 0,  to : 15,  color : '#2a3faa' },
			{ from : 15, to : 30,  color : '#55ff55' },
			{ from : 30, to : 50,  color : '#d40000' }
		],
		colors      : {
			plate      : '#CCCCCC',
			majorTicks : '#f5f5f5',
			minorTicks : '#ddd',
			title      : '#fff',
			units      : '#000000',
			numbers    : '#000000',
			needle     : { start : 'rgba(240, 128, 128, 1)', end : 'rgba(255, 160, 122, .9)' }
		}
	});
	//PHGauge.setValue(7);
	ExternalTemperatureGauge.draw();
	//************************************************************************************************
	  ExternalHumidityGauge = new Gauge({
		renderTo    : Humdiv,
		width       : 140,
		height      : 140,
		glow        : true,
		units       : '%',
		title       : false,
		minValue    : 0,
		maxValue    : 100,
		majorTicks  : ['0','10','20','30','40','50','60','70','80','90','100'],
		minorTicks  : 2,
		strokeTicks : false,
		animation : false,
		highlights  : [
			{ from : 0,  to : 30,  color : '#2a3faa' },
			{ from : 30, to : 70,  color : '#55ff55' },
			{ from : 70, to : 100,  color : '#d40000' }
		],
		colors      : {
			plate      : '#00CCFF',
			majorTicks : '#f5f5f5',
			minorTicks : '#ddd',
			title      : '#fff',
			units      : '#000000',
			numbers    : '#000000',
			needle     : { start : 'rgba(240, 128, 128, 1)', end : 'rgba(255, 160, 122, .9)' }
		}
	});
	//PHGauge.setValue(7);
	ExternalHumidityGauge.draw();
	//****************************************************************************************************
	ExternalSolarGauge = new Gauge({
		renderTo    : SolarGaugeDiv,
		width       : 140,
		height      : 140,
		glow        : true,
		units       : '%',
		title       : false,
		minValue    : 0,
		maxValue    : 1000,
		majorTicks  : ['0','100','200','300','400','500','600','700','800','900','1000'],
		minorTicks  : 2,
		strokeTicks : false,
		animation : false,
		highlights  : [
			{ from : 0,   to : 200,  color : '#2a3faa' },
			{ from : 200, to : 600,  color : '#55ff55' },
			{ from : 600, to : 1000,  color : '#d40000' }
		],
		colors      : {
			plate      : '#FFFF99',
			majorTicks : '#f5f5f5',
			minorTicks : '#ddd',
			title      : '#fff',
			units      : '#000000',
			numbers    : '#000000',
			needle     : { start : 'rgba(240, 128, 128, 1)', end : 'rgba(255, 160, 122, .9)' }
		}
	});
	//PHGauge.setValue(7);
	ExternalSolarGauge.draw();
	//****************************************************************************************************
	ExternalWindSpeedGauge = new Gauge({
		renderTo    : WinSpeedGauge,
		width       : 140,
		height      : 140,
		glow        : true,
		units       : 'm/sec',
		title       : false,
		minValue    : 0,
		maxValue    : 50,
		majorTicks  : ['0','10','20','30','40','50'],
		minorTicks  : 2,
		strokeTicks : false,
		animation : false,
		highlights  : [
			{ from : 0,   to : 10,  color : '#2a3faa' },
			{ from : 10, to : 30,  color : '#55ff55' },
			{ from : 30, to : 50,  color : '#d40000' }
		],
		colors      : {
			plate      : '#222222',
			majorTicks : '#f5f5f5',
			minorTicks : '#ddd',
			title      : '#fff',
			units      : '#ccc',
			numbers    : '#ffffff',
			needle     : { start : 'rgba(240, 128, 128, 1)', end : 'rgba(255, 160, 122, .9)' }
		}
	});
	//PHGauge.setValue(7);
	ExternalWindSpeedGauge.draw();
	//****************************************************************************************************
	ExternalWindDirectionGauge = new Gauge({
		renderTo    : WinDirectionGauge,
		width       : 140,
		height      : 140,
		glow        : true,
		units       : 'o',
		title       : false,
		minValue    : 0,
		maxValue    : 360,
		majorTicks  : ['0','45','90','135','180','225','270','315','360'],
		minorTicks  : 2,
		strokeTicks : false,
		animation : false,
		highlights  : [
			{ from : 0,   to : 90,   color : '#2a3faa' },
			{ from : 90,  to : 180,  color : '#55ff55' },
			{ from : 180, to : 360,  color : '#d40000' }
		],
		colors      : {
			plate      : '#222222',
			majorTicks : '#f5f5f5',
			minorTicks : '#ddd',
			title      : '#fff',
			units      : '#ccc',
			numbers    : '#ffffff',
			needle     : { start : 'rgba(240, 128, 128, 1)', end : 'rgba(255, 160, 122, .9)' }
		}
	});
	//PHGauge.setValue(7);
	ExternalWindDirectionGauge.draw();
	//****************************************************************************************************
	
	
}




function CreateClimatePage1Gauges()
{
	CreateTemperatureGauge('TemperatureGaugeDivID_1',0);
	CreateTemperatureGauge('TemperatureGaugeDivID_2',1);
	CreateTemperatureGauge('TemperatureGaugeDivID_3',2);
	CreateTemperatureGauge('TemperatureGaugeDivID_4',3);

	CreateHumidityGauge('HumidityGaugeDivID_1',0);
	CreateHumidityGauge('HumidityGaugeDivID_2',1);
	CreateHumidityGauge('HumidityGaugeDivID_3',2);	
	CreateHumidityGauge('HumidityGaugeDivID_4',3);	
	
	CreateSolarGauge('SolarGaugeDivID_1',0);
	CreateSolarGauge('SolarGaugeDivID_2',1);
	CreateSolarGauge('SolarGaugeDivID_3',2);
	CreateSolarGauge('SolarGaugeDivID_4',3);		

	CreateWindowPositionGauge('WindowGaugeDivID_1',0);
	CreateWindowPositionGauge('WindowGaugeDivID_2',1);	
	CreateWindowPositionGauge('WindowGaugeDivID_3',2);
	CreateWindowPositionGauge('WindowGaugeDivID_4',3);		
	
	CreateScreenPositionGauge('ScreenGaugeDivID_1',0);
	CreateScreenPositionGauge('ScreenGaugeDivID_2',1);	
	CreateScreenPositionGauge('ScreenGaugeDivID_3',2);
	CreateScreenPositionGauge('ScreenGaugeDivID_4',3);
	
	CreateExternalClimateGauges('ExternalTemperatureGaugeDivID','ExternalHumidityGaugeDivID','ExternalSolarGaugeDivID','ExternalWinSpeedGaugeDivID','ExternalWinDirectionGaugeDivID');
}