import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        // margin: theme.spacing(1),
        width: '50ch',
      },
    },
  }),
);

export default function Description() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={classes.root}> 
        <TextField
            id="outlined-multiline-static"
            label="Descripción"
            multiline
            rows={5}
            variant="outlined"
        />
    </div> 
  );
}
