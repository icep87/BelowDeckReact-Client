import React, {useState, useEffect} from 'react';
import BelowDeckApi from '../../services/BelowDeckApi'

const PostTypeSelect = (props) => {

    const [postTypeData, setPostTypeData] = useState([]);

    useEffect(() => {
    BelowDeckApi.getPostType().then(data => {
        console.log(data)
        setPostTypeData(data)
      });
    },[])

    return (
        <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Post type
            </label>
            <select
              id="posttypeid"
              name="posttypeid"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={props.postTypeId} onChange={props.onChangeHandler} defaultValue=""
            >
                {postTypeData.map(type =>(
                    <option id={type.id} value={type.id}>{type.name}</option>
                ))}
            </select>
          </div>
    )
}

export default PostTypeSelect;