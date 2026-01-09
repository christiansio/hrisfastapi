
export const getRequestTypeContent = (type: string) => {

    const normalizedType = type.trim().toLowerCase();

    if (normalizedType === 'vacation') {
        return (
       
        
        <div className="flex flex-col w-[220px] gap-2">
            <div className="flex font-bold  text-sm">
                Reason
            </div>
            <div className="flex bg-slate-200/40 text-xs rounded-md p-2 text-left w-full break-words">
                Went Home for Family Reunion in Palawan
            </div>
            <div className="flex text-xs text-[#f05a28] hover:text-orange-400/80 justify-end cursor-pointer -mb-2">
                See Attachment
            </div>
        </div>
            
        );
    } else if (normalizedType === 'overtime') {
        return (
       
        
        <div className="flex flex-col w-[220px] gap-2">
            <div className="flex font-bold  text-sm">
                Reason
            </div>
            <div className="flex bg-slate-200/40 text-xs rounded-md p-2 text-left w-full break-words">
                Overtime to finish Task
            </div>
            <div className="flex text-xs text-[#f05a28] hover:text-orange-400/80 justify-end cursor-pointer -mb-2">
                See Attachment
            </div>
        </div>
            
        );
    }
    
}

export const getDurationContent = (type: string) => {

    const normalizedDuration = type.trim().toLowerCase(); 

    if (normalizedDuration === 'vacation') {
        return (
        
            <div className="flex flex-col w-[150px] gap-2">
                <div className="flex font-bold text-sm">
                    Details
                </div>

                <div className="flex justify-between bg-slate-200/40 text-xs rounded-md p-2">
                    <div className="">
                        Oct 10
                    </div>
                    <div className="font-medium">
                        Whole Day
                    </div>
                </div>

                <div className="flex justify-between bg-slate-200/40 text-xs rounded-md p-2">
                    <div className="">
                        Oct 11
                    </div>
                    <div className="font-medium">
                        Whole Day
                    </div>
                </div>

                <div className="flex justify-between bg-slate-200/40 text-xs rounded-md p-2">
                    <div className="">
                        Oct 12
                    </div>
                    <div className="font-medium">
                        Half Day AM
                    </div>
                </div>

            </div>
        )
    } else if (normalizedDuration === 'overtime') {

        return (
            
            <div className="flex flex-col w-[150px] gap-2">
                <div className="flex font-bold text-sm">
                    Details
                </div>

                <div className="flex text-xs pl-2">
                    6:00 PM - 9:00 PM
                </div>


                <div className="text-xs font-bold">Overtime Minutes</div>
                <div className="flex justify-end bg-slate-200/40 text-xs rounded-md p-2">
                    
                    <div className="font-medium font-normal space-x-1">
                        <span>180</span><span>minutes</span>
                    </div>
                </div>

            </div>
        )
    }

}
    

    

 