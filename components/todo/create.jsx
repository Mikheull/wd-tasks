import React, { useRef} from "react";
import { useForm } from "react-hook-form";
import { Plus } from 'react-feather';

const TodoCreate = ({createHandler}) => {
    const { register, handleSubmit } = useForm();
    const ref = useRef(null);

    const resetInput = () => {
        ref.current.value = '';
    };

    return (
        <form onSubmit={handleSubmit(() => createHandler() || resetInput())}>
            <div className="flex items-center mt-4 mb-10">
                <label htmlFor="name" className="text-blue-500"><Plus /></label>
                <input {...register("task")} ref={ref} placeholder="Add a new task and press ENTER..." type="text" id="name" className="text-sm py-3 px-2 w-full bg-transparent"/>
            </div>
        </form>
    );
};

export default TodoCreate;
