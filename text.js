function generateRandomNumber() {
    const min = 100; // Minimum 3-digit number
    const max = 999; // Maximum 3-digit number
  
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const randomNumber = generateRandomNumber();
  console.log(randomNumber);
  