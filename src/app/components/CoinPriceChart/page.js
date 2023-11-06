"use client"
import { useEffect } from "react";
// import { connectWebSocket } from './CoinPriceWebSocket';
const Page = () => {


  // useEffect(() => {
  //   connectWebSocket();
  //   return () => {
  //     if (socket) {
  //       socket.close();
  //     }
  //   };
  // }, []);

  useEffect(() => {
    try {
      const script = document.createElement('script');
      script.src = 'https://widgets.coingecko.com/coingecko-coin-price-chart-widget.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    } catch (error) {
      // console.log('iFrame Error')
    }
  }, []);

  return (
    <coingecko-coin-price-chart-widget
      currency="usd"
      coin-id="mangoman-intelligent"
      locale="en"
      height="300"
    ></coingecko-coin-price-chart-widget>
  );
};

export default Page;
