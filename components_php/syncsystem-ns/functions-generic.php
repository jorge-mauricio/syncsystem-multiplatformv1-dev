<?php
namespace SyncSystemNS;

class FunctionsGeneric
{
    //Return the label in the right terminal.
    //**************************************************************************************
    /**
     * Return the label in the right terminal.
     * @static
     * @param {object} objAppLabels 
     * @param {string} labelName 
     * @returns {string}
     * @example
     * SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "labelName")
     */
    static function appLabelsGet($objAppLabels, $labelName) {
        //Variables.
        //----------------------
        $strReturn = "";
        //----------------------



        //Debug.
        $strReturn = "testing";


        return $strReturn;
    }
    //**************************************************************************************
    
    // Data treatment to read values.
    // **************************************************************************************
    /**
     * Data treatment to read values.
     * @static
     * @param {string} valueData
     * @param {string} configCurrency '$' | 'R$'
     * @param {int} valueType 1 - general number | 2 - system currency | 3 - decimal | 4 - system currency (with decimals)
     * @param {*} specialInstructions
     * @returns {int | double}
     * @example
     * SyncSystemNS.FunctionsGeneric.valueMaskRead(1000, '$', 2)
     */
    // static valueMaskRead(valueData, configCurrency, valueType, specialInstructions)
    static function valueMaskRead($valueData, $configCurrency = '$', $valueType = 2, $specialInstructions = null) {
      // Variables.
      // ----------------------
      $strReturn = '';
      $strValue = $valueData;
      // ----------------------
      
      // Logic.
      // ----------------------
      if ($strValue !== null && $strValue !== '') {
          // Initial data treatment.
          if(strlen($strValue) < 3) {
              $strValue = "00" . $strValue;
              
              $strDecimal = substr($strValue, (strlen($strValue) - 2), strlen($strValue));
              $strValue = substr($strValue, 0, strlen($strValue) - 2) . "." . $strDecimal;
          }
          
          // $ (dollar formatting)
          if ($configCurrency === '$') {
              $strReturn = number_format($strValue, 2, '.', ',');
          }
      }
      // ---------------------- 
      
      
      // Tests.
      /*
      echo 'valueMaskRead(100000)=' . valueMaskRead(100000) . '<br />';
      echo 'valueMaskRead(100000000)=' . valueMaskRead(100000000) . '<br />';
      echo 'valueMaskRead(100000000000)=' . valueMaskRead(100000000000) . '<br />';
      echo 'valueMaskRead(100000000000000)=' . valueMaskRead(100000000000000) . '<br />';
      */
      
      return $strReturn;
    }
    //**************************************************************************************
  
    
}
?>