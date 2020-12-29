import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DateRangeSelector from './daterangeselector';
import Selector from './selector';
import "../style/filter.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  }),
);

export default function SimplePopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        Open Popover
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
      >
        <Typography className={classes.typography}>Filtro</Typography>
        <div className={"filter"}>
            <div>
                <div>
                    <Selector title="Ubicación"/>
                </div>
                <div>
                    <Selector title="Usuario"/>
                </div>
                <div>
                    <Selector title="Formulario"/>
                </div>
            </div>
            <div>
                <DateRangeSelector/>
            </div>
        </div>
      </Popover>
    </div>
  );
}
