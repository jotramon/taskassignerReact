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
//axios.defaults.baseURL = 'https://staging.mydatascope.com';
//axios.defaults.baseURL = 'https://mydatascope.com'
axios.defaults.baseURL = 'http://localhost:3100';


export default function EditTask(props: any) {
  const { setTasks, tasks, setOpen , mobileUsers, locations, forms, getInfo, getMetadata, params, editInfo, getData} = props;
  // getModalStyle is not a pure function, we roll the style only on the first render
  const today = new DateObject();
  const [username, setUsername] = React.useState<Array<string>>([""]);
  const [form, setForm] = React.useState<string>("");
  const [place, setPlace] = React.useState<string>("");
  const [date, setDate] = React.useState<string>(`${today.day}/${today.month}/${today.year}`);
  const [hour, setHour] = React.useState(`${today.hour}:${today.minute}`);
  const [description, setDescription] = React.useState("");
  const [gap, setGap] = React.useState("4");
  const [subtasks, setSubTasks] = React.useState<Array<string>>([]);

  // "task_assign"=>{"mobile_user_id"=>["", "2"], "form_id"=>"2", "location_id"=>"3", "start_time"=>"28/01/2021", "gap"=>"5", "description"=>"hola"}, "time"=>{"date"=>"13:25"}, "todo-value"=>"asd,jaja,jojo"
  
  // React.useEffect(() => { 
  //   async function getInfo() {
  //     let respond: any;
  //     try {
  //       respond = await axios.get(`/task_assign_edit/${params.row.id}`,{ withCredentials: true});
  //       console.log(respond);
  //     } catch (error) {
  //       console.log("error desde back ",error);
  //     }
  //   }
  //   getInfo();
  // }, []);

  React.useEffect(()=>{
    const start = new Date(editInfo.task.start_time);
    console.log(editInfo.task.start_time);
    console.log("fecha",start);
    setHour(`${start.getHours()}:${start.getHours()}`);
    setDate(`${start.getDate()}/${start.getMonth()+1}/${start.getFullYear()}`);
    setUsername(editInfo.task.mobile_user_id);
    setForm(editInfo.task.form_id);
    setPlace(editInfo.task.location_id);
    setDescription(editInfo.task.description);
    setGap(editInfo.task.gap);
    setSubTasks(editInfo.subtasks);
  },[editInfo]);
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
    let listSubTaskNames = subtasks.map((elem:any)=>elem.name)
    console.log("lista nombres", listSubTaskNames);
    try {
      respond = await axios.put(`/task_assign_update/${editInfo.task.id}.json`,{task_assign: task, time, "todo-value": listSubTaskNames.join(',')},{ withCredentials: true, headers: {
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
  console.log("params row",params);
  return (
    <div>
      <div className="filter">
        <div className={"inputs"}>
          <div className={"inputs-content"}>
            <MultiSelect label={"Usuarios"} setMethod={setUsername} data={mobileUsers} info={username} edit={true}/>
          </div>
          <div className={"inputs"}>
            <ComboBox title={"Formularios"}  setMethod={setForm} data={forms} info={form} edit={true}/>
          </div>
          <div className={"inputs"}>
            <ComboBox title={"Lugares"} setMethod={setPlace} data={locations} info={place} edit={true} />
          </div>
        </div>
        <div className={"time-pickers"}>
          <div className={"date-picker"}>
            <MultiDatePicker setDates={setDate} info={new DateObject(editInfo.task.start_time)} edit={true}/>
          </div>
          <div className={"time-picker"}>
            <div className={"inputs"}>
              <TimePicker setHour={setHour} info={new Date(editInfo.task.start_time)} edit={true} />
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
          <Description setDescription={setDescription} info={description} edit={true} />
        </div>
        <div className={"inputs"}>
          <TasksList setSubTasks={setSubTasks} info={subtasks} edit={true} />
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
