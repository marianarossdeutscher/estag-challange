<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../services/category_service.php');

function execute() {
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            echo getCategories();
            break;

        case 'POST':
            $name =  filter_input(INPUT_POST, 'catName', FILTER_SANITIZE_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
            $tax =  filter_input(INPUT_POST, 'tax-categories', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
            $name = strtoupper($name);
            addCategories($name, $tax);
            break;

        case 'DELETE':
            $code = $_GET["code"];
            deleteCategories($code);
            break;
    }
}

execute();