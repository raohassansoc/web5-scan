import { NextResponse } from "next/server";
import axios from "axios";
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

async function sendUserDataToExternalAPI() {
    const randomName = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        length: 1
    });

    const data = {
        username: randomName + '.mmit',
        accountAddress: '0x0767b8C4491dDb74711365c0f858b2925377A27c'
    };

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://54.87.155.123:6000/api/usertoAddress',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer Z2hkZmdkZmctZGZzZG1mMzJta21zZGtmbjEyZGtsZm1sa2RtZmxrZG0zNDNmNGdmZzVx`
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        if (error.response) {
            return { error: error.response.data };
        } else if (error.request) {
            return { error: 'No response from server.' };
        } else {
            return { error: error.message };
        }
    }
}

export const GET = async (req) => {
    
    try {
        const HitApi = await sendUserDataToExternalAPI();
        if (HitApi.error) {
            return NextResponse.json({
                success: false,
                message: HitApi.error,
            }, { status: 500 });
        }
        return NextResponse.json({
            HitApi
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error.',
        }, { status: 500 });
    }
}
