var materia="";
var est="";
var cant="";
var reprobados = 0;
var aprobados = 0;

function crearForm()
{
   materia=document.getElementById("materia").value;
   est=document.getElementById("est").value;
   cant=document.getElementById("cant").value;

   if(materia == "" || est == "" || cant == ""){
      swal("¡ Advertenvia !","Por favor llene todos los campos para generar la gráfica indicada","info");
    }else{
     //reiniciar tabla definitivas y grafica
     var def = document.getElementById("registros_def");
     def.innerHTML="";
     var graf = document.getElementById("piechart_3d");
     graf.innerHTML="";
     var bot = document.getElementById("boton_tabla_estadisticas");
     bot.innerHTML="";
     var col = document.getElementById("columnas_def");
     col.innerHTML="";

     var tabla=document.getElementById("registros_tabla");
     var columnas = document.getElementById("columnas_tabla");
     var col_generadas = "<tr><th scope='col' style='text-align: center;'>Código</th>";

     for(i=1;i<=cant;i++)
      {
         col_generadas+="<th scope='col' style='text-align: center;'>Nota "+i+"</th>"; 
      }
      col_generadas+="</tr>"
      columnas.innerHTML=col_generadas;

     var form="<tr>";
      for(i=1;i<=est;i++)
      {
         form+="<td><input type='text' id='codigo' name='codigo' placeholder='Código "+i+"' style='display:block;margin:auto;text-align: center;'/></td>";
         for (j=1;j<=cant;j++) {
           form+="<td><input type='number' id='nota"+i+"' name='nota"+i+"' placeholder='Nota "+j+"' style='display:block;margin:auto;text-align: center;'/></td>";
         } 
         form+="</tr>";
      }
      tabla.innerHTML=form; 
      var boton=document.getElementById("boton_tabla");
      boton.innerHTML="<button type='button' class='btn btn-success mt-3' onclick='analizar()' style='width: 100%;'>Analizar</button>"
  
    }
  }

function analizar(){
   document.getElementById("nombre_materia").innerHTML = materia;
     var tabla=document.getElementById("registros_def");
     var columnas = document.getElementById("columnas_def");
     var codigos= document.getElementsByName("codigo");
     var col_generadas = "<tr><th scope='col' style='text-align: center;'>Código</th>";
      col_generadas+="<th scope='col' style='text-align: center;'>Definitiva</th></tr>"
      columnas.innerHTML=col_generadas;

      var form="<tr>";
         for (j=0;j<codigos.length;j++) {
           var def = sacarDef(j);
           if(def<3){
              reprobados++;
              form+="<td style='background:#FF5B60;'><label style='display:block;margin:auto;text-align: center;'>"+codigos[j].value+"</label></td>";         
              form+="<td style='background:#FF5B60;'><label style='display:block;margin:auto;text-align: center;'>"+sacarDef(j)+"</label></td></tr>";
           }else if(def==3){
              aprobados++;
              form+="<td style='background:#FFF289;'><label style='display:block;margin:auto;text-align: center;'>"+codigos[j].value+"</label></td>";         
              form+="<td style='background:#FFF289;'><label style='display:block;margin:auto;text-align: center;'>"+sacarDef(j)+"</label></td></tr>";
           }else{
              aprobados++;
              form+="<td style='background:#47FF50;'><label style='display:block;margin:auto;text-align: center;'>"+codigos[j].value+"</label></td>";         
              form+="<td style='background:#47FF50;'><label style='display:block;margin:auto;text-align: center;'>"+sacarDef(j)+"</label></td></tr>";
           }
         } 
      tabla.innerHTML=form;
      var boton=document.getElementById("boton_tabla_estadisticas");
      boton.innerHTML="<button type='button' class='btn btn-success mt-3' onclick='graficar()' style='width: 100%;'>Estadísticas</button>"
}

function sacarDef(x){
  var notas= document.getElementsByName("nota"+(x+1)+"");
  var suma = 0;
  var def = 0;
  for(i=0;i<notas.length;i++){
      suma+=parseFloat(notas[i].value);
  }
  def = suma/cant;
  return(def);
}

function graficar(){
  var datos = ["Reprobados","Aprobados"];
  var valores = [reprobados,aprobados];
  $("#piechart_3d").css("width", "100%");
  $("#piechart_3d").css("border", "2px solid black");
  draw_chart(datos,valores);
}
      
function draw_chart(datos,valores){
  drawChart(datos,valores);
  google.charts.setOnLoadCallback(drawChart);
}  

function drawChart(a,v) {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Tipo');
  data.addColumn('number', 'Cantidad');
  data.addRows(a.length);
  for(i=0;i<a.length;i++){
    data.setCell(i, 0, a[i]);
    data.setCell(i, 1, v[i]);        
  }
  var options = {
    title: 'Graficador'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
  chart.draw(data, options);        
}