import React from 'react';
import { createStyles, makeStyles, Theme , withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        // margin: theme.spacing(1),
        width: '35ch',
      },
    },
    margin: {
    },
    ul: {
      listStyleType: 'none',
    },
    li: {
      backgroundColor: '#f3f3f4',
      margin: '1em 0 0 0',
      width: 'fit-content',
      padding: '5px',
      borderRadius: '3em',
    },
    task: {
      margin: '1em',
      justifyContent: 'space-between',
    }
  }),
);



export default function TasksLlist() {
  const classes = useStyles();
  const [task, setTask] = React.useState<string>('')
  const [tasks, setTasks] = React.useState<Array<Task>>([]);

  const handleChange = () => {
    if (task !== ''){
      const value: Task = {text: task};
      setTasks([...tasks ,  value]);
      setTask('');
    }
  };

  const toggleTask = (selectedTask: Task) => {
    const findelement = (element: any) => element.text === selectedTask.text;
    const array = [...tasks]; 
    const index = array.findIndex(findelement);
    if (index !== -1) {
      array.splice(index, 1);
      setTasks(array);
    }
  };

  type ToggleTask = (selectedTodo: Task) => void;

  interface Task {
    text: string;
  }
  
  interface Props {
    task: Task;
    toggleTask: ToggleTask;
  }

  const TodoListItem: React.FC<Props> = ({ task, toggleTask }) => {
    return (
      <li className={classes.li}>
        <label className={classes.task}>
          {task.text}
          <IconButton aria-label="delete" className={classes.margin} size="small" onClick={() => {toggleTask(task)}}>
          <CloseOutlinedIcon fontSize="inherit" />
        </IconButton>
        </label>
      </li>
    );
  };
 
  const ColorButton = withStyles((theme: Theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button);

  return (
    <div className={classes.root}>
      <div> 
        <TextField
            id="outlined-multiline-static"
            label="Tarea"
            variant="outlined"
            size={"small"}
            value={task}
            onChange={event => setTask(event.target.value)}
        />
        <ColorButton 
        variant="contained" 
        color="primary" 
        className={classes.margin} 
        onClick={handleChange}>
          <AddOutlinedIcon />
        </ColorButton>
        </div>
          <ul className={classes.ul}>
            {tasks.map(task => (
              <TodoListItem key={task.text} task={task} toggleTask={toggleTask} />
            ))}
          </ul>
        <div>

        </div>
    </div> 
  );
}
