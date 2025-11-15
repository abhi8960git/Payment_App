"use server"

import { getServerSession } from "next-auth"
import prisma from "@repo/db/client"
import { authOptions } from "../auth"

export async function createOnRampTransaction(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    const userId = session?.user?.id;
    if (!userId) {
        return {
            message: "User not Logged in"
        }
    }

    await prisma.onRampTransaction.create({
        data: {
            status: "Processing",
            token,
            provider,
            amount,
            startTime: new Date(),
            userId: Number(userId),
        }
    })

    return {
        message: "On ramp transaction added"
    }

}