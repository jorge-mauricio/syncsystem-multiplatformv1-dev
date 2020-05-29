"use strict";

//Import Node Modules.
//----------------------
//require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.
//const mysql = require("mysql");//MySQL package.

const gSystemConfig = require("../config-application.js"); //System configuration.
//const dbSystemCon = require("../config-application-db.js"); //DB.
//const SyncSystemNS = require("./syncsystem-ns.js"); //Node JS import method supported by jest.

const crypto = require('crypto');
//----------------------


module.exports = class FunctionsCrypto
{
    //Static properties.
    //----------------------
    static bufCryptKey32ByteFormated = Buffer.from({
        type: "Buffer",
        data: [
            14, 221, 138, 225,
           153, 222, 125, 150,
            66, 206, 146, 193,
            56,  84, 223, 232,
           171, 136,  50, 186,
             3, 166, 127, 156,
            83, 229, 253, 133,
           111,  13, 185, 167
        ]
    });

    static bufCryptiv16ByteFormated = Buffer.from({
        type: "Buffer",
        data: [
            145, 244,  19,
            250,   3, 106,
            132, 121, 138,
            254, 238, 238,
            107, 230, 150,
            131
        ]
    });
    //----------------------


	//Function to encrypt.
    //**************************************************************************************
    //ref: https://www.w3schools.com/nodejs/ref_crypto.asp
    //ref: https://nodejs.org/en/knowledge/cryptography/how-to-use-crypto-module/
    /**
     * Function to encrypt.
     * @static
     * @param {string} strValue 
     * @param {integer} encryptMethod 1 - hash | 2 - data
     * @returns {string}
     * @example 
     * SyncSystemNS.FunctionsCrypto.encryptValue("testing encryption", 2)
     */
    static encryptValue(strValue, encryptMethod = 2)
    {
        //encryptMethod: 1 - hash | 2 - data
        //Variables.
        //----------------------
        let strReturn = "";
        //----------------------


        //Hash.
        //----------------------
        if(encryptMethod == 1)
        {

        }
        //----------------------


        //Data.
        //----------------------
        if(encryptMethod == 2)
        {
            //strReturn = strValue;

            
            //Crypto Module algorithm: aes-128-cbc and simple key password
            //ref: https://www.w3schools.com/nodejs/ref_crypto.asp
            if(gSystemConfig.configCryptData == 23)
            {
                let cryptoKey = crypto.createCipher('aes-128-cbc', gSystemConfig.configCryptKey);
                let cryptoString = cryptoKey.update(strValue, 'utf8', 'hex');

                strReturn = cryptoString + cryptoKey.final('hex');


            }


            //Crypto Module algorithm: aes-256-cbc - 32 byte key and 16 byte iv
            //ref: https://codeforgeek.com/encrypt-and-decrypt-data-in-node-js/
            if(gSystemConfig.configCryptData == 26)
            {
                //Debug.
                //const key = crypto.randomBytes(32);
                //const iv = crypto.randomBytes(16);
                //console.log("key=", key);
                //console.log("iv=", iv);
                //console.log("key=", key.toString('utf8'));
                //console.log("iv=", iv.toString('utf8'));
                //console.log("key.toJSON=", key.toJSON());
                //console.log("iv.toJSON=", iv.toJSON());
                //console.log("typeof key=", typeof key);
                //console.log("typeof iv=", typeof iv);


                //Generate buffer objects.
                //let generate_key = crypto.randomBytes(32);
                //let generate_iv = crypto.randomBytes(16);
                //console.log("key.toJSON=", key.toJSON());
                //console.log("iv.toJSON=", iv.toJSON());
                //Lastly, create the objects based on the generated data.
                

                //Create variables.
                //let configCryptKey32ByteFormated = "<Buffer " + gSystemConfig.configCryptKey32Byte + ">";
                //let configCryptiv16ByteFormated = "<Buffer " + gSystemConfig.configCryptiv16Byte + ">";
                //let bufCryptKey32ByteFormated = Buffer.from(gSystemConfig.configCryptKey32Byte, 'utf8');
                //let bufCryptiv16ByteFormated = Buffer.from(gSystemConfig.configCryptiv16Byte, 'utf8');
                /*
                let bufCryptKey32ByteFormated = Buffer.from({
                    type: "Buffer",
                    data: [
                        14, 221, 138, 225,
                       153, 222, 125, 150,
                        66, 206, 146, 193,
                        56,  84, 223, 232,
                       171, 136,  50, 186,
                         3, 166, 127, 156,
                        83, 229, 253, 133,
                       111,  13, 185, 167
                    ]
                });

                let bufCryptiv16ByteFormated = Buffer.from({
                    type: "Buffer",
                    data: [
                        145, 244,  19,
                        250,   3, 106,
                        132, 121, 138,
                        254, 238, 238,
                        107, 230, 150,
                        131
                    ]
                });
                */

                //Debug.
                //console.log("configCryptKey32ByteFormated=", configCryptKey32ByteFormated);
                //console.log("configCryptiv16ByteFormated=", configCryptiv16ByteFormated);
                //console.log("bufCryptKey32ByteFormated=", bufCryptKey32ByteFormated);
                //console.log("bufCryptiv16ByteFormated=", bufCryptiv16ByteFormated);
                    

                //ref: https://codeforgeek.com/encrypt-and-decrypt-data-in-node-js/
                //let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(gSystemConfig.configCryptKey32Byte), gSystemConfig.configCryptiv16Byte);
                //let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(configCryptKey32ByteFormated), configCryptiv16ByteFormated);
                let cryptoCipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(this.bufCryptKey32ByteFormated), this.bufCryptiv16ByteFormated);
                //let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(crypto.randomBytes(32)), crypto.randomBytes(16));
                let cryptoString = cryptoCipher.update(strValue);
                cryptoString = Buffer.concat([cryptoString, cryptoCipher.final()]);
                //return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };

                //strReturn = { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
                strReturn = cryptoString.toString("hex");
            }


            //Debug.
            //console.log("crypto.randomBytes(16)=", crypto.randomBytes(16));
            //console.log("crypto.randomBytes(24)=", crypto.randomBytes(24));
            //console.log("crypto.randomBytes(32)=", crypto.randomBytes(32));
            //const key = crypto.randomBytes(32);
            //const iv = crypto.randomBytes(16);
            //console.log("key=", key);
            //console.log("iv=", iv);


            //console.log("strReturn=", strReturn);
        }
        //----------------------


        return strReturn;


        //Usage.
        //----------------------
        //SyncSystemNS.FunctionsCrypto.encryptValue("testing encryption", 2);
        //----------------------
    }
    //**************************************************************************************
    

	//Function to decrypt.
    //**************************************************************************************
    /**
     * @static
     * @param {string} strValue 
     * @param {integer} encryptMethod 1 - hash | 2 - data
     * @returns {string}
     * @example 
     * SyncSystemNS.FunctionsCrypto.decryptValue("7d9690aa7af8350618fba2d1060fdefd233480f4a2de8227e605a9522b44f0e4", 2) //gSystemConfig.configCryptData == 23
     * SyncSystemNS.FunctionsCrypto.decryptValue("1c7839affd95d5bc4c638d4c57fa903a326d6a5bb326f6eaa4b8c08269a400bd", 2) //gSystemConfig.configCryptData == 26
     */
    static decryptValue(strValue, encryptMethod = 2)
    {
        //encryptMethod: 1 - hash | 2 - data
        //Variables.
        //----------------------
        let strReturn = "";
        //----------------------
        

        try{ 

            //Data.
            //----------------------
            if(encryptMethod == 2)
            {
                //Crypto Module algorithm: aes-256-cbc - 32 byte key and 16 byte iv
                if(gSystemConfig.configCryptData == 23)
                {
                    let cryptoKey = crypto.createDecipher('aes-128-cbc', gSystemConfig.configCryptKey);
                    let cryptoString = cryptoKey.update(strValue, 'hex', 'utf8');

                    strReturn = cryptoString + cryptoKey.final('utf8');
                }


                //Crypto Module algorithm: aes-256-cbc - 32 byte key and 16 byte iv
                if(gSystemConfig.configCryptData == 26)
                {
                    //Variables.
                    /*
                    let bufCryptKey32ByteFormated = Buffer.from({
                        type: "Buffer",
                        data: [
                            14, 221, 138, 225,
                        153, 222, 125, 150,
                            66, 206, 146, 193,
                            56,  84, 223, 232,
                        171, 136,  50, 186,
                            3, 166, 127, 156,
                            83, 229, 253, 133,
                        111,  13, 185, 167
                        ]
                    });

                    let bufCryptiv16ByteFormated = Buffer.from({
                        type: "Buffer",
                        data: [
                            145, 244,  19,
                            250,   3, 106,
                            132, 121, 138,
                            254, 238, 238,
                            107, 230, 150,
                            131
                        ]
                    });
                    */

                    //Logic.
                    let cryptoiv = Buffer.from(this.bufCryptiv16ByteFormated.toString("hex"), 'hex');
                    let encryptedString = Buffer.from(strValue, 'hex');
                    let cryptDecipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.bufCryptKey32ByteFormated), cryptoiv);
                    let decryptedString = cryptDecipher.update(encryptedString);
                    decryptedString = Buffer.concat([decryptedString, cryptDecipher.final()]);
                    //return decrypted.toString();


                    strReturn = decryptedString.toString();
                }

            }
            //----------------------
        }catch(error){
            
            strReturn = strValue;
        }finally{

        }



        return strReturn;


        //Usage.
        //----------------------
        //SyncSystemNS.FunctionsCrypto.decryptValue("7d9690aa7af8350618fba2d1060fdefd233480f4a2de8227e605a9522b44f0e4", 2); //gSystemConfig.configCryptData == 23
        //SyncSystemNS.FunctionsCrypto.decryptValue("1c7839affd95d5bc4c638d4c57fa903a326d6a5bb326f6eaa4b8c08269a400bd", 2); //gSystemConfig.configCryptData == 26
        //----------------------
    }
    //**************************************************************************************
};