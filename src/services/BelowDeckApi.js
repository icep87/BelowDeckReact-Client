const Configuration = require('../Configuration');

class BelowDeckApi {

    static token = null;


    static getSiteData() {

        const pathUrl = "site/";

        //build URL
        const queryUrl = Configuration.baseUri + pathUrl;

        const headers = {
            Accept: 'application/json'
        }

        const options = {
            method: 'GET',
            headers: headers
        }

        return fetch(queryUrl, options)
            .then((response) => response.json())
    }

    static getPosts(postId) {

        const pathUrl = "post/";
        let queryUrl = Configuration.baseUri + pathUrl;

        if (postId) {
            //build URL 
            queryUrl = Configuration.baseUri + pathUrl + postId;
        }
        console.log(postId);
        console.log(queryUrl);

        const headers = {
            Accept: 'application/json'
        }

        const options = {
            method: 'GET',
            headers: headers
        }

        return fetch(queryUrl, options)
            .then((response) => response.json())
            .catch((error) => console.log(error))

    }

    static getPostByPath(path) {

        const pathUrl = "post/path/";

        //build URL 
        let queryUrl = Configuration.baseUri + pathUrl + path;

        const headers = {
            Accept: 'application/json'

        }

        const options = {
            method: 'GET',
            headers: headers
        }

        return fetch(queryUrl, options)
            .then((response) => response.json())
            .catch((error) => console.log(error))

    }

    static getPostsByType(type) {

        const pathUrl = "post/type/";

        //build URL 
        let queryUrl = Configuration.baseUri + pathUrl + type;

        const headers = {
            Accept: 'application/json'

        }

        const options = {
            method: 'GET',
            headers: headers
        }

        return fetch(queryUrl, options)
            .then((response) => response.json())
            .catch((error) => console.log(error))

    }

    static updatePost(data, token = null) {

        const pathUrl = "post/";
        let queryUrl = Configuration.baseUri + pathUrl + data.id;

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }

        if (token) headers.Authorization = "Bearer " + token;

        const options = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        }

        return fetch(queryUrl, options)
            .then((response) => response.status)
            .catch((error) => console.log(error))
    }

    static addPost(data, token = null) {

        const pathUrl = "post/";
        let queryUrl = Configuration.baseUri + pathUrl;

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }

        if (token) headers.Authorization = "Bearer " + token;
        
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }

        return fetch(queryUrl, options)
            .then((response) => response.status)
            .catch((error) => console.log(error))
    }

    static deletePost(data, token = null) {

        const pathUrl = "post/";
        let queryUrl = Configuration.baseUri + pathUrl + data;

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }

        if (token) headers.Authorization = "Bearer " + token;
        
        const options = {
            method: 'DELETE',
            headers: headers,
        }

        return fetch(queryUrl, options)
            .then((response) => response.status)
            .catch((error) => console.log(error))
    }

    static getCategory() {

        const pathUrl = "category/";

        //build URL
        const queryUrl = Configuration.baseUri + pathUrl;

        const headers = {
            Accept: 'application/json'
        }

        const options = {
            method: 'GET',
            headers: headers
        }

        return fetch(queryUrl, options)
            .then((response) => response.json())
    }

    static updateCategory(data, token = null) {

        const pathUrl = "category/";
        let queryUrl = Configuration.baseUri + pathUrl + data.id;

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }

        if (token) headers.Authorization = "Bearer " + token;

        console.log(headers)

        const options = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        }

        return fetch(queryUrl, options)
            .then((response) => response.status)
            .catch((error) => console.log(error))
    }

    static addCategory(data, token = null) {

        const pathUrl = "category/";
        let queryUrl = Configuration.baseUri + pathUrl;

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }

        if (token) headers.Authorization = "Bearer " + token;

        console.log(headers)

        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }

        return fetch(queryUrl, options)
            .then((response) => response.json())
            .catch((error) => console.log(error))
    }

    static getPostType() {

        const pathUrl = "posttype/";

        //build URL
        const queryUrl = Configuration.baseUri + pathUrl;

        const headers = {
            Accept: 'application/json'
        }

        const options = {
            method: 'GET',
            headers: headers
        }

        return fetch(queryUrl, options)
            .then((response) => response.json())
            .catch((error) => console.log(error))
    }

    static login(data) {

        const pathUrl = "Authentication/login";
        let queryUrl = Configuration.baseUri + pathUrl;

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }

        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }

        return fetch(queryUrl, options)
            .then((response) => {
                if (!response.ok) {
                    // create error object and reject if not a 2xx response code
                    let err = new Error("HTTP status code: " + response.status)
                    err.response = response
                    err.status = response.status
                    throw err
                }
                return response.json();
            })

    }

    static getSettings(token=null) {

        const pathUrl = "setting/";

        //build URL
        const queryUrl = Configuration.baseUri + pathUrl;

        const headers = {
            Accept: 'application/json'
        }

        if (token) headers.Authorization = "Bearer " + token;

        const options = {
            method: 'GET',
            headers: headers
        }

        return fetch(queryUrl, options)
            .then((response) => response.json())
            .catch((error) => console.log(error))
    }

    static updateSettings(data, token=null) {

        const pathUrl = "setting/";

        //build URL
        const queryUrl = Configuration.baseUri + pathUrl;

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }

        if (token) headers.Authorization = "Bearer " + token;

        const options = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)

        }

        return fetch(queryUrl, options)
            .then((response) => response.status)
            .catch((error) => console.log(error))
    }

    static getMenu() {

        const pathUrl = "menu/";

        //build URL
        const queryUrl = Configuration.baseUri + pathUrl;

        const headers = {
            Accept: 'application/json'
        }

        const options = {
            method: 'GET',
            headers: headers
        }

        return fetch(queryUrl, options)
            .then((response) => response.json())
    }

    static appendUrlWithQueryParams(url, queryParams) {

        if (url === null) {
            return null;
        }

        if (queryParams === url) {
            return url;
        }

        const hasParams = url.indexOf('?') > -1;
        const seperator = (hasParams) ? '&' : '?';
        const queryString = url + seperator + new URLSearchParams(queryParams).toString();

        return queryString;
    }
}

export default BelowDeckApi;