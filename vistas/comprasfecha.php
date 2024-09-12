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

  if($_SESSION['consultac']==1)
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
                          <h1 class="box-title">Consulta de Compras por Fecha </h1>
                        <div class="box-tools pull-right">
                        </div>
                    </div>
                    <!-- /.box-header -->
                    <!-- centro -->
                    <div class="panel-body table-responsive"  id="listadoregistros">
                       <div class="form-group col-lg6 col-md-6 col-sm-6 col-xs-12">
                        <label> Fecha Inicio </label>
                          <input type="date" class="form-control" name="fecha_inicio" id="fecha_inicio" value="<?php echo date("Y-m-d");?>">
                       
                       </div> 
                       <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label> Fecha Fin </label>
                          <input type="date" class="form-control" name="fecha_fin" id="fecha_fin" value="<?php echo date("Y-m-d");?>">
                       
                       </div> 
                      <table id="tbllistado" class="table table-striped table-bordered table-condensed table-hover">
                        <thead>
                          <th>Fecha</th>
                          <th>Usuario</th>
                          <th>Proveedor</th>
                          <th>Comprobante</th>   
                          <th>Número</th>
                          <th>Total</th>
                          <th>Impuesto</th>
                          <th>Estado</th>                    
                        </thead>
                        <tbody>

                        </tbody>
                        <tfoot>
                        <th>Fecha</th>
                          <th>Usuario</th>
                          <th>Proveedor</th>
                          <th>Comprobante</th>   
                          <th>Número</th>
                          <th>Total</th>
                          <th>Impuesto</th>
                          <th>Estado</th>         
                        </tfoot>
                      </table>                    
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
  <script type="text/javascript" src="scripts/comprasfecha.js"></script>
  <?php
}
//liberar el espacio el buffer
ob_end_flush();
?>