import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { TransactionsContext } from "../contexts/TransactionsProvider";
import ErrorMessage from "./ErrorMessage";
import Transaction from "./Transaction";

export default function TransactionList({ search }) {
  const { transactions, error, loading } = useContext(TransactionsContext);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      return t.place.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [transactions, search]);

  if (loading) return <h1 data-cy="loading">Loading...</h1>;
  if (error)
    return (
      <ErrorMessage error={error} />
    );
  if (!transactions || !transactions.length) {
    return (
      <p className="info flex flex-row items-center">
        <span className="flex-1">There are no transactions</span>

        <Link to="add" className="button">
          Create one
        </Link>
      </p>
    );
  }

  return (
    <table className="table-fixed m-auto">
      <thead>
        <tr>
          <th>Date</th>
          <th>User</th>
          <th>What?</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filteredTransactions.map((trans) => {
          return <Transaction key={trans.id} {...trans} />;
        })}
      </tbody>
    </table>
  );
}
