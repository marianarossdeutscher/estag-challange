<?php 
    include ('../index.php');

    function getProducts() {
        $products = myPDO->query('SELECT * FROM products ORDER BY code');
        $products = $products->fetchAll();
        return json_encode($products);
    }

    function addProduct($name, $price, $category_code, $amount) {
        $createProduct = myPDO->prepare("INSERT INTO products (name, price, category_code, amount) VALUES ('$name', '$price', '$category_code', '$amount')");
        $createProduct->execute();
    }

    function deleteProduct($code) {
        $deleteProduct = myPDO->prepare("DELETE FROM products WHERE code = '$code'");
        $deleteProduct->execute();
    }
?>