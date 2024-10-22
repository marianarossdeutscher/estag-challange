<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../services/product_service.php');

function execute() {
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            echo getProducts();
            break;

        case 'POST':
            $name = filter_input(INPUT_POST, 'prodName', FILTER_SANITIZE_SPECIAL_CHARS);
            $price = filter_input(INPUT_POST, 'prodPrice', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
            $amount = filter_input(INPUT_POST, 'prodAmount', FILTER_SANITIZE_NUMBER_INT);
            $category_code = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_NUMBER_INT);
            $name = strtoupper($name);
            addProduct($name, $price, $category_code, $amount);
            break;

        case 'DELETE':
            $code = filter_input(INPUT_GET, 'code', FILTER_SANITIZE_NUMBER_INT);
            deleteProduct($code);
            break;
    }
}
execute();