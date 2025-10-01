import { Flex, Heading, Spinner } from "@chakra-ui/react";
import { Summary } from "../summary/Summary";
import { TransactionForm } from "../add-transaction/TransactionForm.js";
import { Expense } from "../expense-view/Expense.js";
import { useTransaction } from "@/contexts/GlobalContext.js";

type Transaction = {
  id: number;
  description: string;
  type: "income" | "expense";
  amount: number;
  created_at?: string;
};
export const Main = () => {
  const { state } = useTransaction();

  return (
    <Flex textAlign={"center"} flexDirection={"column"} px={"5"} gap={10}>
      <Flex alignItems={"center"} justifyContent={"space-between"} pt={12}>
        <Heading
          color={"blue.400"}
          display={["none", "block", "block", "block", "block"]}
          fontSize={"3xl"}
        >
          Expense Tracker
        </Heading>
        <TransactionForm />
      </Flex>

      {state.isLoading && (
        <Flex justifyContent={"center"} pt={20}>
          <Spinner size="md" />
        </Flex>
      )}
      {!state.isLoading && (
        <>
          <Summary />
          <Flex
            justifyContent={"space-between"}
            gap={8}
            direction={["column", "column", "column", "row"]}
          >
            <Expense
              transactions={
                state.allTransactions?.filter(
                  (transaction: Transaction) => transaction.type === "income"
                ) as Transaction[]
              }
              type="income"
            />
            <Expense
              transactions={
                state.allTransactions?.filter(
                  (transaction: Transaction) => transaction.type === "expense"
                ) as Transaction[]
              }
              type="expense"
            />
          </Flex>
        </>
      )}
    </Flex>
  );
};
