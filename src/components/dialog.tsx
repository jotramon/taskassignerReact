import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import PermDeviceInformationOutlinedIcon from "@material-ui/icons/PermDeviceInformationOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "../style/datagrid.css";
//axios.defaults.baseURL = 'https://staging.mydatascope.com';
//axios.defaults.baseURL = 'https://mydatascope.com'
axios.defaults.baseURL = 'http://localhost:3100';

const useStyles = makeStyles({
  root: {
    color: "black",
  },
});

export default function AlertDialog(props: any) {
  const { component, params, data, setTasks , getMetadata} = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  
  let button = <div></div>;
  let message;
  let title = "";
  
  if (component === "alert") {
    button = <PermDeviceInformationOutlinedIcon className={"image"} />;
    title = "¿Quieres notificar?";
    message = "Quiere notificar a el/los usuario/s " + params.row.user_name;
  } else if (component === "delete") {
    button = <DeleteOutlineOutlinedIcon className={"image"} />;
    title = "¿Estás seguro?";
    message = "Quieres eliminar una tarea";
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAcept = async() => {
    if (component === "alert") {
      try {
        console.log(params);
        let {data} = await axios.post(`/tasks_notify_react.json`,{task_id: params.row.id.toString() },{withCredentials: true});

        // respond = await axios.delete('/task_assigns_delete.json',{ data: {task_assign:{id: params.row.assing_id}}, headers:{ withCredentials: true}});

        console.log("data",data)
      } catch (error) {
        console.log("error desde back ",error);
      }
    } else if (component === "delete") {
      const findelement = (element: any) => element.id === params.row.id;
      let respond;
      try {
        console.log(params);
        let {data} = await axios.delete(`/task_assigns_delete/${params.row.id}.json`,{withCredentials: true});

        // respond = await axios.delete('/task_assigns_delete.json',{ data: {task_assign:{id: params.row.assing_id}}, headers:{ withCredentials: true}});

        console.log(data)
        setTasks((prevData: any) => {
          const newData = prevData.filter((elem: any) => elem.id !== params.row.id);
          return newData});
        getMetadata();
      } catch (error) {
        console.log("error desde back ",error);
      }
      
    }
    setOpen(false);
  };
  
  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        className={classes.root}
        size="small"
        color={"primary"}
      >
        {button}
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAcept} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
