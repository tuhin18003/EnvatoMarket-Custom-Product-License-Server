## EnvatoMarket Custom Product License Server

Create your own custom license server with NodeJs where you can verify purchase,
store client's information for your purchased item's and create clients account in your
customer service portal with client's information. The script is just initialization of everything, you can easily extend it for your own requirements


## Install

Via NPM

``` bash
$ npm install
```

### Create a basic table where you want to store your client's info
``` sql
CREATE TABLE `item_licence_verification` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `client_website_url` varchar(1024),
  `client_purchase_code` varchar(50),
  `client_email` varchar(200),
  `client_username` varchar(50),
  `client_license_type` varchar(100),
  `client_supported_until` datetime,
  `client_licence_verify_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);

```

### Change your configuration from config.js file
``` 
    EnvatoMarketPersonalApi : '{your personal api key here}', // get your personal token from https://build.envato.com/my-apps/
    ItemID_1 : {your item id here}, //get your item id from your item url
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
```


## Usage

Call this API from your item, this will return you JSON data

``` php
http://localhost:3000/envato-licence-verify/{license_code}/{client_website_url}/{client_email_address}
```

### JSON Response
``` JSON
{"sold_at":"2019-02-24T13:28:34+11:00","supported_until":"2019-08-26T03:28:34+10:00","license":"Regular License","buyer":"codezolz","purchase_count":1,"amount":"10.00","support_amount":"0.00","responseCode":100,"message":"your personal message here!","is_valid_call":true}
```

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.


### Credits
- *Created by - [Tuhin](https://codesolz.com/)*

<a href="https://codesolz.net">
  <img src="https://codesolz.net/wp-content/uploads/2016/11/logo4-hover.png" alt="codesolz.net"/>
</a>