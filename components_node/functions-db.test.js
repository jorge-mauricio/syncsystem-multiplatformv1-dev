'use strict';
//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("./syncsystem-ns.js"); //Node JS import method supported by jest.
//----------------------


//counterUniversalSelect unit test.
//**************************************************************************************
//With data.
test("SyncSystemNS.FunctionsDB.counterUniversalSelect(1): " + 
    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "testOutputNumber1"), ()=>{
    //Test with data full.
    //----------------------
    //Build the test.
    let testData = SyncSystemNS.FunctionsDB.counterUniversalSelect(1);

    //Expected result.
    expect(testData).not.toBeNaN();
    //----------------------
}); //2 arguments - description, call to function to test.
//}, 10000); //With set timeout changed.


//Without data.
test("SyncSystemNS.FunctionsDB.counterUniversalSelect(): " + 
    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "testOutputNumber1"), ()=>{
    //Test with data empty.
    //----------------------
    //Build the test.
    let testDataEmpty = SyncSystemNS.FunctionsDB.counterUniversalSelect("");

    //Expected result.
    expect(testDataEmpty).not.toBeNaN();
    //----------------------


    //Test with data null.
    //----------------------
    //Buil the test.
    let testDataNull = SyncSystemNS.FunctionsDB.counterUniversalSelect(null);

    //Expected result.
    expect(testDataNull).not.toBeNaN();
    //----------------------


    //Test with data undefinied.
    //----------------------
    //Buil the test.
    let testDataUndefined = SyncSystemNS.FunctionsDB.counterUniversalSelect();

    //Expected result.
    expect(testDataUndefined).not.toBeNaN();
    //----------------------
});
//**************************************************************************************


//counterUniversalSelect integration test.
//**************************************************************************************
//With data.
test("SyncSystemNS.FunctionsDB.counterUniversalUpdate(1): " + 
    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "testOutputNumber1"), ()=>{
    //Test with data full.
    //----------------------
    //Build the test.
    let testData = SyncSystemNS.FunctionsDB.counterUniversalUpdate(1);

    //Expected result.
    expect(testData).not.toBeNaN();
    //----------------------
}); //2 arguments - description, call to function to test.
//}, 10000); //With set timeout changed.

//Without data.
test("SyncSystemNS.FunctionsDB.counterUniversalUpdate(): " + 
    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "testOutputNumber1"), ()=>{
    //Test with data empty.
    //----------------------
    //Build the test.
    let testDataEmpty = SyncSystemNS.FunctionsDB.counterUniversalUpdate("");

    //Expected result.
    expect(testDataEmpty).not.toBeNaN();
    //----------------------


    //Test with data null.
    //----------------------
    //Buil the test.
    let testDataNull = SyncSystemNS.FunctionsDB.counterUniversalUpdate(null);

    //Expected result.
    expect(testDataNull).not.toBeNaN();
    //----------------------


    //Test with data undefinied.
    //----------------------
    //Buil the test.
    let testDataUndefined = SyncSystemNS.FunctionsDB.counterUniversalUpdate();

    //Expected result.
    expect(testDataUndefined).not.toBeNaN();
    //----------------------
});
//**************************************************************************************