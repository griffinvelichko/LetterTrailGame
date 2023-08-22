import React, { useEffect, useState } from "react";
import { getCurrentDate } from "@/components/GetCurrentDate.js";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  Stack,
  Center,
  List,
  ListItem,
  Flex,
  Spacer,
} from "@chakra-ui/react";

export default function PreviousGames(props) {
  const [isOpen, setIsOpen] = useState(false);
  const currentDate = getCurrentDate();
  const [mapGameHistory, setMapGameHistory] = useState(new Map());

  const filteredWords = props.words.filter((word) => word.id <= currentDate);

  useEffect(() => {
    // Perform localStorage action
    const currHistory = new Map(JSON.parse(localStorage.getItem("history")));
    if (currHistory) {
      setMapGameHistory(currHistory);
    }
  }, [isOpen]);

  const saveToLocalStorage = (map) => {
    const serializedMap = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("history", serializedMap);
  };

  const handleGameSelect = (word) => {
    props.onSelectWord(word);
    setIsOpen(false);
  };
  // Need to update: Modal to match others, make the list pretty
  return (
    <div>
      <Button type="open" onClick={() => setIsOpen(true)}>
        Previous Games
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"3xl"}>Previous Games</ModalHeader>
          <ModalBody>
            <Center>
              <List
                spacing={1}
                w={"full"}
                h={"sm"}
                overflowX={"hidden"}
                borderWidth="5px"
                borderRadius="10px"
                borderColor="black"
                background="white"
              >
                {filteredWords
                  .slice(0)
                  .reverse()
                  .map((word) => (
                    <ListItem key={word.id}>
                      <Button
                        onClick={() => {
                          handleGameSelect(word);
                        }}
                        w={"full"}
                      >
                        <Flex w={"full"}>
                          <Text>
                            #{word.game} - Date:{" "}
                            {word.id.substring(4, word.id.length - 2)}/
                            {word.id.substring(6)}
                          </Text>
                          <Spacer />
                          <Text>
                            {mapGameHistory.has(word.id) &&
                            mapGameHistory.get(word.id).completed ? (
                              <Text>Complete</Text>
                            ) : null}
                          </Text>
                        </Flex>
                      </Button>
                    </ListItem>
                  ))}
              </List>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button type="close" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
