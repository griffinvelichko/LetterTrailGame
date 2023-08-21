// import React, { useState } from "react";
// import styles from "@/styles/Home.module.css";
// import Modal from "react-modal";

// export default function creditPopup() {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div>
//       <button onClick={() => setIsOpen(true)}>Credit</button>
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={() => setIsOpen(false)}
//         className={styles.modal}
//         ariaHideApp={false}
//       >
//         <div className={styles.modalContent}>
//           <div className={styles.modalHeader}>
//             <h1>Credit</h1>
//           </div>
//           <div className={styles.modalBody}>
//             <p>All programming designed by Griffin Velichko</p>
//             <p></p>
//             <p>
//               The data used to determine the validity of a submitted word comes
//               from RapidAPI WordsAPI.
//             </p>
//             <p></p>
//             <p>
//               The ai software used to determine the daily competition comes from
//               OpenAI CHAT GPT.
//             </p>
//             <p></p>
//             <p>
//               The website uses cookies to colledfsct statistics and show ads.
//               More info in the privacy policy. *ADD HREF*
//             </p>
//           </div>
//           <div className={styles.modalFooter}>
//             <button type="close" onClick={() => setIsOpen(false)}>
//               Close
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }
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
  const [isOpen, setIsOpen] = useState(true);
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
            <VStack spacing={5}>
              <Text align={"left"}>
                All programming done by{" "}
                <Text display="inline-block" as="b">
                  Griffin Velichko
                </Text>
              </Text>
              <Text>
                The data used to determine the validity of a submitted word
                comes from RapidAPI WordsAPI.
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
