const { getFileExtension } = require("./functions-generic.js"); //Node JS import method supported by jest.
//const FunctionsGeneric = require("./functions-generic.js"); //Node JS import method supported by jest.


//getFileExtension unit test.
//**************************************************************************************
//With data.
test("getFileExtension - Should output file extension (.xyz).", ()=>{
    //Test with data full.
    //----------------------
    //Buil the test.
    let testData = getFileExtension(".xyz");

    //Expected result.
    expect(testData).toBe(".xyz");
    //----------------------
}); //2 arguments - description, call to function to test.


//Without data.
test("getFileExtension - Should output blank.", ()=>{
    //Test with data empty.
    //----------------------
    //Buil the test.
    let testDataEmpty = getFileExtension("");

    //Expected result.
    expect(testDataEmpty).toBe("");
    //----------------------


    //Test with data null.
    //----------------------
    //Buil the test.
    let testDataNull = getFileExtension(null);

    //Expected result.
    expect(testDataNull).toBe("");
    //----------------------


    //Test with data undefinied.
    //----------------------
    //Buil the test.
    let testDataUndefined = getFileExtension();

    //Expected result.
    expect(testDataUndefined).toBe("");
    //----------------------
});
//**************************************************************************************