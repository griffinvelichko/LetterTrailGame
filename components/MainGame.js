import {
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  VStack,
  Highlight,
  HStack,
  Center,
  Spacer,
  OrderedList,
  ListItem,
  Flex,
  Stack,
} from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
import { CopyIcon } from "@chakra-ui/icons";

import copy from "copy-to-clipboard";

import useIsWordValid from "../utils/dictionary";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
// import { getCurrentDate } from "./GetCurrentDate";

function InputField({ isDisabled, value, onChange, bgColor, onClick }) {
  return (
    <Center
      as="input"
      border="5px solid black"
      borderRadius="lg"
      h="47px"
      w="47px"
      padding="2.5"
      fontSize="3xl"
      marginBottom="-2"
      bgColor={bgColor}
      disabled={isDisabled}
      minLength={1}
      maxLength={1}
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  );
}

const MainGame = forwardRef(
  (
    { startWord, wordOfTheDay, game, date, initPath, initPersonalBestScore },
    ref
  ) => {
    const fullyEnabled = new Array(startWord.length).fill(false);
    const fullyDisabled = new Array(startWord.length).fill(true);
    const [currentWord, setCurrentWord] = useState(startWord);
    const [prevWord, setPrevWord] = useState(startWord);
    const isValid = useIsWordValid(currentWord.join("").toLowerCase());
    const [score, setScore] = useState(0);
    const [personalBestScore, setPersonalBestScore] = useState(0);
    const [isComplete, setComplete] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isErrored, setIsErrored] = useState(false);
    const [isDisabled, setIsDisabled] = useState(fullyEnabled);
    const [mapGameHistory, setMapGameHistory] = useState(new Map());

    const [wordPath, setWordPath] = useState(initPath);

    useEffect(() => {
      // Perform localStorage action
      const currHistory = new Map(JSON.parse(localStorage.getItem("history")));
      if (currHistory) {
        setMapGameHistory(currHistory);
        const todayData = currHistory.get(date);
        if (todayData && todayData.completed) {
          setPersonalBestScore(todayData.personalBestScore);
          setWordPath(todayData.wordPath);
        }
      }
    }, [date]);

    const handleSubmit = async () => {
      event.preventDefault();
      console.log("B4: " + score + " " + personalBestScore);
      if (currentWord.toString() !== prevWord.toString() && isValid) {
        setIsSuccessful(true);
        setScore(score + 1);
        setPrevWord(currentWord);
        setWordPath([...wordPath, currentWord]);
        setIsDisabled(fullyEnabled);

        setTimeout(() => setIsSuccessful(false), 250);
        if (currentWord.toString() === wordOfTheDay.toString()) {
          setComplete(true);
          const completed = true;
          // var newScore = personalBestScore;
          if (personalBestScore === 0 || score + 1 < personalBestScore) {
            setPersonalBestScore(score + 1);

            const todayData = {
              personalBestScore: score + 1,
              completed: completed,
              wordPath: [...wordPath, currentWord],
            };

            mapGameHistory.set(date, todayData);
            localStorage.clear();
            localStorage.setItem(
              "history",
              JSON.stringify(Array.from(mapGameHistory.entries()))
            );
          }
        }
      } else {
        setIsErrored(true);
        setCurrentWord(prevWord);
        setTimeout(() => setIsErrored(false), 250);
      }
      console.log("After: " + score + " " + personalBestScore);
    };

    const handleBack = async () => {
      if (currentWord.toString() !== prevWord.toString()) {
        if (currentWord.toString() === wordOfTheDay.toString()) {
          setCurrentWord(wordPath[wordPath.length - 2]);
          setWordPath(wordPath.slice(0, -1));
          setPrevWord(wordPath[wordPath.length - 2]);
          setScore(score - 1);
        }
        setCurrentWord(prevWord);
      } else {
        if (score !== 0) {
          setCurrentWord(wordPath[wordPath.length - 2]);
          setWordPath(wordPath.slice(0, -1));
          setPrevWord(wordPath[wordPath.length - 2]);
          setScore(score - 1);
        }
      }
    };

    const handleInputChange = (event, index) => {
      const newWord = [...currentWord];
      const newValue = event.target.value.toUpperCase();
      newWord[index] = newValue;
      setCurrentWord(newWord);
    };

    // Issue with setting personalBestScore on initGame
    // Problem is somewhere in here:
    const initGame = () => {
      console.log("date" + date);
      console.log(mapGameHistory);
      const todayData = mapGameHistory.get(date);
      console.log("today data: " + todayData);
      if (todayData && todayData.completed) {
        const updatedPath = todayData.wordPath;
        setWordPath(updatedPath);
        setCurrentWord(updatedPath[updatedPath.length - 1]);
        setPrevWord(updatedPath[updatedPath.length - 2]);
        setScore(updatedPath.length - 1);
        setPersonalBestScore(initPersonalBestScore);
      } else {
        setWordPath([startWord]);
        setCurrentWord(startWord);
        setPrevWord(startWord);
        setScore(0);
        setPersonalBestScore(0);
      }
    };

    const finishGame = () => {
      setComplete(false);
      setIsDisabled(fullyDisabled);
    };

    useImperativeHandle(ref, () => ({
      initGame: () => {
        initGame();
      },
    }));

    useEffect(() => {
      if (currentWord.toString() !== prevWord.toString()) {
        if (currentWord.toString() === wordOfTheDay.toString()) {
          setIsDisabled(fullyDisabled);
        } else
          setIsDisabled(() => {
            return prevWord.map((letter, index) => {
              return letter !== currentWord[index] ? false : true;
            });
          });
      } else {
        setIsDisabled(fullyEnabled);
      }
    }, [currentWord, prevWord]);

    const copyToClipboard = () => {
      let copyText = "Check my score for lettrail.com Game #" + { game } + "!";
      let isCopy = copy(copyText);
      if (isCopy) {
        alert("Copied!");
      }
    };

    //Following has not been edited: Modal, Congrats message at the top, Game Update on the left, Word of the Day on the Right, Current Word, Back and Submit Buttons, Submitted Words
    return (
      <>
        <div>
          <Modal isOpen={isComplete} onClose={() => finishGame()} size="lg">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize={"xl"}>Congrats!</ModalHeader>
              <ModalBody>
                <Text>
                  You got Game: {game}
                  <br />
                  on Move: {score}!
                </Text>
                <Text>
                  Congrats you found a path to the Word Of The Day! See if you
                  can best your score or come back tomorrow for a new challenge!
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button type="close" onClick={() => finishGame()}>
                  Back
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
        <VStack>
          {mapGameHistory.get(date) && mapGameHistory.get(date).completed && (
            <VStack
              boxShadow="rgb(38, 57, 77) 0px 20px 30px -10px"
              width="full"
              borderRadius="10px"
              background="white"
            >
              <Text as="b" fontSize={"xl"} bgGradient="white">
                Congrats!
              </Text>
              <Text fontSize={"md"}>
                You Got{" "}
                <Text display="inline-block" as="b">
                  Game #{game}
                </Text>{" "}
                in{" "}
                <Text display="inline-block" as="b">
                  {personalBestScore} moves!
                </Text>
              </Text>
              <Button
                leftIcon={<CopyIcon />}
                onClick={copyToClipboard}
                background="orange"
                size="sm"
                marginBottom={3}
              >
                Share my Score
              </Button>
            </VStack>
          )}
          <div>
            <Stack
              spacing={{ base: 3, sm: 50 }}
              marginTop={3}
              direction={{ base: "column", sm: "row" }}
            >
              <VStack>
                <HStack>
                  <Center
                    border="5px solid black"
                    borderRadius="lg"
                    bg="white"
                    color="black"
                    padding="5px"
                  >
                    <Text fontSize={"sm"}>Game #: {game}</Text>
                  </Center>
                  <Spacer />
                  <Center
                    border="5px solid black"
                    borderRadius="lg"
                    bg="white"
                    color="black"
                    padding="5px"
                  >
                    <Text fontSize={"sm"}>Moves: {score}</Text>
                  </Center>
                </HStack>
                <Center
                  border="5px solid black"
                  borderRadius="lg"
                  bg="white"
                  color="black"
                  padding="5px"
                >
                  <Text fontSize={"sm"}>
                    Personal Highscore:{" "}
                    {(mapGameHistory.get(date) &&
                      mapGameHistory.get(date).personalBestScore) ||
                      0}
                  </Text>
                </Center>
              </VStack>
              <VStack>
                <Text as="b" fontSize={"md"}>
                  WORD OF THE DAY:
                </Text>
                <HStack>
                  {wordOfTheDay.map((letter, index) => (
                    <Center
                      key={index}
                      border="5px solid black"
                      borderRadius="lg"
                      bgColor="transparent"
                      h="47px"
                      w="47px"
                    >
                      <Text as="b" fontSize="4xl">
                        {letter}
                      </Text>
                    </Center>
                  ))}
                </HStack>
              </VStack>
            </Stack>
            <VStack
              boxShadow={`${
                mapGameHistory.get(date) && mapGameHistory.get(date).completed
                  ? ""
                  : "rgb(38, 57, 77) 0px 20px 30px -10px"
              }`}
              marginTop={2}
              borderRadius={`${
                mapGameHistory.get(date) && mapGameHistory.get(date).completed
                  ? ""
                  : "10px"
              }`}
              marginBottom={0}
              w="full"
            >
              <Text as="b" fontSize={"md"}>
                CURRENT WORD:
              </Text>
              <form onSubmit={handleSubmit}>
                <HStack justifyContent={"center"}>
                  {currentWord.map((letter, index) => (
                    <InputField
                      key={index}
                      bgColor={`${
                        isSuccessful ? "blue" : `${isErrored ? "orange" : ""}`
                      }`}
                      isDisabled={isDisabled[index]}
                      value={letter}
                      onChange={(event) => handleInputChange(event, index)}
                      onClick={(event) => {
                        event.target.select();
                      }}
                    />
                  ))}
                </HStack>
                <HStack marginTop={3}>
                  <Input
                    type="submit"
                    value="Back"
                    bg="transparent"
                    borderWidth="5px"
                    borderColor="transparent"
                    _hover={{
                      borderColor: "orange",
                    }}
                    onClick={handleBack}
                  />
                  <Input
                    type="submit"
                    value="Enter"
                    bg="transparent"
                    borderWidth="5px"
                    borderColor="transparent"
                    _hover={{
                      borderColor: "blue",
                    }}
                  />
                </HStack>
              </form>
            </VStack>
          </div>
          <Text as="b" fontSize={"md"}>
            SUBMITTED WORDS:
          </Text>
          <OrderedList
            spacing={1}
            w="full"
            h="3xs"
            overflowX={"hidden"}
            borderWidth="5px"
            borderRadius="10px"
            borderColor="black"
            background="white"
          >
            {wordPath
              .slice(0)
              .reverse()
              .map((word, wordIndex) => (
                <ListItem key={wordIndex}>
                  <HStack w="full">
                    <Flex w="full" justifyContent="center">
                      <HStack>
                        {word.map((letter, letterIndex) => (
                          <Center
                            key={letterIndex}
                            border="5px solid black"
                            borderRadius="lg"
                            bgColor="transparent"
                            h="47px"
                            w="47px"
                          >
                            <Text as="" fontSize="4xl">
                              {letter}
                            </Text>
                          </Center>
                        ))}
                      </HStack>
                    </Flex>
                  </HStack>
                </ListItem>
              ))}
          </OrderedList>
        </VStack>
      </>
    );
  }
);

export default MainGame;
