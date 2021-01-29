import React from "react";
import {
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { green } from "@material-ui/core/colors";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        // margin: theme.spacing(1),
        width: "35ch",
      },
    },
    margin: {
      backgroundColor: green[500],
      borderRadius: "50%",
      "&:hover":{
        backgroundColor: green[700],
      }
    },
    ul: {
      listStyleType: "none",
    },
    li: {
      backgroundColor: "#f3f3f4",
      margin: "1em 0 0 0",
      width: "fit-content",
      padding: "5px",
      borderRadius: "3em",
    },
    task: {
      margin: "1em",
      justifyContent: "space-between",
    },
  })
);

export default function TasksLlist(props: any) {
  const classes = useStyles();
  const [task, setTask] = React.useState<string>("");
  const [tasks, setTasks] = React.useState<Array<subTask>>([]);
  const { setSubTasks, info, edit } = props;
  const handleChange = () => {
    if (task !== "") {
      const value: subTask = { text: task };
      setTasks([...tasks, value]);
      setSubTasks([...tasks, value])
      setTask("");
    }
  };
  React.useEffect( () => {
    if (edit) {
      console.log("info subtareas",info);
      const list = info.map((elem:any) => ({text: elem.name}));
      setTasks(list);
    }
  }, [edit, info]);
  const toggleTask = (selectedTask: subTask) => {
    const findelement = (element: any) => element.text === selectedTask.text;
    const array = [...tasks];
    const index = array.findIndex(findelement);
    if (index !== -1) {
      array.splice(index, 1);
      setTasks(array);
      setSubTasks(array);
    }
  };

  type ToggleTask = (selectedTodo: subTask) => void;

  interface subTask {
    text: string;
  }

  interface Props {
    task: subTask;
    toggleTask: ToggleTask;
  }

  const TodoListItem: React.FC<Props> = ({ task, toggleTask }) => {
    return (
      <li className={classes.li}>
        <label className={classes.task}>
          {task.text}
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              toggleTask(task);
            }}
          >
            <CloseOutlinedIcon fontSize="inherit" />
          </IconButton>
        </label>
      </li>
    );
  };

  return (
    <div className={classes.root}>
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Tarea"
          variant="outlined"
          size={"small"}
          value={task}
          InputProps={{endAdornment:<AddOutlinedIcon className={classes.margin}
                                      onClick={handleChange}/>}}
          onChange={(event) => setTask(event.target.value)}
        />
        
      </div>
      <ul className={classes.ul}>
        {tasks.map((task) => (
          <TodoListItem key={task.text} task={task} toggleTask={toggleTask} />
        ))}
      </ul>
      <div></div>
    </div>
  );
}
