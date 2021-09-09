import React, { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import BelowDeckApi from '../services/BelowDeckApi'
import Session from 'react-session-api'

export const ClientContext = createContext();

function ClientProvider({ children }) {

    Session.config(true, 60);

    const [siteData, setSiteData] = useState(JSON.parse(Session.get("siteData")) || '');
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")) || "");
    const [userRole, setUserRole] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['BelowDeckClient']);
    const [token, setToken] = useState(cookies.token);

    const handleSuccessfulLogin = (loginData) => {
        console.log("handleSuccessfulLogin");
        setCookie('token', loginData.token);
        localStorage.setItem("userData", JSON.stringify(loginData.user));
        setUserData(loginData.user);
    }

    const logOut = () => {
        localStorage.removeItem("userData");

        removeCookie(cookies)
        console.log(cookies)
        
        setUserData({});
        setToken({});
    }

    useEffect(() => {
        console.log(Session.get("siteData"))
        if (!siteData) {
            console.log("SiteData is not set in session, loading from API")
            BelowDeckApi.getSiteData().then(data => {
                console.log(data)
                setSiteData(data)
                Session.set("siteData", JSON.stringify(data))
            });
        }


    }, [siteData])

    //TODO: Fix if the cookie is missing data
    useEffect(() => {
        console.log("Token from state: " + token);
                //Check if token is set in the cookies
        cookies.token ? setToken(cookies.token) : localStorage.removeItem("userData");
    }, [token])

    return (
        <ClientContext.Provider value={{ siteData, userData, userRole, token, handleSuccessfulLogin, logOut }}>
            {children}
        </ClientContext.Provider>
    );
}

export { ClientProvider };