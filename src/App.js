import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Places from "./pages/Places";
import { TransactionsProvider } from "./contexts/TransactionsProvider";
import TransactionForm from "./pages/TransactionForm";
import Transactions from "./pages/Transactions";
import { PlacesProvider } from "./contexts/PlacesProvider";
import NavMenu from "./components/NavMenu";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <PlacesProvider>
        <TransactionsProvider>
          <Router>
            <NavMenu />
            <Switch>
              <Route path="/" exact>
                <Redirect to="/transactions" />
              </Route>

              <Route path="/transactions" exact>
                <Transactions />
              </Route>

              <Route path="/transactions/add" exact>
                <TransactionForm />
              </Route>

              <Route path="/transactions/edit/:id" exact>
                <TransactionForm />
              </Route>

              <Route path="/places">
                <Places />
              </Route>
            </Switch>
          </Router>
        </TransactionsProvider>
      </PlacesProvider>
    </AuthProvider>
  );
}

export default App;
