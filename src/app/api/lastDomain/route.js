import { NextResponse } from "next/server";
import { UserToAddressData } from "@/model/model";
import dbConnect from "@/config/config";

export const GET = async (req) => {
    try {
        await dbConnect();


        const lastEntry = await UserToAddressData.find({}).sort({ _id: -1 }).limit(1);

        if (lastEntry && lastEntry.length > 0) {
            return NextResponse.json({
                success: true,
                data: lastEntry[0] 
            }, { status: 200 });
        } else {
            return NextResponse.json({
                success: false,
                message: 'No data found' 
            }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        }, { status: 500 });
    }
}
