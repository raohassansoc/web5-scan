
import axios from "axios";

export function convertEpochToRealTime(epochTime) {
  const realTime = new Date(epochTime * 1000);
  return realTime;
}

export function getTimeDifferenceFromNow(epochTime) {
  const currentTime = new Date().getTime() / 1000;
  const timeDifference = currentTime - epochTime;
  const time = convertMinutesToTime(timeDifference);
  return time;
}

function convertMinutesToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.round(seconds % 60);
if(Number(hours) !== Number(0)){
  return hours+"hour"
}else if(Number(minutes) !== Number(0)){
  return  minutes+"min"
}else{
  return remainingSeconds+"sec"
}
  // return {hours:hours,minutes:minutes,seconds:remainingSeconds};
}

/**
 * Gets the bytecode of the provided address
 */
export const getBytecode = async (address) => {
  try {
    const response = await fetch(`https://mangoscan.io:5000/api/get-bytecode?data=${address}`);
    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }
    const bytecode = await response.json();
    return bytecode;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//////get all accounts///////
export const getAccountData = async () => {
    try {
      const response = await fetch("https://mangoscan.io:5000/api/accounts");
      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
};

/////get Search result
export const getSearchResult = async (searchVal) => {
    try {
      const response = await fetch(`https://mangoscan.io:5000/api/search?keyword=${searchVal}`);
      const data = await response.json();
      if (data) {
        // console.log(data)
        return data;
      }else{
        console.log("Error: " + response.status)
        return false;
      }
    
    } catch (error) {
      console.error("Error fetching data:", error);
      return false;
    }
};

/////grt address details////
export const getUserAddressDetails = async(address) =>{
  const response = await fetch('https://mangoscan.io:5000/address', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address: address }),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data;
}

////get panding transaction////
export const getPendingTransactionData = async () => {
  try {
    const response = await fetch("https://mangoscan.io:5000/api/transactions/pending");
    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

////get all blocks////
export const getBlockData = async (page=1,size=12) => {
  try {
    const response = await fetch(`https://mangoscan.io:5000/api/get/blocks?page=${page}&size=${size}`);
    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

////get all transactions/////
export const getTransactionData = async () => {
  try {
    const response = await fetch("https://mangoscan.io:5000/api/get/transactions");
    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }
    const data = await response.json();
    const reversedData = data.reverse();
    return reversedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getTransactionDatanew = async (page,size=10) => {
  try {
    const response = await fetch(`https://mangoscan.io:5000/api/get/transactions/new?page=${page}&size=${size}`);
    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAddressinfoTrx = async (page,size=10,address) => {
  try {
    const response = await fetch(`https://mangoscan.io:5000/api/get/addressinfo/transactions?page=${page}&size=${size}&keyword=${address}`);
    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
///// getblockdetails using number//////
export const getblockdeta = async (number) => {
  try {
    const response = await fetch(`https://mangoscan.io:5000/getblockdata?number=${number}`);
    const data = await response.json();

    if (response.ok) {
      // console.log(data);
     return data;
    } else {
      console.error(data.error);
      // Handle the error here
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle the error here
  }

};

/////check transaction hash in user to address//////
export const checktransactionhash = async (address) => {
  try {
    const response = await fetch(`https://mangoscan.io:5000/check-address?address=${address}`);
    const data = await response.json();

    if (response.ok) {
      // console.log(data);
      return data;
    } else {
      // return "Nft Not found";
      // console.error(data.error);
      // Handle the error here
    }
  } catch (error) {
    // console.error('An error occurred:', error);
    // Handle the error here
    return error
  }

};


export const checkTrx = async (hash) => {
  try {
    const response = await fetch(`https://mangoscan.io:5000/checkTRX?hash=${hash}`);
    const data = await response.json();
    if (response.ok) {
      // console.log(data);
     return data;
    } else {
      // console.error(data.error)
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle the error here
  }

};

export const getTokenDetails = async (contract_address) => {
  try {
    const response = await fetch(`https://mangoscan.io:5000/getTokenDetails?address=${contract_address}`);
    const data = await response.json();
    if (response.ok) {
     return data;
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export const getHoldersDetails = async (contract_address) => {
  try {
    const response = await fetch(`https://mangoscan.io:5000/getHoldersDetails?address=${contract_address}`);
    const data = await response.json();
    if (response.ok) {
     return data;
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export const getDoamin = async (page,size=10) => {
  try {
    const response = await fetch(`/api/domain?page=${page}&size=${size}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


export const getNewDoamin = async () => {
  try {
    const response = await fetch(`/api/lastDomain`);
    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


// async function mintNewDomain() {

//   // const url = '/api/mintDomain'

//   // axios.get(url)
//   //   .then(response => {
//   //     const data = response.json();
//   //     return data;
//   //   })
//   //   .catch(error => {
//   //       if (error.response) {
//   //          console.error(error.response)
//   //       } else if (error.request) {
//   //           console.error('No response received:', error.request);
//   //       } else {
//   //           console.error('Error', error.message);
//   //       }
//   //       console.error('Error config:', error.config);
//   //   });

//   // process.on('unhandledRejection', (reason, promise) => {
//   //     console.error('Unhandled Rejection at:', promise, 'reason:', reason);
//   // });

//   // const response  = await axios.get('api/mintDomain')
//   // const response = await fetch(`/api/mintDomain`);
//   // if (response.ok) {
//   //   const data = await response.json();
//   //   return data;
//   // }


//   try {
//     // const response  = await axios.get('api/mintDomain')
//     const response = await fetch('/api/mintDomain');

//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     }
    
//   } catch (error) {
//     if (error instanceof Response) {
//       throw new Error(`Server responded with: ${error.statusText}`);
//     }
//     throw error;  
//   }
// }

// setInterval(() => {
//     mintNewDomain().catch(err => {
//         console.error("Unhandled error:", err.message);
//     });
// }, 30000);



