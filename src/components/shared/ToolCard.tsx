import { PencilSquareIcon, CheckIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Tool, InputEnum } from "../screens/Index";
import { useState } from "react";
import clsx from "clsx";

interface ToolCardProps {
     tool: Tool
}

const ToolCard = ({ tool} : ToolCardProps) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [inputData, setInputData] = useState<Partial<Tool>>(tool);
    
    const toggleIsEdit = () => setIsEdit(prevIsEdit => !prevIsEdit);
    
    const onClose = () => {
        setIsEdit(false);
        setInputData(tool);
    }
    
    const handleInputChange = (field: InputEnum, value: string) => {
        setInputData({ ...inputData, [field]: value})
    }

    const inputClasses = clsx (
        "bg-transparent",
        "border-0",
        "cursor-pointer",
        "py-2",
        "px-4",
        "rounded-md"
    );

    return(
        <div key={tool.id} className="h-48 group relative flex flex-col justify-between rounded-md shadow-slate-900 shadow-md p-4 bg-gradient-to-r from-slate-800 to-slate-700">
            <div>
                <input className={
                    clsx(inputClasses, 
                        "text-xl mb-2 font-bold",
                    {
                    "bg-black" : isEdit,
                    "cursor-text" : isEdit
                })} value={inputData.title}
                onChange={(e) => handleInputChange(InputEnum.Title, e.target.value)} />
                <input className={clsx(inputClasses, {
                    "bg-black" : isEdit,
                    "cursor-text" : isEdit
                })} value={inputData.description}
                onChange={(e) => handleInputChange(InputEnum.Description, e.target.value)} />
            </div>
            <input className={clsx(inputClasses,
                "text-slate-400", {
                    "bg-black" : isEdit,
                    "cursor-text" : isEdit
                })                      
        } value={inputData.url}
        onChange={(e) => handleInputChange(InputEnum.Url, e.target.value)} />
            {
                isEdit ?
                <>
                <XCircleIcon className="h-6 w-6 text-red-700 absolute top-4 right-7 cursor-pointer" />
                <CheckIcon className="h-6 w-6 text-green-700 absolute top-4 right-14 cursor-pointer" />
                </> : 
                <button className="btn btn-active btn-ghost hidden group-hover:block absolute top-4 right-4 p-0" onClick={toggleIsEdit}>
                    <PencilSquareIcon className="h-6 w-6 text-purple-600 cursor-pointer" />
                </button>
                
            }
            
            
        </div>
    )
}


export default ToolCard;