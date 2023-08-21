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

export default function infoPopup() {
  const [isOpen, setIsOpen] = useState(true);
  // Need to update: Format/Simplify Rules Explanation, Add pictures and cool easy to follow stuff, Match Modal to format of others
  return (
    <div>
      <Button type="open" onClick={() => setIsOpen(true)}>
        Rules
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"3xl"}>How To Play?</ModalHeader>
          <ModalBody>
            <VStack spacing={5}>
              <Text>
                Transform the <Text as={"b"}>CURRENT WORD</Text> to the{" "}
                <Text as={"b"}>WORD OF THE DAY</Text>.
              </Text>
              <Text>
                Change one letter of the CURRENT WORD to create a new word. With
                each new word try to get closer to the WORD OF THE DAY.
              </Text>
              <Text>
                Our AI software has found the least amount of new words needed
                to transform the CURRENT WORD to the WORD OF THE DAY.
              </Text>
              <Text>
                WIN THE GAME by transforming to the WORD OF THE DAY in the least
                amount of attempts!
              </Text>
              <Text>
                Once you're done, check back tomorrow for a new challenge!
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
