<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include ("../services/order_item_service.php");

function execute(){
    $requestMethod = $_SERVER['REQUEST_METHOD'];

    switch($requestMethod) {
        case 'GET':
            echo getAllOrders();
            break;
    }
}
execute();
?>