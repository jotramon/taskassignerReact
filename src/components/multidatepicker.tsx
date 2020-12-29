import React , { useState }from "react";
import { Calendar, DateObject } from "react-multi-date-picker";

export default function MultiDatePicker() {
    const [date, setDate] = useState(new DateObject)
    

    const handleInput = (array: any) =>{
        console.log(array);

    }

    return (
            <Calendar
            multiple
            value={date}
            onChange={array => {handleInput(array)} } 
            />

    );
    
}