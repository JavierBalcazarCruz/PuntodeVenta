<?php
    //Incluimos inicialmente la conexion a la base de datos***+
    require "../config/Conexion.php";
    
    Class Persona
    {
        //Implementamos nuestro constructor
        public function __construct()
        {

        }

        //implementamos un metodo para insertar registros
        public function insertar($tipo_persona,$nombre,$tipo_documento,$num_documento,$direccion,$telefono,$email)
        {
            $sql="INSERT INTO persona (tipo_persona,nombre,tipo_documento,num_documento,direccion,telefono,email)
             VALUES('$tipo_persona','$nombre','$tipo_documento','$num_documento','$direccion','$telefono','$email')";
            return ejecutarConsulta($sql);
        }

        //implementamos un metodo para editar registros
        public function editar ($idpersona,$tipo_persona,$nombre,$tipo_documento,$num_documento,$direccion,$telefono,$email)
        {
            $sql="UPDATE persona SET  tipo_persona='$tipo_persona',nombre='$nombre',tipo_documento='$tipo_documento',num_documento='$num_documento',direccion='$direccion',telefono='$telefono',email='$email'
                  WHERE idpersona='$idpersona'";
            return ejecutarConsulta($sql);
        }

        //implementamos un metodo para eliminar categorias
        public function eliminar ($idpersona)
        {
            $sql="DELETE FROM persona 
                  WHERE idpersona='$idpersona'";
            return ejecutarConsulta($sql);
        }

        
        //implementar un metodo para mostrar los datos  de un registro a modificar
        public function mostrar($idpersona)
        {
            $sql="SELECT * FROM persona
                  WHERE idpersona='$idpersona'";
            return ejecutarConsultaSimpleFila($sql);
        }
        //implementar un metodo para listar los registros de proveedor
        public function listarp()
        {
            $sql="SELECT * FROM persona
                  WHERE tipo_persona='Proveedor'";
            return ejecutarConsulta($sql);
        }

        //implementar un metodo para listar los registros de cliente
        public function listarc()
        {
            $sql="SELECT * FROM persona
                  WHERE tipo_persona='Cliente'";
            return ejecutarConsulta($sql);
        }
        
        
    }
?>