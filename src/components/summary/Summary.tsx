import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { TransactionChartSummary } from "../chart/TransactionChartSummary";
import { useTransaction } from "@/contexts/GlobalContext";

export const Summary = () => {
  const { state } = useTransaction();
  return (
    <Box bg={"white"} p={6}>
      <Flex
        w={"full"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={{
          base: "column",
          sm: "column",
          md: "column",
          lg: "row",
          xl: "row",
        }}
      >
        <Flex
          flex={1}
          w={"full"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Heading size={"md"} mb={4} color={"gray.600"} fontSize={"xl"}>
            Balance is ${state.income - state.expense}
          </Heading>
          <Flex
            direction={"column"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            bg={"gray.50"}
            w={"full"}
            h={"100px"}
            border={"1px solid"}
            borderColor={"gray.100"}
          >
            <Flex direction={"column"}>
              <Heading textStyle={"5xl"}>${state.income}</Heading>
              <Text>Total Income</Text>
            </Flex>
          </Flex>
          <Flex
            direction={"column"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            bg={"gray.50"}
            w={"full"}
            h={"100px"}
            border={"1px solid"}
            borderColor={"gray.100"}
          >
            <Flex direction={"column"}>
              <Heading textStyle={"5xl"}>${state.expense}</Heading>
              <Text>Total Expense</Text>
            </Flex>
          </Flex>
        </Flex>

        <Box
          flex={1}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Heading>
            <TransactionChartSummary
              income={state.income}
              expense={state.expense}
            />
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
};
