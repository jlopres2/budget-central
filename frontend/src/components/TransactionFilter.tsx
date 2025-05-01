import React, {Dispatch} from "react";
import DatePicker from "react-datepicker";
import { CategoryOption, categoryOptions } from "../types/TransactionCategoryOptions";

interface TransactionFilterProps {

    // setSearchCallback: (value : string) => void;
    // setCategoriesCallback: (value : string) => void;
    // setDateCallback: (value : Date | null) => void;

    setSearchCallback: React.Dispatch<React.SetStateAction<string>>;
    setCategoriesCallback: React.Dispatch<React.SetStateAction<CategoryOption[]>>;
    setDateCallback: React.Dispatch<React.SetStateAction<Date | null>>;
    
};


const TransactionFilter:React.FC<TransactionFilterProps> = ({setSearchCallback, setCategoriesCallback, setDateCallback}) => {

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCallback(event.target.value);
    }

    const handleCategoriesChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        setCategoriesCallback(event.target.value);
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCallback(event.target.value);
    }

    return(
        <div >
            <div className="flex-1/2"> 
                <input 
                    className = "input text-green-700 rounded-4xl w-96"
                    type="text" 
                    placeholder="Search for Transactions" 
                    onChange={handleSearchChange}
                />
            </div>  

            <div className="">
            <div className="dropdown dropdown-center">
                <div role="button" className="btn m-1">Category</div>
                <ul  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </div>

            </div>

            

        </div>
    )
}

export default TransactionFilter;
