const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
      ["Leonardo", "Donatello", "Raphael"],       // Names
      ["https://drive.google.com/file/d/1BKHEij9CNl-nP-jrptOaKuk2sCHMUVxm/view?usp=sharing", 
      "https://drive.google.com/file/d/1RruCszZmoJ9fFNNEXF8E95bj5R8irC31/view?usp=sharing", 
      "https://drive.google.com/file/d/1-OTq1Ur8cJ-L8JUD9gACIiIt0b0-q07H/view?usp=sharing"],
      [100, 80, 90],                    // HP values
      [10, 8, 15]                       // Attack damage values
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);
  };
  
    let txn;
    txn = await gameContract.mintCharacterNFT(0);
    txn.wait();

    txn = await gameContract.mintCharacterNFT(1);
    txn.wait();

    txn = await gameContract.mintCharacterNFT(1);
    txn.wait();

    txn = await gameContract.mintCharacterNFT(2);
    txn.wait();

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
