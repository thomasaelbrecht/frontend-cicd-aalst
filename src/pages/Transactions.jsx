import { useState, useCallback } from "react";
import TransactionList from "../components/TransactionList";

export default function Transactions() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const handleInputChange = useCallback((e) => setText(e.target.value), []);
  const handleSearch = useCallback(() => setSearch(text), [text]);

  return (
    <>
      <h1>
        Transactions
      </h1>
      <div className="m-5 flex">
        <input
          type="search"
          value={text}
          onChange={handleInputChange}
          className="flex-1"
          placeholder="search"
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <TransactionList search={search} />
    </>
  );
}
