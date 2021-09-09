
import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom"
import { ExclamationIcon } from '@heroicons/react/solid'

import { ClientContext } from '../contexts/ClientContext'

const Logout = () => {

    const history = useHistory();
    const { logOut } = useContext(ClientContext);

    logOut();
    history.push("/");

    return (
        <div>Logging out</div>
    )
}

export default Logout;