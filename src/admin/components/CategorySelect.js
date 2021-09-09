import React, {useState, useEffect} from 'react';
import BelowDeckApi from '../../services/BelowDeckApi'

const CategorySelect = (props) => {

    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
    BelowDeckApi.getCategory().then(data => {
        console.log(data)
        setCategoryData(data)
      });
    },[])

    return (
        <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={props.categoryId} onChange={props.onChangeHandler} defaultValue=""
            >
                {categoryData.map(category =>(
                    <option id={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
          </div>
    )
}

export default CategorySelect;