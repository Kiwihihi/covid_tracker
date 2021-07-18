import axios from 'axios';
import numeral from "numeral";
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const options = {
  plugins: {
    legend: {
      display: false,
    
    },
    title: {
      display: false,
      text: 'Custom Chart Title'
  },
  tooltip: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem) {
        return numeral(tooltipItem.formattedValue).format("+0,0");
      },
    },
  },

  },

    scales: {
      xAxes: 
      [
        {
          type: "time",
          time: {
            format: "DD/MM/YY",
            tooltipFormat: "ll",
          },
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              console.log(value)
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },

  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: true,
  };

const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };


function LineGraph({casesType}) {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(res => res.data)
        .then(data => {
            let chartData = buildChartData(data, casesType);
            setData(chartData);
            console.log('test',numeral(466938).format("0a"))

        })
    },[casesType])

    return (
        <div>
        {data.length > 0 && (
          <Line
            data={{
              datasets: [
                {
                  backgroundColor: "rgba(204, 16, 52, 0.5)",
                  borderColor: "#CC1034",
                  data: data,
                  fill: true
                },
              ],
            }}
            options={options}
          />
        )}
      </div>
    );
}

export default LineGraph;