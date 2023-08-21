import Head from "next/head";
import styles from "@/styles/Home.module.css";
import InfoPopup from "@/components/InfoPopup";
import CreditPopup from "@/components/CreditPopup";
import MainGame from "@/components/MainGame.js";
import PreviousGames from "@/components/PreviousGames";
import { getCurrentDate } from "@/components/GetCurrentDate.js";
import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Highlight,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
  VStack,
  Center,
  HStack,
} from "@chakra-ui/react";

export default function Home(props) {
  console.log(props);
  const currentDate = getCurrentDate();
  const words = props.words;
  const [wordObj, setWordObj] = useState(
    words.find((word) => word.id === currentDate)
  );
  const gameRef = useRef();
  const [personalBestScore, setPersonalBestScore] = useState(0);
  const [wordPath, setWordPath] = useState([wordObj.startWord]);

  function handleGameSelect(word) {
    const currHistory = new Map(JSON.parse(localStorage.getItem("history")));
    if (currHistory) {
      const todayData = currHistory.get(currentDate);
      if (todayData) {
        setPersonalBestScore(todayData.personalBestScore);
        setWordPath(todayData.wordPath);
      }
    }
    setWordObj(word);
  }

  useEffect(() => {
    if (wordPath && wordObj && personalBestScore !== null) {
      gameRef.current && gameRef.current.initGame();
    }
  }, [wordPath, wordObj, personalBestScore]);

  return (
    <Center w={"full"} bgColor={"background"}>
      <Head>
        <title>LETTR TRAIL</title>
        <meta name="description" content="Your meta description here" />
      </Head>
      <VStack
        spacing={0}
        bgGradient="linear(to-br, orange, lightOrange, beige, lightBlue, blue)"
        w={"xl"}
        h={"full"}
        borderRadius={{ sm: "50" }}
      >
        <VStack
          spacing={1}
          h={115}
          w={"full"}
          bgGradient="linear(to-b, beige, beige, beige, beige, beige, beige, beige, transparent)"
        >
          <Heading marginTop={2} size={"2xl"} fontFamily="monospace">
            LETTR TRAIL
          </Heading>
          <HStack marginTop={0} spacing={2}>
            <InfoPopup />
            <PreviousGames words={words} onSelectWord={handleGameSelect} />
            <CreditPopup />
          </HStack>
        </VStack>
        <MainGame
          wordOfTheDay={wordObj.wordOfTheDay}
          game={wordObj.game}
          highscore={wordObj.highscore}
          startWord={wordObj.startWord}
          date={wordObj.id}
          initPath={wordPath}
          initPersonalBestScore={personalBestScore}
          ref={gameRef} // pass the ref to the MainGame component
        />
      </VStack>
    </Center>
  );
}

// Fetching data from the JSON file
import fsPromises from "fs/promises";
import path from "path";
import { redirect } from "next/dist/server/api-utils";
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData,
  };
}
