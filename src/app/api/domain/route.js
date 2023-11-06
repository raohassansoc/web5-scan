import { NextResponse } from "next/server";
import { UserToAddressData } from "@/model/model";
import dbConnect from "@/config/config";

export const GET = async (req) => {
    //const data = await req.json(); // POST
    let page = req.nextUrl.searchParams.get('page'); // GET
    let size = req.nextUrl.searchParams.get('size'); // GET

    const limit = size ? size : 12
    const skip = (page ? page - 1 : 1 - 1) * size
  
    try {
    await dbConnect();
    const Domain = await UserToAddressData.find({}).skip(skip).limit(limit).sort({ _id: -1 })
    const TotalDomain = await UserToAddressData.find({}).countDocuments()
        if(Domain){
            return NextResponse.json({
                total: TotalDomain,
                data : Domain
            },{ status: 200 });
        }else{
            return NextResponse.json({
                success: false,
                massage: '404 Not Found' 
            },{ status: 400 });
        }
    } catch (error) {
        return NextResponse.json({
            success: false, 
            message: error.message,
        },{ status: 404 });
    }
}
