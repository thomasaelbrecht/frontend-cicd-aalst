import './App.css';
import {useState, useMemo, useCallback, createContext} from 'react';
import {PLACE_DATA} from './mock-data';
import Transactions from './components/Transaction';
import Places from './components/Places';
import AddTransactionForm from './components/AddTransactionForm';
import {useFetch} from './hooks/useFetch';

export const TransactionContext = createContext();

function App() {
  const [places, setPlaces] = useState(PLACE_DATA);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const {
    loading,
    data: transactions,
    error,
  } = useFetch('http://localhost:9000/api/transactions?limit=100&offset=0');

  const ratePlace = useCallback(
    (id, rating) => {
      const newPlaces = places.map((p) => (p.id === id ? {...p, rating} : p));
      setPlaces(newPlaces);
    },
    [places]
  );

  const createTransaction = (user, place, amount, date) => {
    const newTransactions = [
      {
        id: transactions.reduce((max, t) => (t.id > max ? t.id : max), 0) + 1,
        user,
        place,
        amount,
        date: new Date(date),
      },
      ...transactions,
    ]; // newest first
    //  setTransactions(newTransactions);
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      return t.place.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [transactions, search]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <TransactionContext.Provider value={{transactions:filteredTransactions}}>
      <div className="App">
        <AddTransactionForm places={places} onSaveTransaction={createTransaction} />
        <div className="m-5 flex">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1"
            placeholder="search"
          />
          <button type="button" onClick={() => setSearch(text)}>
            Search
          </button>
        </div>
        <Transactions/>
        <Places places={places} onRate={ratePlace} />
      </div>
    </TransactionContext.Provider>
  );
}

export default App;
