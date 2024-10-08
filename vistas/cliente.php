<?php
ob_start(); //Activamos el almacenamiento en el buffer
session_start(); //Iniciar la sesion del usuario
if(!isset($_SESSION["nombre"]))
{
  header("Location: Login.html");
}
else
{

  require 'header.php';
  if($_SESSION['ventas']==1)
  {
?>
<!--Contenido-->
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
      <!-- Main content -->
        <section class="content">
            <div class="row">
              <div class="col-md-12">
                  <div class="box">
                    <div class="box-header with-border">
                          <h1 class="box-title">Cliente <button class="btn btn-success" onclick="mostrarform(true)"><i class="fa fa-plus-circle"></i> Agregar</button></h1>
                        <div class="box-tools pull-right">
                        </div>
                    </div>
                    <!-- /.box-header -->
                    <!-- centro -->
                    <div class="panel-body table-responsive"  id="listadoregistros">
                      <table id="tbllistado" class="table table-striped table-bordered table-condensed table-hover">
                        <thead>
                          <th>Opciones</th>
                          <th>Nombre</th>
                          <th>Documento</th>
                          <th>Número</th>         
                          <th>Telefono</th>
                          <th>Email</th>
                          
                        </thead>
                        <tbody>

                        </tbody>
                        <tfoot>
                          <th>Opciones</th>
                          <th>Nombre</th>
                          <th>Documento</th>
                          <th>Número</th>         
                          <th>Telefono</th>
                          <th>Email</th>
                        </tfoot>
                      </table>                    
                    </div>

                     <div class="panel-body" style="height: 400px;" id="formularioregistros">
                        <form name="formulario" id="formulario" method="POST">
                          <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label> Nombre del Cliente: </label>
                            <input type="hidden" name="idpersona" id="idpersona">
                            <input type="hidden" name="tipo_persona" id="tipo_persona" value="Cliente">
                            <input class="form-control" type="text" name="nombre" id="nombre" maxLenght="100" placesholder="Nombre del Proveedor" required>
                          </div>
                          <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label> Tipo de Documento: </label>
                            <select class="form-control select-picker" name="tipo_documento" id="tipo_documento" required>
                                <option value="RFC"> RFC</option>
                                <option value="INE"> INE</option>
                                <option value="PASAPORTE"> PASAPORTE</option>
                                <option value="CEDULA"> CEDULA</option>
                            </select>
                          </div>
                          <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label> Número de Documento: </label>
                           <input class="form-control" type="text" name="num_documento" id="num_documento" maxLenght="20" placesholder="Documento" required>
                          </div>
                          <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label> Dirección: </label>
                           <input class="form-control" type="text" name="direccion" id="direccion" maxLenght="70" placesholder="Dirección" required>
                          </div>
                          <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label> Teléfono: </label>
                           <input class="form-control" type="text" name="telefono" id="telefono" maxLenght="20" placesholder="Teléfono" required>
                          </div>
                          <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label> Email: </label>
                           <input class="form-control" type="text" name="email" id="email" maxLenght="50" placesholder="Correo Electronico" required>
                          </div>




                          <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <button class="btn btn-primary" type="submit" id="btnGuardar">
                              <i class="fa fa-save"></i>
                                Guardar
                            </button>
                            <button class="btn btn-danger" onclick="cancelarform()" type="button">
                              <i class="fa fa-arrow-circle-left"></i>
                                Cancelar
                            </button>
                          </div>
                        </form>
                        </div>
                        
                    <!--Fin centro -->
                  </div><!-- /.box -->
              </div><!-- /.col -->
          </div><!-- /.row -->
      </section><!-- /.content -->

    </div><!-- /.content-wrapper -->
  <!--Fin-Contenido-->
  <?php
  }
    else //Si la variable almacen no es 1 
    {
      require'noacceso.php';
    }
    require 'footer.php';
  ?>
  <script type="text/javascript" src="scripts/cliente.js"></script>
<?php
}
//liberar el espacio el buffer
ob_end_flush();
?>