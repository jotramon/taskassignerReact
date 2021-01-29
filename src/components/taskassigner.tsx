import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import InfoCard from "./infocard";
import Grid from "./datagrid";
import ModalCustom from "./modal";
import MasssiveActions from "./massiveactions";
import { getQueryParams } from '../utils/utils';
import "../style/massiveactions.css";
import "../style/infocard.css";
//axios.defaults.baseURL = 'https://staging.mydatascope.com';
//axios.defaults.baseURL = 'https://mydatascope.com'
axios.defaults.baseURL = 'http://localhost:3100';

interface Options {
  label: string,
  id: string,
}

export default function TaskAssigner() {
  const [tasks, setTasks] = useState<Array<any>>([]);
  const [complete, setComplete] = useState(0);
  const [pendding, setPendding] = useState(0);
  const [noComplete, setNoComplete] = useState(0);
  const [assign, setAssign] = useState(0);
  const [list, setList] = useState<Array<any>>(tasks);
  const [data, setData] = useState<Array<any>>([]);
  const [mobileUsers, setMobileUsers] = useState<Array<Options>>([]);
  const [forms, setForms] = useState<Array<Options>>([]);
  const [locations, setLocations] = useState<Array<Options>>([]);

  // React.useEffect(() => {
  //   async function recogerDatos() {
  //     const info = await import("../MOCK_DATA.json").then((m) => m.default);
  //     setTasks(info);
  //     setList(info);
  //   }
  //   recogerDatos();
  // }, []);
  async function getData() {
    const queryParams = getQueryParams();
    let respond: any;
    try {
      respond = await axios.get('/task_assigns_react.json', { withCredentials: true});
      setData(respond.data);
    } catch (error) {
      console.log("error desde back ",error);
    }
  }
  React.useEffect(() => { 
    async function getData() {
      const queryParams = getQueryParams();
      let respond: any;
      try {
        respond = await axios.get('/task_assigns_react.json', { withCredentials: true});
        setData(respond.data);
      } catch (error) {
        console.log("error desde back ",error);
      }
    }
    getData();
  }, []);
  async function getInfo() {
    const queryParams = getQueryParams();
    let respond: any;
    try {
      respond = await axios.get('/task_assigns_info', { withCredentials: true});
      setAssign(respond.data.assigns);
      setComplete(respond.data.complete);
      setPendding(respond.data.pendding);
      setNoComplete(respond.data.no_completed);
    } catch (error) {
      console.log("error desde back ",error);
    }
  }
  React.useEffect(() => { 
    async function getInfo() {
      const queryParams = getQueryParams();
      let respond: any;
      try {
        respond = await axios.get('/task_assigns_info', { withCredentials: true});
        setAssign(respond.data.assigns);
        setComplete(respond.data.complete);
        setPendding(respond.data.pendding);
        setNoComplete(respond.data.no_completed);
      } catch (error) {
        console.log("error desde back ",error);
      }
    }
    getInfo();
  }, []);
  async function getMetadata() {
    const queryParams = getQueryParams();
    let respond: any;
    try {
      respond = await axios.get('/filter_metadata', { withCredentials: true});
      setMobileUsers(respond.data.mobile_users.map((entry: any) => ({label: entry[0], id: entry[1]})));
      setLocations(respond.data.locations.map((entry: any) => ({label: entry[0], id: entry[1]})));
      setForms(respond.data.forms.map((entry: any) => ({label: entry[0], id: entry[1]})));
    } catch (error) {
      console.log("error desde back ",error);
    }
  }
  React.useEffect(() => { 
    async function getMetadata() {
      const queryParams = getQueryParams();
      let respond: any;
      try {
        respond = await axios.get('/filter_metadata', { withCredentials: true});
        setMobileUsers(respond.data.mobile_users.map((entry: any) => ({label: entry[0], id: entry[1]})));
        setLocations(respond.data.locations.map((entry: any) => ({label: entry[0], id: entry[1]})));
        setForms(respond.data.forms.map((entry: any) => ({label: entry[0], id: entry[1]})));
      } catch (error) {
        console.log("error desde back ",error);
      }
    }
    getMetadata();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <div className="Cards-container">
          <InfoCard title={"Asignado"} value={assign} />
          <InfoCard title={"Completadas"} value={complete} />
          <InfoCard title={"Pendientes"} value={pendding} />
          <InfoCard title={"No Completadas"} value={noComplete} />
        </div>
        <div className={"filter-boton-container"}>
          <div className={"filters"}>
            <div className={"filter-boton"}>
              <ModalCustom title={"Filtro"} 
              mobileUsers={mobileUsers}
              forms={forms}
              locations={locations}/>
            </div>
          </div>
          <div className={"search-cotainer"}>
            <MasssiveActions tasks={tasks} setList={setList} list={list} />
          </div>
          <div className={"task-assign"}>
            <div className={"task-boton"}>
              <ModalCustom
                title={"Nueva Tarea"}
                tasks={data}
                setTasks={setData}
                mobileUsers={mobileUsers}
                forms={forms}
                locations={locations}
                getInfo={getInfo}
                getMetadata={getMetadata}
                getData={getData}
              />
            </div>
            <div className={"task-boton"}>
              <ModalCustom
                title={"Importar Tareas"}
                tasks={data}
                setTasks={setData}
                getData={getData}
              />
            </div>
          </div>
        </div>
        <div className={"grid-container"}>
          <Grid setTasks={setData} 
                tasks={data} 
                getMetadata={getMetadata} 
                mobileUsers={mobileUsers}
                forms={forms}
                locations={locations}
                getInfo={getInfo}
                getData={getData}
                />
        </div>
      </div>
    </div>
  );
}
