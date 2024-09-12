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
    $("#imagenmuestra").hide(); 
    
    //mostramos los permisos
    $.post("../ajax/usuario.php?op=permisos&id=",function (r) //data es el arreglo
    {
        $("#permisos").html(r);
    });
}


//función limpiar
function limpiar()
{
    $("#nombre").val("");
    $("#num_documento").val("");
    $("#direccion").val("");
    $("#telefono").val("");
    $("#email").val("");
    $("#cargo").val("");
    $("#login").val("");
    $("#clave").val("");
    $("#imagenmuestra").attr("src","");//limpia imagen
    $("#imagenactual").val("");
    $("#idusuario").val("");//limpia el id

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
                    url:'../ajax/usuario.php?op=listar',
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
            url: "../ajax/usuario.php?op=guardaryeditar",
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

function mostrar(idusuario) //Cuando se necesite mostrar un articulo
{
    $.post("../ajax/usuario.php?op=mostrar",{idusuario : idusuario}, function (data,status) //data es el arreglo
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
        $("#cargo").val(data.cargo);
        $("#login").val(data.login);
        $("#clave").val(data.clave);
        $("#imagenmuestra").show();
        $("#imagenmuestra").attr("src","../files/usuarios/"+data.imagen);
        $("#imagenmuestra").val(data.imagenmuestra);
        $("#idusuario").val(data.idusuario);
    });
    $.post("../ajax/usuario.php?op=permisos&id="+idusuario,function (r) //data es el arreglo
    {
        $("#permisos").html(r);
    });
}

//función para desactivar registros
function desactivar(idusuario)
{
    bootbox.confirm("¿Esta seguro de desactivar el Trabajador?",function(result)
    {
      if(result)
      {
          $.post("../ajax/usuario.php?op=desactivar",{idusuario : idusuario}, function (e)
          {
              bootbox.alert(e);
              tabla.ajax.reload();
          });
      }  
    })
}

//función para activar registros
function activar(idusuario)
{
    bootbox.confirm("¿Esta seguro de activar el Trabajador?",function(result)
    {
      if(result)
      {
          $.post("../ajax/usuario.php?op=activar",{idusuario : idusuario}, function (e){
              bootbox.alert(e);
              tabla.ajax.reload();
          });
      }  
    })
}

init();