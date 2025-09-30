import { Box, ChakraProvider, Container, Flex } from "@chakra-ui/react";
import { Main } from "./components/main/Main";
import { system } from "./theme";

export const App = () => {
  return (
    <ChakraProvider value={system}>
      <Container bg={"#f8fafd"} maxW="7xl" height="100vh" p={0}>
        <Flex height={"full"}>
          <Box height={"full"} flex={5} w={["20%", "30%", "20%", "50%", "60%"]}>
            <Main />
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  );
};
