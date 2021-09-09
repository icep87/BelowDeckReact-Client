import { useState, useContext, useEffect } from 'react'
import BelowDeckApi from '../../services/BelowDeckApi'
import { ClientContext } from '../../contexts/ClientContext'

const CategoryInlineEditor = (props) => {
    const { token } = useContext(ClientContext);
    const [category, setCategory] = useState(props.category || {});
    const [edit, setEdit] = useState(props.edit || false);
    const [newCategory, setNewCategory] = useState(props.new || false)

    const toggleEdit = () => {
        console.log("running toggleEdit");
        newCategory && props.toggleNew()
        setEdit(edit => !edit);
    }

    const saveCategory = () => {
        console.log("Pressed save");
        console.log("Token: " + token);
        newCategory ? addCategory() : updateCategory()
    }

    function updateCategory()  {
        console.log("Running updateCategory");
        BelowDeckApi.updateCategory(category, token);
        toggleEdit();
    }

    function addCategory() {
        console.log("Running addCategory");
        BelowDeckApi.addCategory(category, token).then(data => {
            props.addCategoryToList(data);
        })
        
    }

    useEffect(() => {
        newCategory && setEdit(true);
    }, [])

    if (edit) return (
        <tr>
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">

                <div className="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-indigo-600 focus:ring-0 sm:text-sm"
                        placeholder="Write name of category" value={category.name} onChange={(evt) => setCategory({ ...category, [evt.target.name]: evt.target.value })}
                    />
                </div>
            </td>
            <td className="px-6 py-3 text-sm text-gray-500 font-medium text-right">
                <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 mr-3 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={saveCategory}
                >
                    Save
                </button>
                <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={toggleEdit}
                >
                    Cancel
                </button>

            </td>
        </tr>
    );

    return (
        <tr key={category.id}>
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                {category.name}
            </td>
            <td className="px-6 py-3 text-sm text-gray-500 font-medium text-right">
                <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={toggleEdit}
                >
                    Edit
                </button>
            </td>
        </tr>
    )
}

export default CategoryInlineEditor;