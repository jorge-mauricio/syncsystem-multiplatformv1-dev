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


// Variables.
$perData = new PhpExcelReader; // creates object instance of the class
$dataSheetTarget = array();
$dataSheetTargetListing = array();

// Value definition.
$perData->read('data-files-images-listing-gallery-mosaic-v1.xls'); // reads and stores the excel file data

$dataSheetTarget = $perData->sheets[0];
$dataSheetTargetListing = $dataSheetTarget['cells'];
$dataSheetTargetListingFormatted = array();


// Logic:

// Rename indexes to columns names.
/**/
for ($i = 0; $i <= count($dataSheetTargetListing); $i++) {
    if ($dataSheetTargetListing[$i] !== NULL) {
        $dataSheetTargetListingFormatted[$i] = array();
        for ($countColumns = 1; $countColumns <= count($dataSheetTargetListing[$i]); $countColumns++) {
            
            // $dataSheetTargetListingFormatted[$i] = array($dataSheetTargetListing[1][$countColumns] => $dataSheetTargetListing[$i]);
            // array_push($dataSheetTargetListingFormatted[$i], array($dataSheetTargetListing[1][$countColumns] => $dataSheetTargetListing[$i][$countColumns]));
            //array_push($dataSheetTargetListingFormatted[$i], $dataSheetTargetListing[1][$countColumns] => $dataSheetTargetListing[$i][$countColumns]);
            
            $dataSheetTargetListingFormatted[$i] = array_merge($dataSheetTargetListingFormatted[$i], array($dataSheetTargetListing[1][$countColumns] => $dataSheetTargetListing[$i][$countColumns]));
            
            
            // Debug.
            //echo '$dataSheetTargetListing[i]=<pre>';
            //var_dump($dataSheetTargetListing[$i]);
            //echo '</pre><br />';
        }
        
        // Debug.
        //echo '$dataSheetTargetListing[i]=<pre>';
        //var_dump($dataSheetTargetListing[$i]);
        //echo '</pre><br />';
    }
}


// Reset keys.
$dataSheetTargetListingFormatted = array_values($dataSheetTargetListingFormatted);
unset($dataSheetTargetListingFormatted[0]);
$dataSheetTargetListingFormatted = ArrayConveterUTF8($dataSheetTargetListingFormatted);

//if ($i !== 0) { // first record - columns names
//}
// Delete first array (columns names)
// $dataSheetTargetListingFormatted = array_shift($dataSheetTargetListingFormatted);


/*
foreach ($dataSheetTargetListing as $arrdataSheetTargetListingRow) {
    $countColumns = 0;
    array_push($dataSheetTargetListingFormatted, array_walk($arrdataSheetTargetListingRow, function($key, $value) {
        
        return $arrdataSheetTargetListingRow[$countColumns] => $value;
        
    }))
}
*/



// Debug.
echo 'dataSheetTargetListingFormatted=<pre>';
var_dump($dataSheetTargetListingFormatted);
echo '</pre><br />';

//echo 'dataSheetTargetListingFormatted=<pre>';
//var_dump(ArrayConveterUTF8($dataSheetTargetListingFormatted));
//echo '</pre><br />';

//echo 'dataSheetTargetListing=<pre>';
//var_dump(ArrayConveterUTF8($dataSheetTargetListing));
//echo '</pre><br />';

//echo 'dataSheetTarget=<pre>';
//var_dump(ArrayConveterUTF8($dataSheetTarget));
//echo '</pre><br />';


// Test to see the excel data stored in $sheets property
//echo 'excel->sheets = <pre>';
// var_export($perData->sheets);
//var_dump($perData->sheets);

//$utfEncodedArray = array_map('utf8_encode', $perData->sheets);
//var_dump($utfEncodedArray);

/*
array_walk(
    $perData->sheets,
    function (&$entry) {
        $entry = iconv('Windows-1250', 'UTF-8', $entry);
    }
);
*/
/*
array_walk_recursive(
    $perData->sheets,
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
    $perData->sheets, function (&$value)
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
array_walk_recursive($perData->sheets, function(&$item, $key){
    if(!mb_detect_encoding($item, 'utf-8', true)){
        $item = utf8_encode($item);
    }
}); 

var_dump($perData->sheets);
*/ //working



//var_dump(ArrayConveterUTF8($perData->sheets));

//echo '</pre><br />';

/*
echo '<pre>';
print_r($excel->sheets);

echo '</pre>';
*/

?>