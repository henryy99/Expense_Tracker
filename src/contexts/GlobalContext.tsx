import {
  deleteTransaction,
  getTotals,
  getTransactions,
  insertTransaction,
} from "@/services/apiTransactions";
import { supabase } from "@/services/supabase";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
//type of children
type GlobalStateProps = {
  children: ReactNode;
};
//Type for 1 object transaction
type Transaction = {
  id: number;
  description: string;
  type: "income" | "expense";
  amount: number;
  created_at?: string;
};
//State types
type TransactionState = {
  income: number;
  expense: number;
  allTransactions: Transaction[];
  isLoading: boolean;
};
//Actions types
type TransactionAction =
  | { type: "ADD_INCOME"; payload: number }
  | { type: "ADD_EXPENSE"; payload: number }
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "SET_TRANSACTIONS"; payload: Transaction[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "DELETE_TRANSACTION"; payload: number };

//Context type
type GlobalContextType = {
  state: TransactionState;
  dispatch: React.Dispatch<TransactionAction>;
  handleSubmitForm(formData: Transaction): void;
  handleDeleteTransaction(id: number): void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
//Initial state
const initialState: TransactionState = {
  income: 0,
  expense: 0,
  allTransactions: [],
  isLoading: false,
};
//reducer function
const reducer = (state: TransactionState, action: TransactionAction) => {
  switch (action.type) {
    case "ADD_INCOME":
      return { ...state, income: state.income + action.payload };
    case "ADD_EXPENSE":
      return { ...state, expense: state.expense + action.payload };
    case "ADD_TRANSACTION":
      return {
        ...state,
        allTransactions: [...state.allTransactions, action.payload],
      };
    case "SET_TRANSACTIONS":
      return {
        ...state,
        allTransactions: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "DELETE_TRANSACTION": {
      const tx = state.allTransactions.find((t) => t.id === action.payload);
      if (!tx) return { ...state };
      return {
        ...state,
        income: tx.type === "income" ? state.income - tx.amount : state.income,
        expense:
          tx.type === "expense" ? state.expense - tx.amount : state.expense,
        allTransactions: state.allTransactions.filter(
          (tx) => tx.id !== action.payload // action.payload should be the id of the deleted transaction
        ),
      };
    }

    default:
      return state;
  }
};
export default function GlobalState({ children }: GlobalStateProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const totals = await getTotals();
        const transactions: Transaction[] = await getTransactions();

        dispatch({ type: "ADD_INCOME", payload: totals[0].total_income });
        dispatch({ type: "ADD_EXPENSE", payload: totals[0].total_expense });
        dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("transactions-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "transactions" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newTx = payload.new as Transaction;
            dispatch({ type: "ADD_TRANSACTION", payload: newTx });
            if (newTx.type === "income") {
              dispatch({ type: "ADD_INCOME", payload: newTx.amount });
            } else {
              dispatch({ type: "ADD_EXPENSE", payload: newTx.amount });
            }
          } else if (payload.eventType === "DELETE") {
            dispatch({ type: "DELETE_TRANSACTION", payload: payload.old.id });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel); // cleanup
    };
  }, []);

  async function handleSubmitForm(formData: Omit<Transaction, "id">) {
    if (!formData) return;
    console.log(formData);

    try {
      await insertTransaction(formData);
    } catch (error) {
      console.error("Failed to save transaction:", error);
    }
  }

  async function handleDeleteTransaction(id: number) {
    try {
      await deleteTransaction(id);
    } catch (error) {
      console.error("Failed to save transaction:", error);
    }
  }
  return (
    <GlobalContext.Provider
      value={{ state, dispatch, handleSubmitForm, handleDeleteTransaction }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useTransaction() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
}
