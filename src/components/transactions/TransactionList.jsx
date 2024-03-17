import { useGlobalState } from "../../context/GlobalState";
import { TransactionItem } from "./TransactionItem";

const TransactionList = () => {
  const { transactions } = useGlobalState();

  return (
    <>
      <h3 className="text-slate-300 text-xl font-bold block">History</h3>
      <ul>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
