import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useS3Upload } from 'next-s3-upload';

const ProfileAvatar = ({editAvatarHandler, data}) => {
    const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
    const { register, reset, handleSubmit } = useForm({
        defaultValues: useMemo(() => {
          return data;
        }, [data])
    });
    const [img, setImg] = useState("");
    const [res, setRes] = useState([]);


    useEffect(() => {
        reset(data);
    }, [data]);

    const handleFileChange = async file => {
        const { url } = await uploadToS3(file);
        editAvatarHandler({attachmentUrl: url});
    };

    const searchUnsplash = async () => {
        const data = await fetch(
          `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${process.env.NEXT_UNSPLASH_KEY}`
        );
        const dataJ = await data.json();
        const result = dataJ.results;

        setRes(result);
    };

    return (
        <div className="max-w-7xl md:px-4 mx-auto mt-24">
            <div className="mt-8 w-full md:w-1/4">
                <form onSubmit={handleSubmit(editAvatarHandler)}>
                    <div>
                        <label htmlFor="attachmentUrl" className="block mb-2 text-sm text-gray-200">Avatar URL</label>
                        <input {...register("attachmentUrl")} placeholder="https://image.google.com" type="text" name="attachmentUrl" id="attachmentUrl" className="block w-full px-4 py-2 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <button type="submit"
                            className="w-1/2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Edit
                        </button>
                        <span onClick={() => editAvatarHandler({attachmentUrl: ''})} className="w-1/2 px-4 text-center cursor-pointer py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-400 focus:outline-none focus:bg-red-400 focus:ring focus:ring-red-300 focus:ring-opacity-50">
                            Delete
                        </span>
                    </div>
                </form>

                <div className="flex items-center justify-center space-x-2 my-10">
                    <span className="h-px w-1/2 bg-gray-600"></span>
                    <span className="text-gray-300 font-normal">or</span>
                    <span className="h-px w-1/2 bg-gray-600"></span>
                </div>

                <form>
                    <div>
                        <label htmlFor="attachmentLocal" className="block mb-2 text-sm text-gray-200">Import Locale File</label>
                        
                        <FileInput onChange={handleFileChange} />
                        <span onClick={openFileDialog} className='cursor-pointer block w-full px-4 py-2 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'>Upload file</span>
                    </div>
                </form>

                <div className="flex items-center justify-center space-x-2 my-10">
                    <span className="h-px w-1/2 bg-gray-600"></span>
                    <span className="text-gray-300 font-normal">or</span>
                    <span className="h-px w-1/2 bg-gray-600"></span>
                </div>

                <div>
                    <div>
                        <label htmlFor="unsplashquery" className="block mb-2 text-sm text-gray-200">Import From Unsplash</label>
                        <input placeholder="Search Anything..." value={img} onChange={(e) => setImg(e.target.value)} type="text" name="unsplashquery" id="unsplashquery" className="block w-full px-4 py-2 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <span onClick={() => searchUnsplash()} className="w-1/2 px-4 text-center cursor-pointer py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Search
                        </span>
                    </div>

                    <div className="grid grid-cols-6 col-span-2 gap-2 mt-6">
                        {(res) ? res.map((val) => {
                            return (
                                <div key={val.id} onClick={() => editAvatarHandler({attachmentUrl: val.urls.small}) || setRes()} className="overflow-hidden rounded-xl col-span-2 max-h-[5rem]">
                                    <img className="h-full w-full object-cover hover:opacity-60 cursor-pointer"
                                        src={val.urls.small}
                                        alt={val.alt_description}
                                    />
                                </div>
                            );
                        }) : ''}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default ProfileAvatar;
