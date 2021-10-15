import {createContext, useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import config from '../config.json';

export const TransactionsContext = createContext();

export const TransactionsProvider = ({children}) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({});

  const refreshTransactions = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const {data} = await axios.get(`${config.base_url}transactions?limit=25&offset=0`);
      setTransactions(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, []);

  useEffect(() => {
    if (transactions?.length === 0) {
      refreshTransactions();
    }
  }, [transactions, refreshTransactions]);

  const createOrUpdateTransaction = async ({id, placeId, amount, date, user}) => {
    setError();
    let data = {placeId, amount, date, user};
    let method = id ? 'put' : 'post';
    let url = `${config.base_url}transactions/${id ?? ''}`;

    try {
      const {changedTransaction} = await axios({
        method,
        url,
        data,
      });
      await refreshTransactions();
      return changedTransaction;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deleteTransaction = async (id) => {
    try {
      setError();
      const {data} = await axios({
        method: 'delete',
        url: `${config.base_url}transactions/${id}`,
      });
      refreshTransactions();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const setTransactionToUpdate = (id) => {
    setCurrentTransaction(id === null ? {} : transactions.find((t) => t.id === id));
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        error,
        loading,
        createOrUpdateTransaction,
        deleteTransaction,
        setTransactionToUpdate,
        currentTransaction,
      }}>
      {children}
    </TransactionsContext.Provider>
  );
};
