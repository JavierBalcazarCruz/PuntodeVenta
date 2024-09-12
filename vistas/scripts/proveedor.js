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
    $("#nombre").val("");
    $("#num_documento").val("");
    $("#direccion").val("");
    $("#telefono").val("");
    $("#email").val("");
    $("#idpersona").val("");
      
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
                    url:'../ajax/persona.php?op=listarp',
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
            url: "../ajax/persona.php?op=guardaryeditar",
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

function mostrar(idpersona)
{
    $.post("../ajax/persona.php?op=mostrar",{idpersona : idpersona}, function (data,status)
    {
        data= JSON.parse(data);
        mostrarform(true);

       
    
        $("#nombre").val(data.nombre);
        $("#tipo_documento").val(data.tipo_documento);
        $("#tipo_documento").selectpicker('refresh');
        $("#num_documento").val(data.num_documento);
        $("#direccion").val(data.direccion);
        $("#telefono").val(data.telefono);
        $("#email").val(data.email);
        $("#idpersona").val(data.idpersona);

    })
}

//función para eliminar registros
function eliminar(idpersona)
{
    bootbox.confirm("¿Esta seguro de eliminar  el proveedor?",function(result)
    {
      if(result)
      {
          $.post("../ajax/persona.php?op=eliminar",{idpersona : idpersona}, function (e)
          {
              bootbox.alert(e);
              tabla.ajax.reload();
          });
      }  
    })
}



init();