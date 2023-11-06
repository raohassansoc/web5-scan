import mongoose from "mongoose";

const { Schema } = mongoose;
/////////BlockData////////
const Blockdata = new mongoose.Schema({
    difficulty: Number,
    extraData: String,
    gasLimit: Number,
    gasUsed: Number,
    hash: String,
    logsBloom: String,
    miner: String,
    mixHash: String,
    nonce: Number,
    number: Number,
    parentHash: String,
    receiptsRoot: String,
    sha3Uncles: String,
    size: Number,
    stateRoot: String,
    timestamp: Number,
    totalDifficulty: Number,
    transactions: [{ String }],
    transactionsRoot: String,
    uncles: [{ String }],
});
export const BlockData = mongoose.models.Datas || mongoose.model('Datas', Blockdata);

/////////Transaction////////
const transactionSchema = new mongoose.Schema({
    blockHash: String,
    blockNumber: Number,
    chainId: Number,
    data: String,
    from: String,
    gas: Number,
    gasPrice: Number,
    hash: String,
    input: String,
    nonce: Number,
    r: String,
    s: String,
    to: String,
    transactionIndex: Number,
    type: Number,
    v: Number,
    value: Number,
});
export const Transaction =  mongoose.models.Transaction ||  mongoose.model("Transaction", transactionSchema);

/////////userToAddress////////
const userToAddressSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    accountAddress: {
        type: String,
        required: true,
        unique: true
    },
    tokenId: { type: String, },
    txhash: {
        type: String,
    },
    timestamp: {
        type: String,
    }
});
export const UserToAddressData =  mongoose.models.UserToAddress || mongoose.model('UserToAddress', userToAddressSchema);