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

export default function AlertDialogMassive(props: any) {
  const { component, params, data, setList, getInfo, getData } = props;
  const [open, setOpen] = React.useState(false);
  const [listSelected, setListSelected] = React.useState<Array<string>>([]);
  const [disabled, setDisabled] = React.useState(true);
  const classes = useStyles();
  var selected = params.api.getSelectedRows();

  React.useEffect(() => {
    if (selected.length !== 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selected]);

  let button = <div></div>;
  let message;
  let title = "";
  if (component === "alertMassive") {
    button = <PermDeviceInformationOutlinedIcon className={"image"} />;
    title = "¿Quieres notificar?";
    let listComponent = (
      <ul>
        {listSelected.map((elem) => (
          <li key={elem}>{elem}</li>
        ))}
      </ul>
    );
    message = (
      <div>
        <label>Quieres notificar a todos estos usuarios: </label>
        {listComponent}
      </div>
    );
  } else if (component === "deleteMassive") {
    button = <DeleteOutlineOutlinedIcon className={"image"} />;
    title = "¿Estás seguro?";
    message = `Quieres eliminar todas estas tareas: ${listSelected.length} tareas`;
  }
  const handleClickOpen = () => {
    console.log(params.api.getSelectedRows());
    if (component === "alertMassive") {
      const selected = params.api.getSelectedRows();
      if (selected.length !== 0) {
        const listNames = selected.map((elem: any) => elem.user);
        setListSelected(listNames);
        setOpen(true);
      }
    } else if (component === "deleteMassive") {
      const selected = params.api.getSelectedRows();
      if (selected.length !== 0) {
        const listIds = selected.map((elem: any) => elem.id);
        setListSelected(listIds);
        setOpen(true);
      }
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAcept = async() => {
    if (component === "alert") {
      //Send alert
    } else if (component === "deleteMassive") {
      try {
        const selected = params.api.getSelectedRows();
        const listIds = selected.map((elem: any) => elem.id);
        let {data} = await axios.get(`/tasks_bulk_delete_react/${listIds}`,{withCredentials: true});

        // respond = await axios.delete('/task_assigns_delete.json',{ data: {task_assign:{id: params.row.assing_id}}, headers:{ withCredentials: true}});

        console.log(data)
        // setList((prevData: any) => {
        //   const newData = prevData.filter((elem: any) => elem.id !== params.row.id);
        //   return newData});
        getData();
        getInfo();
      } catch (error) {
        console.log("error desde back ",error);
      }
      // const findelement = (element: any) => element.id === params.row.id;
      // const array = [...data];
      // const index = array.findIndex(findelement);
      // if (index !== -1) {
      //   array.splice(index, 1);
      //   setList(array);
      // }
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
        disabled={disabled}
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
