import React, { useState, useContext, useEffect } from 'react';
import { ClientContext } from '../contexts/ClientContext';

const Footer = () => {

    const { siteData } = useContext(ClientContext);
    const [nav, setNav] = useState([]);
    const [social, setSocial] = useState([]);

    useEffect(() => {
        if (siteData) {
            setNav(JSON.parse(siteData.footer_navigation))
            setSocial((({ twitter, facebook }) => ({ twitter, facebook }))(siteData));
            console.log(social);
        }
    }, [])

    function socialIconsRender(socialService) {
        switch (socialService) {
            case 'facebook':
                return 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                break;
            case 'twitter':
                return 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84'
                break;
        }
    }

    return (
        <footer className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                    {nav.map((item) => (
                        <div key={item.label} className="px-5 py-2">
                            <a href={item.uri} className="text-base text-gray-500 hover:text-gray-900">
                                {item.label}
                            </a>
                        </div>
                    ))}
                </nav>
                <div className="mt-8 flex justify-center space-x-6">
                    {Object.keys(social).map((key) => (
                        <a key={key} href={social[key]} className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">{key}</span>
                            <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" >
                                <path d={socialIconsRender(key)} />
                            </svg>

                        </a>
                    ))}

                </div>
                <p className="mt-8 text-center text-base text-gray-400">{siteData.footer_text}</p>
            </div>
        </footer>
    )
}
export default Footer;