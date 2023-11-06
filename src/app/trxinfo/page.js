"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Web3 from 'web3';
import axios from 'axios';
import { ethers } from 'ethers';
import { checktransactionhash } from '@/functions';
import { checkTrx } from '@/functions';
//import function
import { getSearchResult } from '@/functions';
import { getTokenDetails } from '@/functions';
import { getHoldersDetails } from '@/functions';
import contractABI from '../trxinfo/ERC20abi.json';
//components
import Modal from '../components/Loder/page'

export default function Page({ searchParams }) {
  const router = useRouter();
  const navigate = (path, data) => {
    const queryString = `?data=${encodeURIComponent(JSON.stringify(data))}`;
    router.push(`${path}${queryString}`);
  };

  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://134.209.154.96:8545")
  );

  const [data, setData] = useState(searchParams?.data);
  const [trxdata, settrxData] = useState();
  const [nftDetails, setNFTDetails] = useState();
  const [trxDetails, setTrxDetails] = useState();
  const [contractAddress, setConreactAddress] = useState();
  const [totalSupply, setTotalSupply] = useState(null);
  const [balance, setBalance] = useState(null);
  const [decimals, setDecimals] = useState(null);
  const [erc20, seterc20] = useState(false);
  const [holdersData, setHoldersData] = useState([]);
  const [display, setDisplay] = useState('Transaction');
  const [tokenValue, setTokenValue] = useState(null);
  const tokenAddress = "0x9767c8E438Aa18f550208e6d1fDf5f43541cC2c8";
  const [isModalOpen, setIsModalOpen] = useState(true);

  const loderStart = () => {
    setIsModalOpen(true);
  };

  const loderEnd = () => {
    setIsModalOpen(false);
  };


  const getTrxdata = async (value) => {
    const data = await getSearchResult(value);
    await settrxData(data.data[0]);
    loderEnd();
  }
  
  async function fetchhashDrtails(address) {
    const getAccountData = await checktransactionhash(address);
    setNFTDetails(getAccountData);
  }
  async function hashDetails(hash) {
    const data = await checkTrx(hash);
    setTrxDetails(data);
    setConreactAddress(data?.contractAddress)
    getContrect(data?.contractAddress);
  }

  const getHolderBalance = (address) =>{
    console.log(address)
    const contract = new web3.eth.Contract(contractABI, contractAddress)
    contract.methods.balanceOf(address).call()
      .then(balance => {
        const value = Web3.utils.fromWei(balance, "ether");
        return Number(value);
      }).catch(error => {
        console.log(error)
      });
  }

  const getContrect = async (contractAddress) => {
    try{
     const data = await getTokenDetails(contractAddress);
     setBalance(data.balance)
     setTotalSupply(data.totalSupply)
     setDecimals(data.decimals)
     setConreactAddress(contractAddress);
    }catch(error){
     seterc20(true);
     return;
    }
     // try {
     //   const contract = new web3.eth.Contract(contractABI, contractAddress)
     //   contract.methods.balanceOf(contractAddress).call()
     //     .then(balance => {
     //       const value = Number(balance);
     //       const formattedValue = value.toLocaleString();
     //       setBalance(formattedValue)
     //       console.log(balance)
     //     }).catch(error => {
     //       console.error('Contract execution error:', error);
     //       if (error) {
     //         seterc20(true)
     //       }
     //     });
 
     //   contract.methods.totalSupply().call()
     //     .then(totalSupply => {
     //       const value = Number(Web3.utils.fromWei(totalSupply, "ether"));
     //       const formattedValue = value.toLocaleString();
     //       setTotalSupply(formattedValue)
     //       console.log(value)
     //     })
     //     .catch(error => {
     //       console.error('Contract execution error:', error);
     //       if (error) {
     //         seterc20(false)
     //       }
     //     });
 
     //   contract.methods.decimals().call()
     //     .then(decimals => {
     //       setDecimals(Number(decimals))
     //       setConreactAddress(contractAddress);
     //     }).catch(error => {
     //       console.error('Contract execution error:', error);
     //       if (error) {
     //         seterc20(true)
     //       }
     //     });
     // } catch (error) {
     //   seterc20(true);
     //   return;
     // }
   }
 
   const getHolders = async (contractAddress) => {
     setHoldersData([]);
     try{
       const data = await getHoldersDetails(contractAddress);
       for (let i = 0; i < data.length; i++) {
         const percentage = (data[i].value / Number(totalSupply.replace(/,/g, ''))) * 100
         const newdata = {
           address: data[i].to,
           amount: data[i].value,
           percentage : Number(percentage.toFixed(4)).toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 }),
           value : Number(data[i].value * tokenValue).toPrecision(4)
         }
         setHoldersData((holdersData) => [...holdersData, newdata]); 
       }
      }catch(error){
       return;
      }
     // setHoldersData([]);
     // try {
     //   const tokenContract = new web3.eth.Contract(contractABI, contractAddress);
     //   // const tokenContract = new ethers.Contract(contractAddress, contractABI, provider);
     //   const contract = new web3.eth.Contract(contractABI, contractAddress)
     //   const transferEvent = tokenContract.events.Transfer({ fromBlock: 0 }, (error, event) => {
     //     if (!error) {
     //       contract.methods.balanceOf(event.returnValues.to).call()
     //       .then(balance => {
     //         const value = Web3.utils.fromWei(balance, "ether");
     //         const percentage = (value / Number(totalSupply.replace(/,/g, ''))) * 100
     //         const data = {
     //           address: event.returnValues.to,
     //           amount: Web3.utils.fromWei(event.returnValues.value, "ether"),
     //           percentage : Number(percentage.toFixed(4)).toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 }),
     //           value : Number(value * tokenValue).toPrecision(4)
     //         }
     //         setHoldersData((holdersData) => [...holdersData, data]);
     //       }).catch(error => {
     //         console.log(error)
     //       });
     //       transferEvent.unsubscribe();
     //     } else {
     //       console.error('Error:', error);
     //       transferEvent.unsubscribe();
     //     }
     //   });
 
   
      
     // } catch (error) {
     //   console.log("Error occurred: " + error.message);
     // }
     // try {
     //   const contract = new web3.eth.Contract(contractABI, contractAddress)
     //   contract.events.Transfer({ fromBlock: 0 })
     //     .on('data', (event) => {
     //       console.log(event);
     //       contract.methods.balanceOf(event.returnValues.to).call()
     //         .then(balance => {
     //           const value = Web3.utils.fromWei(balance, "ether");
     //           const percentage = (value / Number(totalSupply.replace(/,/g, ''))) * 100
     //           const data = {
     //             address: event.returnValues.to,
     //             amount: Web3.utils.fromWei(event.returnValues.value, "ether"),
     //             percentage: Number(percentage.toFixed(4)).toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 }),
     //             value: Number(value * tokenValue).toPrecision(4)
     //           }
     //           setConreactAddress(contractAddress);
     //           setHoldersData((holdersData) => [...holdersData, data]);
     //           console.log(Number(totalSupply.replace(/,/g, '')));
     //         }).catch(error => {
     //           console.log(error)
     //         });
     //     })
     //     .on('error', (error) => {
     //       console.log("Error occurred: " + error.message);
     //     });
     // } catch (error) {
     //   console.log("Error occurred: " + error.message);
     // }
   }

  useEffect(() => {
    const fetchTokenValue = async () => {
        try {
            const response = await axios.get(
                `https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=${tokenAddress}&vs_currencies=usd`
            );
            const data = response.data;

            const value = data[tokenAddress.toLowerCase()].usd;
            var completeValue = value.toFixed(9);
            console.log(completeValue)
            setTokenValue(value);
        } catch (error) {
            console.error("Error fetching token value:", error);
        }
    };

    fetchTokenValue();
  }, []);


  useEffect(() => {
    hashDetails(trxdata?.hash);
    fetchhashDrtails(trxdata?.hash);
  }, [trxdata?.hash])


  useEffect(() => {
    // console.log(trxDetails?.result?.transaction)
    // console.log(contractAddress.toString())


  }, [trxDetails])

  useEffect(() => {
    getTrxdata(JSON.parse(data));
    // // console.log(trxdata);
  });

  useEffect(() => {
    if (data !== undefined) {
      // console.log(trxdata);
    }
  }, [data]);
  return (
    <>
      <div className="flex flex-col grow appContainer py-10 px-2">
      <Modal isOpen={isModalOpen} onClose={loderEnd} />
        <div className="flex flex-col space-y-5">

          {contractAddress ?
            <div className="card flex flex-col">
              <div className="flex justify-between flex-wrap border-b borderColor pb-3 gap-y-2">
                <div className="flex flex-col gap-y-0.5">
                  <div className="flex items-center">
                    <span className="cardTitle">Contract</span>
                  </div>

                </div>

              </div>

              <div className={decimals !== null ? 'grid grid-cols-1 mt-3 gap-x-5 gap-y-2 md:grid-cols-1' : 'grid grid-cols-1 mt-3 gap-x-5 gap-y-2 md:grid-cols-1'}>
                <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                  <span className="text-sm font-medium textColor1">
                    Address
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="textColor2 text-sm break-all">
                      {contractAddress}
                    </span>
                  </div>
                </div>
                {/* {balance !== null ?
                  <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                    <span className="text-sm font-medium textColor1">
                      Balance:
                    </span>
                    <span className="text-sm textColor2 font-mono">{balance} MMIT</span>
                  </div>
                  :
                  ""
                } */}

              </div>

              <div className="grid grid-cols-1 mt-3 gap-x-5 gap-y-2 md:grid-cols-2">
                {totalSupply !== null ?
                  <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                    <span className="text-sm font-medium textColor1">
                      Total Supply:
                    </span>
                    {/* onClick={() => navigate("/addressinfo", `${nftDetails?.accountAddress}`)} */}
                    <span className="text-sm textColor2 font-mono">{totalSupply}</span>
                  </div>
                  : ''}
                {decimals !== null ?
                  <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                    <span className="text-sm font-medium textColor1">
                      Decimals
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="textColor2 text-sm break-all">
                        {decimals ? Number(decimals) : 'Loding'}
                      </span>
                    </div>
                  </div>
                  : ''}
              </div>

            </div>
            : ""
          }

          <div className="card flex flex-col">

            <div className="flex flex-col justify-between border-b borderColor pb-3 gap-5 lg:flex-row">
              <div className="flex flex-col space-y-2">
                {display === 'Transaction' ?
                <span onClick={() => setDisplay('Transaction')} className="cardTitle">Transaction Details</span>
                : 
                <span onClick={() => setDisplay('Transaction')} style={{color:'cornflowerblue'}} className="cardTitle">Holders Details</span>
                }
                <span id="c_widget_es" style={{ visibility: "visible" }} />
              </div>
              {decimals ?
            <div className="grid grid-cols-2 md:grid-cols-2"> 
              <div style={{alignItems:'self-start'}} className="flex flex-col items-end">
                 {display === 'Transaction' ?
                  <span  style={{cursor:'pointer'}} onClick={async () =>{ await getHolders(contractAddress); setDisplay('Transaction') }} className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3">
                    <div className="text-center flex gap-x-1">
                      <span>Transaction</span>
                      {/* <span className="hidden sm:block">Details</span> */}
                    </div>
                  </span>
                :
                  <span  style={{cursor:'pointer'}} onClick={async () =>{ await getHolders(contractAddress); setDisplay('Transaction') }} className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3">
                    <div style={{color:'gray'}} className="text-center flex gap-x-1">
                      <span>Transaction</span>
                      {/* <span className="hidden sm:block">Details</span> */}
                    </div>
                  </span>
                }
              </div>
              <div style={{alignItems:'self-start'}} className="flex flex-col items-end">
                {display === 'Holders' ?
                  <span style={{cursor:'pointer'}} onClick={async () =>{ await getHolders(contractAddress); setDisplay('Holders') }} className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3">
                    <div className="text-center flex gap-x-1">
                      <span className="hidden sm:block">Holders</span>
                    </div>
                  </span>
                :
                  <span style={{cursor:'pointer'}} onClick={async () =>{ await getHolders(contractAddress); setDisplay('Holders') }} className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3">
                    <div style={{color:'gray'}} className="text-center flex gap-x-1">
                      <span className="hidden sm:block">Holders</span>
                    </div>
                  </span>
                }
              </div>
            </div>
              :''}
            </div>

          
            {display === 'Transaction' ?
            <div className="grid grid-cols-1 mt-3 gap-x-5 gap-y-2 md:grid-cols-2"> 
                <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                  <span className="text-sm font-medium textColor1">
                    Transaction Hash
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="textColor2 text-sm break-all">
                      {trxdata?.hash}
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
                  <span className="text-sm font-medium textColor1">Chain Id</span>
                  <span className="text-sm textColor2 singleLineTimestamp font-mono">
                    {trxdata?.chainId}
                  </span>
                </div>
                <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                  <span className="text-sm font-medium textColor1">Block</span>
                  <a onClick={() => navigate("/blockinfo", `${trxdata?.blockNumber}`)} className="link">
                    <span className="text-sm">{trxdata?.blockNumber}</span>
                  </a>
                </div>
                <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                  <span className="text-sm font-medium textColor1">Total Gas</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-baseline font-mono">
                      {/* <span className="text-sm font-medium text-red-500">0.</span> */}
                      <span className="text-xs text-red-500">{trxdata?.gasPrice}</span>
                      <div className="ml-2">

                      </div>
                    </div>
                    {/* <span className="text-sm font-medium textColor1">(0.05 $)</span> */}
                  </div>
                </div>
                <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                  <span className="text-sm font-medium textColor1">Nonce</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex successInfoButton">
                      <span className="text-xs font-medium">Value</span>
                    </div>
                    <span className="text-xs textColor2">{trxdata?.nonce}</span>
                  </div>
                </div>
                <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                  <span className="text-sm font-medium textColor1">Transfer Value</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-baseline font-mono">
                      <span className="text-sm font-semibold text-[cornflowerblue]">{Web3.utils.fromWei(Number(trxdata?.value), "ether")}</span>
                      {/* <span className="text-xs text-[cornflowerblue]">914449</span> */}
                      <div className="ml-2">

                      </div>
                    </div>
                    {/* <span className="text-sm font-medium textColor1">(3.53 $)</span> */}
                  </div>
                </div>
                <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                  <span className="text-sm font-medium textColor1">From</span>
                  <div className="flex text-sm space-x-1 items-center font-mono">
                    <a className="link" >
                      {/* <span>421</span> */}
                    </a>
                    {/* <span className="textColor2 text-xs">/</span> */}
                    <a onClick={() => navigate("/addressinfo", `${trxdata?.from}`)}>
                      <span className="textColor2 text-sm break-all">{trxdata?.from}</span>
                    </a>
                  </div>
                </div>
                <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                  <span className="text-sm font-medium textColor1">To</span>
                  {trxdata?.to ?
                    <a onClick={() => navigate("/addressinfo", `${trxdata?.to}`)} >
                      <span className="text-sm textColor2 font-mono break-all">{trxdata?.to}</span>
                    </a>
                    :
                    <span className="text-sm textColor2 font-mono">Contract Deployment</span>
                  }

                </div>
                <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                  <span className="text-sm font-medium textColor1">
                    Type
                  </span>
                  <span className="text-sm textColor2 font-mono">{trxdata?.type}</span>
                </div>
                <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                  <span className="text-sm font-medium textColor1">Gas Used</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm textColor2 font-mono parseDate">
                      {trxdata?.gas}
                    </span>
                    {/* <span className="text-sm textColor2 font-mono">(96839162)</span> */}
                  </div>
                </div>
            </div>
            :
            <>
            <div className="grid grid-cols-1 mt-3 gap-x-5 gap-y-2 md:grid-cols-1">
            <div className="overflow-auto customScrollBar">
                <table className="w-full appTable singleRowsTable">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Address</th>
                      <th>Quantity</th>
                      <th>Percentage</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdersData.map((holdersData, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <span className="2LinerTimestamp">{index + 1}</span>
                          </td>
                          <td>
                            <a
                              onClick={() => navigate("/addressinfo", `${holdersData.address}`)}
                              className="link"
                            >
                              {holdersData.address ? holdersData.address : "Address Not found"}
                            </a>
                          </td>
                          <td>
                            <div className="flex flex-col">
                             
                                {holdersData?.amount}
                       
                            </div>
                          </td>
                          <td >
                            <span>{holdersData?.percentage }%</span>
                          </td>
                          <td>
                         
                                <span>${holdersData?.value}</span>
                         
                          </td>
                          
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>  
            </div>
            </>
            }
           
            {display === 'Transaction' ?
            <div style={{ marginTop: '10px' }} className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
              <span className="text-sm font-medium textColor1">Input</span>
              <div
                className="flex flex-col bg-white rounded-md p-2 space-y-1 overflow-auto customScrollBar dark:bg-darkground-4"
                style={{ maxHeight: 100 }}
              >
                <span className="text-xs textColor2">
                  {trxdata?.input}
                </span>
              </div>
            </div>
            :""}
          </div>

          {nftDetails ?
            <div className="card flex flex-col">
              <div className="flex justify-between flex-wrap border-b borderColor pb-3 gap-y-2">
                <div className="flex flex-col gap-y-0.5">
                  <div className="flex items-center">
                    <span className="cardTitle">Domain Details</span>
                  </div>

                </div>

              </div>

              <div className="grid grid-cols-1 mt-3 gap-x-5 gap-y-2 md:grid-cols-2">
                <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                  <span className="text-sm font-medium textColor1">
                    Domain
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="textColor2 text-sm break-all">
                      {nftDetails?.username}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                  <span className="text-sm font-medium textColor1">
                    Domain Owner
                  </span>

                  <span onClick={() => navigate("/addressinfo", `${nftDetails?.accountAddress}`)} className="text-sm textColor2 font-mono">{nftDetails?.accountAddress}</span>

                </div>


              </div>

            </div>
            : ""
          }
        </div>
      </div>

    </>


  )
}
