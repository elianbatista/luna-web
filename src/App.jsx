import React, { useRef, useEffect } from 'react'
import './App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const graph = useRef(null)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Erros e Tentativas por fase',
      },
    },
  };
  
  const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Erros',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Tentativas',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const requestErrorsPerLevel = async () => {
    fetch('http://localhost:3011/api/match/errors-per-level')
      .then(response => response.json())
      .then((result) => {
        result.map((item) => {
          data.datasets[0].data[item.match_level - 1] = item.sum
        })
        graph.current.update()
      })
  }

  const requestAttemptsPerLevel = async () => {
    fetch('http://localhost:3011/api/match/attempt-per-level')
      .then(response => response.json())
      .then((result) => {
        result.map((item) => {
          data.datasets[1].data[item.match_level - 1] = item.count
        })
        graph.current.update()
      })
  }

  useEffect(() => {
    requestErrorsPerLevel()
    requestAttemptsPerLevel()
  }, [])

  return (
    <div className="container">
      <Bar ref={graph} options={options} data={data} />
    </div>
  );
}

export default App;
