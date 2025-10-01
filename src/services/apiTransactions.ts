import { supabase } from "./supabase";
type Transaction = {
  id: number;
  description: string;
  type: "income" | "expense";
  amount: number;
  created_at?: string;
};
async function getTotals() {
  const { data, error } = await supabase.rpc("get_totals");
  if (error) console.error(error);
  return data;
}

async function getTransactions(): Promise<Transaction[]> {
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*");
  if (error) console.error(error);
  return transactions as Transaction[];
}

async function insertTransaction(
  transaction: Omit<Transaction, "id">
): Promise<void> {
  const { error } = await supabase
    .from("transactions")
    .insert([
      {
        amount: transaction.amount,
        description: transaction.description,
        type: transaction.type,
      },
    ])
    .select();
  if (error)
    throw new Error(
      "There error happen when insert new transaction in to Supabase"
    );
}

async function deleteTransaction(id: number): Promise<void> {
  console.log();

  const { error } = await supabase.from("transactions").delete().eq("id", id);

  if (error)
    throw new Error(
      "There error happen when insert new transaction in to Supabase"
    );
}

export { getTotals, getTransactions, insertTransaction, deleteTransaction };
