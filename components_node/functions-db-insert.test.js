'use strict';
//Import Node Modules.
//----------------------
//const { getFileExtension } = require("./functions-generic.js"); //Node JS import method supported by jest.
//const FunctionsGeneric = require("./functions-generic.js"); //Node JS import method supported by jest.
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("./syncsystem-ns.js"); //Node JS import method supported by jest.
//----------------------


//categoriesInsert_async unit test.
//**************************************************************************************
//With data.
test("SyncSystemNS.FunctionsDBInsert.categoriesInsert_async " + 
    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "testOutputBoolean1"), ()=>{
    //Test with data full.
    //----------------------
    //Build the test.
    //let testData = SyncSystemNS.FunctionsDB.counterUniversalSelect(1);

    (async function(){ //async marks the block
        try{ 
            /*
            Note:
            Complete the test giving a fixed id, then deleting the record with the id at the end.
            */
            let testData = await SyncSystemNS.FunctionsDBInsert.categoriesInsert_async({
                _tblCategoriesIdParent: "0",
                _tblCategoriesSortOrder: "6",
                _tblCategoriesCategoryType: "2",
                _tblCategoriesDateCreation: "",
                _tblCategoriesDateTimezone: "",
                _tblCategoriesDateEdit: "",
                _tblCategoriesIdRegisterUser: "0",
                _tblCategoriesIdRegister1: "0",
                _tblCategoriesIdRegister2: "0",
                _tblCategoriesIdRegister3: "0",
                _tblCategoriesIdRegister4: "0",
                _tblCategoriesIdRegister5: "0",
                _tblCategoriesTitle: "Category insert test",
                _tblCategoriesDescription: "",
                _tblCategoriesURLAlias: "",
                _tblCategoriesKeywordsTags: "",
                _tblCategoriesMetaDescription: "",
                _tblCategoriesMetaTitle: "",
                _tblCategoriesMetaInfo: "",
                _tblCategoriesInfo1: "",
                _tblCategoriesInfo2: "",
                _tblCategoriesInfo3: "",
                _tblCategoriesInfo4: "",
                _tblCategoriesInfo5: "",
                _tblCategoriesInfo6: "",
                _tblCategoriesInfo7: "",
                _tblCategoriesInfo8: "",
                _tblCategoriesInfo9: "",
                _tblCategoriesInfo10: "",
                _tblCategoriesInfoSmall1: "",
                _tblCategoriesInfoSmall2: "",
                _tblCategoriesInfoSmall3: "",
                _tblCategoriesInfoSmall4: "",
                _tblCategoriesInfoSmall5: "",
                _tblCategoriesNumber1: "",
                _tblCategoriesNumber2: "",
                _tblCategoriesNumber3: "",
                _tblCategoriesNumber4: "",
                _tblCategoriesNumber5: "",
                _tblCategoriesNumberSmall1: "",
                _tblCategoriesNumberSmall2: "",
                _tblCategoriesNumberSmall3: "",
                _tblCategoriesNumberSmall4: "",
                _tblCategoriesNumberSmall5: "",
                _tblCategoriesDate1: "",
                _tblCategoriesDate2: "",
                _tblCategoriesDate3: "",
                _tblCategoriesDate4: "",
                _tblCategoriesDate5: "",
                _tblCategoriesIdItem1: "",
                _tblCategoriesIdItem2: "",
                _tblCategoriesIdItem3: "",
                _tblCategoriesIdItem4: "",
                _tblCategoriesIdItem5: "",
                _tblCategoriesImageMain: "",
                _tblCategoriesFile1: "",
                _tblCategoriesFile2: "",
                _tblCategoriesFile3: "",
                _tblCategoriesFile4: "",
                _tblCategoriesFile5: "",
                _tblCategoriesActivation: "1",
                _tblCategoriesActivation1: "0",
                _tblCategoriesActivation2: "0",
                _tblCategoriesActivation3: "0",
                _tblCategoriesActivation4: "0",
                _tblCategoriesActivation5: "0",
                _tblCategoriesIdStatus: "0",
                _tblCategoriesRestrictedAccess: "0",
                _tblCategoriesNotes: ""
            });
            
            //Expected result.
            expect(testData).toBeTruthy();
        }catch(aError){
            //console.error(aError);
        }finally{
    
        }
    })()
    //----------------------
}); //2 arguments - description, call to function to test.
//}, 10000); //With set timeout changed.
//**************************************************************************************