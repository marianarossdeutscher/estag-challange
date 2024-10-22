<?php
include ("../index.php");

    function getAllOrders() {
        $order_items = myPDO->query('SELECT * FROM order_item WHERE order_code IS NOT NULL');
        $order_items = $order_items->fetchAll();
        return json_encode($order_items);
    }

    function getOrdersNull() {
        $orderNull = myPDO->query('SELECT * FROM order_item WHERE order_code IS NULL');
        $orderNull = $orderNull->fetchAll();
        return json_encode($orderNull);
    }

    function addOrderItem($product_code, $amount, $price, $tax) {
        $addItem = myPDO->prepare("INSERT INTO order_item (product_code, amount, price, tax) VALUES ('$product_code', '$amount', '$price', '$tax')");
        $addItem->execute();
        updateStockAdd($product_code, $amount);
    }

    function deleteOrderItem($code) {
        $deleteProduct = myPDO->prepare("DELETE FROM order_item WHERE code = '$code'");
        $deleteProduct->execute(); 
    }

    function updateStockAdd($product_code, $amount){
        $readItemsStorage = getProductStorage($product_code);
        $newAmount = $readItemsStorage["amount"] - $amount;
        $order_item = myPDO->query("UPDATE products SET amount = $newAmount WHERE code = '$product_code'");
        $order_item->execute();
    }

    function getProductStorage($code) {
        $itensProducts = myPDO->query("SELECT * FROM products WHERE code = '$code'");
        $itemProduct = $itensProducts->fetch();
        return $itemProduct ;
    }
