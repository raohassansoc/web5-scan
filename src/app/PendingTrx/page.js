"use client"
import { useState, useEffect } from 'react'
import Subfilter from "../components/SubFilter/page"

import { getPendingTransactionData } from '@/functions'
import { useRouter } from 'next/navigation';

//components
import Modal from '../components/Loder/page'

export default function Page() {
  const router = useRouter();
  const navigate = (path, data) => {
      const queryString = `?data=${encodeURIComponent(JSON.stringify(data))}`;
      router.push(`${path}${queryString}`);
  };

  const [pendingTransaction, setPendingTransaction] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const loderStart = () => {
    setIsModalOpen(true);
  };

  const loderEnd = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getPendingTransaction = async () => {
      try {
        const pendingTransactionData = await getPendingTransactionData();
        setPendingTransaction(pendingTransactionData?.pendingTransactions);
        loderEnd();
      } catch (error) {
        loderStart();
      }
    };

    setInterval(getPendingTransaction, 2000);
  }, []);
  return (
    <>
      {/* <Subfilter /> */}
      <div className="flex flex-col grow appContainer py-10 px-2">
      <Modal isOpen={isModalOpen} onClose={loderEnd} />
        <div className="space-y-2">
          <div className="card">
            <div className="flex flex-col justify-between border-b borderColor pb-3 gap-5 lg:flex-row">
              <div className="flex flex-col space-y-2">
                <span className="cardTitle">Pending Transactions</span>
                <span id="c_widget_es" style={{ visibility: "visible" }} />
              </div>
            </div>
            <div className="mt-4 mb-2" />
            <div className="overflow-auto customScrollBar">
              <table className="w-full appTable singleRowsTable">
                <thead>
                  <tr className="border-b borderColor">
                    {/* <th /> */}
                    <th>Trx Hash</th>
                    {/* <th>Block</th>
                    <th>Inputs</th>
                    <th>Outputs</th>
                    <th>
                      <span className="block text-right">Fees</span>
                    </th>
                    <th>
                      <span className="block text-right">Total Output</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {pendingTransaction.map((transaction, index) => {
                    return (
                      <tr key={index}>
                        {/* <td /> */}
                        <td>
                          <div className="flex flex-col space-y-2">
                            <a
                            onClick={() => navigate("/trxinfo" , `${transaction}`)}
                              className="font-mono link"
                              data-tooltip="bda200b4ff3e297d9c39d66b9b07edfe4df856ab01747300af11c63cc97ed819"
                            >
                              {transaction}
                            </a>
                            {/* <span className="2LinerTimestamp text-xs textColor2">
                              1688392593000
                            </span> */}
                          </div>
                        </td>
                        {/* <td>
                          <div className="flex flex-col">
                            <a className="link font-mono" href="/block/8982511">
                          
                            </a>
                            <div className="flex items-center">
                              <a className="font-mono text-xs link" href="/epoch/421">
                                421
                              </a>
                              <span className="text-xs textColor1 mx-1">/</span>
                              <span className="text-xs textColor1 font-mono">
                                317502
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col space-y-1">
                            <a
                              className="font-mono link"
                              href="/address/addr1qx8lsxeghwrvw74hqdk6jfz26tnhwsqfy4lcc2fg3k560lmn5jn25hu70aue6g8ryf8q6rzx9773cu7p923642p6yz7qjvn0zg"
                            >
                              <span data-tooltip="addr1qx8lsxeghwrvw74hqdk6jfz26tnhwsqfy4lcc2fg3k560lmn5jn25hu70aue6g8ryf8q6rzx9773cu7p923642p6yz7qjvn0zg">
                                addr1qx8lsxeg....2p6yz7qjvn0zg
                              </span>
                            </a>
                            <a
                              className="font-mono link"
                              href="/address/addr1qx8lsxeghwrvw74hqdk6jfz26tnhwsqfy4lcc2fg3k560lmn5jn25hu70aue6g8ryf8q6rzx9773cu7p923642p6yz7qjvn0zg"
                            >
                              <span data-tooltip="addr1qx8lsxeghwrvw74hqdk6jfz26tnhwsqfy4lcc2fg3k560lmn5jn25hu70aue6g8ryf8q6rzx9773cu7p923642p6yz7qjvn0zg">
                                addr1qx8lsxeg....2p6yz7qjvn0zg
                              </span>
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col space-y-1">
                            <a
                              className="font-mono link"
                              href="/address/addr1zxn9efv2f6w82hagxqtn62ju4m293tqvw0uhmdl64ch8uw6j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq6s3z70"
                            >
                              <div className="flex items-center space-x-2 rounded-lg px-2 py-1 bg-[cornflowerblue]-1 w-max dark:bg-darkground-4">
                                <span
                                  className="text-xs"
                                  data-tooltip="addr1zxn9efv2f6w82hagxqtn62ju4m293tqvw0uhmdl64ch8uw6j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq6s3z70"
                                >
                                  Minswap Order Contract
                                </span>
                                <div
                                  className="rounded-full bg-lightground-1 flex dark:bg-darkground h-3 w-3"
                                  data-tooltip="Public Label"
                                >
                                  <span
                                    className="m-auto iconify-inline textColor1"
                                    data-icon="mdi:information-variant"
                                    data-inline="false"
                                    style={{ fontSize: 12 }}
                                  />
                                </div>
                              </div>
                            </a>
                            <a
                              className="font-mono link"
                              href="/address/addr1qx8lsxeghwrvw74hqdk6jfz26tnhwsqfy4lcc2fg3k560lmn5jn25hu70aue6g8ryf8q6rzx9773cu7p923642p6yz7qjvn0zg"
                            >
                              <span data-tooltip="addr1qx8lsxeghwrvw74hqdk6jfz26tnhwsqfy4lcc2fg3k560lmn5jn25hu70aue6g8ryf8q6rzx9773cu7p923642p6yz7qjvn0zg">
                                addr1qx8lsxeg....2p6yz7qjvn0zg
                              </span>
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center justify-end">
                            <div className="flex items-baseline font-mono">
                              <span className="text-base font-medium textColor1">
                                0.
                              </span>
                              <span className="text-xs text-secondary-4 dark:text-secondaryDark-2">
                                234845
                              </span>
                              <div className="ml-2">

                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center justify-end">
                            <div className="flex items-baseline font-mono">
                              <span className="text-base font-medium textColor1">
                                68.
                              </span>
                              <span className="text-xs text-secondary-4 dark:text-secondaryDark-2">
                                92698
                              </span>
                              <div className="ml-2">

                              </div>
                            </div>
                          </div>
                        </td> */}
                      </tr>
                    );
                  })}

                  {/* <tr>
                    <td />
                    <td>
                      <div className="flex flex-col space-y-2">
                        <a
                          className="font-mono link"
                          href="/transaction/0a4209c7d61c1f3fdc55535b99899812fbc06d94807ee1738c3552f10c7e59c4"
                          data-tooltip="0a4209c7d61c1f3fdc55535b99899812fbc06d94807ee1738c3552f10c7e59c4"
                        >
                          0a4209c7d61c1....552f10c7e59c4
                        </a>
                        <span className="2LinerTimestamp text-xs textColor2">
                          1688392593000
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <a className="link font-mono" href="/block/8982511">
                          8982511
                        </a>
                        <div className="flex items-center">
                          <a className="font-mono text-xs link" href="/epoch/421">
                            421
                          </a>
                          <span className="text-xs textColor1 mx-1">/</span>
                          <span className="text-xs textColor1 font-mono">
                            317502
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col space-y-1">
                        <a
                          className="font-mono link"
                          href="/address/addr1zxgx3far7qygq0k6epa0zcvcvrevmn0ypsnfsue94nsn3tvpw288a4x0xf8pxgcntelxmyclq83s0ykeehchz2wtspks905plm"
                        >
                          <div className="flex items-center space-x-2 rounded-lg px-2 py-1 bg-[cornflowerblue]-1 w-max dark:bg-darkground-4">
                            <span
                              className="text-xs"
                              data-tooltip="addr1zxgx3far7qygq0k6epa0zcvcvrevmn0ypsnfsue94nsn3tvpw288a4x0xf8pxgcntelxmyclq83s0ykeehchz2wtspks905plm"
                            >
                              JPG Store V2 Contract
                            </span>
                            <div
                              className="rounded-full bg-lightground-1 flex dark:bg-darkground h-3 w-3"
                              data-tooltip="Public Label"
                            >
                              <span
                                className="m-auto iconify-inline textColor1"
                                data-icon="mdi:information-variant"
                                data-inline="false"
                                style={{ fontSize: 12 }}
                              />
                            </div>
                          </div>
                        </a>
                        <a
                          className="font-mono link"
                          href="/address/addr1q8x0tsycp93w0rnx507mufsh5ql9q6098uzf7c3p9mje9dkuf8u9lphhze56v9zqq3wjsu58040scj7jmc0zny52j0hs3w2rt3"
                        >
                          <span data-tooltip="addr1q8x0tsycp93w0rnx507mufsh5ql9q6098uzf7c3p9mje9dkuf8u9lphhze56v9zqq3wjsu58040scj7jmc0zny52j0hs3w2rt3">
                            addr1q8x0tsyc....y52j0hs3w2rt3
                          </span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col space-y-1">
                        <a
                          className="font-mono link"
                          href="/address/addr1q8x0tsycp93w0rnx507mufsh5ql9q6098uzf7c3p9mje9dkuf8u9lphhze56v9zqq3wjsu58040scj7jmc0zny52j0hs3w2rt3"
                        >
                          <span data-tooltip="addr1q8x0tsycp93w0rnx507mufsh5ql9q6098uzf7c3p9mje9dkuf8u9lphhze56v9zqq3wjsu58040scj7jmc0zny52j0hs3w2rt3">
                            addr1q8x0tsyc....y52j0hs3w2rt3
                          </span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-end">
                        <div className="flex items-baseline font-mono">
                          <span className="text-base font-medium textColor1">
                            0.
                          </span>
                          <span className="text-xs text-secondary-4 dark:text-secondaryDark-2">
                            254396
                          </span>
                          <div className="ml-2">
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-end">
                        <div className="flex items-baseline font-mono">
                          <span className="text-base font-medium textColor1">
                            126.
                          </span>
                          <span className="text-xs text-secondary-4 dark:text-secondaryDark-2">
                            764885
                          </span>
                          <div className="ml-2">
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
