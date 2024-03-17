
# Control de Gastos

App para administra tus ingresos y gastos.


## Screenshots

![App Screenshot](/screenshot.png)


## Technologies

- React.JS
- TailwindCSS
- Victory (chart library)

## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?

- createContext
- useContext

```javascript
import { createContext, useContext } from "react";

/* Devuelve el Context y useContext de nuestra App */
export const Context = createContext();

export const useGlobalState = () => {
  const context = useContext(Context);
  return context;
};

export const GlobalProvider = ({ children }) => {
      
  return (
    <Context.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </Context.Provider>
  );
};

```

- useReduce

```javascript
/* Archivo AppReducer*/

export default (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

/* Archivo GlobalState */
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, 
  () => {
    const localData = localStorage.getItem("transactions");
    return localData ? JSON.parse(localData) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state))
  }, [state])
  


  const addTransaction = (transaction) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
    console.log("addTransaction");
  };

  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
    console.log("deleteTransaction");
  };

  return (
    <Context.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </Context.Provider>
  );
};

```