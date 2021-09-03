import './App.css';
import {useState} from 'react';
import {TRANSACTION_DATA, PLACE_DATA} from './mock-data';
import Transaction from './components/Transaction';
import Places from './components/Places';

function App() {
  const [places, setPlaces] = useState(PLACE_DATA);

  const ratePlace = (id, rating) => {
    const newPlaces = places.map((p) => (p.id === id ? {...p, rating} : p));
    setPlaces(newPlaces);
  };

 
  return (
    <div className="App">
      {TRANSACTION_DATA.map((trans, index) => (
        <Transaction {...trans} key={index} />
      ))}
      <Places places={places} onRate={ratePlace} />
    </div>
  );
}

export default App;
