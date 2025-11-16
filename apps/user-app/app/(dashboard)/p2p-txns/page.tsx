import { SendCard } from "../../../components/SendCard";
import { P2PTransactions } from "../../../components/P2PTransactions";
import { getP2PTransactions } from "../../lib/actions/getP2PTransactions";

export default async function() {
    const transactions = await getP2PTransactions();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            P2P Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <SendCard />
            </div>
            <div>
                <P2PTransactions transactions={transactions} />
            </div>
        </div>
    </div>
}
