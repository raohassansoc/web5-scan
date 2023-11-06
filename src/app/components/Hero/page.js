"use client"
import { useState } from 'react'

import Filter from "../Filter/page"
import Records from "../Records/page"
import RecentRecord from "../Recent Blocks-Transaction/page"
import CoinPriceChart from "../CoinPriceChart/page"

export default function Page() {
  return (
    <>
      <div className="flex flex-col grow appContainer py-10" style={{ background: 'white' }}>
        <div className="card flex flex-col space-y-12" style={{ background: `linear-gradient(to bottom, #4FC3F7, #1565C0)` }} >
          <Filter />
          <div className="border p-5 rounded-2xl border-[cornflowerblue]-1 dark:border-none dark:bg-darkground-3"
          style={{background: "white"}}
          >
            <Records />
          </div>
          <div className="w-full flex justify-center lg:hidden">
            {/* <div style={{ width: 320, height: 110 }}>
              <div className="relative" style={{ width: 320, height: 110 }}>
                <a
                  href="https://bcgame.top/?spin=true&i=4s3zxp2b&s=&c=&utm_source=4s3zxp2b"
                  target="_blank"
                >
                  <div
                    className="absolute"
                    style={{ width: 320, height: 110, zIndex: 2 }}
                  />
                </a>
                <div
                  className="absolute top-0 rounded-lg overflow-hidden"
                  style={{ width: "auto", height: 128 , marginTop :'-17px' }}
                >
                   <iframe
                    src="https://sda.Mangoscan.io/ranbe/bcg/index.html"
                    frameBorder={0}
                    width={640}
                    height={220}
                    style={{
                      WebkitTransform: "scale(0.5)",
                      WebkitTransformOrigin: "0 0",
                      OTransform: "scale(0.5)",
                      OTransformOrigin: "0 0",
                      msZoom: "0.5",
                      MozTransform: "scale(0.5)",
                      MozTransformOrigin: "0 0"
                    }}
                  /> 
                  <CoinPriceChart />
                </div>
                 <small
                  className="absolute rounded-md bg-[cornflowerblue]-1 text-gray-700"
                  style={{
                    right: 10,
                    top: "-10px",
                    fontSize: 12,
                    padding: "2px 3px"
                  }}
                >
                  Ad
                </small> 
              </div>
            </div> */}
          </div>
        </div>
        <RecentRecord />
      </div>

    </>
  )
}
