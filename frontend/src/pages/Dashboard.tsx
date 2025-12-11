import React from 'react';

const Dashboard: React.FC = () =>
{
    return (
        <div className="flex flex-row min-h-screen w-screen">
            <div className="flex flex-col justify-between items-center bg-gray-300 w-[94px] py-6">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="h-18 w-16 border border-gray-500">
                        Logo
                    </div>
                    <div className="border-t border-gray-900"></div>
                    <button className="h-12 w-16 border border-gray-500">
                        DB
                    </button>
                    <button className="h-12 w-16 border border-gray-500">
                        R&A
                    </button>
                </div>

                <button className="h-12 w-18 border border-gray-500">
                    Settings
                </button>
            </div>

            <div className="flex flex-col w-full">
                <div className="flex h-14 border border-gray-500 justify-end p-2">
                    <div className="flex flex-row border border-gray-500 gap-5">
                        <div className="flex-none border border-gray-500 px-4">Bell</div>
                        <div className="flex-1 border border-gray-500 px-4">Profile Drop Down</div>
                    </div>
                </div>
                <div className="flex h-30 border border-gray-200 justify-between p-4">
                    <div className="flex border border-gray-500 text-2xl p-4">
                        Dashboard
                    </div>
                    <div className="flex border border-gray-500 p-4">
                        Clock-In
                    </div>
                </div>

                <div className="grid grid-cols-2 grid-rows-2 h-full w-full p-10 gap-6">
                    <div className="col-span-2 bg-gray-200 rounded-md">

                    </div>
                    <div className="col-span-1 bg-gray-200 rounded-md">

                    </div>
                    <div className="col-span-1 bg-gray-200 rounded-md">

                    </div>
                </div>
            </div>


        </div>
    )
}

export default Dashboard;