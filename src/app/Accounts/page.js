
"use client"
import React, { useState, useEffect } from 'react'
import { Link } from 'next/link';
import { getAccountData } from '@/functions';
import { useRouter } from 'next/navigation';

//components
import Modal from '../components/Loder/page'

export default function Page() {
  const router = useRouter();


  const navigate = (path , data) => {
      const queryString = `?data=${encodeURIComponent(JSON.stringify(data))}`;
      router.push(`${path}${queryString}`);
  };

  const [accounts, setAccountData] = useState([]);


  const [isModalOpen, setIsModalOpen] = useState(true);

  const loderStart = () => {
    setIsModalOpen(true);
  };

  const loderEnd = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    const fetchDataAccount = async () => {
      try {
        const value = await getAccountData();
        await setAccountData(value.accounts);
        loderEnd();
      } catch (error) {
        loderStart();
      }
    };
    fetchDataAccount();
  }, [accounts]);


  return (
    <>
      <div className="flex flex-col grow appContainer py-10 px-2">
      <Modal isOpen={isModalOpen} onClose={loderEnd} />
        <div className="space-y-2">
          <div className="card overflow-auto">
            <div className="flex flex-col justify-between border-b borderColor pb-3 gap-5 lg:flex-row">
              <div className="flex flex-col space-y-2">
                <span className="cardTitle">Accounts</span>
                <span id="c_widget_es" style={{ visibility: "visible" }} />
              </div>
              {/* <div className="flex flex-col items-end space-y-2">
                <div className="flex bg-lightground-2 px-1 py-1 rounded-lg items-center dark:bg-darkground-3">
                  <a
                    className="py-2 pr-1 pl-2 rounded-lg flex items-center space-x-1 cursor-default text-secondary-3 pointer-events-none"
                    href="?PageNo=1&"
                  >
                    <span
                      className="iconify-inline"
                      id="copy-undefined"
                      data-icon="mdi:chevron-double-left"
                      data-inline="false"
                      style={{ fontSize: 18 }}
                    />
                    <span className="text-xs font-medium">First</span>
                  </a>
                  <a
                    className="py-2 pr-3 pl-2 rounded-lg flex items-center space-x-1 cursor-default text-secondary-3 pointer-events-none"
                    href="?PageNo=0&"
                  >
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
                      <span>Page 1</span>
                      <span className="hidden sm:block">of 10000</span>
                    </div>
                  </span>
                  <a
                    className="py-2 pl-3 pr-2 rounded-lg flex items-center space-x-1 hover:bg-white cursor-pointer text-[cornflowerblue] dark:hover:bg-darkground"
                    href="?PageNo=2&"
                  >
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
                    href="?PageNo=10000&"
                  >
                    <span className="text-xs font-medium">Last</span>
                    <span
                      className="iconify-inline"
                      id="copy-undefined"
                      data-icon="mdi:chevron-double-right"
                      data-inline="false"
                      style={{ fontSize: 18 }}
                    />
                  </a>
                </div>
                <span className="mr-2 text-sm textColor2">
                  Total Blocks: 8,982,767
                </span>
              </div> */}
            </div>
            <div className="mt-4 mb-2" />
            <div className="overflow-auto">
              <table className="w-full appTable singleRowsTable">
                <thead>
                  <tr className="border-b borderColor">
                    <th>S No.</th>
                    <th>Address</th>

                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <a className="link font-mono">
                            {index + 1}
                          </a>
                        </td>
                        <td>
                          <div className="flex items-center">
                      
                              <a onClick={() => navigate("/addressinfo" , {account})} className="font-mono text-sm link" >
                                {account}
                              </a>
                     
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
