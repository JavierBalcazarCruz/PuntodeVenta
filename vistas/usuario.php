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
  if($_SESSION['acceso']==1)
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
                          <h1 class="box-title">Usuario 
                            <button class="btn btn-success" id="btnagregar" onclick="mostrarform(true)"><i class="fa fa-plus-circle"></i> Agregar</button>
                          </h1>
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
                          <th>Número de Documento</th>
                          <th>Teléfono</th>      
                          <th>Correo Electrónico</th>                
                          <th>Login</th>
                          <th>Foto</th>
                          <th>Estado</th>
                        </thead>
                        <tbody>

                        </tbody>
                        <tfoot>
                        <th>Opciones</th>
                          <th>Nombre</th>
                          <th>Documento</th>
                          <th>Número de Documento</th>
                          <th>Teléfono</th>      
                          <th>Correo Electrónico</th>                
                          <th>Login</th>
                          <th>Foto</th>
                          <th>Estado</th>
                        </tfoot>
                      </table>                    
                    </div>

                     <div class="panel-body" id="formularioregistros">
                        <form name="formulario" id="formulario" method="POST">
                          <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Nombre(*):</label>
                            <input type="hidden" name="idusuario" id="idusuario">
                            <input type="text" class="form-control" name="nombre" id="nombre" maxlength="100" placeholder="Nombre" required>
                          </div>
                          <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Tipo de Documento(*):</label>                            
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
                            <input class="form-control" type="text" name="direccion" id="direccion" maxLenght="70" placesholder="Dirección">
                            </div>
                            <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <label> Teléfono: </label>
                            <input class="form-control" type="text" name="telefono" id="telefono" maxLenght="20" placesholder="Teléfono" required>
                            </div>
                            <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <label> Email: </label>
                            <input class="form-control" type="text" name="email" id="email" maxLenght="50" placesholder="Correo Electronico">
                            </div>
                            <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <label> Cargo: </label>
                            <input class="form-control" type="text" name="cargo" id="cargo" maxLenght="50" placesholder="Cargo " >
                            </div>
                            <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <label> Login: </label>
                            <input class="form-control" type="text" name="login" id="login" maxLenght="20" placesholder="Login " required>
                            </div>
                            <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <label> Contraseña: </label>
                            <input class="form-control" type="password" name="clave" id="clave" maxLenght="20" placesholder="Clave " required>
                            </div>

                            <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Permisos:</label>
                              <ul style="list-style: none;" id="permisos">

                              </ul>
                            </div>

                          <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Imagen:</label>
                            <input type="file" class="form-control" name="imagen" id="imagen">
                            <input type="hidden" class="form-control" name="imagenactual" id="imagenactual">
                            <img src="" width="150px" height="120px" id="imagenmuestra">
                          </div>                          
                          
                          <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <button class="btn btn-primary" type="submit" id="btnGuardar"><i class="fa fa-save"></i> Guardar</button>
 
                            <button class="btn btn-danger" onclick="cancelarform()" type="button"><i class="fa fa-arrow-circle-left"></i> Cancelar</button>
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
 <script type="text/javascript" src="scripts/usuario.js"></script>
 <?php
}
//liberar el espacio el buffer
ob_end_flush();
?>
