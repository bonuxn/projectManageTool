import "./ProjectCreate.css"

export default function ProjectCreate() {

    return (

        <form>
            <div>
                <label htmlFor="project_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">project Name</label>
                <input type="text" id="project_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="projectA" required />
            </div>

            <div className="mb-6">
                <label htmlFor="project_period_start" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">プロジェクト開始</label>
                <input type="date" id="project_period_start" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div> 
            <div className="mb-6">
                <label htmlFor="project_period_end" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">プロジェクト終了</label>
                <input type="date" id="project_period_end" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div> 
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
        </form>

    );
}