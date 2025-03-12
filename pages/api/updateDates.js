// pages/api/updateDates.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // 1. Read and parse data.json
  const filePath = path.join(process.cwd(), 'data.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 2. Get today's date in YYYYMMDD
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // clear time portion
  const formattedCurrentDate = formatDate(currentDate);

  // 3. Identify the last game’s date
  const lastGameDate = data.words[data.words.length - 1].id;

  // 4. Compare lastGameDate to today
  if (lastGameDate < formattedCurrentDate) {
    // If the last date is in the past, reassign all game dates:
    // Game 1 = Today, Game 2 = Tomorrow, etc.

    data.words.forEach((game, index) => {
      const newGameDate = new Date(currentDate); // copy of "today"
      newGameDate.setDate(currentDate.getDate() + index); // increment by index
      game.id = formatDate(newGameDate);
    });

    // 5. Write updated data back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return res.status(200).json({ message: 'Dates updated successfully.' });
  } else {
    // If the last date is still >= current date, do nothing
    return res.status(200).json({ message: 'No update needed. The last game date is still in the future.' });
  }
}

// Helper function to format a Date object as YYYYMMDD
function formatDate(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}
