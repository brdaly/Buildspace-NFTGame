
  const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(                     
      ["Leonardo", "Donatello", "Raphael"],       // Names
      ["https://i.imgur.com/5bjRH49.png", 
      "https://i.imgur.com/KPP9Ui5.jpg", 
      "https://i.imgur.com/AJIBSP9.jpg"],
      [120, 80, 90],                    
      [10, 8, 15]                       
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);
    
    let txn;
    txn = await gameContract.mintCharacterNFT(0);
    await txn.wait();
    console.log("Minted NFT #1");
  
    txn = await gameContract.mintCharacterNFT(1);
    await txn.wait();
    console.log("Minted NFT #2");
  
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();
    console.log("Minted NFT #3");
  
    console.log("Done deploying and minting!");
  
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
