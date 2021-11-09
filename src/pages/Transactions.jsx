import { useState, useCallback, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import TransactionList from "../components/TransactionList";
import { useLogin } from "../contexts/AuthProvider";

export default function Transactions() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const login = useLogin();

  useEffect(() => {
    async function testLogin() {
      await login("thomas.aelbrecht@hogent.be", "12345678");
    }
    testLogin();
  }, [login]);

  const handleInputChange = useCallback((e) => setText(e.target.value), []);
  const handleSearch = useCallback(() => setSearch(text), [text]);

  return (
    <>
      <h1>Transactions</h1>
      <div className="flex my-4">
        <input
          data-cy="transactions_search_input"
          type="search"
          value={text}
          onChange={handleInputChange}
          className="flex-1"
          placeholder="Search for a transaction"
        />
        <button
          type="button"
          data-cy="transactions_search_btn"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="flex justify-end my-2">
        <Link
          className="button flex flex-row items-center"
          to="/transactions/add"
        >
          <IoAdd /> New transaction
        </Link>
      </div>
      <TransactionList search={search} />
    </>
  );
}
