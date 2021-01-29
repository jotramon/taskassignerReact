import React from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import "../style/filter.css";

function getFileName(url: any) {
  var file = url.replace(/^.*[\\]/, "");
  return file ? file : "No hay archivos seleccionados";
}

export default function ImportTasks(props: any) {
  const { setOpen, classes } = props;
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [file, setFile] = React.useState("");
  const [text, setText] = React.useState("No hay archivos seleccionados");

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    setText(getFileName(file));
    console.log(file);
  }, [file]);

  return (
    <div>
      <div className={"filter"}>
        <div className={"input-file"}>
          <div>
            <label htmlFor="contained-button-file">
              <input
                style={{ display: "none" }}
                accept="*.xls,.xlsx"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                value={file}
                onChange={(event) => setFile(event.target.value)}
              />
              <Button
                variant="contained"
                color="default"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Subir archivo
              </Button>
            </label>
          </div>
          <div>{text}</div>
        </div>
        <div>
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
    </div>
  );
}
