import React from 'react';
import { ClientProvider } from '../contexts/ClientContext';

function Layout({children}) {
    return (
        <ClientProvider>
            <LayoutNoProvider>{children}</LayoutNoProvider>
        </ClientProvider>
    );
}

function LayoutNoProvider({children}) {

    return (
        <div className="font-sans antialiased text-gray-600">
            {children}
        </div>
    );
}

export default Layout;