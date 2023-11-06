"use client"
import { useState } from 'react'

export default function Page() {
    return (
        <>
            <div className="mt-3 flex justify-center relative pb-1">
                <div className="hidden absolute left-0 lg:block">
                    <div className="flex items-center pl-2 space-x-0.5">
                        <div className="flex text-xs space-x-2 bg-[cornflowerblue]-1 py-1 px-2 rounded-md dark:bg-darkground-3">
                            <span className="textColor2" style={{ fontSize: 10 }}>
                                ADA
                            </span>
                            <span className="text-[cornflowerblue] font-medium">$ 0.29</span>
                        </div>
                        <div className="flex text-xs space-x-2 bg-[cornflowerblue]-1 py-1 px-2 rounded-md dark:bg-darkground-3">
                            <span className="textColor2" style={{ fontSize: 10 }}>
                                M Cap
                            </span>
                            <span className="text-[cornflowerblue] font-medium">$ 10.21b</span>
                        </div>
                    </div>
                </div>
                <form
                    className="flex w-full h-10 bg-lightground rounded-lg overflow-hidden dark:bg-darkground-3 dark:border dark:border-darkground-4 dark:border-opacity-50"
                    action="/search"
                    method="get"
                    autoComplete="off"
                    style={{ maxWidth: 800 }}
                >
                    <div className="flex pl-2 w-full">
                        <div className="border-r borderColor items-center justify-center pl-2 pr-3 space-x-2 hidden md:flex md:block">
                            <span
                                className="m-auto iconify-inline textColor2"
                                data-icon="mdi:filter"
                                data-inline="false"
                                style={{ fontSize: 20 }}
                            />
                            <div className="relative">
                                <select
                                    className="h-full bg-transparent text-sm textColor2 cursor-pointer pl-1 pr-5 focus:outline-none"
                                    name="filter"
                                    required=""
                                    style={{ appearance: "none" }}
                                >
                                    <option value="all" >
                                        All Filters
                                    </option>
                                    <option value="blocks">Blocks</option>
                                    <option value="epoch">Epochs</option>
                                    <option value="metadata">Metadata</option>
                                    <option value="stakeKey">Stake Keys</option>
                                    <option value="pool">Pools</option>
                                    <option value="token">Tokens</option>
                                    <option value="transaction">Transactions</option>
                                    <option value="address">Addresses</option>
                                </select>
                                <span
                                    className="iconify-inline textColor2 absolute pointer-events-none right-0 top-0.5"
                                    data-icon="mdi:chevron-down"
                                    data-inline="false"
                                    style={{ fontSize: 20 }}
                                />
                            </div>
                        </div>
                        <input
                            className="text-sm h-full w-full pl-2 bg-transparent textColor1 pr-0 focus:outline-none"
                            placeholder="Search transaction, address, block, epoch.slot, pool, stakeKey, policyId.assetName, fingerprint, policyId"
                            type="search"
                            name="value"
                            spellCheck="false"
                        />
                    </div>
                    <button className="px-6 text-white bg-[cornflowerblue] hover:bg-[cornflowerblue]-70">
                        <p className="text-sm">Search</p>
                    </button>
                </form>
            </div>
        </>
    )
}
