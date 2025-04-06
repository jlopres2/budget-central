import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.min.css'


const Datepick = () => {
    const [date, setDate] = useState(new Date())
    return  (
        <form>
            <DatePicker 
              selected = {date}
              onChange={date => date && setDate(date)}
            />
        </form>
    );

}

export default Datepick;