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
import "../style/filter.css";


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

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
      width: 700,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    button: {
        margin: theme.spacing(1),
      },
  }),
);

export default function FilterPop(props: any) {
  const classes = useStyles();
  const { title } = props;
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const id = open ? 'simple-popover' : undefined;

  const body = (
    
    <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Filtro</h2>
        <div className="filter">
            <div>
                <div className={"filters-input"}>
                    <ComboBox title={"Ubicación"}/>
                </div>
                <div className={"filters-input"}>
                    <ComboBox title={"Usuario"}/>  
                </div>
                <div className={"filters-input"}>
                    <ComboBox title={"Formulario"}/>
                </div>
            </div>
            <div>
                <PopoverCalender/>
            </div>
        </div>
        <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={handleClose}
      >
        Save
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
