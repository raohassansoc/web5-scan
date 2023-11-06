"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Web3 from "web3";
///function
import { getSearchResult } from "@/functions";
import { getAddressinfoTrx, getBytecode } from "@/functions";
import { getUserAddressDetails } from "@/functions";
import { getTokenDetails } from "@/functions";
import { getHoldersDetails } from "@/functions";
import contractABI from "../../app/trxinfo/ERC20abi.json";
import Link from "next/link";

//components
import Modal from "../components/Loder/page";

export default function page({ searchParams }) {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://134.209.154.96:8545")
  );




  const router = useRouter();
  const data = JSON.parse(searchParams?.data);
  const [accounts, setAccounts] = useState(0);
  const [transaction, setTransaction] = useState([]);
  const [accountsDetails, setAccountsDetails] = useState();
  const [trxDetails, setTrxDetails] = useState();
  const [contractAddress, setConreactAddress] = useState();
  const [totalSupply, setTotalSupply] = useState(null);
  const [balance, setBalance] = useState(null);
  const [decimals, setDecimals] = useState(null);
  const [display, setDisplay] = useState("Transaction");
  const [tokenValue, setTokenValue] = useState(null);
  const [holdersData, setHoldersData] = useState([]);
  const [erc20, seterc20] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [Totaltransaction, setTotalTransaction] = useState();

  const [byteCode, setByteCode] = useState(null);

  const loderStart = () => {
    setIsModalOpen(true);
  };

  const loderEnd = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    // console.log(JSON.parse(searchParams.data))
    const address = data.account || data;
    setAccounts(address);
    fetchTransactions(address.toLowerCase());
    console.log(address.toLowerCase());
  }, [data, searchParams, accountsDetails]);

  //get transaction history of account using api call
  async function fetchTransactions(address) {
    try {
      const page = currentPage;
      const limit = 10;
      const getTransaction = await getAddressinfoTrx(page, limit, accounts);
      await setTotalTransaction(getTransaction.total);
      await setTransaction(getTransaction?.data);
      loderEnd();
    } catch (error) {
      loderStart();
    }
  }
  async function fetchAddressDrtails(address) {
    try {
      const getAccountData = await getUserAddressDetails(address);
      setAccountsDetails(getAccountData);
      getContrect(address);
      getHolders(address);
    } catch (error) {}
  }

  const navigate = (path, data) => {
    const queryString = `?data=${encodeURIComponent(JSON.stringify(data))}`;
    router.push(`${path}${queryString}`);
  };

  const totalPages = Math.ceil(Totaltransaction / 10);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = transaction.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle next Page button click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    fetchAddressDrtails(accounts);
  }, [accounts, data, contractAddress]);

  useEffect(() => {
    fetchTransactions(accounts);
  }, [currentPage]);
  useEffect(() => {
    // console.log(transaction)
  }, [transaction]);
  const getContrect = async (contractAddress) => {
    try {
      const data = await getTokenDetails(contractAddress);
      setBalance(data.balance);
      setTotalSupply(data.totalSupply);
      setDecimals(data.decimals);
      setConreactAddress(contractAddress);
      console.log(
        "Contract Detail By Rao ",
        data,
        " Contract Adderss: ",
        contractAddress,
        contractABI
      );
    } catch (error) {
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
  };

  const getHolders = async (contractAddress) => {
    setHoldersData([]);
    try {
      const data = await getHoldersDetails(contractAddress);
      for (let i = 0; i < data.length; i++) {
        const percentage =
          (data[i].value / Number(totalSupply.replace(/,/g, ""))) * 100;
        const newdata = {
          address: data[i].to,
          amount: data[i].value,
          percentage: Number(percentage.toFixed(4)).toLocaleString(undefined, {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
          }),
          value: Number(data[i].value * tokenValue).toPrecision(4),
        };
        setHoldersData((holdersData) => [...holdersData, newdata]);
      }
    } catch (error) {
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
  };

  useEffect(() => {
    const fetchTokenValue = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=${tokenAddress}&vs_currencies=usd`
        );
        const data = response.data;

        const value = data[tokenAddress.toLowerCase()].usd;
        var completeValue = value.toFixed(9);
        console.log(completeValue);
        setTokenValue(value);
      } catch (error) {
        console.error("Error fetching token value:", error);
      }
    };

    fetchTokenValue();
  }, []);



  useEffect(() => {
    (async() => {
      try{
        const response = await getBytecode(data);
        const byteCode = response.byteCode;
        if(byteCode){
          setByteCode(byteCode);
        }
      } catch(error){
        console.log(`Error while fetching the bytecode : ${error}`);
      }
    })()
  }, [decimals]);


 const [showFullText, setShowFullText] = useState(false);

 const toggleShowMoreLess = () => {
   setShowFullText(!showFullText);
 };


//  ////////////////////////////////////////// Home Code //////////////////////////////////////
const [isContractAddress, setIsContractAddress] = useState(false);

useEffect(() => {

  (async() => {
    try{
      const response = await getBytecode(data);
      const byteCode = response.byteCode;
      if (byteCode === '0x' || byteCode === '0x0') {
        setIsContractAddress(false);
        console.log("wallet")
      } else {
        setIsContractAddress(true);
        console.log("contract")
      }
    } catch(error){
      console.log(`Error while fetching the bytecode : ${error}`);
    }
  })()

  console.log("validator ==> ", isContractAddress);

},[])

// ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="flex flex-col grow appContainer py-10 px-2">
      <Modal isOpen={isModalOpen} onClose={loderEnd} />
      <div className="flex flex-col space-y-5">
        {decimals ? (
          <div className="card flex flex-col">
            <div className="flex justify-between flex-wrap border-b borderColor pb-3 gap-y-2">
              <div className="flex flex-col gap-y-0.5">
                <div className="flex items-center">
                  <span className="cardTitle">Contract</span>
                </div>
              </div>
            </div>

            <div
              className={
                decimals !== null
                  ? "grid grid-cols-1 mt-3 gap-x-5 gap-y-2 md:grid-cols-1"
                  : "grid grid-cols-1 mt-3 gap-x-5 gap-y-2 md:grid-cols-1"
              }
            >
              <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                <span className="text-sm font-medium textColor1">Address</span>
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
              {totalSupply !== null ? (
                <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                  <span className="text-sm font-medium textColor1">
                    Total Supply:
                  </span>
                  {/* onClick={() => navigate("/addressinfo", `${nftDetails?.accountAddress}`)} */}
                  <span className="text-sm textColor2 font-mono">
                    {totalSupply}
                  </span>
                </div>
              ) : (
                ""
              )}
              {decimals !== null ? (
                <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                  <span className="text-sm font-medium textColor1">
                    Decimals
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="textColor2 text-sm break-all">
                      {decimals ? Number(decimals) : "Loding"}
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <div className="card flex flex-col">
            <div className="flex justify-between items-start border-b borderColor pb-3 flex-wrap gap-y-2">
              <div className="flex flex-col gap-y-0.5">
                <div className="flex items-center gap-x-5 flex-wrap">
                  <span className="cardTitle">Key Details</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs textColor1">Status</span>
                    <div className="flex items-center justify-center successInfoButton">
                      <span className="text-xs font-medium">Active</span>
                    </div>
                  </div>
                </div>
                <span id="c_widget_es" style={{ visibility: "visible" }} />
              </div>
            </div>
            <div className="mt-6 flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-base font-medium text-[cornflowerblue] break-all">
                  {accounts ? accounts : "Address"}
                </span>
              </div>
              {/* <div className="mt-2 flex items-center space-x-2 textColor2 text-[10px]">
                <span className="font-semibold">HEX</span>
                <span className="break-all">
                  {accounts ?  parseInt(accounts.slice(2), 16).toString(2) : "Address"}
                </span>
            
              </div> */}
              <div className="mt-8 grid grid-cols-1 w-full gap-4 md:grid-cols-2">
                <div className="rounded-lg px-5 py-3 flex flex-wrap w-full bg-lightground justify-between items-center dark:bg-darkground-3">
                  <div className="flex flex-col space-y-2">
                    <span className="textColor1 text-sm font-medium">
                      Total Balance
                    </span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-baseline font-mono">
                        <span className="text-secondary-4 dark:text-secondaryDark-2 font-semibold text-sm">
                          {accountsDetails?.balance
                            ? accountsDetails.balance
                            : 0}
                        </span>
                        {/* <span className="text-xs text-secondary-4 dark:text-secondaryDark-2">
                      {accountsDetails?.balance}
                      </span> */}
                        <div className="ml-2"></div>
                      </div>
                      <span
                        className="iconify-inline text-[cornflowerblue]"
                        data-tooltip="Includes rewards balance"
                        data-icon="mdi:information"
                        data-inline="false"
                        style={{ fontSize: 20 }}
                      />
                    </div>
                  </div>
                  <Link
                    href={"/Accounts"}
                    className="flex items-center justify-center viewAllButton dark:hover:bg-darkground-2"
                  >
                    <span className="text-[cornflowerblue] text-xs font-medium">
                      View All Addresses
                    </span>
                  </Link>
                </div>
                <div className="rounded-lg px-5 py-3 flex flex-col w-full bg-lightground space-y-2 dark:bg-darkground-3">
                  <span className="textColor1 text-sm font-medium">
                    Total Transactions
                  </span>
                  <div className="flex items-baseline font-mono">
                    <span className="text-secondary-4 dark:text-secondaryDark-2 font-semibold text-sm">
                      {/* {accountsDetails?.transactionCount ? accountsDetails.transactionCount : 0} */}
                      {transaction ? transaction.length : 0}
                    </span>
                    {/* <span className="text-xs text-secondary-4 dark:text-secondaryDark-2">
                  {accountsDetails?.transactionCount}
                  </span> */}
                    <div className="ml-2"></div>
                  </div>
                </div>
                {/* <div className="rounded-lg px-5 py-3 flex flex-col w-full bg-lightground space-y-2 dark:bg-darkground-3">
                <span className="textColor1 text-sm font-medium">
                  Rewards Available
                </span>
                <div className="flex items-baseline font-mono">
                  <span className="text-secondary-4 dark:text-secondaryDark-2 font-semibold text-sm">
                    1,326.
                  </span>
                  <span className="text-xs text-secondary-4 dark:text-secondaryDark-2">
                    543767
                  </span>
                  <div className="ml-2">
                  </div>
                </div>
              </div>
              <div className="rounded-lg px-5 py-3 flex flex-col w-full bg-lightground space-y-2 dark:bg-darkground-3">
                <span className="textColor1 text-sm font-medium">
                  Delegated To
                </span>
                <a
                  className="link"
                >
                  <span className="text-sm font-medium">Berry [ BERRY ]</span>
                </a>
              </div> */}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col justify-between borderColor pb-3 pt-5 gap-5 lg:flex-row">
          <div className="flex flex-col space-y-2">
            {display === "Transaction" ? (
              <span
                // onClick={() => setDisplay("Transaction")}
                className="cardTitle"
              >
                Transaction
              </span>
            ) : (
              // <span
              //   // onClick={() => setDisplay("Transaction")}
              //   style={{ color: "cornflowerblue" }}
              //   className="cardTitle"
              // >
              //   Holders Details Me
              // </span>
              ""
            )}
            {
              display === "Holders" ? <span
              // onClick={() => setDisplay("Transaction")}
              // style={{ color: "cornflowerblue" }}
              className="cardTitle"
            >
              Holders
            </span> : ""
            }
             {
              display === "Bytecode" ? <span
              // onClick={() => setDisplay("Transaction")}
              // style={{ color: "cornflowerblue" }}
              className="cardTitle"
            >
              ByteCode
            </span> : ""
            }
            <span id="c_widget_es" style={{ visibility: "visible" }} />
          </div>
          {decimals ? (
            <div className="flex">
              <div
                className="flex flex-col items-end"
              >
                 {display === "Transaction" ? (
                  <span className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3">
                    <div className="text-center flex gap-x-1">
                      <span onClick={() => setDisplay("Transaction")}>Transaction</span>
                      {/* <span className="hidden sm:block">Details</span> */}
                    </div>
                  </span>
                ) : (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={async () => {
                      // await setDisplay("Transaction");
                    }}
                    className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3"
                  >
                    <div
                      style={{ color: "gray" }}
                      className="text-center flex gap-x-1"
                    >
                      <span onClick={() => setDisplay("Transaction")}>Transaction</span>
                      {/* <span className="hidden sm:block">Details</span> */}
                    </div>
                  </span>
                )}

              </div>


              {/* /////////// */}
              {
                isContractAddress && <div
                className="flex flex-col items-end"
              >
                 {display === "Bytecode" ? (
                  <span className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3">
                    <div className="text-center flex gap-x-1">
                      <span onClick={() => setDisplay("Bytecode")}>Byte Code</span>
                      {/* <span className="hidden sm:block">Details</span> */}
                    </div>
                  </span>
                ) : (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={async () => {
                      // await setDisplay("Transaction");
                    }}
                    className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3"
                  >
                    <div
                      style={{ color: "gray" }}
                      className="text-center flex gap-x-1"
                    >
                      <span onClick={() => setDisplay("Bytecode")}>Byte Code</span>
                      {/* <span className="hidden sm:block">Details</span> */}
                    </div>
                  </span>
                )}

              </div>
              }
              {/*  */}
              {/* <div
                style={{ alignItems: "self-start" }}
                className="flex flex-col items-end"
              >
                {display === "Transaction" ? (
                  <span className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3">
                    <div className="text-center flex gap-x-1">
                      <span>Transaction Rao 1</span>
                      <span className="hidden sm:block">Details</span>
                    </div>
                  </span>
                ) : (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={async () => {
                      await setDisplay("Transaction");
                    }}
                    className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3"
                  >
                    <div
                      style={{ color: "gray" }}
                      className="text-center flex gap-x-1"
                    >
                      <span>Transaction Rao 2</span>
                      <span className="hidden sm:block">Details</span>
                    </div>
                  </span>
                )}
              </div> */}
              <div
                style={{ }}
                className="flex flex-col items-end"
              >
                {display === "Holders" ? (
                  <span className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3">
                    <div className="text-center flex gap-x-1">
                      <span className="hidden sm:block">Holders</span>
                    </div>
                  </span>
                ) : (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={async () => {
                      await getHolders(contractAddress);
                      setDisplay("Holders");
                    }}
                    className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3"
                  >
                    <div
                      style={{ color: "gray" }}
                      className="text-center flex "
                    >
                      <span className="hidden sm:block">Holders</span>
                    </div>
                  </span>

                )}
              </div>
            </div>
          ) : (
            <div className="flex">
            <div
              className="flex flex-col items-end"
            >
               {display === "Transaction" ? (
                <span className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3">
                  <div className="text-center flex gap-x-1">
                    <span onClick={() => setDisplay("Transaction")}>Transaction</span>
                    {/* <span className="hidden sm:block">Details</span> */}
                  </div>
                </span>
              ) : (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    // await setDisplay("Transaction");
                  }}
                  className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3"
                >
                  <div
                    style={{ color: "gray" }}
                    className="text-center flex gap-x-1"
                  >
                    <span onClick={() => setDisplay("Transaction")}>Transaction</span>
                    {/* <span className="hidden sm:block">Details</span> */}
                  </div>
                </span>
              )}

            </div>


            {/* /////////// */}
            {
isContractAddress && <div
className="flex flex-col items-end"
>
 {display === "Bytecode" ? (
  <span className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3">
    <div className="text-center flex gap-x-1">
      <span onClick={() => setDisplay("Bytecode")}>Byte Code</span>
      {/* <span className="hidden sm:block">Details</span> */}
    </div>
  </span>
) : (
  <span
    style={{ cursor: "pointer" }}
    onClick={async () => {
      // await setDisplay("Transaction");
    }}
    className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3"
  >
    <div
      style={{ color: "gray" }}
      className="text-center flex gap-x-1"
    >
      <span onClick={() => setDisplay("Bytecode")}>Byte Code</span>
      {/* <span className="hidden sm:block">Details</span> */}
    </div>
  </span>
)}

</div>
            }

            {/*  */}
            {/* <div
              style={{ alignItems: "self-start" }}
              className="flex flex-col items-end"
            >
              {display === "Transaction" ? (
                <span className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3">
                  <div className="text-center flex gap-x-1">
                    <span>Transaction Rao 1</span>
                    <span className="hidden sm:block">Details</span>
                  </div>
                </span>
              ) : (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    await setDisplay("Transaction");
                  }}
                  className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3"
                >
                  <div
                    style={{ color: "gray" }}
                    className="text-center flex gap-x-1"
                  >
                    <span>Transaction Rao 2</span>
                    <span className="hidden sm:block">Details</span>
                  </div>
                </span>
              )}
            </div> */}

          </div>
          )}
        </div>
        <div className="card">
          <div
            className="flex flex-col"
            id="stakeKeyDetailsTab"
            data-tab-navigation=""
          >
            {display === "Transaction" ? (
              <div className="flex flex-col justify-between border-b borderColor pb-3 gap-5 lg:flex-row">
                <div className="flex flex-col space-y-2">
                  <span className="cardTitle">History</span>
                  <span id="c_widget_es" style={{ visibility: "visible" }} />
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex bg-lightground-2 px-1 py-1 rounded-lg items-center dark:bg-darkground-3">
                    <a
                      className="py-2 pr-1 pl-2 rounded-lg flex items-center space-x-1 cursor-default text-secondary-3 "
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                    >
                      <span
                        className="iconify-inline"
                        id="copy-undefined"
                        data-icon="mdi:chevron-double-left"
                        data-inline="false"
                        style={{ fontSize: 18 }}
                      />
                      <span className="text-xs font-medium">Previous</span>
                    </a>
                    <a className="py-2 pr-3 pl-2 rounded-lg flex items-center space-x-1 cursor-default text-secondary-3 pointer-events-none">
                      <span
                        className="iconify-inline"
                        id="copy-undefined"
                        data-icon="mdi:chevron-left"
                        data-inline="false"
                        style={{ fontSize: 18 }}
                      />
                    </a>
                    <span className="text-xs text-[cornflowerblue] font-medium px-3 py-2 bg-white rounded-lg cursor-default dark:bg-darkground sm:mx-3">
                      <div className="text-center flex gap-x-1">
                        <span>Page {currentPage}</span>
                        <span className="hidden sm:block">of {totalPages}</span>
                      </div>
                    </span>
                    <a className="py-2 pl-3 pr-2 rounded-lg flex items-center space-x-1 hover:bg-white cursor-pointer text-[cornflowerblue] dark:hover:bg-darkground">
                      <span
                        className="iconify-inline"
                        id="copy-undefined"
                        data-icon="mdi:chevron-right"
                        data-inline="false"
                        style={{ fontSize: 18 }}
                      />
                    </a>
                    <a
                      className="py-2 pl-1 pr-2 rounded-lg flex items-center space-x-1 hover:bg-white cursor-pointer sm:pl-3 text-[cornflowerblue] dark:hover:bg-darkground"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      <span className="text-xs font-medium">Next</span>
                      <span
                        className="iconify-inline"
                        id="copy-undefined"
                        data-icon="mdi:chevron-double-right"
                        data-inline="false"
                        style={{ fontSize: 18 }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {display === "Transaction" ? (
              <div className="tabContent" id="delegationhistory">
                <div className="overflow-auto">
                  <table className="w-full appTable singleRowsTable">
                    <thead>
                      <tr>
                        <th>Transaction</th>
                        <th>Timestamp</th>
                        <th>Nonce</th>
                        <th>
                          <div className="flex flex-col items-start">
                            <span>Block</span>
                            <span className="text-xs">Gas / Value</span>
                          </div>
                        </th>
                        <th>To / From</th>
                        <th>Chain ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transaction.map((Transactions, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <a
                                onClick={() =>
                                  navigate("/trxinfo", `${Transactions.hash}`)
                                }
                                className="link"
                                data-tooltip="5d534f44a6df7b83f1a195dbc1e1326105edd13c92841ab98c0fdc385a2d9a45"
                              >
                                {Transactions.hash
                                  ? Transactions.hash.substr(0, 10) +
                                    "...." +
                                    Transactions.hash.substr(58, 68)
                                  : "......"}
                              </a>
                            </td>
                            <td>
                              {new Date(
                                Transactions?.timestamp * 1000
                              ).toLocaleString()}
                            </td>
                            <td>
                              <span className="2LinerTimestamp">
                                {Transactions?.nonce}
                              </span>
                            </td>
                            <td>
                              <div className="flex flex-col">
                                <a
                                  onClick={() =>
                                    navigate(
                                      "/blockinfo",
                                      `${Transactions.blockNumber}`
                                    )
                                  }
                                  className="link font-mono"
                                >
                                  {Transactions?.blockNumber}
                                </a>
                                <div className="flex items-center">
                                  <a className="font-mono text-xs link">
                                    {Transactions?.gas}
                                  </a>
                                  <span className="text-xs textColor1 mx-1">
                                    /
                                  </span>
                                  <span className="text-xs textColor1">
                                    {Transactions.value
                                      ? Web3.utils.fromWei(
                                          Transactions.value,
                                          "ether"
                                        )
                                      : "0"}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              {Transactions.to ? (
                                <a
                                  onClick={() =>
                                    navigate(
                                      "/addressinfo",
                                      `${Transactions.to}`
                                    )
                                  }
                                  className="link"
                                  data-tooltip="2a748e3885f6f73320ad16a8331247b81fe01b8d39f57eec9caa5091"
                                >
                                  <span>
                                    {" "}
                                    {Transactions.to
                                      ? Transactions.to.substr(0, 10) +
                                        "...." +
                                        Transactions.to.substr(32, 42)
                                      : "......"}
                                  </span>
                                </a>
                              ) : (
                                <a
                                  className="link"
                                  data-tooltip="2a748e3885f6f73320ad16a8331247b81fe01b8d39f57eec9caa5091"
                                >
                                  <span>Contract</span>
                                </a>
                              )}

                              <br />
                              <a
                                onClick={() =>
                                  navigate(
                                    "/addressinfo",
                                    `${Transactions.from}`
                                  )
                                }
                                className="link"
                                data-tooltip="2a748e3885f6f73320ad16a8331247b81fe01b8d39f57eec9caa5091"
                              >
                                <span>
                                  {" "}
                                  {Transactions.from
                                    ? Transactions.from.substr(0, 10) +
                                      "...." +
                                      Transactions.from.substr(32, 42)
                                    : "......"}
                                </span>
                              </a>
                            </td>
                            <td>
                              <span>{Transactions?.chainId}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <>
                {/* <div className="grid grid-cols-1 mt-3 gap-x-5 gap-y-2 md:grid-cols-1">
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
                                <span className="2LinerTimestamp">
                                  {index + 1}
                                </span>
                              </td>
                              <td>
                                <span style={{ color: "gray" }}>
                                  {holdersData.address
                                    ? holdersData.address
                                    : "Address Not found"}
                                </span>
                              </td>
                              <td>
                                <div className="flex flex-col">
                                  {holdersData?.amount}
                                </div>
                              </td>
                              <td>
                                <span>{holdersData?.percentage}%</span>
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
                </div> */}
                {/*//////////////////////////////////  OLD Code ///////////////////////////////// */}

              </>
            )}
            {
              display === "Holders" ? <div className="grid grid-cols-1 mt-3 gap-x-5 gap-y-2 md:grid-cols-1">
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
                            <span className="2LinerTimestamp">
                              {index + 1}
                            </span>
                          </td>
                          <td>
                            <span style={{ color: "gray" }}>
                              {holdersData.address
                                ? holdersData.address
                                : "Address Not found"}
                            </span>
                          </td>
                          <td>
                            <div className="flex flex-col">
                              {holdersData?.amount}
                            </div>
                          </td>
                          <td>
                            <span>{holdersData?.percentage}%</span>
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
            </div> : ""
            }
            {
              display === "Bytecode" ? <>
               {
                  byteCode != null ? <div className="flex flex-col space-y-1 bg-lightground rounded-lg px-3 py-2.5 dark:bg-darkground-3">
                  <span className="text-sm font-medium textColor1">Byte Code</span>
                  <div className="flex items-center space-x-2">
                    <span className="textColor2 text-sm break-all">
                      {/* {byteCode} */}
                      <div>
                         {showFullText ? (
                           <p>{byteCode}</p>
                         ) : (
                           <p>{byteCode.slice(0, 50)}...</p>
                         )}
                         <button onClick={toggleShowMoreLess}>
                           {showFullText ? 'Show Less' : 'Show More'}
                         </button>
                       </div>
                    </span>
                  </div>
                </div> : ""
                }
              </> : ""
            }
            {/* 
            <div className="tabContent" id="delegationhistory">
              <div className="overflow-auto">
                <table className="w-full appTable singleRowsTable">
                  <thead>
                    <tr>
                      <th>Transaction</th>
                      <th>Timestamp</th>
                      <th>Nonce</th>
                      <th>
                        <div className="flex flex-col items-start">
                          <span>Block</span>
                          <span className="text-xs">Gas / Value</span>
                        </div>
                      </th>
                      <th>To / From</th>
                      <th>Chain ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageItems.slice().reverse().map((Transactions, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <a
                              onClick={() => navigate("/trxinfo", `${Transactions.hash}`)}
                              className="link"
                              data-tooltip="5d534f44a6df7b83f1a195dbc1e1326105edd13c92841ab98c0fdc385a2d9a45"
                            >
                              {Transactions.hash ? Transactions.hash.substr(0, 10) + "...." + Transactions.hash.substr(58, 68) : "......"}
                            </a>
                          </td>
                          <td>
                          {new Date(Transactions?.timestamp * 1000).toLocaleString()}
                          </td>
                          <td>
                            <span className="2LinerTimestamp">{Transactions?.nonce}</span>
                          </td>
                          <td>
                            <div className="flex flex-col">
                              <a onClick={() => navigate("/blockinfo", `${Transactions.blockNumber}`)} className="link font-mono" >
                                {Transactions?.blockNumber}
                              </a>
                              <div className="flex items-center">
                                <a
                                  className="font-mono text-xs link"
                                >
                                  {Transactions?.gas}
                                </a>
                                <span className="text-xs textColor1 mx-1">/</span>
                                <span className="text-xs textColor1">{Transactions.value ? Web3.utils.fromWei(Transactions.value, "ether") : "0"}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            {Transactions.to ?
                              <a
                                onClick={() => navigate("/addressinfo", `${Transactions.to}`)}
                                className="link"
                                data-tooltip="2a748e3885f6f73320ad16a8331247b81fe01b8d39f57eec9caa5091"
                              >
                                <span> {Transactions.to ? Transactions.to.substr(0, 10) + "...." + Transactions.to.substr(32, 42) : "......"}</span>
                              </a>
                              :
                              <a
                                className="link"
                                data-tooltip="2a748e3885f6f73320ad16a8331247b81fe01b8d39f57eec9caa5091"
                              >
                                <span>Contract</span>
                              </a>
                            }
                            <br />
                            <a
                              onClick={() => navigate("/addressinfo", `${Transactions.from}`)}
                              className="link"
                              data-tooltip="2a748e3885f6f73320ad16a8331247b81fe01b8d39f57eec9caa5091"
                            >
                              <span> {Transactions.from ? Transactions.from.substr(0, 10) + "...." + Transactions.from.substr(32, 42) : "......"}</span>
                            </a>
                          </td>
                          <td>
                            <span>{Transactions?.chainId}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}