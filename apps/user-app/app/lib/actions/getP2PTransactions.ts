"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function getP2PTransactions() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return [];
    }

    const sentTransfers = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(userId)
        },
        include: {
            toUser: {
                select: {
                    number: true
                }
            }
        },
        orderBy: {
            timestamp: 'desc'
        }
    });

    const receivedTransfers = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: Number(userId)
        },
        include: {
            fromUser: {
                select: {
                    number: true
                }
            }
        },
        orderBy: {
            timestamp: 'desc'
        }
    });

    const allTransactions = [
        ...sentTransfers.map(t => ({
            time: t.timestamp,
            amount: t.amount,
            type: "sent" as const,
            counterparty: t.toUser.number
        })),
        ...receivedTransfers.map(t => ({
            time: t.timestamp,
            amount: t.amount,
            type: "received" as const,
            counterparty: t.fromUser.number
        }))
    ].sort((a, b) => b.time.getTime() - a.time.getTime());

    return allTransactions;
}
