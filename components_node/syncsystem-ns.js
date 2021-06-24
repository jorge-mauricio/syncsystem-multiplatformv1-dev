/*!
 * syncsystem-ns
 * Copyright(c) 2009-2019 Jorge Mauricio
 * SyncSystem Licensed
*/
"use strict";


//Export modules.
/**/
module.exports = {
    //gSystemConfig: require("../config-application.js"),
    //dbSystemCon: require("../config-application-db.js"),
    FunctionsGeneric: require("./functions-generic.js"),
    FunctionsDB: require("./functions-db.js"),
    FunctionsDBInsert: require("./functions-db-insert.js"),
    FunctionsDBDelete: require("./functions-db-delete.js"),
    FunctionsDBUpdate: require("./functions-db-update.js"),
    FunctionsFiles: require("./functions-files.js"),
    FunctionsImage: require("./functions-image.js"),
    FunctionsCrypto: require("./functions-crypto.js"),
    FunctionsCookies: require("./functions-cookies.js"),
    FunctionsAuthentication: require("./functions-authentication.js"),
    //FunctionsContent: require("./functions-content.js"),
    FunctionsEmail: require("./functions-email.js"),    

    ObjectCategoriesListing: require("./object-categories-listing.js"),
    ObjectCategoriesDetails: require("./object-categories-details.js"),
    ObjectFilesListing: require("./object-files-listing.js"),
    ObjectFilesDetails: require("./object-files-details.js"),
    ObjectContentListing: require("./object-content-listing.js"),
    ObjectContentDetails: require("./object-content-details.js"),
    ObjectProductsListing: require("./object-products-listing.js"),
    ObjectProductsDetails: require("./object-products-details.js"),
    ObjectPublicationsListing: require("./object-publications-listing.js"),
    ObjectPublicationsDetails: require("./object-publications-details.js"),
    ObjectRegistersListing: require("./object-registers-listing.js"),
    ObjectRegistersDetails: require("./object-registers-details.js"),
    ObjectQuizzesListing: require("./object-quizzes-listing.js"),
    ObjectQuizzesDetails: require("./object-quizzes-details.js"),
    ObjectQuizzesOptionsListing: require("./object-quizzes-options-listing.js"),
    ObjectQuizzesOptionsDetails: require("./object-quizzes-options-details.js"),
    ObjectFormsListing: require("./object-forms-listing.js"),
    ObjectFormsDetails: require("./object-forms-details.js"),
    ObjectFormsFieldsListing: require("./object-forms-fields-listing.js"),
    ObjectFormsFieldsDetails: require("./object-forms-fields-details.js"),
    ObjectFormsFieldsOptionsListing: require("./object-forms-fields-options-listing.js"),
    ObjectFormsFieldsOptionsDetails: require("./object-forms-fields-options-details.js"),
    ObjectFiltersGenericListing: require("./object-filters-generic-listing.js"),
    ObjectFiltersGenericDetails: require("./object-filters-generic-details.js"),
    ObjectUsersListing: require("./object-users-listing.js"),
    ObjectUsersDetails: require("./object-users-details.js")
};