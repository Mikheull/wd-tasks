import React, { useRef, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Plus } from 'react-feather';

const TodoCreate = ({createHandler}) => {
    const { register, reset, handleSubmit } = useForm();

    return (
        <form onSubmit={handleSubmit((data) => createHandler(data) || reset())}>
            <div className="flex items-center mt-4 mb-10 relative">
                <label htmlFor="task" className="text-blue-500"><Plus /></label>
                <input {...register("task")} placeholder="Add a new task..." type="text" id="task" className="text-sm py-3 px-2 w-full bg-transparent"/>
                
                <button type="submit" className="absolute right-2 px-2 py-2 text-xs tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Create
                </button>
            </div>
        </form>
    );
};

export default TodoCreate;
