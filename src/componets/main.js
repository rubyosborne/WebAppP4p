import React from "react";
import styles from "./main.module.css";

import { useEffect, useState} from "react";
import {getDocs, 
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    query,
    onSnapshot,
    orderBy} from 'firebase/firestore';
import { db, auth, storage } from "../config/firebase" 
import {ref, uploadBytes} from 'firebase/storage';
import {signOut} from 'firebase/auth';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";



export const Main = () => {

  const [pHList, setpH]               = useState([]);
  const [ECList, setEC]               = useState([]);
  const [tempList, setTemp]           = useState([]);
  const [airTempList, setFlow]           = useState([]);
  const [lightList, setLight]         = useState([]);
  const [hummidityList, setHummidity] = useState([]);

  const pHRef   = collection(db, "pH");
  const ECRef   = collection(db, "EC");
  const tempRef = collection(db, "temp");
  const airTempRef = collection(db, "AirTemp");
  const lightRef = collection(db, "light");
  const hummidityRef = collection(db, "Hummidity");

  const [unsubscribePH, setUnsubscribePH]               = useState(null);
  const [unsubscribeEC, setUnsubscribeEC]               = useState(null); 
  const [unsubscribeTemp, setUnsubscribeTemp]           = useState(null);
  const [unsubscribeairTemp, setUnsubscribeairTemp]     = useState(null);
  const [unsubscribeLight, setUnsubscribeLight]         = useState(null);
  const [unsubscribeHummidity, setUnsubscribeHummidity] = useState(null);

  useEffect(() => {
    const getVals = async () => {
      // Read data from database
      // Set move list
      try{
        // Setting up querys
        // pH 
        const qPH = query(pHRef, orderBy('time'));
        const unsubscribePH = onSnapshot(qPH, querySnapshot => {
            // Map results to an array of li elements

            const pHData = querySnapshot.docs.map(doc => { 
              return doc.data()});

            setpH(pHData);
  
        })

        // EC
        const qEC = query(ECRef, orderBy('time'));
        const unsubscribeEC= onSnapshot(qEC, querySnapshot => {
            // Map results to an array of li elements

            const ECData = querySnapshot.docs.map(doc => { 
              return doc.data()});

            setEC(ECData);
  
        })

        // Temp
        const qTemp = query(tempRef, orderBy('time'));
        const unsubscribeTemp= onSnapshot(qTemp, querySnapshot => {
            // Map results to an array of li elements

            const tempData = querySnapshot.docs.map(doc => { 
              return doc.data()});

            setTemp(tempData);
  
        })
        
        const qairTemp = query(airTempRef, orderBy('time'));
        const unsubscribeairTemp= onSnapshot(qairTemp, querySnapshot => {
            // Map results to an array of li elements

            const airTempData = querySnapshot.docs.map(doc => { 
              return doc.data()});

            setFlow(airTempData);
        })
        
        const qLight = query(lightRef, orderBy('time'));
        const unsubscribeLight = onSnapshot(qLight, querySnapshot => {
            // Map results to an array of li elements

            const lightData = querySnapshot.docs.map(doc => { 
              return doc.data()});

            setLight(lightData);
        })
        const qHummidity = query(hummidityRef, orderBy('time'));
        const unsubscribeHummidity= onSnapshot(qHummidity, querySnapshot => {
            // Map results to an array of li elements

            const hummidityData = querySnapshot.docs.map(doc => { 
              return doc.data()});

            setHummidity(hummidityData);
        })
        
        

        setUnsubscribePH(() => unsubscribePH);
        setUnsubscribeEC(() =>unsubscribeEC);
        setUnsubscribeTemp(() => unsubscribeTemp);
        setUnsubscribeairTemp(() =>unsubscribeairTemp);
        setUnsubscribeLight(() => unsubscribeLight);
        setUnsubscribeHummidity(() =>unsubscribeHummidity);

      } catch (err) {
        console.error(err);
   
    };

  }
  getVals();
  

  }, []);

  const logout = async () => {
    try{
     
     await signOut(auth);
     unsubscribeEC();
     unsubscribePH();
     unsubscribeTemp();
     unsubscribeairTemp();
     unsubscribeLight();
     unsubscribeHummidity();
     console.log("unsubbed");
    } catch (err) {
        console.error(err);
    }
  };

  return(
    <div className={styles.background}>
         <div className = {styles.LogoutBtn} onClick={logout}>Log Out</div>

         <div className = {styles.cover} >
          <div className = {styles.pannel}>
            <h1 className = {styles.pannelHeading}>Welcome to Erva</h1>
          </div>
          <div className = {styles.pHPlot}>
            <h1 className = {styles.pHHeading}>pH</h1>
           <LineChart  width={600} height={300} data={pHList}>
           <Line type="monotone" dataKey="value" stroke="#2196F3" strokeWidth={3} />
           <XAxis dataKey="time" label={{ value: 'time', position: 'insideBottom',offset: -5  }} />
           <YAxis datakey="value"label={{ value: 'pH', angle: -90, position: 'insideLeft',offset:20 }} />
           <Tooltip />
           </LineChart>
          </div>  
           <div className = {styles.ECPlot}>
            <h1 className = {styles.ECHeading}>EC</h1>
           <LineChart  width={600} height={300} data={ECList}>
           <Line type="monotone" dataKey="value" stroke="#2196F3" strokeWidth={3} />
           <XAxis dataKey="time" label={{ value: 'time', position: 'insideBottom',offset: -5  }} />
           <YAxis datakey="value"label={{ value: 'EC', angle: -90, position: 'insideLeft',offset:20 }} />
           <Tooltip />
           </LineChart>
          </div>
          <div className = {styles.tempPlot}>
            <h1 className = {styles.tempHeading}>Tempearture</h1>
           <LineChart  width={600} height={300} data={tempList}>
           <Line type="monotone" dataKey="value" stroke="#2196F3" strokeWidth={3} />
           <XAxis dataKey="time" label={{ value: 'time', position: 'insideBottom',offset: -5  }} />
           <YAxis datakey="value"label={{ value: 'Temp', angle: -90, position: 'insideLeft',offset:20 }} />
           <Tooltip />
           </LineChart>
          </div>
          <div className = {styles.airTempPlot}>
            <h1 className = {styles.airTempHeading}>Air Temperature</h1>
           <LineChart  width={600} height={300} data={airTempList}>
           <Line type="monotone" dataKey="value" stroke="#2196F3" strokeWidth={3} />
           <XAxis dataKey="time" label={{ value: 'time', position: 'insideBottom',offset: -5  }} />
           <YAxis datakey="value"label={{ value: 'airTemp', angle: -90, position: 'insideLeft',offset:5}} />
           <Tooltip />
           </LineChart>
          </div>
          <div className = {styles.lightPlot}>
            <h1 className = {styles.lightHeading}>Light</h1>
           <LineChart  width={600} height={300} data={lightList}>
           <Line type="monotone" dataKey="value" stroke="#2196F3" strokeWidth={3} />
           <XAxis dataKey="time" label={{ value: 'time', position: 'insideBottom',offset: -5  }} />
           <YAxis datakey="value"label={{ value: 'Light', angle: -90, position: 'insideLeft',offset:5}} />
           <Tooltip />
           </LineChart>
          </div>
        
        <div className = {styles.hummidityPlot}>
            <h1 className = {styles.hummidityHeading}>Hummidity</h1>
           <LineChart  width={600} height={300} data={hummidityList}>
           <Line type="monotone" dataKey="value" stroke="#2196F3" strokeWidth={3} />
           <XAxis dataKey="time" label={{ value: 'time', position: 'insideBottom',offset: -5  }} />
           <YAxis datakey="value"label={{ value: 'Hummidity', angle: -90, position: 'insideLeft',offset:5}} />
           <Tooltip />
           </LineChart>
        </div>
        </div>
    </div>

        
  );


};
export default Main;


    
   

    