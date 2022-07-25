// JavaScript Document

function CreateOnLineGraphs2()
{
//****************************************************************************
//GRAPH 1
$(function () {
    $(document).ready(function() {
		Highcharts.setOptions({
			global: {
				useUTC: false
			},
			lang: {
				resetZoom:"ΕΠΑΝΑΦΟΡΑ ZOOM",
				contextButtonTitle:"Εκτύπωση..",
				printChart:"Εκτύπωση...",
				shortMonths: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαι', 'Ιουν', 
					'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ']
			}
		});
    	
        var chart;
        $('#IQ_OnLineGraph1Container').highcharts({
            chart: {
                zoomType: 'xy',
				type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 0,
				backgroundColor: {
         			linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
			         stops: [
            			[0, 'rgb(96, 96, 96)'],
			            [1, 'rgb(16, 16, 16)']
         			]
		        },
			    borderWidth: 1,
			    borderRadius: 5,
			    plotBackgroundColor: null,
			    plotShadow: false,
			    plotBorderWidth: 0
			},
	        title: {
    	            text: 'ΓΡΑΦΗΜΑ 1',
         			style: {
            		color: '#AAA',
            		font: 'bold 8px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         			}
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 100,
				gridLineWidth: 1,
      			lineColor: '#999',
			    tickColor: '#999',
				labels: {
		         style: {
        		    color: '#999',
		            fontWeight: 'bold',
					font: 'bold 8px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
        		 }
      			},
				dateTimeLabelFormats:{
					second: '%H:%M:%S'
				},
		      	title: {
		         style: {
        	     color: '#AAA',
            	 font: 'bold 6px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         		 }
      			}

            },
            yAxis: {
				//min:0,
				//max:5,
				//tickInterval:1,
				//alternateGridColor: 'rgba(255, 255, 255 , 0.5)',
				//minorTickInterval: 0.5,
		      	gridLineColor: 'rgba(255, 255, 255, .5)',
      			minorGridLineColor: 'rgba(255,255,255,0.07)',
				gridLineWidth: 1,
				lineWidth: 1,
      			tickWidth: 1,
				labels: {
         			style: {
            			color: '#999',
            			fontWeight: 'bold',
						font:  'bold 8px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         			}
      			},
      			title: {
					text: '',
         			style: {
            		color: '#AAA',
            		font:  'bold 6px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         			}
      			}
            },
			plotOptions: {
                	series: {
             		   lineWidth: 1,
					   connectNulls: true,
		               shadow: true
            		},
			        spline: {
					 color:'#ff0000',
					 connectNulls: true,
			         dataLabels: {
            			color: '#CCC'
			         },
			         marker: {
            			//lineColor: '#333',
						radius:1
						//fillColor: '#333'
         			 }
      				},
            },
            tooltip: {
                formatter: function() {
                        return Highcharts.dateFormat('%H:%M:%S (', this.x) + Highcharts.numberFormat(this.y, 1) + ')';
                }
            },
            legend: {
                enabled: true
            },
            exporting: {
                enabled: false
            }

        });
    });
    
});
//********************************************************************************************************
//********************************************************************************************************
//GRAPH 2
$(function () {
    $(document).ready(function() {
		Highcharts.setOptions({
			global: {
				useUTC: false
			},
			lang: {
				resetZoom:"ΕΠΑΝΑΦΟΡΑ ZOOM",
				contextButtonTitle:"Εκτύπωση..",
				printChart:"Εκτύπωση...",
				shortMonths: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαι', 'Ιουν', 
					'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ']
			}
		});
    	
        var chart;
        $('#IQ_OnLineGraph2Container').highcharts({
            chart: {
                zoomType: 'xy',
				type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 0,
				backgroundColor: {
         			linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
			         stops: [
            			[0, 'rgb(96, 96, 96)'],
			            [1, 'rgb(16, 16, 16)']
         			]
		        },
			    borderWidth: 1,
			    borderRadius: 5,
			    plotBackgroundColor: null,
			    plotShadow: false,
			    plotBorderWidth: 0
			},
	        title: {
    	            text: 'ΓΡΑΦΗΜΑ 2',
         			style: {
            		color: '#AAA',
            		font: 'bold 8px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         			}
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 100,
				gridLineWidth: 1,
      			lineColor: '#999',
			    tickColor: '#999',
				labels: {
		         style: {
        		    color: '#999',
		            fontWeight: 'bold',
					font: 'bold 8px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
        		 }
      			},
				dateTimeLabelFormats:{
					second: '%H:%M:%S'
				},
		      	title: {
		         style: {
        	     color: '#AAA',
            	 font: 'bold 6px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         		 }
      			}

            },
            yAxis: {
				//min:0,
				//max:5,
				//tickInterval:1,
				//alternateGridColor: 'rgba(255, 255, 255 , 0.5)',
				//minorTickInterval: 0.5,
		      	gridLineColor: 'rgba(255, 255, 255, .5)',
      			minorGridLineColor: 'rgba(255,255,255,0.07)',
				gridLineWidth: 1,
				lineWidth: 1,
      			tickWidth: 1,
				labels: {
         			style: {
            			color: '#999',
            			fontWeight: 'bold',
						font:  'bold 8px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         			}
      			},
      			title: {
					text: '',
         			style: {
            		color: '#AAA',
            		font:  'bold 6px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         			}
      			}
            },
			plotOptions: {
                	series: {
             		   lineWidth: 1,
					   connectNulls: true,
		               shadow: true
            		},
			        spline: {
					 color:'#ff0000',
					 connectNulls: true,
			         dataLabels: {
            			color: '#CCC'
			         },
			         marker: {
            			//lineColor: '#333',
						radius:1
						//fillColor: '#333'
         			 }
      				},
            },
            tooltip: {
                formatter: function() {
                        return Highcharts.dateFormat('%H:%M:%S (', this.x) + Highcharts.numberFormat(this.y, 1) + ')';
                }
            },
            legend: {
                enabled: true
            },
            exporting: {
                enabled: false
            }

        });
    });
    
});
//********************************************************************************************************
//********************************************************************************************************
//GRAPH 3
$(function () {
    $(document).ready(function() {
		Highcharts.setOptions({
			global: {
				useUTC: false
			},
			lang: {
				resetZoom:"ΕΠΑΝΑΦΟΡΑ ZOOM",
				contextButtonTitle:"Εκτύπωση..",
				printChart:"Εκτύπωση...",
				shortMonths: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαι', 'Ιουν', 
					'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ']
			}
		});
    	
        var chart;
        $('#IQ_OnLineGraph3Container').highcharts({
            chart: {
                zoomType: 'xy',
				type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 0,
				backgroundColor: {
         			linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
			         stops: [
            			[0, 'rgb(96, 96, 96)'],
			            [1, 'rgb(16, 16, 16)']
         			]
		        },
			    borderWidth: 1,
			    borderRadius: 5,
			    plotBackgroundColor: null,
			    plotShadow: false,
			    plotBorderWidth: 0
			},
	        title: {
    	            text: 'ΓΡΑΦΗΜΑ 3',
         			style: {
            		color: '#AAA',
            		font: 'bold 8px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         			}
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 100,
				gridLineWidth: 1,
      			lineColor: '#999',
			    tickColor: '#999',
				labels: {
		         style: {
        		    color: '#999',
		            fontWeight: 'bold',
					font: 'bold 8px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
        		 }
      			},
				dateTimeLabelFormats:{
					second: '%H:%M:%S'
				},
		      	title: {
		         style: {
        	     color: '#AAA',
            	 font: 'bold 6px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         		 }
      			}

            },
            yAxis: {
				//min:0,
				//max:5,
				//tickInterval:1,
				//alternateGridColor: 'rgba(255, 255, 255 , 0.5)',
				//minorTickInterval: 0.5,
		      	gridLineColor: 'rgba(255, 255, 255, .5)',
      			minorGridLineColor: 'rgba(255,255,255,0.07)',
				gridLineWidth: 1,
				lineWidth: 1,
      			tickWidth: 1,
				labels: {
         			style: {
            			color: '#999',
            			fontWeight: 'bold',
						font:  'bold 8px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         			}
      			},
      			title: {
					text: '',
         			style: {
            		color: '#AAA',
            		font:  'bold 6px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         			}
      			}
            },
			plotOptions: {
                	series: {
             		   lineWidth: 1,
					   connectNulls: true,
		               shadow: true
            		},
			        spline: {
					 color:'#ff0000',
					 connectNulls: true,
			         dataLabels: {
            			color: '#CCC'
			         },
			         marker: {
            			//lineColor: '#333',
						radius:1
						//fillColor: '#333'
         			 }
      				},
            },
            tooltip: {
                formatter: function() {
                        return Highcharts.dateFormat('%H:%M:%S (', this.x) + Highcharts.numberFormat(this.y, 1) + ')';
                }
            },
            legend: {
                enabled: true
            },
            exporting: {
                enabled: false
            }
        });
    });
    
});
//********************************************************************************************************
//********************************************************************************************************
//GRAPH 4
$(function () {
    $(document).ready(function() {
		Highcharts.setOptions({
			global: {
				useUTC: false
			},
			lang: {
				resetZoom:"ΕΠΑΝΑΦΟΡΑ ZOOM",
				contextButtonTitle:"Εκτύπωση..",
				printChart:"Εκτύπωση...",
				shortMonths: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαι', 'Ιουν', 
					'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ']
			}
		});
    	
        var chart;
        $('#IQ_OnLineGraph4Container').highcharts({
            chart: {
                zoomType: 'xy',
				type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 0,
				backgroundColor: {
         			linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
			         stops: [
            			[0, 'rgb(96, 96, 96)'],
			            [1, 'rgb(16, 16, 16)']
         			]
		        },
			    borderWidth: 1,
			    borderRadius: 5,
			    plotBackgroundColor: null,
			    plotShadow: false,
			    plotBorderWidth: 0
			},
	        title: {
    	            text: 'ΓΡΑΦΗΜΑ 4',
         			style: {
            		color: '#AAA',
            		font: 'bold 8px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         			}
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 100,
				gridLineWidth: 1,
      			lineColor: '#999',
			    tickColor: '#999',
				labels: {
		         style: {
        		    color: '#999',
		            fontWeight: 'bold',
					font: 'bold 8px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
        		 }
      			},
				dateTimeLabelFormats:{
					second: '%H:%M:%S'
				},
		      	title: {
		         style: {
        	     color: '#AAA',
            	 font: 'bold 6px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         		 }
      			}

            },
            yAxis: {
				//min:0,
				//max:5,
				//tickInterval:1,
				//alternateGridColor: 'rgba(255, 255, 255 , 0.5)',
				//minorTickInterval: 0.5,
		      	gridLineColor: 'rgba(255, 255, 255, .5)',
      			minorGridLineColor: 'rgba(255,255,255,0.07)',
				gridLineWidth: 1,
				lineWidth: 1,
      			tickWidth: 1,
				labels: {
         			style: {
            			color: '#999',
            			fontWeight: 'bold',
						font:  'bold 8px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         			}
      			},
      			title: {
					text: '',
         			style: {
            		color: '#AAA',
            		font:  'bold 6px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         			}
      			}
            },
			plotOptions: {
                	series: {
             		   lineWidth: 1,
					   connectNulls: true,
		               shadow: true
            		},
			        spline: {
					 color:'#ff0000',
					 connectNulls: true,
			         dataLabels: {
            			color: '#CCC'
			         },
			         marker: {
            			//lineColor: '#333',
						radius:1
						//fillColor: '#333'
         			 }
      				},
            },
            tooltip: {
                formatter: function() {
                        return Highcharts.dateFormat('%H:%M:%S (', this.x) + Highcharts.numberFormat(this.y, 1) + ')';
                }
            },
            legend: {
                enabled: true
            },
            exporting: {
                enabled: false
            }

        });
    });
   
});
//********************************************************************************************************
//********************************************************************************************************
}
//********************************************************************************************************
//********************************************************************************************************
//********************************************************************************************************
//********************************************************************************************************
//********************************************************************************************************
function EditOnLineCharts()
{
		StopDataAcquisition();
		var Parameters = new Array();
		if (FlagWindowIsCreated==0)
		{	
			Parameters = GetOnLineGrpahsSetup().split(';'); 
			DoBeforeWindowCreation();
			DialogWindow = WindowsViewPort.createWindow("DialogWindow", 5, 5, 750, 500);
			DialogWindow.setText("ΔΙΑΜΟΡΦΩΣΗ ΓΡΑΦΗΜΑΤΩΝ");
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
					{type: "button", position: "center", name: "OK" , value: "ΑΠΟΘΗΚΕΥΣΗ"}
				]},
				{type: "fieldset", width: "700", label: "", list:[	
					{type: "select",   label: "ΓΡΑΦΗΜΑ 1 Μ1:", labelWidth: "120", inputWidth: 180 , name:"V1" },
					{type: "select",   label: "ΓΡΑΦΗΜΑ 1 Μ2:", labelWidth: "120", inputWidth: 180 , name:"V2" },
					{type: "select",   label: "ΓΡΑΦΗΜΑ 2 Μ1:", labelWidth: "120", inputWidth: 180 , name:"V3" },
					{type: "select",   label: "ΓΡΑΦΗΜΑ 2 Μ2:", labelWidth: "120", inputWidth: 180 , name:"V4" },
					{type: "select",   label: "ΓΡΑΦΗΜΑ 3 Μ1:", labelWidth: "120", inputWidth: 180 , name:"V5" },
					{type: "select",   label: "ΓΡΑΦΗΜΑ 3 Μ2:", labelWidth: "120", inputWidth: 180 , name:"V6" },
					{type: "select",   label: "ΓΡΑΦΗΜΑ 4 Μ1:", labelWidth: "120", inputWidth: 180 , name:"V7" },
					{type: "select",   label: "ΓΡΑΦΗΜΑ 4 Μ2:", labelWidth: "120", inputWidth: 180 , name:"V8" },
					{type: "input",    label: "Τιμές Στον Αξονα:", labelWidth: "120", inputWidth: 180 ,name:"V9" , value:Parameters[8] }
				]}	
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
				Parameters[8]=myForm.getInput("V9").value;
				SetOnLineGrpahsSetup(Parameters,Parameters.length);
				WindowsViewPort.window("DialogWindow").close();
			})
		}

	
	
}
//********************************************************************************************************
//********************************************************************************************************
//********************************************************************************************************
//********************************************************************************************************
//********************************************************************************************************
var UpdateFirstTime=0;
function CreateOnLineGraphs()
{
  OnLineGraphsVariables = GetOnLineGrpahsSetup().split(';'); 
  CreateOnLineGraphs2();
}

function UpdateOnLineGraphs(Data)
{
	if (SHOW_ON_LINE_GRAPHS ==0) return;
	if (UpdateFirstTime==0)
	{
		var data = [];
		if (OnLineGraphsVariables[0] != 0)
  		{
			var chart = $('#IQ_OnLineGraph1Container').highcharts(); 
			chart.addSeries({name: ' ' + AllVirtualVariablesName[OnLineGraphsVariables[0]]} );
			//var Result=parseFloat(ExtractValueFromData(Data,OnLineGraphsVariables[0]));	
			//var x = (new Date()).getTime();
			//data.push({ x: x , y: Result });
			chart.series[chart.series.length-1].setData(data);
  		}
		if (OnLineGraphsVariables[1] != 0)
  		{
			var chart = $('#IQ_OnLineGraph1Container').highcharts(); 
			chart.addSeries({name: ' ' + AllVirtualVariablesName[OnLineGraphsVariables[1]]} );
			chart.series[chart.series.length-1].setData(data);
		}	
		if (OnLineGraphsVariables[2] != 0)
  		{
			var chart = $('#IQ_OnLineGraph2Container').highcharts(); 
			chart.addSeries({name: ' ' + AllVirtualVariablesName[OnLineGraphsVariables[2]]} );
			chart.series[chart.series.length-1].setData(data);
  		}
		if (OnLineGraphsVariables[3] != 0)
  		{
			var chart = $('#IQ_OnLineGraph2Container').highcharts(); 
			chart.addSeries({name: ' ' + AllVirtualVariablesName[OnLineGraphsVariables[3]]} );
			chart.series[chart.series.length-1].setData(data);
		}	
		if (OnLineGraphsVariables[4] != 0)
  		{
			var chart = $('#IQ_OnLineGraph3Container').highcharts(); 
			chart.addSeries({name: ' ' + AllVirtualVariablesName[OnLineGraphsVariables[4]]} );
			chart.series[chart.series.length-1].setData(data);
  		}
		if (OnLineGraphsVariables[5] != 0)
  		{
			var chart = $('#IQ_OnLineGraph3Container').highcharts(); 
			chart.addSeries({name: ' ' + AllVirtualVariablesName[OnLineGraphsVariables[5]]} );
			chart.series[chart.series.length-1].setData(data);
		}	
		if (OnLineGraphsVariables[6] != 0)
  		{
			var chart = $('#IQ_OnLineGraph4Container').highcharts(); 
			chart.addSeries({name: ' ' + AllVirtualVariablesName[OnLineGraphsVariables[6]]} );
			chart.series[chart.series.length-1].setData(data);
  		}
		if (OnLineGraphsVariables[7] != 0)
  		{
			var chart = $('#IQ_OnLineGraph4Container').highcharts(); 
			chart.addSeries({name: ' ' + AllVirtualVariablesName[OnLineGraphsVariables[7]]} );
			chart.series[chart.series.length-1].setData(data);
		}	

		UpdateFirstTime =1;
		return;
	}
	//*******************************************
	var ser=0;
	if (OnLineGraphsVariables[0] !=0)
	{
		var Result=ExtractValueFromData(Data,OnLineGraphsVariables[0]);	
		UpdateOnLineGraph2('1',ser,parseFloat(Result))
		ser++;
	}
	if (OnLineGraphsVariables[1] !=0)
	{
		var Result=ExtractValueFromData(Data,OnLineGraphsVariables[1]);	
		UpdateOnLineGraph2('1',ser,parseFloat(Result))
	}
	//********************************************************************************
	ser=0;
	if (OnLineGraphsVariables[2] !=0)
	{
		var Result=ExtractValueFromData(Data,OnLineGraphsVariables[2]);	
		UpdateOnLineGraph2('2',ser,parseFloat(Result))
		ser++;
	}
	if (OnLineGraphsVariables[3] !=0)
	{
		var Result=ExtractValueFromData(Data,OnLineGraphsVariables[3]);	
		UpdateOnLineGraph2('2',ser,parseFloat(Result))
	}
	//********************************************************************************	
	ser=0;
	if (OnLineGraphsVariables[4] !=0)
	{
		var Result=ExtractValueFromData(Data,OnLineGraphsVariables[4]);	
		UpdateOnLineGraph2('3',ser,parseFloat(Result))
		ser++;
	}
	if (OnLineGraphsVariables[5] !=0)
	{
		var Result=ExtractValueFromData(Data,OnLineGraphsVariables[5]);	
		UpdateOnLineGraph2('3',ser,parseFloat(Result))
	}
	//********************************************************************************		
	ser=0;	
	if (OnLineGraphsVariables[6] !=0)
	{
		var Result=ExtractValueFromData(Data,OnLineGraphsVariables[6]);	
		UpdateOnLineGraph2('4',ser,parseFloat(Result));
		ser++;
	}
	if (OnLineGraphsVariables[7] !=0)
	{
		var Result=ExtractValueFromData(Data,OnLineGraphsVariables[7]);	
		UpdateOnLineGraph2('4',ser,parseFloat(Result))
	}
}


function UpdateOnLineGraph2(gr,se,va)
{
	var chart = $('#IQ_OnLineGraph'+gr+'Container').highcharts();
	var x = (new Date()).getTime();//,y = 2.0*Math.random();
	//chart.series[0].addPoint([x, y], true, true);
	if (chart.series[se].data.length < OnLineGraphsVariables[8])
		chart.series[se].addPoint([x, va]);
	else
		chart.series[se].addPoint([x, va], true, true);
	
}

//**********************************************************************************
function GetOnLineGrpahsSetup()
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 044;';
	url=url+Math.random()+';';
	txt = XmlSynchronousHttpRequest(url,3000,timeoutFired);
	txt = decodeURIComponent(txt);
	return txt;
}

function SetOnLineGrpahsSetup(Parameters,ParametersLenght)
{
	var txt=''
	var url='http://'+SystemIpAdress+'/rpc/SetData/run 045;';
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

//*********************************************************************************************************