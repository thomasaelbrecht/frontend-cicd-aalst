import "./App.css";
import { useState,  createContext } from "react";
import Transactions from "./components/Transaction";
import Places from "./components/Places";
import TransactionForm from "./components/TransactionForm";
import { TransactionsProvider } from "./contexts/TransactionsProvider";
import { PlacesProvider } from "./contexts/PlacesProvider";

export const TransactionContext = createContext();

function App() {
    const [text, setText] = useState("");
    const [search, setSearch] = useState("");

    return (
        <PlacesProvider>
            <TransactionsProvider>
                <div className="App">
                    <TransactionForm />
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
                    <Transactions search={search} />
                    <Places />
                </div>
            </TransactionsProvider>
        </PlacesProvider>
    );
}

export default App;
