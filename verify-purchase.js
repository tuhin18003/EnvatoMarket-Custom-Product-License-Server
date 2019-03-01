const restify = require( 'restify');
const config = require( './config');

const server = restify.createServer();
server.use( restify.plugins.bodyParser() );
server.listen( config.PORT, () => {
    console.log(" Server started on port " + config.PORT );
    require( './routes/envato-end-points' )(server);
});



