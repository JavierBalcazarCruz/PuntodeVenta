var tabla;
//función que se ejecuta al inicio
function init()
{
    mostrarform(false);
    listar();
    $("#formulario").on("submit",function(e)
    {
        guardaryeditar(e);
    })

   //Cargamos los items al select categoria
   $.post("../ajax/articulo.php?op=selectCategoria", function(r)
   {
    $("#idcategoria").html(r);
    $('#idcategoria').selectpicker('refresh');
    });
    $("#imagenmuestra").hide(); //
}


//función limpiar
function limpiar()
{
    $("#codigo").val("");
    $("#nombre").val("");
    $("#descripcion").val("");
    $("#stock").val("");
    $("#imagenmuestra").attr("src","");//limpia imagen
    $("#imagenactual").val("");
    $("#print").hide(); //ocula codigo de barras
    $("#idarticulo").val("");//limpia el id

}

//Funcion mostrar formulario
function mostrarform(flag)
{
    limpiar();
    if(flag)
    {
        $("#listadoregistros").hide();
        $("#formularioregistros").show();
        $("#btnGuardar").prop("disabled",false);
        $("#btnagregar").hide();
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
                    url:'../ajax/articulo.php?op=listar',
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
    $("#btnGuardar").prop("disabled",true); //desahbilita el botn
    var formData=new FormData($("#formulario")[0]);
    $.ajax(
        {
            url: "../ajax/articulo.php?op=guardaryeditar",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,

            success: function(datos)
            {
                bootbox.alert(datos);
                mostrarform(false);
                tabla.ajax.reload();
            }
        }
    );    
    limpiar();
}

function mostrar(idarticulo) //Cuando se necesite mostrar un articulo
{
    $.post("../ajax/articulo.php?op=mostrar",{idarticulo : idarticulo}, function (data,status)
    {
        data= JSON.parse(data);
        mostrarform(true);

        $("#idcategoria").val(data.idcategoria);
        $('#idcategoria').selectpicker('refresh'); //selecciona la categoria refrente en el select
        $("#codigo").val(data.codigo);
        $("#nombre").val(data.nombre);
        $("#stock").val(data.stock);
        $("#descripcion").val(data.descripcion);
        $("#imagenmuestra").show();
        $("#imagenmuestra").attr("src","../files/articulos/"+data.imagen);
        $("#imagenactual").val(data.imagen);
        $("#idarticulo").val(data.idarticulo);
        generarbarcode();

    })
}

//función para desactivar registros
function desactivar(idarticulo)
{
    bootbox.confirm("¿Esta seguro de desactivar el articulo?",function(result)
    {
      if(result)
      {
          $.post("../ajax/articulo.php?op=desactivar",{idarticulo : idarticulo}, function (e)
          {
              bootbox.alert(e);
              tabla.ajax.reload();
          });
      }  
    })
}

//función para activar registros
function activar(idarticulo)
{
    bootbox.confirm("¿Esta seguro de activar el articulo?",function(result)
    {
      if(result)
      {
          $.post("../ajax/articulo.php?op=activar",{idarticulo : idarticulo}, function (e){
              bootbox.alert(e);
              tabla.ajax.reload();
          });
      }  
    })
}
//Funcion para generar codigo de barras
function generarbarcode()
{
    codigo=$("#codigo").val();
    JsBarcode("#barcode",codigo);
    $("#print").show();
}

//Funcion para imprimir codigos de Barra
function imprimir()
{
    $("#print").printArea();
}
init();