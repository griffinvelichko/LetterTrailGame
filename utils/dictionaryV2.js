function checkWord(word, url, options) {
  const words = ["feet", "wove", "lice", "mice"];
  const badWords = ["porn", "fuck", "shit", "fag"];

  console.log("check " + word);

  return fetch(url, options)
    .then((data) => data.json())
    .then((data) => {
      if (
        !badWords.includes(word) &
        (data.definitions.length !== 0 || words.includes(word))
      ) {
        console.log({ data });
        return true;
      } else {
        console.log("false word?");
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

async function isRealWord(word) {
  const url = `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "852a0bf287msh35306414a8a738ep1325c2jsna7d441449ad7",
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    },
  };

  try {
    const isValid = await checkWord(word, url, options);
    console.log(isValid);
    return isValid;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default isRealWord;
