/* eslint-disable no-use-before-define */
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
      "& > * + *": {
        marginTop: theme.spacing(3),
      },
    },
  })
);

interface Options {
  label: string,
  id: string,
}
export default function MultiSelect(props: any) {
  const classes = useStyles();
  const { setMethod ,label, data, info, edit} = props;
  const [value, setValue] = React.useState<Options[]>([]);
  
  var optionsList: Array<Options> = data;

  React.useEffect( () => {
    if (edit) {
      console.log(optionsList);
      const val = optionsList.filter((elem: Options) => elem.id === info);
      console.log("pase por aca", val)
      setValue(val);
    }
  }, [edit, info]);
  const handleChange = (value: any) => {
    setValue(value)
    const list = value.map((value:any)=> value["id"].toString())
    console.log(list)
    setMethod(list);
  }

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        limitTags={2}
        size={"small"}
        id="multiple-limit-tags"
        options={optionsList}
        getOptionLabel={(option) => option.label}
        value={value}
        onChange={(event: any, newValue: Options[]) => {
          handleChange(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            placeholder={label}
          />
        )}
      />
    </div>
  );
}

