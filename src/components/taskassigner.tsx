import React, { useState } from 'react';
import logo from '../logo.svg';
import '../App.css';
import InfoCard from './infocard';
import Popup from './popup';
import Filter from './filter';
import SimplePopover from "./popover";
import FilterPop from './filterpop';
import Typography from '@material-ui/core/Typography';
import Grid from './datagrid';
import NewTask from './newtask';
import ImportTasks from './importasks';
export default function TaskAssigner() {
    const [showPopup, setShowPoppup] = useState(false)

    const togglePopup = () => {
        setShowPoppup(!showPopup);
    }

    const [dateState, setDateState] = React.useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ]);

    return (
    <div className="App">
      <header className="App-header">
        <div className="Cards-container">
            <InfoCard title={"Asignado"}/>
            <InfoCard title={"Completadas"}/>
            <InfoCard title={"Pendientes"}/>
            <InfoCard title={"No Completadas"}/>
            <br className="clearBoth" />
        </div>
        <div className={"filter-boton-container"}>
            <div className={"filters"}>
                <div className={"filter-boton"}>
                    <FilterPop title={"Filtro"}/>
                </div>
            </div>
            <div className={"task-assign"}>
                <div className={"task-boton"}>
                    <NewTask title={"Nueva Tarea"}/>
                </div>
                <div className={"task-boton"}>
                    <ImportTasks title={"Importar Tareas"}/>
                </div>
            </div>

        </div>
        <div className={"grid-container"}>
            <Grid/>
        </div>
      </header>
    </div>
    );
}



 
 

