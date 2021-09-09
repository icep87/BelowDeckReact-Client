import React, {useState, useEffect} from 'react';
import BelowDeckApi from '../../services/BelowDeckApi'

const MenuSelect = ({label, name, onChangeHandler, ...props}) => {

    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
    BelowDeckApi.getMenu().then(data => {
        setMenuData(data)
      });
    },[])

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <select
              id={name}
              name={name}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={props.menuId} onChange={onChangeHandler}
            >
                {menuData.map(menu =>(
                    <option id={menu.id} value={menu.id}>{menu.name}</option>
                ))}
            </select>
          </div>
    )
}

export default MenuSelect;