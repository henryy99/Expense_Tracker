import { useTransaction } from "@/contexts/GlobalContext";
import { formatDate } from "@/helpers/helpers";
import { Flex, Heading, Text, Wrap } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

type Transaction = {
  id: number;
  description: string;
  type: "income" | "expense";
  amount: number;
  created_at?: string;
};

export const Expense = ({
  transactions,
  type,
}: {
  transactions: Transaction[];
  type: "income" | "expense";
}) => {
  const { handleDeleteTransaction } = useTransaction();
  return (
    <Flex
      bg={"white"}
      flex={1}
      mt={5}
      rounded={"md"}
      pt={2}
      pb={4}
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
        {transactions?.map((item: Transaction) => (
          <Flex
            key={item.id}
            bg={type === "income" ? "blue.100" : "red.100"}
            py={3}
            borderRadius={"md"}
            border={"1px solid"}
            borderColor={type === "income" ? "blue.200" : "red.200"}
            px={6}
            flexDirection={"column"}
            gap={2}
          >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text color={"gray.400"} fontSize={"sm"}>
                {formatDate(item.created_at)}
              </Text>
              <Wrap gap={3}>
                <FaTrash
                  size={15}
                  color="#dc2626"
                  className="button"
                  onClick={() => handleDeleteTransaction(item.id)}
                />
              </Wrap>
            </Flex>
            <Flex justifyContent={"space-between"}>
              <Text fontWeight={"semibold"}>{item.description}</Text>
              <Text>$ {item.amount}</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
