var tabla;
//función que se ejecuta al inicio
function init()
{
    mostrarform(false);
    listar();
    $("#formulario").on("submit",function(e)
    {
        guardaryeditar(e);
    });
    //cargamos los items al select Proveedor
    $.post("../ajax/ingreso.php?op=selectProveedor", function(r)
    {
        $("#idproveedor").html(r);
        $("#idproveedor").selectpicker('refresh');
    });
   
}


//función limpiar
function limpiar()
{
    $("#idproveedor").val("");
    $("#proveedor").val("");
    $("#serie_comprobante").val("");
    $("#num_comprobante").val("");
    $("#fecha_hora").val("");
    $("#impuesto").val("");//limpia el id

    $("#total_compra").val("");
    $(".filas").remove();
    $("#total").html("0");

  //Obtenemos la fecha actual
  var now = new Date();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
  $('#fecha_hora').val(today);
    //Marcamos el primer tipo_documento
    $("#tipo_comprobante").val("Ticket");
    $("#tipo_comprobante").selectpicker('refresh');
}

//Funcion mostrar formulario
function mostrarform(flag)
{
    limpiar();
    if(flag)
    {
        $("#listadoregistros").hide();
        $("#formularioregistros").show();
        //$("#btnGuardar").prop("disabled",false);
        $("#btnagregar").hide();
        listarArticulos();
      
        $("#btnGuardar").hide();
        $("#btnCancelar").show();
        detalles=0;
        $("#btnAgregarArt").show();
    }
    else
    {
        $("#listadoregistros").show();
        $("#formularioregistros").hide();
        $("#btnagregar").show();
    }
}

//funcion cancelar formulario
function cancelarform()
{
    limpiar();
    mostrarform(false);
}

//Funcion listar por medio de Ajax
function listar()
{
    tabla=$('#tbllistado').dataTable(
        {
            "aProcessing":true, //Activamos el procesamiento del datatables
            "aServerSide":true, //Paginación y filtrado realizados por el servidor
            dom: 'Bfrtip', //Definimos los elementos del control de tabla
            //Botones de html, excel o pdf
            buttons:[
                        'copyHtml5',
                        'excelHtml5',
                        'csvHtml5',
                        'pdf'
                    ],
            "ajax":
                  {
                    url:'../ajax/ingreso.php?op=listar',
                    type:"get",
                    dataType:"json",
                    error:function(e)
                    {
                        console.log(e.responseText);
                    }
                  },
                  "bDestroy":true,  
                  "iDisplayLength":10, //paginacion de 5 en 5
                  "order":[[0,"desc"]] //ordenas por id categoria 
        }).DataTable();
}

//Funcion listar Articulos  activos en el Modal por medio de Ajax
function listarArticulos()
{
    tabla=$('#tblarticulos').dataTable(
        {
            "aProcessing":true, //Activamos el procesamiento del datatables
            "aServerSide":true, //Paginación y filtrado realizados por el servidor
            dom: 'Bfrtip', //Definimos los elementos del control de tabla
            //Botones de html, excel o pdf
            buttons:[ 
                        /*'copyHtml5',
                        'excelHtml5',
                        'csvHtml5',
                        'pdf'*/
                    ],
            "ajax":
                  {
                    url:'../ajax/ingreso.php?op=listarArticulos',
                    type:"get",
                    dataType:"json",
                    error:function(e)
                    {
                        console.log(e.responseText);
                    }
                  },
                  "bDestroy":true,  
                  "iDisplayLength":10, //paginacion de 5 en 5
                  "order":[[0,"desc"]] //ordenas por id categoria 
        }).DataTable();
}


//funcion para guardar y editar
function guardaryeditar(e)
{
    e.preventDefault();//no se activará la accion predeterminada del evento
    //$("#btnGuardar").prop("disabled",true); //desahbilita el botn
    var formData=new FormData($("#formulario")[0]);
    $.ajax(
        {
            url: "../ajax/ingreso.php?op=guardaryeditar",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,

            success: function(datos)
            {
                bootbox.alert(datos);
                mostrarform(false);
                listar();//refresca la tabla de productos ya inrgesadas
            }
        }
    );    
    limpiar();
}

function mostrar(idingreso) //Cuando se necesite mostrar un articulo
{
    $.post("../ajax/ingreso.php?op=mostrar",{idingreso : idingreso}, function (data,status)
    {
        data= JSON.parse(data);
        mostrarform(true);

        $("#idproveedor").val(data.idproveedor);
        $('#idproveedor').selectpicker('refresh'); //selecciona la categoria refrente en el select
        $("#tipo_comprobante").val(data.tipo_comprobante);
        $('#tipo_comprobante').selectpicker('refresh'); //selecciona la categoria refrente en el select
        $("#serie_comprobante").val(data.serie_comprobante);
        $("#num_comprobante").val(data.num_comprobante);
        $("#fecha_hora").val(data.fecha);
        $("#impuesto").val(data.impuesto);
        $("#idingreso").val(data.idingreso);
        //Ocultar y mostrar los botones
       
        $("#btnGuardar").hide();
        $("#btnCancelar").show();
        $("#btnAgregarArt").hide();

    });
    $.post("../ajax/ingreso.php?op=listarDetalle&id="+idingreso,function (r)
    {
        $("#detalles").html(r);
    });

}

//función para desactivar registros
function anular(idingreso)
{
    bootbox.confirm("¿Esta seguro de Anular el ingreso?",function(result)
    {
      if(result)
      {
          $.post("../ajax/ingreso.php?op=anular",{idingreso : idingreso}, function (e)
          {
              bootbox.alert(e);
              tabla.ajax.reload();
          });
      }  
    })
}

//Declaracion de variables necesarias para trabajar compras y sus detalles
var impuesto=16 //impuesto
var  cont=0;    //cuenta cuantos detalles agrega a la compra
var detalles=0; //cantidad de detalles que tiene la compra
$("#btnGuardar").hide();
$("#tipo_comprobante").change(marcarImpuesto);


function marcarImpuesto()
{
    var tipo_comprobante=$("#tipo_comprobante option:selected").text();
    if(tipo_comprobante=='Factura')
    {
        $("#impuesto").val(impuesto);
    }
    else
    {
        $("#impuesto").val("0");
    }
    
}


function agregarDetalle(idarticulo,articulo)
{
    var cantidad=1;
    var precio_compra=1;
    var precio_venta=1;
    if(idarticulo!="")
    {
        var subtotal=cantidad*precio_compra;
        var fila='<tr class="filas" id="fila'+cont+'">'+
        '<td><button type="button" class="btn btn-danger" onclick="eliminarDetalle('+cont+')">X</button></td>'+
        '<td><input type="hidden" name="idarticulo[]" value="'+idarticulo+'">'+articulo+'</td>'+
        '<td><input type="number" name="cantidad[]" id="cantidad[]" value="'+cantidad+'"></td>'+
        '<td><input type="number" name="precio_compra[]" id="precio_compra[]" value="'+precio_compra+'"></td>'+
        '<td><input type="number" name="precio_venta[]" value="'+precio_venta+'"></td>'+
        '<td><span name="subtotal" id="subtotal'+cont+'">'+subtotal+'</span></td>'+
        '<td><button type="button" onclick="modificarSubototales()" class="btn btn-info"><i class="fa fa-refresh"></i></button></td>'+
        '</tr>';
        cont++;
        detalles=detalles+1;
        $('#detalles').append(fila);
        modificarSubototales();
    }
    else
    {
        alert("Error al ingresar el detalle, Revisar los datos de la compra");
    }

}

function modificarSubototales()
{
   var cant=document.getElementsByName("cantidad[]"); //almacenar cantidades
   var prec=document.getElementsByName("precio_compra[]");//almacena precios de compra
   var sub=document.getElementsByName("subtotal"); //almacena subtotales
   for(var i=0; i<cant.length;i++)
   {
       var inpC=cant[i];
       var inpP=prec[i];
       var inpS=sub[i];
       inpS.value=inpC.value*inpP.value;//Se calculo el subtotal
       document.getElementsByName("subtotal")[i].innerHTML=inpS.value
   }
   //metodo
   CalcularTotales();

}
function CalcularTotales()
{
    var sub=document.getElementsByName("subtotal"); //almacena subtotales
    var total=0.0;
    for(var i=0; i<sub.length;i++)
    {
        total+=document.getElementsByName("subtotal")[i].value;
    }
    $("#total").html("$/."+total);
    $("#total_compra").val(total);
    evaluar();
}

function evaluar()
{
    if(detalles>0)
    {
        $("#btnGuardar").show();
    }
    else
    {
        $("#btnGuardar").hide();
        cont=0;
    }
}

function eliminarDetalle(indice)
{
$("#fila"+indice).remove();
CalcularTotales();
detalles=detalles-1;
}


init();