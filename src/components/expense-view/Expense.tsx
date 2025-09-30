import { Flex, Heading, Text } from "@chakra-ui/react";

type Transaction = {
  description: string;
  type: "income" | "expense";
  amount: number;
};

export const Expense = ({
  transactions,
  type,
}: {
  transactions: Transaction[];
  type: "income" | "expense";
}) => {
  return (
    <Flex
      bg={"white"}
      flex={1}
      mt={5}
      rounded={"md"}
      pt={2}
      px={4}
      direction={"column"}
    >
      <Heading
        color={type === "income" ? "blue.700" : "red.700"}
        textAlign={"left"}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Heading>
      <Flex direction={"column"} pt={2} gap={2}>
        {transactions?.map((item: Transaction, index: number) => (
          <Flex
            key={index}
            justifyContent={"space-between"}
            bg={type === "income" ? "blue.100" : "red.100"}
            py={3}
            borderRadius={"md"}
            border={"1px solid"}
            borderColor={type === "income" ? "blue.200" : "red.200"}
            px={6}
          >
            <Text fontWeight={"semibold"}>{item.description}</Text>
            <Text>$ {item.amount}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
