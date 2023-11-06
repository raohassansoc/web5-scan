"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link';
import Web3 from 'web3';
import { getBlockData, getblockdeta } from '@/functions';
//function
import { convertEpochToRealTime } from '@/functions';

//components
import Modal from '../components/Loder/page'

export default function Page({ searchParams }) {
  const web3 = new Web3(new Web3.providers.HttpProvider("http://134.209.154.96:8545"));

  const data = searchParams?.data;
  const [block, setBlock] = useState([]);
  const [uncles, setUncles] = useState(0);
  const [Timestamp, setTimestamp] = useState();


  const [isModalOpen, setIsModalOpen] = useState(true);

  const loderStart = () => {
    setIsModalOpen(true);
  };

  const loderEnd = () => {
    setIsModalOpen(false);
  };


  async function fatchDatas(data) {
    if (data !== undefined) {
      try {
        const number = JSON.parse(data)
        const block = await getblockdeta(number);
        // const block = await web3.eth.getBlock(number);
        console.log(number);
        console.log(block);
        setBlock(block);

        const Uncles = block.uncles
        setUncles(Uncles.length)

        const time = convertEpochToRealTime(Number(block.timestamp));
        let dateInGMT = time.toLocaleString('en-US', { timeZone: 'GMT' });
        loderEnd();
        setTimestamp(dateInGMT);
      } catch (error) {
        // console.log(error)
      }
    }
  }

  useEffect(() => {
    fatchDatas(data);
  },[]);
  return (
    <div className="flex flex-col grow appContainer py-10 px-2">
        <Modal isOpen={isModalOpen} onClose={loderEnd} />
      <div className="flex flex-col space-y-5">
        <div className="card flex flex-col">
          <div className="flex justify-between flex-wrap border-b borderColor pb-3 gap-y-2">
            <div className="flex flex-col gap-y-0.5">
              <div className="flex items-center">
                <span className="cardTitle">Block Details</span>
              </div>

            </div>

          </div>
          <div className="mt-3 ml-2">
         
          </div>
          <div className="grid grid-cols-1 mt-3 gap-x-5 gap-y-2 md:grid-cols-2">
            <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
              <span className="text-sm font-medium textColor1">
                Block
              </span>
              <div className="flex items-center space-x-2">
                <span className="textColor2 text-sm break-all">
                  {Number(block?.number)}
                </span>
                {/* <div className="shrink-0">
                  <button
                    className="rounded-full bg-[cornflowerblue]-1 flex cursor-pointer dark:bg-darkground h-6 w-6"
                    data-tooltip="Copied"
                    data-tooltip-trigger="click"
                    data-tooltip-timeout={1000}
                  >
                    <span
                      className="m-auto iconify-inline text-[cornflowerblue]"
                      id="copy-transactionHash"
                      data-icon="eva:copy-outline"
                      data-inline="false"
                      style={{ fontSize: 15 }}
                    />
                    <span
                      className="m-auto iconify-inline text-green-500 hidden"
                      id="check-transactionHash"
                      data-icon="eva:checkmark-outline"
                      data-inline="false"
                      style={{ fontSize: 15 }}
                    />
                  </button>
                </div> */}
              </div>
            </div>
            <div className="flex flex-col items-start space-y-2 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
              <span className="text-sm font-medium textColor1">Difficulty</span>
              <span className="text-sm textColor2 singleLineTimestamp font-mono">
                {Number(block.difficulty)}
              </span>
            </div>
            <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
              <span className="text-sm font-medium textColor1">Size / Gas</span>
              <div className="flex text-sm space-x-1 items-center font-mono">
                <a className="link" >
                  <span>{Number(block.size)}</span>
                </a>
                <span className="textColor2 text-xs">/</span>
                <span className="textColor2">{Number(block.gasUsed)}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
              <span className="text-sm font-medium textColor1">Miner</span>
              <div className="flex items-center space-x-2">
                <div className="flex items-baseline font-mono">
                  <span className="text-sm font-medium text-red-500"> {block.miner ? block.miner.substr(0, 10) + ".." : "......"}</span>
                  <span className="text-xs text-red-500">{block.miner ? block.miner.substr(32, 42) : "......"}</span>
                  <div className="ml-2">

                  </div>
                </div>
                {/* <span className="text-sm font-medium textColor1">(0.05 $)</span> */}
              </div>
            </div>
            <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
              <span className="text-sm font-medium textColor1">Total Difficulty</span>
              <div className="flex items-center space-x-4">
                <div className="flex successInfoButton">
                  <span className="text-xs font-medium">{Number(block.totalDifficulty)}</span>
                </div>
                {/* <span className="text-xs textColor2">{block.uncles} Uncles</span> */}
              </div>
            </div>
            <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
              <span className="text-sm font-medium textColor1">Nonce</span>
              <div className="flex items-center space-x-2">
                <div className="flex items-baseline font-mono">
                  {/* <span className="text-sm font-semibold text-[cornflowerblue]">{block.nonce ? block.nonce.substr(0, 2) : "......"}</span> */}
                  <span className="text-xs text-[cornflowerblue]">{block.nonce ? Number(block.nonce) : "......"}</span>
                  <div className="ml-2">

                  </div>
                </div>
                {/* <span className="text-sm font-medium textColor1">(3.53 $)</span> */}
              </div>
            </div>
            <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
              <span className="text-sm font-medium textColor1">Timestamp</span>
              <div className="flex text-sm space-x-1 items-center font-mono">
                <span className="textColor2">{Timestamp}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
              <span className="text-sm font-medium textColor1">Total Gas</span>
              <span className="text-sm textColor2 font-mono">
                {Number(block.gasLimit)}
              </span>
            </div>
            <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
              <span className="text-sm font-medium textColor1">
                Block Hash
              </span>
              <span className="text-sm textColor2 font-mono">{block.hash ? block.hash.substr(0, 10) + ".." + block.hash.substr(0, 10) : "......"}</span>
            </div>
            <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
              <span className="text-sm font-medium textColor1">Uncles</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm textColor2 font-mono parseDate">
                  {uncles}
                </span>
                {/* <span className="text-sm textColor2 font-mono">(96839162)</span> */}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}
