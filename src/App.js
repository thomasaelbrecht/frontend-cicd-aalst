import './App.css';
import {useState, useCallback, createContext} from 'react';
import {PLACE_DATA} from './mock-data';
import Transactions from './components/Transaction';
import Places from './components/Places';
import AddTransactionForm from './components/AddTransactionForm';
import {TransactionsProvider} from './contexts/TransactionsProvider';

export const TransactionContext = createContext();

function App() {
  const [places, setPlaces] = useState(PLACE_DATA);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const ratePlace = useCallback(
    (id, rating) => {
      const newPlaces = places.map((p) => (p.id === id ? {...p, rating} : p));
      setPlaces(newPlaces);
    },
    [places]
  );
  
  return (
    <TransactionsProvider>
      <div className="App">
        <AddTransactionForm places={places}  />
        <div className="m-5 flex">
          <input
            type="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1"
            placeholder="search"
          />
          <button type="button" onClick={() => setSearch(text)}>
            Search
          </button>
        </div>
        <Transactions search={search}/>
        <Places places={places} onRate={ratePlace} />
      </div>
    </TransactionsProvider>
  );
}

export default App;
