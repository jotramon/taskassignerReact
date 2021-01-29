import * as React from "react";
import {
  DataGrid,
  ColDef,
  ValueFormatterParams,
  CellClassParams,
  ColParams,
} from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AlertDialog from "./dialog";
import ModalCustom from "./modal";
import AlertDialogMassive from "./dialogmassive";
import "../style/datagrid.css";



function formatter(params: any) {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  var d1 = new Date(dateTime);
  var d2 = new Date(Date.parse(params.row.start_time));
  d2.setHours(d2.getHours() + params.row.gap);
  if (params.value !== null){
    return "Completado"
  } else if (d1 < d2){
    return "Pendiente"
  }else{
    return "No Completado"
  }
}

function formatterColor(params: any) {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  var d1 = new Date(dateTime);
  var d2 = new Date(Date.parse(params.row.start_time));
  d2.setHours(d2.getHours() + params.row.gap);

  if (params.value !== null){
    return 3
  } else if  (d1 < d2){
    return 2
  } else {
    return 1
  }
}



const useStyles = makeStyles({
  root: {
    "& .status-task.complete": {
      backgroundColor: "#1ab394",
      color: "white",
      fontWeight: "600",
      padding: "10",
    },
    "& .status-task.pending": {
      backgroundColor: "#f8ac59",
      color: "white",
      fontWeight: "600",
      padding: "10",
    },
    "& .status-task.noComplete": {
      backgroundColor: "#ed5565",
      color: "white",
      fontWeight: "600",
      padding: "10",
    },
    // ".MuiDataGrid-colCell": {
    //   width: "200px",
    // },
    // ".MuiDataGrid-colCellSortable": {
    //   width: "200px",
    // },
  },
});

function formatterDate(params: any) {
  var date = new Date(Date.parse(params.value));
  var zero = "";
  if (date.getMinutes() < 10){
    zero = "0";
  }
  return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+" "+date.getHours()+":"+zero+date.getMinutes();
}


export default function Grid(props: any) {
  // eslint-disable-next-line
  const { data, setTasks, tasks , mobileUsers, forms, locations, getInfo, getMetadata, getData} = props; 
  const columns: ColDef[] = [
    { field: "id", headerName: "ID", flex: 0.3},
    { field: "user_name", headerName: "Usuario", flex: 0.3},
    { field: "form_name", headerName: "Formulario", flex: 0.3},
    { field: "location_name", headerName: "Lugar", flex: 0.3},
    {
      field: "start_time",
      headerName: "Fecha",
      type: "dateTime",
      flex: 0.3,
      valueFormatter: (params: ValueFormatterParams) => formatterDate(params)
    },
    // { field: "start_time", 
    //   headerName: "Hora", 
    //   valueFormatter: (params: ValueFormatterParams) => formatterHour(params) ,
    //   flex: 0.3},
    {
      field: "gap",
      headerName: "Duración",
      valueFormatter: (params: ValueFormatterParams) => `${params.value} Horas`,
      flex: 0.3
    },
    {
      field: "form_answer_id",
      headerName: "Estado",
      valueFormatter: (params: ValueFormatterParams) => formatter(params),
      cellClassName: (params: CellClassParams) =>
        clsx("status-task", {
          complete: formatterColor(params) === 3,
          pending: formatterColor(params) === 2,
          noComplete: formatterColor(params) === 1,
        }),
        flex: 0.3
    },
    {
      field: "buttons",
      headerName: " ",
      sortable: false,
      flex: 0.3,
      renderHeader: (params: ColParams) => (
        <div className={"icons-container"}>
          <AlertDialogMassive
            component={"alertMassive"}
            params={params}
            data={tasks}
            setList={setTasks}
            getInfo={getInfo}
            getData={getData}
            getMetadata={getMetadata} 
          />
          <AlertDialogMassive
            component={"deleteMassive"}
            params={params}
            data={tasks}
            setList={setTasks}
            getInfo={getInfo}
            getData={getData}
            getMetadata={getMetadata} 
          />
        </div>
      ),
      renderCell: (params: ValueFormatterParams) => (
        <div className={"icons-container"}>
          <AlertDialog
            component={"alert"}
            params={params}
            data={tasks}
            setTasks={setTasks}
          />
          <ModalCustom title={"Editar Tarea"}
            params={params} 
            tasks={data}
            setTasks={setTasks}
            mobileUsers={mobileUsers}
            forms={forms}
            locations={locations}
            getInfo={getInfo}
            getData={getData}
            getMetadata={getMetadata} />
          <AlertDialog
            component={"delete"}
            params={params}
            data={tasks}
            setTasks={setTasks}
            getMetadata={getMetadata}
          />
        </div>
      ),
    },
  ];
  const classes = useStyles();
  console.log("data grid data ", tasks);
  return (
    <div className={"table"}>
      <DataGrid
        rows={tasks}
        columns={columns}
        className={"superContainer"}
        checkboxSelection
        disableSelectionOnClick={true}
        disableExtendRowFullWidth={true}
      />
    </div>
  );
}
