import React, { useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import "../style/dateselector.css";

export default function MultiDatePicker(props: any) {
  const [date, setDate] = useState(new DateObject());
  const { setDates, info, edit } = props;
  React.useEffect( () => {
    if (edit) {
      console.log("info",info);
      setDate(info);
    }
  }, [edit, info]);
  const handleInput = (array: any) => {
    const list = array.map((value: any) => `${value.day}/${value.month}/${value.year}`);
    console.log(array)
    console.log(list.join(","))
    setDates(list.join(","));
  };

  return (
    <Calendar
      multiple
      value={date}
      onChange={(array) => {
        handleInput(array);
      }}
      className={"calendar"}
    />
  );
}
