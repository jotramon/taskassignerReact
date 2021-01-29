import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        // margin: theme.spacing(1),
        width: "50ch",
      },
    },
    
  })
);

export default function Description(props: any) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const { setDescription, info, edit } = props;
  React.useEffect( () => {
    if (edit) {
      // console.log("info hora",info);
      setValue(info);
    }
  }, [edit, info]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setDescription(value)
  };

  return (
    <div className={classes.root}>
      <TextField
        // className={classes.field}
        id="outlined-multiline-static"
        label="Descripción"
        multiline
        rows={5}
        value={value}
        variant="outlined"
        onChange={handleChange}
      />
    </div>
  );
}
