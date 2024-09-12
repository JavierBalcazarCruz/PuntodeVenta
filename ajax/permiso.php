<?php
    require_once "../modelos/Permiso.php";
    $permiso=new Permiso();   

    //Cuando se haga un llamado al archivo AJAX Y le envian con el metodo Get por la URL una operacion se evalua que instrucción se ejecuta
    switch($_GET["op"])
    {//lista los permisos
        case 'listar':
            $rspta= $permiso->listar();
            $data=Array();
            while($reg=$rspta->fetch_object())
            {
                $data[]=array(
                                    
                    "0"=>$reg->nombre
                   
                );
            }
            $results=array(
                "sEcho"=>1, //Informacion para el datatables
                "iTotalRecords"=>count($data), //enviamos el total registros al datatable
                "iTotalDisplayRecords"=>count($data),//enviamos el total registros a visualizar
                "aaData"=>$data);
                echo json_encode($results);
         break;
    }
?>