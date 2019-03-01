var Mysql = require('../lib/mySql.Query.js');
const errors = require( 'restify-errors');
var config = require('../config.js');
var EnvatoAPI = require('envato-api')( config.EnvatoMarketPersonalApi, 'USER_AGENT');

var modules = {
    check_valid_purchase_item_1 : function( purchase_code, website_url, client_email, callback ){
        EnvatoAPI.getSaleByCode({
            code : purchase_code
        }).then( 
            function( res ){
                if( config.ItemID_1 !== res.item.id ){
                    return callback(new errors.UnauthorizedError( 'Invalid item id' ));
                }
                
                Mysql.get_single_row( 'item_licence_verification', '*', purchase_code, function( MySqlResponse ){
                    if( MySqlResponse.error === true ){
                        return callback(new errors.BadRequestError( MySqlResponse.err ));
                    }
                    
                    var isValid = false;
                    var responseCode = 100;
                    var message = '';
                    
                    if( MySqlResponse.result == '' ){
                        //insert item data into database
                        var insertCols = [
                            website_url,
                            purchase_code,
                            client_email,
                            res.buyer,
                            res.license,
                            res.supported_until,
                            ''
                        ];
                        Mysql.Insert_Row( 'item_licence_verification', insertCols, function( MySqlInsertResponse ){
                            if( MySqlInsertResponse.error === true ){
                                return callback(new errors.BadRequestError( MySqlInsertResponse.err ));
                            }
                            if( MySqlInsertResponse.result > 0 ){
                                isValid = true;
                                responseCode = 105;
                                message = 'Your Item licence has been verified successfully. you will be get supported till - '+res.supported_until+'. Thank you very much for your purchase.';
                            }
                        });
                    }else{
                        if( MySqlResponse.result[0].client_website_url ==  website_url ){
                            isValid = true;
                            responseCode = 105;
                            message = 'Your Item licence has been verified successfully. you will be get supported till - '+res.supported_until+'. Thank you very much for your purchase.';
                        }else{
                            message = 'This licence code alredy been used!';
                        }
                        
                        return callback({
                            sold_at : res.sold_at,
                            supported_until : res.supported_until,
                            license : res.license,
                            buyer : res.buyer,
                            purchase_count : res.purchase_count,
                            amount : res.amount,
                            support_amount : res.support_amount,
                            responseCode : responseCode,   
                            message : message,
                            is_valid_call : isValid,
                        });
                    }
                    
                });
                
            },
            function( error ){
                return callback(new errors.NotFoundError( error + ' or invalid purchase code(envato response).' ));
            }
        );
    },
    check_valid_purchase_item_2 : function( purchase_code, website_url, client_email, callback ){
        //you can create another item license here
    }
};
module.exports = modules;