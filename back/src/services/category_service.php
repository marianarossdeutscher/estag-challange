<?php 
    include ('../index.php');
    
    function getCategories(){
        $categories = myPDO->query('SELECT * FROM categories');
        $categories = $categories->fetchAll();
        return json_encode($categories);
    };

    function addCategories($name, $tax){
        $insertCategories = myPDO->prepare("INSERT INTO categories (name, tax) VALUES ('$name', '$tax')");
        $insertCategories->execute();
    }

    function deleteCategories($code){
        $removeCategories = myPDO->prepare("DELETE FROM categories WHERE code = '$code'");
        $removeCategories->execute();
    };