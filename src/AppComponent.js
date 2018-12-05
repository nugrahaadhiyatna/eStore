// import AppSetting from "../AppSetting";
class AppComponent {
    static API_CONFIG = { 
        KEY: 'X-DreamFactory-API-Key',
        VALUE: 'e553e47a799d4805fde8b31374f1706b130b2902b5376fbba6f4817ad3c6b272'
    }

    //static BASE_URL_TEST = "https://testapi.estorelogistics.com.au/api/v2/";
    // static BASE_URL_PROD = "https://api.estorelogistics.com.au/api/v2/";
    //static BASE_URL_DEV = "http://demo.onebyone.co.id/api/caller/do";

    static ENDPOINT_URL = window.AppSetting.endpointUrl;
    static BASE_URL_PROD = window.AppSetting.gatewayUrl;
    static BASE_URL_DEV = window.AppSetting.gatewayUrl;//"http://apacheweb.onebyone.co.id:8080/request/httprequest.php"
    static DEVELOPMENT = "DEVELOPMENT";
    static PRODUCTION = "PRODUCTION";

    static ENV_MODE = window.AppSetting.env;

    static getBaseUrl(){
        console.log(this.ENV_MODE);
        switch (this.ENV_MODE) {
            case this.DEVELOPMENT:
                //return this.BASE_URL_DEV + "?endpoint=" + this.BASE_URL_TEST;
                return this.BASE_URL_DEV + "?endpoint=" + this.ENDPOINT_URL;
            case this.PRODUCTION:
                //return this.BASE_URL_PROD;
                return this.BASE_URL_PROD + "?endpoint=" + this.ENDPOINT_URL;
            default:
                break;
        }
    }
}
export default AppComponent;