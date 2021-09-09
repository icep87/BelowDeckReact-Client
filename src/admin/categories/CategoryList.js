import React, { useState, useEffect, Fragment } from 'react'
import CategoryInlineEditor from './CategoryInlineEditor'
import BelowDeckApi from '../../services/BelowDeckApi'

const CategoryList = () => {

    const [categories, setCategories] = useState([]);
    const [addNew, setAddNew] = useState(false);

    const toggleNew = () => {
        setAddNew(addNew => !addNew);
    }

    const addCategoryToList = (data) => {
        setCategories(categories => [...categories, data])
        toggleNew();
    }

    useEffect(() => {
        BelowDeckApi.getCategory().then(data => {
            console.log(data)
            setCategories(data)
        });
    }, [])

    return (
        <div className="hidden mt-8 sm:block">
            <div className="align-middle inline-block min-w-full border-b border-gray-200">
            <div className="pl-4 mb-4">
                    <h3 className="text-3xl leading-6 font-medium text-gray-900">Categories</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Here you will find all the categories
                    </p>
                </div>
                <table className="min-w-full">
                    <thead>
                        <tr className="border-t border-gray-200">
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span>Name</span>
                            </th>

                            <th className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-2.5 py-1.5 mr-3 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={toggleNew}
                                >
                                    New
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {addNew && <CategoryInlineEditor new toggleNew={toggleNew} addCategoryToList={addCategoryToList} />}
                        {categories.map((category, categoryIdx) => (
                            <CategoryInlineEditor category={category} />
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default CategoryList;