import React from "react";
import { useForm } from "react-hook-form";
import { Plus } from 'react-feather';

const TodoCreate = ({createHandler}) => {
    const { register, handleSubmit } = useForm();

    return (
        <form onSubmit={handleSubmit(createHandler)}>
            <div className="flex items-center mt-4 mb-10">
                <label htmlFor="name" className="text-blue-500"><Plus /></label>
                <input {...register("task")} placeholder="Add a new task and press ENTER..." type="text" id="name" className="text-sm py-3 px-2 w-full bg-transparent"/>
            </div>
        </form>
    );
};

export default TodoCreate;
