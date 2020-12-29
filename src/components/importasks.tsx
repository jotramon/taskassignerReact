import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Selector from './selector';
import DateSelector from './dateselector';
import PopoverCalender from './popcalendar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import ComboBox from './autocomplete';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import "../style/filter.css";


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    button: {
        margin: theme.spacing(1),
        marginBlock: '20px',
      },
    root: {
    '& > *': {
        margin: theme.spacing(1),
        marginBlock: '40px',
    },
    },
    input: {
    display: 'none',
    },
  }),
);

export default function ImportTasks(props: any) {
  const classes = useStyles();
  const { title } = props;
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(undefined);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeFile = (val: any) => {
    console.log(val)
  };

  const id = open ? 'simple-popover' : undefined;

  const body = (
    
    <div style={modalStyle} className={classes.paper}>
    <div className={classes.root}>
      <input
        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx+"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" 
        color="default" 
        component="span"
        startIcon={<CloudUploadIcon />}
        >
          Subir archivo
        </Button>
      </label>
    </div>
    <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={handleClose}
      >
        Guardar
      </Button>
    </div>
  );

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleOpen}>
        {title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}


