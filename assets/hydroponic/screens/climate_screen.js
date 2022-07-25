<div id="winVP2" style="position: relative; height: 500px; border: #cecece 1px solid; margin: 5px;" > 
			<table width="100%" border="0" cellpadding="0"  cellspacing="0" bgcolor="#808080" >
		  	<tr>
		      <td width="100%" bgcolor="#808080">
		 		<table width="100%" border="0"  cellspacing="0" cellpadding="0">
					<tr>
					<td width="140" height="140" align="center"><canvas id="TemperatureGaugeDivID" width="120" height="120"></canvas></td>
					<td width="140" height="140" align="center"><canvas id="HumidityGaugeDivID" width="120" height="120"></canvas></td>	
					<td width="140" height="140" align="center"><canvas id="SolarGaugeDivID" width="120" height="120"></canvas></td>	
					
					<td width="140" height="140" align="center"><canvas id="WindowGaugeDivID" width="120" height="120"></canvas></td>
					<td width="140" height="140" align="center"><canvas id="ScreenGaugeDivID" width="120" height="120"></canvas></td>
					</tr>
					<tr>
					<td align="center" class="style11">ΘΕΡΜΟΚΡΑΣΙΑ</td>
					<td align="center" class="style11">ΥΓΡΑΣΙΑ</td>
					<td align="center" class="style11">ΗΛΙΟΦΑΝΕΙΑ</td>
					<td align="center" class="style11">ΘΕΣΗ ΠΑΡΑΘΥΡΟΥ</td>
					<td align="center" class="style11">ΘΕΣΗ ΚΟΥΡΤΙΝΑΣ</td>
					<td align="center" class="style11"></td>
					</tr>
					<tr>
						<td colspan="10">
						<table>
						<tr>
						<td align="center" class="style11">1</td>
						<td align="center"><img src="./images/fan_off.gif" width="48" id="Climate1Fan1"></img></td>
						<td align="center" class="style11">2</td>
						<td align="center"><img src="./images/fan_off.gif" width="48" id="Climate1Fan2"></img></td>
						<td align="center" class="style11">3</td>
						<td align="center"><img src="./images/fan_off.gif" width="48" id="Climate1Fan3"></img></td>
						<td align="center" class="style11">4</td>
						<td align="center"><img src="./images/fan_off.gif" width="48" id="Climate1Fan4"></img></td>
						<td align="center" class="style11">5</td>
						<td align="center"><img src="./images/fan_off.gif" width="48" id="Climate1Fan5"></img></td>
						<td align="center" class="style11">6</td>
						<td align="center"><img src="./images/fan_off.gif" width="48" id="Climate1Fan6"></img></td>
						<td align="center" class="style11">7</td>
						<td align="center"><img src="./images/fan_off.gif" width="48" id="Climate1Fan7"></img></td>
						<td align="center" class="style11">8</td>
						<td align="center"><img src="./images/fan_off.gif" width="48" id="Climate1Fan8"></img></td>
						<td>
							<table width="58" border="0"  cellspacing="0" cellpadding="0">
								<tr><td align="center"><img width="16" height="16" src="./images/red-off-16.png" id="Climate1Pump"/> </td></tr>
								<tr><td align="center" class="style11">AΝΤΛΙΑ</td></tr>
							</table>
						</td>
						<td>
							<table width="58" border="0"  cellspacing="0" cellpadding="0">
								<tr><td align="center"><img width="16" height="16" src="./images/red-off-16.png" id="Climate1Heater1"/> </td></tr>
								<tr><td align="center" class="style11">ΘΕΡ. 1</td></tr>
							</table>
						</td>
						<td>
							<table width="58" border="0"  cellspacing="0" cellpadding="0">
								<tr><td align="center"><img width="16" height="16" src="./images/red-off-16.png" id="Climate1Heater2"/> </td></tr>
								<tr><td align="center" class="style11">ΘΕΡ. 2</td></tr>
							</table>
						</td>
						<td width="16" >
						<table bgcolor="#666666">
						<tr><td>
						<table border="0"  cellspacing="0" cellpadding="0">
							<tr><td align="center" valign="top"><img width="16" height="16" src="./images/red-off-16.png" id="Climate1WinClose"/> </td></tr>
							<tr><td width="16"  valign="bottom" align="center"><img width="16" height="16" src="./images/ar_down.png" /></td></tr>
						</table>
						</td>
						<td class="style11">ΠΑΡΑΘΥΡΟ</td>
						<td width="16" >
						<table border="0"  cellspacing="0" cellpadding="0">
							<tr><td align="center" valign="top"><img width="16" height="16" src="./images/red-off-16.png" id="Climate1WinOpen"/> </td></tr>
							<tr><td width="16"  valign="bottom" align="center"><img width="16" height="16" src="./images/ar_up.png" /></td></tr>
						</table>
						<tr><td>
						</table>
						</td>
						
						<td width="16" >
							<table  border="0"  cellspacing="0" cellpadding="0">
								<tr><td align="center" valign="top"><img width="16" height="16" src="./images/red-off-16.png" id="Climate1ScreenTrabhgma"/> </td></tr>
								<tr><td width="16"  valign="bottom" align="center"><img width="16" height="16" src="./images/ar_right.png" /></td></tr>
							</table>
						</td>
						<td class="style11">ΚΟΥΡΤΙΝΑ</td>
						<td width="16" >
							<table border="0"  cellspacing="0" cellpadding="0">
								<tr><td align="center" valign="top"><img width="16" height="16" src="./images/red-off-16.png" id="Climate1ScreenAploma"/> </td></tr>
								<tr><td width="16"  valign="bottom" align="center"><img width="16" height="16" src="./images/ar_left.png" /></td></tr>
							</table>
						</td>

					</tr>
					</table>
						</td>
					</tr>
		  	    </table>
			  </td>
      </table>
		  	</tr>
			<tr>
			<td>
			<table width="100%" border="0" cellpadding="1" cellspacing="1" bgcolor="#808080">
			 <tr>
				    <td width="40"><img src="./images/weather256.png" width="48"></img></td>
  					<td width="200"><span class="style18">Ελεγχος Κλίματος:</span></td>
				    <td width="140">
				    	<select size="1" id="InfoClimaList"  style='font-size:18px;width:300px; background-color:#C0DCC0;' >
				    	</select>
					</td>
				    <td colspan="2" align="left"><input name="" type="image" src="./images/edit.png" alt="ΔΙΟΡΘΩΣΗ"  onclick="InfoEditClima()" width="48" height="48"/></td>
			 </tr>
			</table>
			</td>
			</tr>
			</table>
	</div>

