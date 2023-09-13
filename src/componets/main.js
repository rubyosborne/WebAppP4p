import React from "react";
import styles from "./main.module.css";
import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  onSnapshot,
  orderBy
} from 'firebase/firestore';
import { db, auth, storage } from "../config/firebase";
import { ref, uploadBytes } from 'firebase/storage';
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
  const [pHList, setpH] = useState([]);
  const [ECList, setEC] = useState([]);
  const [tempList, setTemp] = useState([]);
  const [airTempList, setFlow] = useState([]);
  const [lightList, setLight] = useState([]);
  const [hummidityList, setHummidity] = useState([]);

  const pHRef = collection(db, "pH");
  const ECRef = collection(db, "EC");
  const tempRef = collection(db, "temp");
  const airTempRef = collection(db, "AirTemp");
  const lightRef = collection(db, "light");
  const hummidityRef = collection(db, "Hummidity");

  useEffect(() => {
    const getVals = async () => {
      try {
        // Setting up queries
        const qPH = query(pHRef, orderBy('time'));
        onSnapshot(qPH, querySnapshot => {
          const pHData = querySnapshot.docs.map(doc => doc.data());
          setpH(pHData);
        });

        const qEC = query(ECRef, orderBy('time'));
        onSnapshot(qEC, querySnapshot => {
          const ECData = querySnapshot.docs.map(doc => doc.data());
          setEC(ECData);
        });

        const qTemp = query(tempRef, orderBy('time'));
        onSnapshot(qTemp, querySnapshot => {
          const tempData = querySnapshot.docs.map(doc => doc.data());
          setTemp(tempData);
        });

        const qairTemp = query(airTempRef, orderBy('time'));
        onSnapshot(qairTemp, querySnapshot => {
          const airTempData = querySnapshot.docs.map(doc => doc.data());
          setFlow(airTempData);
        });

        const qLight = query(lightRef, orderBy('time'));
        onSnapshot(qLight, querySnapshot => {
          const lightData = querySnapshot.docs.map(doc => doc.data());
          setLight(lightData);
        });

        const qHummidity = query(hummidityRef, orderBy('time'));
        onSnapshot(qHummidity, querySnapshot => {
          const hummidityData = querySnapshot.docs.map(doc => doc.data());
          setHummidity(hummidityData);
        });

      } catch (err) {
        console.error(err);
      };
    }
    getVals();
  }, []);

  const lastPHValue = pHList.length > 0 ? pHList[pHList.length - 1].value : null;
const lastECValue = ECList.length > 0 ? ECList[ECList.length - 1].value : null;
const lastTempValue = tempList.length > 0 ? tempList[tempList.length - 1].value : null;
const lastAirTempValue = airTempList.length > 0 ? airTempList[airTempList.length - 1].value : null;
const lastLightValue = lightList.length > 0 ? lightList[lightList.length - 1].value : null;
const lastHummidityValue = hummidityList.length > 0 ? hummidityList[hummidityList.length - 1].value : null;

useEffect(() => {
  document.title = "Eden | My Plants";
}, []);

return (
  <div className={styles.background}>
    <div className={styles.cover}>
    <div className={styles.pannel}>
    <h1 className={styles.pannelHeading}>Plant Vitals</h1>

    <div className={styles.readingRow}>
        <div className={styles.reading}>
            <span>pH:</span>
            <div className={styles.valueBox}>{lastPHValue}</div>
        </div>
        <div className={styles.reading}>
            <span>EC:</span>
            <div className={styles.valueBox}>{lastECValue}</div>
        </div>
        <div className={styles.reading}>
            <span>Temperature:</span>
            <div className={styles.valueBox}>{lastTempValue}</div>
        </div>
        <div className={styles.reading}>
            <span>Air Temperature:</span>
            <div className={styles.valueBox}>{lastAirTempValue}</div>
        </div>
        <div className={styles.reading}>
            <span>Light:</span>
            <div className={styles.valueBox}>{lastLightValue}</div>
        </div>
        <div className={styles.reading}>
            <span>Humidity:</span>
            <div className={styles.valueBox}>{lastHummidityValue}</div>
        </div>
    </div>
</div>


<div className={styles.graphContainer}>
    <div className={styles.graphItem}>
        <h1 className={styles.chartHeading}><span className={styles.iconPh}></span> pH</h1>
        <LineChart width={600} height={300} data={pHList}>
            <Line type="monotone" dataKey="value" stroke="##8cd541" strokeWidth={3} />
            <XAxis dataKey="time" label={{ value: 'time', position: 'insideBottom', offset: -5 }} />
            <YAxis datakey="value" padding={{ top: 20, bottom: 20 }} />
            <Tooltip />
        </LineChart>
    </div>

    <div className={styles.graphItem}>
        <h1 className={styles.chartHeading}><span className={styles.iconEc}></span> EC</h1>
        <LineChart width={600} height={300} data={ECList}>
            <Line type="monotone" dataKey="value" stroke="#8cd541" strokeWidth={3} />
            <XAxis dataKey="time" label={{ value: 'time', position: 'insideBottom', offset: -5 }} />
            <YAxis datakey="value" label={{ value: 'EC', angle: -90, position: 'insideLeft', offset: 20 }} />
            <Tooltip />
        </LineChart>
    </div>

    <div className={styles.graphItem}>
        <h1 className={styles.chartHeading}><span className={styles.iconTemp}></span> Temperature</h1>
        <LineChart width={600} height={300} data={tempList}>
            <Line type="monotone" dataKey="value" stroke="#8cd541" strokeWidth={3} />
            <XAxis dataKey="time" label={{ value: 'time', position: 'insideBottom', offset: -5 }} />
            <YAxis datakey="value" label={{ value: 'Temp', angle: -90, position: 'insideLeft', offset: 20 }} />
            <Tooltip />
        </LineChart>
    </div>

    <div className={styles.graphItem}>
        <h1 className={styles.chartHeading}><span className={styles.iconAirTemp}></span> Air Temperature</h1>
        <LineChart width={600} height={300} data={airTempList}>
            <Line type="monotone" dataKey="value" stroke="#8cd541" strokeWidth={3} />
            <XAxis dataKey="time" label={{ value: 'time', position: 'insideBottom', offset: -5 }} />
            <YAxis datakey="value" label={{ value: 'airTemp', angle: -90, position: 'insideLeft', offset: 5 }} />
            <Tooltip />
        </LineChart>
    </div>

    <div className={styles.graphItem}>
        <h1 className={styles.chartHeading}><span className={styles.iconLight}></span> Light</h1>
        <LineChart width={600} height={300} data={lightList}>
            <Line type="monotone" dataKey="value" stroke="#8cd541" strokeWidth={3} />
            <XAxis dataKey="time" label={{ value: 'time', position: 'insideBottom', offset: -5 }} />
            <YAxis datakey="value" label={{ value: 'Light', angle: -90, position: 'insideLeft', offset: 5 }} />
            <Tooltip />
        </LineChart>
    </div>

    <div className={styles.graphItem}>
        <h1 className={styles.chartHeading}><span className={styles.iconHummidity}></span> Humidity</h1>
        <LineChart width={600} height={300} data={hummidityList}>
            <Line type="monotone" dataKey="value" stroke="#8cd541" strokeWidth={3} />
            <XAxis dataKey="time" label={{ value: 'time', position: 'insideBottom', offset: -5 }} />
            <YAxis datakey="value" label={{ value: 'Hummidity', angle: -90, position: 'insideLeft', offset: 5 }} />
            <Tooltip />
        </LineChart>
    </div>
</div>

    </div>
  </div>
  )
};
export default Main;


    
   

    