import { NextResponse } from "next/server";
import { signinUser } from "../../../model/model";
import dbConnect from "../../../config/config";


const Web3 = require("web3");

export const GET = async () => {
    await dbConnect();
    const transactions = await Transaction.find();
    return  NextResponse.json({
        transactions
    },{
        status:200
    });
}

export function POST(){
    // dbConnect();
    return  NextResponse.json({
        msg:"ok"
    },{
        status:200
    });

    // return new Response('ok')
}