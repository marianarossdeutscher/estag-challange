<?php 
    include ('../index.php');
 
    function getOrders() {
        $orders = myPDO->query("SELECT * FROM orders");
        $orders = $orders->fetchAll();
        return json_encode($orders);
    }

    function addOrder($tax, $total) {
        $addOrder = myPDO->prepare("INSERT INTO orders (tax, total) VALUES ('$total', '$tax')");
        $addOrder->execute();
        $code = myPDO->lastInsertId();
        insertOrderCode($code);
    }

    function insertOrderCode($code) {
        $insertCode = myPDO->prepare("UPDATE order_item SET order_code = '$code' WHERE order_code IS NULL");
        $insertCode->execute();
    }

    function getOrderItems($code) {
        $getItems = myPDO->query("SELECT * FROM order_item WHERE order_code = '$code'");
        $getItems = $getItems->fetchAll();
        return json_encode($getItems);
    }
        
