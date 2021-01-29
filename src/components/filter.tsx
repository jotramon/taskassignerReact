import React from "react";
import PopoverCalender from "./popcalendar";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ComboBox from "./autocomplete";
import "../style/filter.css";

export default function Filter(props: any) {
  const { setOpen, classes, mobileUsers, locations, forms} = props;
  // getModalStyle is not a pure function, we roll the style only on the first render
  // const [modalStyle] = React.useState(getModalStyle);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="filter">
        <div>
          <div className={"filters-input"}>
            <ComboBox title={"Ubicación"} data={locations}/>
          </div>
          <div className={"filters-input"}>
            <ComboBox title={"Usuario"} data={mobileUsers}/>
          </div>
          <div className={"filters-input"}>
            <ComboBox title={"Formulario"} data={forms}/>
          </div>
          <div className={"filters-input"}>
            <ComboBox title={"Estado"} />
          </div>
        </div>
        <div>
          <PopoverCalender />
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
    </div>
  );
}
