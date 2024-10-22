<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include ("../services/order_item_service.php");

function execute(){
    $requestMethod = $_SERVER['REQUEST_METHOD'];

    switch($requestMethod) {
        case 'GET':
            echo getOrdersNull();
            break;

        case 'POST':
            $product_code = filter_input(INPUT_POST, 'product', FILTER_SANITIZE_NUMBER_INT);
            $amount = filter_input(INPUT_POST, 'amount', FILTER_SANITIZE_NUMBER_INT);
            $price = filter_input(INPUT_POST, 'unit-price', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
            $tax = filter_input(INPUT_POST, 'tax', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
            addOrderItem($product_code, $amount, $price, $tax);
            break;

        case 'DELETE':
            $code = $_GET['code'];
            $product_code = $_GET['product_code'];
            $amount = $_GET['amount'];
            deleteOrderItem($code, $product_code, $amount);
            break;
    }
}

execute();
?>