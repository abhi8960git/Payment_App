import express from "express";
import db from "@repo/db/client";
const app = express();

app.post("/hdfcWebhook", (req, res) => {
    //TODO: Add zod validation here?
    //check 
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
//transactions
    db.balance.update({
        where:{
            userId:paymentInformation.userId
        },
        data:{
            amount:{
                increment:paymentInformation.amount
            }
        }
    })

    db.onRampTransaction.update({
        where:{
            token:paymentInformation.token,
        },
        data:{
            status:"Success"
        }
    })
//super important 
    res.status(200).json({
        message:"captured"
    })
    
    // Update balance in db, add txn
})