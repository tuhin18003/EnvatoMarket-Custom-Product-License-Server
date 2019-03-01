var db = require('./db.js');
var Update = false;
var Insert = false;
var self = module.exports = {
    getRows: function( tblName, selectedFields, callback ){
        db.execute( "SELECT "+selectedFields+" FROM "+tblName, function (err, result, fields) {
            if (err) { return callback({ error : true, err }); }
            var items = {
                data : result
            };
            return callback( items );
        });
    },
    get_single_row: function( tblName, selectedFields, client_purchase_code, callback ){
        db.execute( "SELECT "+selectedFields+" FROM "+tblName +" where client_purchase_code = ? ", [ client_purchase_code ], function ( err, result, fields ) {
            if (err) { return callback({ error : true, err }); }
            var items = {
                result : result
            };
            return callback( items );
        });
    },
    Insert_Row: function( tblName, insert_data, callback ){
        db.execute( "INSERT INTO "+tblName+" set client_website_url = ?, \n\
            client_purchase_code = ?, client_email = ?, client_username = ?, client_license_type =?, client_supported_until = ?, client_licence_verify_date = ?  ", insert_data, function ( err, result, fields ) {
            if (err) { return callback({ error : true, err }); }
            var items = {
                result : result.insertId
            };
            return callback( items );
        });
    }
};
