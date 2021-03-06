import React from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import MultiSelect from "./selectmultipleinput";
import Description from "./descriptioninput";
import MultiDatePicker from "./multidatepicker";
import TimePicker from "./timepicker";
import TextField from "@material-ui/core/TextField";
import TasksList from "./taskslists";
import ComboBox from "./autocomplete";
import axios from "axios";
import { DateObject } from "react-multi-date-picker";
import "../style/newtask.css";
import { getDateAndTime } from "../utils/utils";
//axios.defaults.baseURL = 'https://staging.mydatascope.com';
//axios.defaults.baseURL = 'https://mydatascope.com'
axios.defaults.baseURL = 'http://localhost:3100';

interface subTask {
  text: string;
}

export default function NewTask(props: any) {
  const { setTasks, tasks, setOpen , mobileUsers, locations, forms, getInfo, getMetadata, getData} = props;
  // getModalStyle is not a pure function, we roll the style only on the first render
  const today = new DateObject();
  const [username, setUsername] = React.useState<Array<string>>([""]);
  const [form, setForm] = React.useState<string>("");
  const [place, setPlace] = React.useState<string>("");
  const [date, setDate] = React.useState<string>(`${today.day}/${today.month}/${today.year}`);
  const [hour, setHour] = React.useState(`${today.hour}:${today.minute}`);
  const [description, setDescription] = React.useState("");
  const [gap, setGap] = React.useState("4");
  const [subtasks, setSubTasks] = React.useState<Array<subTask>>([]);

  // "task_assign"=>{"mobile_user_id"=>["", "2"], "form_id"=>"2", "location_id"=>"3", "start_time"=>"28/01/2021", "gap"=>"5", "description"=>"hola"}, "time"=>{"date"=>"13:25"}, "todo-value"=>"asd,jaja,jojo"
  const handleSave = async() => {
    setOpen(false);
    const task = {
      mobile_user_id: username,
      form_id: form,
      location_id: place,
      start_time: date,
      description,
      gap
    };
    const time = {
      date: hour
    }
    let respond: any;
    const subtaskList = subtasks.map((elem)=>elem.text); 
    try {
      respond = await axios.post('/task_assigns_create.json',{task_assign: task, time, "todo-value": subtaskList.join(',')},{ withCredentials: true, headers: {
        "accept": "application/json"
      }});
      console.log(respond)
      getInfo();
      getMetadata();
      getData();
    } catch (error) {
      console.log("error desde back ",error);
    }
    
  };

  return (
    <div>
      <div className="filter">
        <div className={"inputs"}>
          <div className={"inputs-content"}>
            <MultiSelect label={"Usuarios"} setMethod={setUsername} data={mobileUsers}/>
          </div>
          <div className={"inputs"}>
            <ComboBox title={"Formularios"}  setMethod={setForm} data={forms}/>
          </div>
          <div className={"inputs"}>
            <ComboBox title={"Lugares"} setMethod={setPlace} data={locations}/>
          </div>
        </div>
        <div className={"time-pickers"}>
          <div className={"date-picker"}>
            <MultiDatePicker setDates={setDate} />
          </div>
          <div className={"time-picker"}>
            <div className={"inputs"}>
              <TimePicker setHour={setHour} />
            </div>
            <div className={"inputs"}>
              <TextField
                id="outlined-number"
                label="Cantidad de Horas"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={gap}
                onChange={(event) => setGap(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={"inputs"}>
          <Description setDescription={setDescription} />
        </div>
        <div className={"inputs"}>
          <TasksList setSubTasks={setSubTasks} />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Guardar
        </Button>
      </div>
    </div>
  );
}
