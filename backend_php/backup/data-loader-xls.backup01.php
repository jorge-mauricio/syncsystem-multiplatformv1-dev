<?php
//header('Content-Type: text/html; charset=utf-8');

//Error handling / displaying.
//----------------------
ini_set('display_errors', 1); //Show all errors.
//error_reporting(0); //Ocultar todos erros.
//error_reporting(E_ALL); //alpshost
//error_reporting(E_STRICT & ~E_STRICT); //Locaweb Linux 5.4 | HostGator Linux 5.5 | e 1 (windows)
//error_reporting(E_ALL | E_STRICT);
//error_reporting(error_reporting() & ~E_NOTICE);
//----------------------


//Funções para converter dados em arrays para UTF8.
//**************************************************************************************
function ArrayConveterUTF8($dadosArray)
{
    array_walk_recursive($dadosArray, function(&$item, $key)
    {
        if(!mb_detect_encoding($item, 'utf-8', true))
        {
            $item = utf8_encode($item);
        }
    }); 
    return $dadosArray;
}
//**************************************************************************************


// ref:
// https://stackoverflow.com/questions/563670/reading-an-excel-file-in-php
include '../php_modules/vendor/php-excel-reader/excel_reader.php'; // include the class



$excel = new PhpExcelReader; // creates object instance of the class
$excel->read('data-files-images-listing-gallery-mosaic-v1.xls'); // reads and stores the excel file data




// Test to see the excel data stored in $sheets property
echo 'excel->sheets = <pre>';
// var_export($excel->sheets);
//var_dump($excel->sheets);

//$utfEncodedArray = array_map('utf8_encode', $excel->sheets);
//var_dump($utfEncodedArray);

/*
array_walk(
    $excel->sheets,
    function (&$entry) {
        $entry = iconv('Windows-1250', 'UTF-8', $entry);
    }
);
*/
/*
array_walk_recursive(
    $excel->sheets,
    function (&$entry) {
      $entry = mb_convert_encoding(
          $entry,
          'UTF-8'
      );
    }
);
*/

/*
array_walk_recursive(
    $excel->sheets, function (&$value)
    {
     $value = htmlspecialchars(html_entity_decode($value, ENT_QUOTES, 'UTF-8'), ENT_QUOTES, 'UTF-8');
    }
);
*/

/*
function utf8_converter($array){
    array_walk_recursive($array, function(&$item, $key){
        if(!mb_detect_encoding($item, 'utf-8', true)){
            $item = utf8_encode($item);
        }
    }); 
    return $array;
}
*/

/*
array_walk_recursive($excel->sheets, function(&$item, $key){
    if(!mb_detect_encoding($item, 'utf-8', true)){
        $item = utf8_encode($item);
    }
}); 

var_dump($excel->sheets);
*/ //working



var_dump(ArrayConveterUTF8($excel->sheets));

echo '</pre><br />';

/*
echo '<pre>';
print_r($excel->sheets);

echo '</pre>';
*/

?>