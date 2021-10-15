import React, {useContext} from 'react';
import {IoTrashOutline, IoPencil} from 'react-icons/io5';
import { TransactionContext } from '../App';

function Transaction({date, amount, user, place}) {
  return (
    <tr>
      <td className="border w-1/4 px-4 py-2">{new Date(date).toLocaleDateString()}</td>
      <td className="border w-1/4 px-4 py-2">{user.name}</td>
      <td className="border w-1/4 px-4 py-2">{place.name}</td>
      <td className="border w-1/4 px-4 py-2">{amount} &euro;</td>
      <td className="border w-1/4 px-4 py-2">
        <button>
          <IoPencil />
        </button>
      </td>
      <td className="border w-1/4 px-4 py-2">
        <button>
          <IoTrashOutline />
        </button>
      </td>
    </tr>
  );
}

const MemoizedTransaction = React.memo(Transaction);

export default function Transactions() {
  const { transactions } = useContext(TransactionContext);

  return (
    <table className="table-fixed m-auto">
      <tbody>
        {transactions.map((trans, i) => {
          return <MemoizedTransaction key={i} {...trans} />;
        })}
      </tbody>
    </table>
  );
}