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

}

//función limpiar
function limpiar()
{
    $("#idcategoria").val("");
    $("#nombre").val("");
    $("#descripcion").val("");
  
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
    }
    else
    {
        $("#listadoregistros").show();
        $("#formularioregistros").hide();
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
                    url:'../ajax/categoria.php?op=listar',
                    type:"get",
                    dataType:"json",
                    error:function(e)
                    {
                        console.log(e.responseText);
                    }
                  },
                  "bDestroy":true,  
                  "iDisplayLength":5, //paginacion de 5 en 5
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
            url: "../ajax/categoria.php?op=guardaryeditar",
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

function mostrar(idcategoria)
{
    $.post("../ajax/categoria.php?op=mostrar",{idcategoria : idcategoria}, function (data,status)
    {
        data= JSON.parse(data);
        mostrarform(true);
        $("#nombre").val(data.nombre);
        $("#descripcion").val(data.descripcion);
        $("#idcategoria").val(data.idcategoria);

    })
}

//función para desactivar registros
function desactivar(idcategoria)
{
    bootbox.confirm("¿Esta seguro de desactivar la categoria?",function(result)
    {
      if(result)
      {
          $.post("../ajax/categoria.php?op=desactivar",{idcategoria : idcategoria}, function (e)
          {
              bootbox.alert(e);
              tabla.ajax.reload();
          });
      }  
    })
}

//función para activar registros
function activar(idcategoria)
{
    bootbox.confirm("¿Esta seguro de activar la categoria?",function(result)
    {
      if(result)
      {
          $.post("../ajax/categoria.php?op=activar",{idcategoria : idcategoria}, function (e){
              bootbox.alert(e);
              tabla.ajax.reload();
          });
      }  
    })
}

init();