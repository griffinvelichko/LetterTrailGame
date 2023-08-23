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
            <VStack spacing={5} alignItems={"start"}>
              <Text>
                Find the trail from the <Text as={"b"}>CURRENT WORD</Text> to
                the <Text as={"b"}>WORD OF THE DAY</Text>.
              </Text>
              <Text>
                Change one letter of the <Text as={"b"}>CURRENT WORD</Text> to
                create a new word. With each new word try to get closer to the{" "}
                <Text as={"b"}>WORD OF THE DAY</Text>.
              </Text>
              <Text>
                <Text as={"b"}>WIN THE GAME</Text> by finding the{" "}
                <Text
                  bgGradient="linear(to-r, orange, orange, lightOrange, lightBlue, blue, blue)"
                  bgClip="text"
                  fontWeight="extrabold"
                  display="inline-block"
                >
                  LETTR TRAIL
                </Text>{" "}
                to the <Text as={"b"}>WORD OF THE DAY</Text> in the least amount
                of moves!
              </Text>
              <Text>
                <Text as={"b"}>SHARE WITH FRIENDS</Text> to see who gets the
                better score and <Text as={"b"}>CHECK BACK TOMORROW</Text> for a
                new challenge!
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
