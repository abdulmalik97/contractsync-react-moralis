import logo from "./avalancheLogo.jpg";
import React, { useState } from "react";
import "./App.css";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Button, Box, Text, Heading, Alert, AlertIcon } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  Center,
} from "@chakra-ui/react";

const LogoutButton = () => {
  const { logout, isAuthenticating } = useMoralis();

  return (
    <Button
      display={"block"}
      colorScheme="red"
      variant="solid"
      isLoading={isAuthenticating}
      onClick={() => logout()}
      disabled={isAuthenticating}>
      Logout
    </Button>
  );
};

// ------- Render balance Tables --------
const displayApprovalTransactionsTable = (tokenData) => {
  return (
    <div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>transaction_hash</Th>
            <Th>address</Th>
            <Th>block_hash </Th>
          </Tr>
        </Thead>
        <Tbody>
          {tokenData.length !== 0 ? (
            tokenData.map((element, i) => {
              return (
                <React.Fragment key={i}>
                  <Tr>
                    <Td>{element.get("transaction_hash")}</Td>
                    <Td>{element.get("address")}</Td>
                    <Td>{element.get("block_hash")}</Td>
                  </Tr>
                </React.Fragment>
              );
            })
          ) : (
            <Tr>
              <Td></Td>
              <Td>No Transactions</Td>
              <Td></Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </div>
  );
};

// ---------- APP -------------
function App() {
  const { authenticate, isAuthenticated, Moralis } = useMoralis();

  const { data, error, isLoading } = useMoralisQuery(
    "AvalancheWETHApproval",
    (query) => query.limit(1000),
    [10],
    {
      live: true,
    }
  );

  //----------------- Setting User in state   ----------
  const [openModel, setOpenModel] = useState(false);

  //if chain is changed let the user know
  Moralis.onChainChanged(async function (chain) {
    if (chain !== "0xa86a") {
      setOpenModel(true);
    } else {
      setOpenModel(false);
    }
  });

  // ----- Authenticate in Metamask---------
  if (!isAuthenticated) {
    return (
      <Container maxW="container.lg">
        {openModel && (
          <Alert status="error">
            <AlertIcon />
            Please switch to Avalanche Network
          </Alert>
        )}
        <Center>
          <img width={500} height={500} src={logo} alt="logo" />
        </Center>
        <br />
        <Center>
          <Heading as="h2" size="3xl" p={10}>
            Avalanche WETH contract approval tracker
          </Heading>
        </Center>
        <Center>
          <Button colorScheme="green" size="lg" onClick={() => authenticate()}>
            Sign in using Metamask
          </Button>
        </Center>
      </Container>
    );
  }

  return (
    <Box display={"block"} p={35} className="App">
      {openModel && (
        <Alert status="error">
          <AlertIcon />
          Please switch to Avalanche Network
        </Alert>
      )}
      <LogoutButton />
      <Center>
        <img width={500} height={500} src={logo} alt="logo" />
      </Center>
      <Center>
        <Heading as="h2" size="3xl" p={10}>
          Avalanche WETH contract approval tracker
        </Heading>
      </Center>
      {/* -------------Tokens------------ */}
      <Text fontSize="3xl" style={{ textAlign: "initial", fontWeight: "bold" }}>
        Approval Transactions
      </Text>
      {!isLoading && data !== null ? (
        displayApprovalTransactionsTable(data)
      ) : (
        <p>Loading</p>
      )}
    </Box>
  );
}

export default App;
