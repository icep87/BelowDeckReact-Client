import { useState, useContext, useEffect } from 'react'
import FileUpload from '../components/FileUpload'
import MenuSelect from '../components/MenuSelect'
import { ClientContext } from '../../contexts/ClientContext'
import BelowDeckApi from '../../services/BelowDeckApi';
import Notification from '../../components/Notification'


const Settings = () => {
    const { token } = useContext(ClientContext);
    const [settingData, setSettingData] = useState({});
    const [showNotification, setShowNotification] = useState(false)

    useEffect(() => {
        BelowDeckApi.getSettings(token).then(data => {
            console.log("Running useEffect in Settings");
            console.log(data)
            setSettingData(data)
        });
    }, [])

    const updateUploadedFiles = (files) => {
    };

    const handleSubmit = (event) => {
        console.log("Submit");
        event.preventDefault();
        BelowDeckApi.updateSettings(settingData, token).then(data => {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 5000)

        });

    };

    const handleChange = (evt) => {
        console.log(evt)
        setSettingData({
            ...settingData, [evt.target.name]: evt.target.value
        })
    };
    return (
        <div className="hidden mt-8 sm:block">
            <Notification show={showNotification} />
            <div className="align-middle px-6 inline-block min-w-full">
                <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
                    <div className="space-y-8 divide-y divide-gray-200">
                        <div>
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Settings</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    This information is used to render the site
                                </p>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" value={settingData.title} onChange={handleChange}
                                    />

                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                                        URL
                                    </label>

                                    <input
                                        type="text"
                                        name="url"
                                        id="url"
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" value={settingData.url} onChange={handleChange}
                                    />

                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={3}
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                            defaultValue={''} value={settingData.description} onChange={handleChange}
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">Write a few sentences about the site.</p>
                                </div>

                                {/* <div className="sm:col-span-6">
                                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                                        Photo
                                    </label>
                                    <div className="mt-1 flex items-center">
                                        <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </span>
                                        <button
                                            type="button"
                                            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Change
                                        </button>
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
                                        Cover photo
                                    </label>
                                    <FileUpload accept=".jpg,.png,.jpeg"
                                        label="Profile Image(s)" buttonOnly
                                        updateFilesCb={updateUploadedFiles} />
                                </div>*/}
                            </div> 
                        </div>

                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Menus</h3>
                                <p className="mt-1 text-sm text-gray-500">Select menus to be used for main navigation and footer navigation</p>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <MenuSelect name="main_navigation" label="Main menu" menuId={settingData.main_navigation} onChangeHandler={handleChange} />
                                </div>
                                <div className="sm:col-span-3">
                                    <MenuSelect name="footer_navigation" label="Footer menu" menuId={settingData.footer_navigation} onChangeHandler={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Footer</h3>
                                <p className="mt-1 text-sm text-gray-500">Footer specifc settings</p>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label htmlFor="footer_text" className="block text-sm font-medium text-gray-700">
                                        Footer text
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="footer_text"
                                            name="footer_text"
                                            rows={3}
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                            defaultValue={''} value={settingData.footer_text} onChange={handleChange}
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">Write something for the footer.</p>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
                                        Facebook
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="facebook"
                                            id="facebook"
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" value={settingData.facebook} onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                                        Twitter
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="twitter"
                                            id="twitter"
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" value={settingData.twitter} onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-5">
                        <div className="flex justify-end fixed-bottom">
                            <button
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Settings;