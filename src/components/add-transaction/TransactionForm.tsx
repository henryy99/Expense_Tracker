import React, { useState } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  HStack,
  Input,
  Portal,
  RadioGroup,
} from "@chakra-ui/react";
import { useTransaction } from "@/contexts/GlobalContext";
type Transaction = {
  id: number;
  description: string;
  type: "income" | "expense";
  amount: number;
  created_at?: string;
};
export const TransactionForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { handleSubmitForm } = useTransaction();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      description: string;
      type: "income" | "expense";
      amount: string;
    };
    const newData: Omit<Transaction, "id"> = {
      description: data.description as string,
      type: data.type as "income" | "expense",
      amount: Number(data.amount),
    };
    handleSubmitForm(newData);
    setIsOpen(false);

    // { description: "...", amount: "...", type: "income" or "expense" }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={({ open }) => setIsOpen(open)}>
      <Dialog.Trigger asChild>
        <Button variant="solid" size="sm" colorPalette="blue">
          Add New Transaction
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Add New Transaction</Dialog.Title>
            </Dialog.Header>

            {/* ✅ Form wraps body + footer to include Save */}
            <form onSubmit={handleSubmit}>
              <Dialog.Body>
                <Field.Root required>
                  <Field.Label>
                    Enter Description
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="Enter Transaction Description"
                    type="text"
                    name="description"
                  />
                </Field.Root>

                <Field.Root pt={4} required>
                  <Field.Label>
                    Enter Amount
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="Enter Amount"
                    type="number"
                    name="amount"
                  />
                </Field.Root>

                <Field.Root pt={4}>
                  <Field.Label>Type</Field.Label>
                  <RadioGroup.Root defaultValue="income" name="type">
                    <HStack gap={6} pt={2}>
                      <RadioGroup.Item colorPalette="blue" value="income">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>Income</RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <RadioGroup.Item colorPalette="red" value="expense">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>Expense</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    </HStack>
                  </RadioGroup.Root>
                </Field.Root>
              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                {/* ✅ Save button inside form triggers onSubmit */}
                <Button type="submit">Save</Button>
              </Dialog.Footer>
            </form>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
