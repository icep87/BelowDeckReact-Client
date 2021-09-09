import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom"
import { ExclamationIcon } from '@heroicons/react/solid'
import BelowDeckApi from '../services/BelowDeckApi'
import { ClientContext } from '../contexts/ClientContext'


const Login = () => {

    const { handleSuccessfulLogin, userData } = useContext(ClientContext);
    const history = useHistory();
    
    const [loginData, setLoginData] = useState({
        userName: "",
        password: ""
    })

    const [errorObject, setErrorObject] = useState({
        error: false, 
        message: ""
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        BelowDeckApi.login(loginData)
        .catch((error) => {
            console.log("Error during login:" + error)
            error.response.json().then(data => {
                setErrorObject({
                    error: true, 
                    message: data
                })
            })
            }
        ).then(data => {
            console.log(data);
            handleSuccessfulLogin(data);
            history.push("/admin");
        });
    }

    userData && history.push("/admin");
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">Sign in to your account</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                { errorObject.error &&
                    <div className="rounded-md bg-red-50 p-4 mb-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <ExclamationIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Attention needed</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>
                                        {errorObject.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    id="userName"
                                    name="userName"
                                    type="text"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={loginData.userName}
                                    onChange={(evt) => setLoginData({ ...loginData, [evt.target.name]: evt.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={loginData.password}
                                    onChange={(evt) => setLoginData({ ...loginData, [evt.target.name]: evt.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;