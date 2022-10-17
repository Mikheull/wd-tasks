import React from "react";

const TodoFilter = ({filterHandler, type, tasks}) => {
    const nbTasksAll = tasks.length;
    const nbTasksTodo = tasks.filter(task => task.status == false).length;
    const nbTasksDone = tasks.filter(task => task.status == true).length;

    return (
        <div className="border-b border-gray-600">
            <nav className="flex flex-row">
                <button className={`py-4 px-6 flex items-center focus:outline-none ${type == "all" ? 'text-blue-500 border-b-2 font-medium border-blue-500' : 'border-b-2 border-transparent text-gray-600' } wow fadeInUp`} onClick={() => filterHandler("all")}>
                    All
                    <span className={`ml-2 text-xs px-2 py-1 rounded-md ${type == "all" ? 'bg-blue-300 text-blue-700' : 'bg-transparent text-gray-700' } wow fadeInUp`}>{nbTasksAll}</span>
                </button>
                <button className={`py-4 px-6 flex items-center focus:outline-none ${type == "todo" ? 'text-blue-500 border-b-2 font-medium border-blue-500' : 'border-b-2 border-transparent text-gray-600' } wow fadeInUp`} onClick={() => filterHandler("todo")}>
                    Todo
                    <span className={`ml-2 text-xs px-2 py-1 rounded-md ${type == "todo" ? 'bg-blue-300 text-blue-700' : 'bg-transparent text-gray-700' } wow fadeInUp`}>{nbTasksTodo}</span>
                </button>
                <button className={`py-4 px-6 flex items-center focus:outline-none ${type == "done" ? 'text-blue-500 border-b-2 font-medium border-blue-500' : 'border-b-2 border-transparent text-gray-600' } wow fadeInUp`} onClick={() => filterHandler("done")}>
                    Done
                    <span className={`ml-2 text-xs px-2 py-1 rounded-md ${type == "done" ? 'bg-blue-300 text-blue-700' : 'bg-transparent text-gray-700' } wow fadeInUp`}>{nbTasksDone}</span>
                </button>
            </nav>
        </div>
    );
};

export default TodoFilter;
