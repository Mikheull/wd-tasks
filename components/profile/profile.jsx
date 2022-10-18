import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

const ProfileEdit = ({editHandler, data}) => {
    const { register, reset, handleSubmit } = useForm({
        defaultValues: useMemo(() => {
          return data;
        }, [data])
    });

    useEffect(() => {
        reset(data);
    }, [data]);

    return (
        <div className="max-w-7xl md:px-4 mx-auto">
            <div className="mt-8 w-full md:w-1/4">
                <form onSubmit={handleSubmit(editHandler)}>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm text-gray-200">Username</label>
                        <input {...register("username")} placeholder="johnDoe" type="text" name="username" id="username" className="block w-full px-4 py-2 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="email" className="block mb-2 text-sm text-gray-200">Email Address</label>
                        <input {...register("email")} placeholder="example@example.com" type="email" name="email" id="email" className="block w-full px-4 py-2 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </div>

                    <div className="mt-6">
                        <button type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Edit
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ProfileEdit;
