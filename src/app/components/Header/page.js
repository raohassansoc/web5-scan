"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image';
import logo from '../../../logo.png'
// import logo from "../../../logo.png"
// import { Link } from 'react-router-dom'


export default function Page() {
  const router = useRouter()

  return (
    <>
      <header>
        <div className="" style={{ background: `linear-gradient(to bottom, #4FC3F7, #1565C0)` }}>
          <div className="appContainer py-3 flex justify-between items-center">
            <div className="relative">
              <a className="flex items-center" href="/">
                {/* <Image
                  className="h-12 dark:hidden"
                  src={logo}
                  alt="mangoscan"
                  width={180}
                />
                <Image
                  className="h-12 hidden dark:block"
                  src={logo}
                  alt="mangoscan"
                  width={180}
                /> */}
                {/* <h2 className='text-[cornflowerblue] font-[inherit] font-extrabold text-[27px]' >SOC<span className='font-[cursive]'>scan</span></h2> */}
                <img src='/images/portfolio-logo.png' alt='picture' width={'150px'}  height={'50px'}/>
              </a>
            </div>
            <div className="hidden lg:block">
              <div
                className="flex  flex-col gap-x-5 gap-y-2 text grow justify-center text-secondary-2 lg:flex-row lg:items-center dark:text-secondaryDark-5"
                id="navigationBar"
              >
                <Link href={"/"}
                  className="hover:text-secondary-1 dark:hover:text-secondaryDark-1"

                  style={{ color: "white" }}
                >
                  Home
                </Link>
                <div className="relative" data-dropdown="" data-navigation-group="">
                  <Link href={"/Transactions"}>
                    <button
                      className="flex items-center hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                      type="button"
                      aria-expanded="true"
                      aria-haspopup="true"
                      data-dropdown-button=""
                      style={{ color: "white" }}
                    >
                      <span>Transactions</span>
                      <span
                        className="ml-1 iconify-inline"
                        data-icon="mdi:menu-down"
                        data-inline="false"
                        style={{ fontSize: 15 }}
                      />
                    </button>
                  </Link>
                </div>
                <Link href={"/Blocks"}
                  className="hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                  style={{ color: "white" }}
                >
                  Blocks
                </Link>

                <Link href={"/PendingTrx"}
                  className="hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                  style={{ color: "white" }}
                >
                  Pending Transactions
                </Link>
                {/* <Link href={"/Domain"}
                  className="hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                >
                  Domain
                </Link> */}
                <div className="relative" data-dropdown="" data-navigation-group="">
                  <Link href={"/Accounts"}>
                    <button
                      className="flex items-center hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                      type="button"
                      aria-expanded="true"
                      aria-haspopup="true"
                      data-dropdown-button=""
                      style={{ color: "white" }}
                    >
                      <span>Accounts</span>
                      <span
                        className="ml-1 iconify-inline"
                        data-icon="mdi:menu-down"
                        data-inline="false"
                        style={{ fontSize: 15 }}
                      />
                    </button>
                  </Link>

                </div>
                {/* <div className="relative" data-dropdown="" data-navigation-group="">
                  <button
                    className="flex items-center hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                    type="button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    data-dropdown-button=""
                  >
                    <span>More</span>
                    <span
                      className="ml-1 iconify-inline"
                      data-icon="mdi:menu-down"
                      data-inline="false"
                      style={{ fontSize: 15 }}
                    />
                  </button>
                  <div
                    className="origin-top-right absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-[cornflowerblue]-1 px-1 hidden z-50 focus:outline-none dark:bg-darkground-3 dark:ring-darkground-4"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                    data-dropdown-content=""
                  >
                    <div
                      className="flex flex-col text-secondary-4 text-sm py-1 dark:text-secondaryDark-2"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <a
                        className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                        href="/datumInspector"
                        data-navigation-link=""
                        target="_blank"
                      >
                        Datum Inspector
                      </a>
                      <a
                        className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                        href="/addressInspector"
                        data-navigation-link=""
                        target="_blank"
                      >
                        Address Inspector
                      </a>
                      <a
                        className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                        href="https://dash.mangoscan.io/auth/login"
                        data-navigation-link=""
                        target="_blank"
                      >
                        Dashboard
                      </a>
                      <a
                        className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                        href="/spo-polls"
                        data-navigation-link=""
                        target="_blank"
                      >
                        SPO Polls
                      </a>
                      <a
                        className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                        href="https://t.me/mangoscanbot"
                        data-navigation-link=""
                        target="_blank"
                      >
                        Telegram Bot
                      </a>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-4">
                <div className="hidden lg:block">
                  <div className="relative" data-dropdown="">
                    {/* <button
                      className="flex cursor-default items-center rounded-lg pl-3 pr-2 bg-[cornflowerblue]-1 hover:bg-[cornflowerblue]-2 py-1.5 dark:bg-darkground-4 dark:hover:bg-opacity-80"
                      type="button"
                      aria-expanded="true"
                      aria-haspopup="true"
                      data-dropdown-button=""
                    >
                      <span className="text-sm font-medium text-[cornflowerblue]"
                        style={{ color: "white" }}
                      >
                        Mainnet
                      </span>
                      <span
                        className="ml-2 iconify-inline text-[cornflowerblue]"
                        data-icon="mdi:menu-down"
                        data-inline="false"
                        style={{ fontSize: 15 }}
                      />
                    </button> */}

                  </div>
                </div>

              </div>
              <div className="lg:hidden">
                <button
                  className="relative textColor1 flex items-center"
                  id="menuBar"
                >
                  <span
                    className="iconify-inline text-3xl"
                    data-icon="mdi:menu"
                    data-inline="false"
                  />
                </button>
                <div
                  className="absolute left-0 mt-4 bg-white px-5 py-5 w-full shadow-md z-10 dark:bg-darkground-2"
                  id="menuContent"
                  style={{ display: "none" }}
                >
                  <div className="flex flex-col items-start">
                    <div
                      className="flex flex-col gap-x-5 gap-y-2 text grow justify-center text-secondary-2 lg:flex-row lg:items-center dark:text-secondaryDark-5"
                      id="navigationBar"
                    >
                      <a
                        className="hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                        href="/"
                        data-navigation-link=""
                      >
                        Home
                      </a>
                      <div
                        className="relative"
                        data-dropdown=""
                        data-navigation-group=""
                      >
                        <button
                          className="flex items-center hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                          type="button"
                          aria-expanded="true"
                          aria-haspopup="true"
                          data-dropdown-button=""
                        >
                          <span>Blockchain</span>
                          <span
                            className="ml-1 iconify-inline"
                            data-icon="mdi:menu-down"
                            data-inline="false"
                            style={{ fontSize: 15 }}
                          />
                        </button>
                        <div
                          className="origin-top-right absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-[cornflowerblue]-1 px-1 hidden z-50 focus:outline-none dark:bg-darkground-3 dark:ring-darkground-4"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="menu-button"
                          tabIndex={-1}
                          data-dropdown-content=""
                        >
                          <div
                            className="flex flex-col text-secondary-4 text-sm py-1 dark:text-secondaryDark-2"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/mempoolTransactions"
                              data-navigation-link=""
                            >
                              Mempool Transactions
                            </a>
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/transactions"
                              data-navigation-link=""
                            >
                              Transactions
                            </a>
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/blocks"
                              data-navigation-link=""
                            >
                              Blocks
                            </a>
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/epochs"
                              data-navigation-link=""
                            >
                              Epochs
                            </a>
                            <hr className="my-1 borderColor" />
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/contractTransactions"
                              data-navigation-link=""
                            >
                              Contract Transactions
                            </a>
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/withdrawals"
                              data-navigation-link=""
                            >
                              Withdrawals
                            </a>
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/protocolUpdates"
                              data-navigation-link=""
                            >
                              Protocol Updates
                            </a>
                            <hr className="my-1 borderColor" />
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/topStakingAccounts"
                              data-navigation-link=""
                            >
                              Top Staking Accounts
                            </a>
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/topAddresses"
                              data-navigation-link=""
                            >
                              Top Addresses
                            </a>
                          </div>
                        </div>
                      </div>
                      <a
                        className="hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                        href="/metadata"
                        data-navigation-link=""
                      >
                        Metadata
                      </a>
                      <div
                        className="relative"
                        data-dropdown=""
                        data-navigation-group=""
                      >
                        <button
                          className="flex items-center hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                          type="button"
                          aria-expanded="true"
                          aria-haspopup="true"
                          data-dropdown-button=""
                        >
                          <span>Tokens</span>
                          <span
                            className="ml-1 iconify-inline"
                            data-icon="mdi:menu-down"
                            data-inline="false"
                            style={{ fontSize: 15 }}
                          />
                        </button>
                        <div
                          className="origin-top-right absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-[cornflowerblue]-1 px-1 hidden z-50 focus:outline-none dark:bg-darkground-3 dark:ring-darkground-4"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="menu-button"
                          tabIndex={-1}
                          data-dropdown-content=""
                        >
                          <div
                            className="flex flex-col text-secondary-4 text-sm py-1 dark:text-secondaryDark-2"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/tokens"
                              data-navigation-link=""
                            >
                              Tokens
                            </a>
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/tokentransactions"
                              data-navigation-link=""
                            >
                              Token Transactions
                            </a>
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/tokenminttransactions"
                              data-navigation-link=""
                            >
                              Mint Transactions
                            </a>
                          </div>
                        </div>
                      </div>
                      <a
                        className="hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                        href="/pools"
                        data-navigation-link=""
                      >
                        Pools
                      </a>
                      <div
                        className="relative"
                        data-dropdown=""
                        data-navigation-group=""
                      >
                        <button
                          className="flex items-center hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                          type="button"
                          aria-expanded="true"
                          aria-haspopup="true"
                          data-dropdown-button=""
                        >
                          <span>Certificates</span>
                          <span
                            className="ml-1 iconify-inline"
                            data-icon="mdi:menu-down"
                            data-inline="false"
                            style={{ fontSize: 15 }}
                          />
                        </button>
                        <div
                          className="origin-top-right absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-[cornflowerblue]-1 px-1 hidden z-50 focus:outline-none dark:bg-darkground-3 dark:ring-darkground-4"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="menu-button"
                          tabIndex={-1}
                          data-dropdown-content=""
                        >
                          <div
                            className="flex flex-col text-secondary-4 text-sm py-1 dark:text-secondaryDark-2"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/certificates/poolRegistrations"
                              data-navigation-link=""
                            >
                              Pool Registrations
                            </a>
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/certificates/poolDeRegistrations"
                              data-navigation-link=""
                            >
                              Pool Deregistrations
                            </a>
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/certificates/delegations"
                              data-navigation-link=""
                            >
                              Delegations
                            </a>
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/certificates/stakeKeyRegistrations"
                              data-navigation-link=""
                            >
                              Stake Key Registrations
                            </a>
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/certificates/stakeKeyDeRegistrations"
                              data-navigation-link=""
                            >
                              Stake Key DeRegistrations
                            </a>
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/certificates/InstantaneousRewards"
                              data-navigation-link=""
                            >
                              Instantaneous Rewards
                            </a>
                          </div>
                        </div>
                      </div>
                      <div
                        className="relative"
                        data-dropdown=""
                        data-navigation-group=""
                      >
                        <button
                          className="flex items-center hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                          type="button"
                          aria-expanded="true"
                          aria-haspopup="true"
                          data-dropdown-button=""
                        >
                          <span>More</span>
                          <span
                            className="ml-1 iconify-inline"
                            data-icon="mdi:menu-down"
                            data-inline="false"
                            style={{ fontSize: 15 }}
                          />
                        </button>
                        <div
                          className="origin-top-right absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-[cornflowerblue]-1 px-1 hidden z-50 focus:outline-none dark:bg-darkground-3 dark:ring-darkground-4"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="menu-button"
                          tabIndex={-1}
                          data-dropdown-content=""
                        >
                          <div
                            className="flex flex-col text-secondary-4 text-sm py-1 dark:text-secondaryDark-2"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/datumInspector"
                              data-navigation-link=""
                              target="_blank"
                            >
                              Datum Inspector
                            </a>
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/addressInspector"
                              data-navigation-link=""
                              target="_blank"
                            >
                              Address Inspector
                            </a>
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="https://dash.mangoscan.io/auth/login"
                              data-navigation-link=""
                              target="_blank"
                            >
                              Dashboard
                            </a>
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="/spo-polls"
                              data-navigation-link=""
                              target="_blank"
                            >
                              SPO Polls
                            </a>
                            <a
                              className="pl-3 pr-7 py-2 rounded-md hover:bg-[cornflowerblue]-1 dark:hover:bg-darkground-4 hover:text-secondary-1 dark:hover:text-secondaryDark-1"
                              href="https://t.me/mangoscanbot"
                              data-navigation-link=""
                              target="_blank"
                            >
                              Telegram Bot
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5">
                      <div className="relative" data-dropdown="">
                        <button
                          className="flex items-center rounded-lg pl-3 pr-2 bg-[cornflowerblue]-1 hover:bg-[cornflowerblue]-2 py-1.5 dark:bg-darkground-4 dark:hover:bg-opacity-80"
                          type="button"
                          aria-expanded="true"
                          aria-haspopup="true"
                          data-dropdown-button=""
                        >
                          <span className="text-sm font-medium text-[cornflowerblue]">
                            Mainnet
                          </span>
                          <span
                            className="ml-2 iconify-inline text-[cornflowerblue]"
                            data-icon="mdi:menu-down"
                            data-inline="false"
                            style={{ fontSize: 15 }}
                          />
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
