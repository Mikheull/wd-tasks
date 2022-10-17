import React from "react";
import { Trash, Circle, CheckCircle } from 'react-feather';

const TodoItem = ({item, deleteHandler, statusHandler}) => {

    return (
        <div className="flex group items-center justify-between mt-6 px-2 py-4 border-b border-gray-800">
            <div className="w-10/12 flex items-center">
                {item.status ? 
                    <>
                        <button className="text-blue-500" onClick={() => statusHandler(item.ID, item)}><CheckCircle height={16} /></button>
                    </> 
                : 
                    <>
                        <button className="text-gray-400" onClick={() => statusHandler(item.ID, item)}><Circle height={16} /></button>
                    </>
                }
                <p className="ml-4 text-gray-400">{item.name}</p>
            </div>
            
            <a className="text-sm cursor-pointer w-2/12 text-red-400 opacity-0 group-hover:opacity-100 ease-in-out duration-200 flex justify-end" onClick={() => deleteHandler(item.ID)}><Trash height={16} /></a>
        </div>
    );
};

export default TodoItem;
