"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    //get Server Session 
    //from user id form session 
    // to user fetch using prisma 
    // atomic txn using prisma 

    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if(!from){
        return{
            message:"Error while sending"
        }
    }

    const toUser = await prisma.user.findFirst({
        where:{
            number:to
        }
    })

    if(!toUser){
        return{
            message:"User no Found"
        }
    }

    await prisma.$transaction(async(tx)=>{
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userID"= ${Number(from)} FOR UPDATE`;
        const fromBalance = await tx.balance.findUnique({
            where:{userId:Number(from)}
        })
        if(!fromBalance || fromBalance.amount < amount){
            throw new Error('Insufficient funds');
        }

        await tx.balance.update({
            where:{userId:Number(from)},
            data:{amount:{decrement:amount}}
        })

        await tx.balance.update({
            where:{userId:Number(from)},
            data:{amount:{increment:amount}}
        })
    });
}
