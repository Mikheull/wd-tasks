import React from "react";
import { useForm } from "react-hook-form";

const PasswordEdit = ({editPassHandler}) => {
    const { register, handleSubmit } = useForm();

    return (
        <div className="max-w-7xl md:px-4 mx-auto mt-24">
            <div className="mt-8 w-full md:w-1/4">
                <form onSubmit={handleSubmit(editPassHandler)}>
                    <div className="mt-6">
                        <label htmlFor="old_password" className="text-sm text-gray-200">Actual password</label>
                        <input {...register("old_password")} name="old_password" id="old_password" placeholder="Your Actual Password" type="password" className="block w-full px-4 py-2 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="password" className="text-sm text-gray-200">Password</label>
                        <input {...register("password")} name="password" id="password" placeholder="Your Password" type="password" className="block w-full px-4 py-2 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
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

export default PasswordEdit;
