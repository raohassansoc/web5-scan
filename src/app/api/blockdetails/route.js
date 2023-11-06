// import { NextResponse } from "next/server";
// import { dbConnect } from "@/config/config";
// import { BlockData } from "@/model/model";

// const Web3 = require("web3");
// const providerUrl = "http://134.209.154.96:8545";
// const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
// let previousBlock = null;

// export const GET = async () => {
//     dbConnect();
//     await web3.eth.getBlock("latest", async (error, latestBlock) => {
//         if (error) {
//             console.error("Error:", error);
//         } else {
//             if (previousBlock && previousBlock.hash !== latestBlock.hash) {
//             }
//             previousBlock = latestBlock;
//         }
//     });
//     return NextResponse.json({
//         previousBlock
//     }, {
//         status: 200
//     });
// }
// setInterval(GET, 3000);

// export function POST() {
//     dbConnect();
//     return NextResponse.json({
//         msg: "ok"
//     }, {
//         status: 200
//     });

//     // return new Response('ok')
// }