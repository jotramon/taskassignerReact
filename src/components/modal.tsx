import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import "../style/modal.css";
import Filter from "./filter";
import ImportTasks from "./importasks";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import NewTask from "./newtask";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import "../style/datagrid.css";
import EditTask from "./edittask";
import axios from "axios";
//axios.defaults.baseURL = 'https://staging.mydatascope.com';
//axios.defaults.baseURL = 'https://mydatascope.com'
axios.defaults.baseURL = 'http://localhost:3100';
function getModalStyle() {
  const top = 60;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${left}%, -${top}%)`,
    borderRadius: "1em",
    outline: "none",
  };
}



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    newTask: {
      position: "absolute",
      width: 700,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      paddingBottom: "3px",
      // padding: theme.spacing(2, 4, 3),
      overflow: "scroll",
      overflowY: "scroll",
      height: "90%",
      display: "block",
      borderRadius: "1em",
    },
    normal: {
      position: "absolute",
      width: 700,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      paddingBottom: "3px",
      // padding: theme.spacing(2, 4, 3),
      overflow: "scroll",
      overflowY: "scroll",
      display: "block",
      borderRadius: "0.7em",
    },
    button: {
      marginBlock: theme.spacing(1),
    },
    modal: {
      overflowY: "auto",
    },
    edit: {
      color: "black",
    }

  })
);

export default function ModalCustom(props: any) {
  const classes = useStyles();
  const { title, tasks, setTasks, mobileUsers, forms, locations, getInfo, getMetadata, params, getData} = props;
  var body = <div></div>;
  var button = <div></div>;
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [editInfo, setEditInfo] = React.useState(null);
  const handleOpen = () => {
    setOpen(true);

  };

  const handleOpenEdit = async() => {
    
    let respond: any;
    try {
      respond = await axios.get(`/task_assign_edit/${params.row.id}`,{ withCredentials: true});
      console.log(respond);
      setEditInfo(respond.data);
      setOpen(true);
    } catch (error) {
      console.log("error desde back ",error);
    }
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const id = open ? "simple-popover" : undefined;

  var component = <div style={modalStyle} className={classes.newTask}></div>;

  if (title === "Filtro") {
    body = (
      <Filter setOpen={setOpen} 
      modalStyle={modalStyle} 
      classes={classes} 
      mobileUsers={mobileUsers}
      forms={forms}
      locations={locations}
      />
    );
    button = (
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        {title}
      </Button>
    );
  } else if (title === "Importar Tareas") {
    body = (
      <ImportTasks
        setOpen={setOpen}
        modalStyle={modalStyle}
        classes={classes}
        getData={getData}
      />
    );
    button = (
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        {title}
      </Button>
    );
  } else if (title === "Nueva Tarea") {
    body = (
      <NewTask
        setOpen={setOpen}
        modalStyle={modalStyle}
        classes={classes}
        tasks={tasks}
        setTasks={setTasks}
        mobileUsers={mobileUsers}
        forms={forms}
        locations={locations}
        getInfo={getInfo}
        getMetadata={getMetadata}
        getData={getData}
      />
    );
    button = (
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        {title}
      </Button>
    );
  } else if (title === "Editar Tarea") {
    body = (
      <EditTask
        params={params}
        setOpen={setOpen}
        modalStyle={modalStyle}
        classes={classes}
        tasks={tasks}
        setTasks={setTasks}
        mobileUsers={mobileUsers}
        forms={forms}
        locations={locations}
        getInfo={getInfo}
        getMetadata={getMetadata}
        editInfo={editInfo}
        getData={getData}
      />
    );
    button = (
      <IconButton
        onClick={handleOpenEdit}
        className={classes.edit}
        size="small"
        color={"primary"}
      >
        <EditOutlinedIcon className={"image"} />
      </IconButton>
    );
  }

  if (title === "Nueva Tarea" || title === "Editar Tarea") {
    component = (
      <div style={modalStyle} className={classes.newTask}>
        <div className="header-modal">
          <div className={"modal-title"}>
            <label id="modal-title">{title}</label>
          </div>
          <div className={"icon-container"}>
            <CloseIcon onClick={handleClose} className={"close-icon"} />
          </div>
        </div>
        {body}
      </div>
    );
  } else {
    component = (
      <div style={modalStyle} className={classes.normal}>
        <div className="header-modal">
          <div className={"modal-title"}>
            <label id="modal-title">{title}</label>
          </div>
          <div className={"icon-container"}>
            <CloseIcon onClick={handleClose} className={"close-icon"} />
          </div>
        </div>
        {body}
      </div>
    );
  }

  return (
    <div>
      {button}
      <Modal
        open={open}
        onClose={handleClose}
        disableBackdropClick
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {component}
      </Modal>
    </div>
  );
}
