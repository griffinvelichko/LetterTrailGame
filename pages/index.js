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
  Text,
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
  const [text, setText] = useState("LETTR TRAIL");
  const [isOnRight, setIsOnRight] = useState(false);

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

  function handleMouseMove(event) {
    const middleOfScreen = window.innerWidth / 2;

    if (event.clientX > middleOfScreen) {
      setIsOnRight(true);
    } else {
      setIsOnRight(false);
    }
  }

  return (
    <div onMouseMove={handleMouseMove}>
      <HStack position={"absolute"} h={"100vh"} w={"full"} spacing={0}></HStack>
      <Center w={"full"} bgColor={"background"}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="author" content="Griffin Velichko" />
          <meta charset="UTF-8" />

          <title>LETTR TRAIL - Daily Word Game</title>
          <meta
            name="description"
            content="In Lettr Trail, change one letter at a time to find the WORD OF THE DAY. Aim for the fewest moves and share daily scores!"
          />
          <meta
            name="keywords"
            content="lettr trail, lettrail, word game, games, free games, word of the day, daily challenge, letter trail, puzzle games"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <VStack
          position={"relative"}
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
            <Heading
              lineHeight="tall"
              fontFamily="Courier Prime, monospace"
              fontSize="5xl"
            >
              <Highlight
                query={isOnRight ? "TRAIL" : "LETTR"}
                styles={
                  isOnRight
                    ? {
                        fontSize: "5xl",
                        py: ".5",
                        rounded: "2xl",
                        bgGradient: "linear(to-r, lightBlue, blue)",
                      }
                    : {
                        fontSize: "5xl",
                        py: ".5",
                        rounded: "2xl",
                        bgGradient: "linear(to-r, orange, lightOrange)",
                      }
                }
              >
                LETTRAIL
              </Highlight>
            </Heading>
            <HStack marginTop={-4} spacing={2}>
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
    </div>
  );
}

// Fetching data from the JSON file
import fsPromises from "fs/promises";
import path, { relative } from "path";
import { redirect } from "next/dist/server/api-utils";
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData,
  };
}
