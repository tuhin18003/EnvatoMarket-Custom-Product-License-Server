module.exports = {
    EnvatoMarketPersonalApi : '54ersdrsacsWvzrHei7nfEsMlvPE848t', // get your personal token from https://build.envato.com/my-apps/
    ItemID_1 : 18654148, //get your item id from your item url
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    MYSQL_CRED : {
        host     : process.env.MYSQL_HOST || 'localhost',
        database : process.env.MYSQL_DATABASE || 'item-licence',
        user     : process.env.MYSQL_USER || 'root',
        password : process.env.MYSQL_PASSWORD || '',
        port     : process.env.MYSQL_PORT || '',
        waitForConnections: true,
        connectionLimit: 100, // you can change mysql connection limit
        queueLimit: 0
    }
};