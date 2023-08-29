import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function creditPopup() {
  const [isOpen, setIsOpen] = useState(false);
  // Need to update: Format/Simplify Rules Explanation, Add pictures and cool easy to follow stuff, Match Modal to format of others
  return (
    <div>
      <Button type="open" onClick={() => setIsOpen(true)}>
        Credit
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"3xl"}>Credit</ModalHeader>
          <ModalBody>
            <VStack spacing={5} alignItems={"start"}>
              <Text>
                All programming was done by{" "}
                <Text display="inline-block" as="b">
                  Griffin Velichko
                </Text>
                .
              </Text>
              <Text>
                The data used to determine the validity of a submitted word
                comes from{" "}
                <Text display="inline-block" as="b">
                  RapidAPI WordsAPI
                </Text>
                .
              </Text>
              <Text>
                The web app was built on the{" "}
                <Text display="inline-block" as="b">
                  Next JS
                </Text>{" "}
                framework and uses the{" "}
                <Text display="inline-block" as="b">
                  Chakra UI
                </Text>{" "}
                library.
              </Text>
            </VStack>
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
