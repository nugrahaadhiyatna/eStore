import axios from 'axios';
import moment from "moment";
import AppComponent from 'AppComponent';

class Authentication {
    constructor() {
        //NOT USED, WILL BE USE WITH SKLETON LATER
        // this.userDetails = null;
        // this.isAuthenticated = false;
        // this.token = null;
    }
    static endpoint = "user/session";
  
    authenticationHandler = (data) => {
        let result = {};
        let params = {};
        return axios.post(AppComponent.getBaseUrl() + Authentication.endpoint, data, 
            {
                params: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(res => {
            result.isSuccess = true;
            Authentication.setAuthenticate(res.data);
            return this.renewToken();
        })
        .catch(function (error) {
            result.isSuccess = false;
            if (error.response) {
                if(error.response.status === 401) {
                    result.message = error.response.data.error.message;
                } else {
                    result.message = 'Failed to proceess your request';
                }
            } else {
                result.message = 'Failed to proceess your request';
            }
            return result;
        });
    }
    
    static isAuthenticated = () => {
        // need to check is token expire
        if(!Authentication.getToken()) return false;
        if(moment().diff(moment(Authentication.getExpiredDate())) >= 0) {
            Authentication.signOut();
            return false;
        }
        return true;
    }
    
    static setAuthenticate = (userDetails) => {
        if(userDetails == null){
            localStorage.removeItem("user");
            return;
        }
        userDetails['expiredDate'] = moment().add(4, 'hours');
        localStorage.setItem("user", JSON.stringify(userDetails));
    }

    static getUser = () => {
        return JSON.parse(localStorage.getItem("user"));
    }

    static getToken = () => {
        let user = Authentication.getUser();
        if(!user) return false;
        return user['session_token'];
    }

    static getExpiredDate = () => {
        let user = Authentication.getUser();
        if(!user) return false;
        return user['expiredDate'];
    }

    static getCompanyCode = () => {
        let user = Authentication.getUser();
        if(!user) return false;
        return user['company'];
    }

    renewToken = () => {
        let oldToken = Authentication.getToken();
        let result = {};
        let params = { };
        return axios.get(AppComponent.getBaseUrl() + Authentication.endpoint,
            {
                params: params,
                headers: {
                    'X-DreamFactory-Session-Token' : oldToken,
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(res => {
            result.isSuccess = true;
            Authentication.setAuthenticate(res.data);
            return result;
        })
        .catch(function (error) {
            result.isSuccess = false;
            if (error.response) {
                if(error.response.status === 401) {
                    result.message = error.response.data.error.message;
                } else {
                    result.message = 'Failed to proceess your request';
                }
            } else {
                result.message = 'Failed to proceess your request';
            }
            return result;
        });
    }
  
    static signOut = () => {
        Authentication.setAuthenticate(null);
    }
  }
  
  export default Authentication;