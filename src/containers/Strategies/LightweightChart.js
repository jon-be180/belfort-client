import React from 'react';
import { createChart } from 'lightweight-charts';


let chart 
let candlestickSeries
let lineSeries

export default ({data}) => {
  const myRef = React.useRef()


  React.useEffect(() => {
    chart = createChart(myRef.current, { width: 1500, height: 400 });
    chart.applyOptions({
      timeScale: {
       rightOffset: 45,
        barSpacing: 15,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
      },
      priceScale: {
        position: 'right',
        autoScale: false,
        alignLabels: true,
        borderVisible: false,
        borderColor: '#555ffd',
        scaleMargins: {
          top: 0.65,
          bottom: 0.25,
        },
        crosshair: {
          vertLine: {
            color: '#6A5ACD',
            width: 0.5,
            style: 1,
            visible: true,
            labelVisible: false,
          },
          horzLine: {
            color: '#6A5ACD',
            width: 0.5,
            style: 0,
            visible: true,
            labelVisible: true,
          },
          mode: 1,
        },
        grid: {
          vertLines: {
            color: 'rgba(70, 130, 180, 0.5)',
            style: 1,
            visible: true,
          },
          horzLines: {
            color: 'rgba(70, 130, 180, 0.5)',
            style: 1,
            visible: true,
          },
        },
      },
    });

    candlestickSeries = chart.addCandlestickSeries({
      upColor: '#0B6623',
      downColor: '#FF6347',
      borderVisible: false,
      wickVisible: true,
      borderColor: '#000000',
      wickColor: '#000000',
      borderUpColor: '#4682B4',
      borderDownColor: '#A52A2A',
      wickUpColor: "#4682B4",
      wickDownColor: "#A52A2A",
    });

    lineSeries = chart.addLineSeries({
      upColor: '#0B6623',
      downColor: '#FF6347',
      borderVisible: false,
      wickVisible: true,
      borderColor: '#000000',
      wickColor: '#000000',
      borderUpColor: '#4682B4',
      borderDownColor: '#A52A2A',
      wickUpColor: "#4682B4",
      wickDownColor: "#A52A2A",
    });

  }, []);

  React.useEffect(() => {
    candlestickSeries.setData(data[1].data);
    lineSeries.setData(data[0].data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, data);

  return (
       <>
       <div ref={myRef} id='chart' />
       </>
  );
}
