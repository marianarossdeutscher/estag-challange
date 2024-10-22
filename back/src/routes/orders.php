<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include ("../services/orders_service.php");

function execute(){
    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {
        case 'GET':
            echo getOrders();
            break;

        case 'POST':
            $totalTax = filter_input(INPUT_POST, 'total', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
            $totalValue = filter_input(INPUT_POST, 'tax', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
            addOrder($totalTax, $totalValue);
            break;
    }
}

execute();
