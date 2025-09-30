import { createContext, useContext, useReducer, type ReactNode } from "react";
//type of children
type GlobalStateProps = {
  children: ReactNode;
};
//Type for 1 object transaction
type Transaction = {
  description: string;
  type: "income" | "expense";
  amount: number;
};
//State types
type TransactionState = {
  income: number;
  expense: number;
  allTransactions: Transaction[];
};
//Actions types
type TransactionAction =
  | { type: "ADD_INCOME"; payload: number }
  | { type: "ADD_EXPENSE"; payload: number }
  | { type: "ADD_TRANSACTION"; payload: Transaction };

//Context type
type GlobalContextType = {
  state: TransactionState;
  dispatch: React.Dispatch<TransactionAction>;
  handleSubmitForm(formData: Transaction): void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
//Initial state
const initialState: TransactionState = {
  income: 0,
  expense: 0,
  allTransactions: [],
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
    default:
      return state;
  }
};
export default function GlobalState({ children }: GlobalStateProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSubmitForm(formData: Transaction) {
    if (!formData) return;
    console.log(formData);

    if (formData.type === "income") {
      dispatch({ type: "ADD_INCOME", payload: formData.amount });
    } else {
      dispatch({ type: "ADD_EXPENSE", payload: formData.amount });
    }
    dispatch({ type: "ADD_TRANSACTION", payload: formData });
  }
  return (
    <GlobalContext.Provider value={{ state, dispatch, handleSubmitForm }}>
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
