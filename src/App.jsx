
import './App.css'
import React, { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
function App() {
  const modelRef = useRef(null);

  useEffect(() => {
    // Cargar el modelo al montar el componente
    async function loadModel() {
      const model = await tf.loadLayersModel('./../model.json');
      modelRef.current = model;
    }
    loadModel();

    // Limpiar el modelo al desmontar el componente
    return () => {
      if (modelRef.current) {
        modelRef.current.dispose();
      }
    };
  }, []);

  const handlePrediction = async () => {
    const img = document.getElementById('image-element');
    const processedImg = tf.browser.fromPixels(img).toFloat().expandDims();

    if (modelRef.current) {
      const prediction = modelRef.current.predict(processedImg);
      const result = await prediction.data();

      // Mostrar los resultados
      console.log(result);
    }
  };

  return (
    <div>
      <img id="image-element" src="assets/00008.jpg" alt="Input" />
      <button onClick={handlePrediction}>Realizar predicción</button>
    </div>
  );
}

export default App
