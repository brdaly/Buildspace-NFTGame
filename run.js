
const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
      ["Leonardo", "Donatello", "Raphael"],       // Names
      ["https://i.imgur.com/5bjRH49.png", 
      "https://i.imgur.com/KPP9Ui5.jpg", 
      "https://i.imgur.com/AJIBSP9.jpg"],
      [120, 80, 90],                    // HP values
      [10, 8, 15]                       // Attack damage values

    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

    let txn;
    txn = await gameContract.mintCharacterNFT(1);
    await txn.wait();
    
    //txn = await gameContract.attackBoss();
    //await txn.wait();

// Get the value of the NFT's URI.
let returnedTokenUri = await gameContract.tokenURI(1);
console.log("Token URI:", returnedTokenUri);

  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();


       //"Shredder", //Boss Name
      //"https://images.squarespace-cdn.com/content/v1/5645db29e4b0abd1d8242811/e9383f1b-9ab3-46ae-b3b6-19c4a2b9c491/Shredder.jpeg?format=1500w", //Boss Image
      //1000, // Boss HP
      //10 // Boss Attack Damage
