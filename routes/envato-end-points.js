const errors = require( 'restify-errors');
var Query = require('../models/envato-api-call.js');

module.exports = server => {
    server.get( '/licence-verify/:purchase_code/:website_url/:client_email', ( req, res, next ) => {
        try{
            Query.check_valid_purchase_item_1( req.params.purchase_code, req.params.website_url, req.params.client_email, function( result ) {
                res.send( result ); 
                next();
            });
        } catch( err ){
            return next( new errors.InvalidContentError( err ) );
        }
    });
};