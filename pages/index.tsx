import type { NextPage } from 'next'
import React, { useState, useEffect } from "react";
import { ethers } from "ethers"
import Image from 'next/image'
import Seo from './components/Seo'
import Header from './components/Header';
import Footer from './components/Footer';
import toast, { Toaster } from 'react-hot-toast'

declare global {
  interface Window {
    ethereum: any;
  }
}

const abi = [
  "function totalSupply() public view virtual override returns (uint256)",
  "function publicMint() public payable",
  "function preMint() public payable",
  "function is_paused() public view returns (bool)",
  "function ownerMint(uint256 count) public onlyOwner ",
  "function is_presaleActive() public view returns (bool)",
]
const contractAddress = "0x735439e0b73001e578243a310fe870e50fb06b57"
const notify = () => toast('Starting to execute a transaction')

const Home: NextPage = () => {

  const [mintNum, setMintNum] = useState(0);
  const [paused, setpaused] = useState(false);
  const [presaleActive, setpresaleActive] = useState(false);
  const mintNumber =1;

  useEffect(() => {
    const setSaleInfo = async() =>{
      console.log("setSaleInfo")
  
      const provider = new ethers.providers.Web3Provider((window as any).ethereum)  
      console.log(provider)
  
      const accounts =  await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const result = Object.values(signer);
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try{
        const mintNumber = (await contract.totalSupply()).toString();
        const paused = await contract.is_paused();
        const presaleActive = await contract.is_presaleActive();
        console.log("mintNumber", mintNumber);
        console.log("paused", paused);
        setpresaleActive(presaleActive)
        setMintNum(mintNumber)
        setpaused(paused)  
      }catch(e){
        console.log(e)
      }
    }

    // add Network
    const addChain = async() => {
      try{
        await (window as any).ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x10',
            chainName: 'Optimistic Ethereum',
            nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 4,
            },
            rpcUrls: ['https://mainnet.optimism.io'],
          }],
        })
        console.log("try");
        setSaleInfo();
      }catch(Exeption){
        console.log("Optimism Network aleady Connected");
        console.log("catch");
      }finally{
        console.log("finally");
      }
    }
    addChain();
    setSaleInfo();

  }, []);
  // ?????????????????????
  function MintButton() {

    const MetaMuskConnect = async () =>{
      const provider = new ethers.providers.Web3Provider((window as any).ethereum)
      const accounts =  await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const tokenPrice = "0";
      const contract = new ethers.Contract(contractAddress, abi, signer);
        try{
          await contract.publicMint({value: ethers.utils.parseEther(tokenPrice)});
          toast('Starting to execute a transaction')
        }catch(error){
          toast('Your wallet is Max Mint Or Connect to Optimism')
        }
    };
    
    return <>
    <div className="flex flex-wrap buttom justify-center bg-black bg-center bg-cover">
      <div className="m-16 px-2 py-20 lg:px-20 lg:py-4 border-double border-8 rounded-md bg-black text-center bg-center bg-contain bg-no-repeat">
          <h3 className="text-xs lg:text-4xl text-white font-semibold ">TokenMasks NFT</h3>
          <h1 className="text-sm lg:text-2xl pt-1 text-white font-semibold ">FREE MINT : Up to 5 in the wallet</h1>
          <h1 className="text-sm lg:text-2xl pt-1 text-white font-semibold ">???Please make sure that the network is set to Optimism</h1>
          <a className="text-sm lg:text-2xl pt-1 text-white underline" href="https://optimistic.etherscan.io/address/0x735439e0b73001e578243a310fe870e50fb06b57" >contract address 0x735439e0b73001e578243a310fe870e50fb06b57</a><br />
          <h1 className="text-base lg:text-5xl pt-1 pb-2 text-white font-semibold "> {mintNum} / 6000</h1>
          { (mintNum < 6000) && <button id="mintButton" className="px-4 py-2 my-1 sm:text-lg lg:text-2xl text-white font-semibold rounded bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900" onClick={MetaMuskConnect}>FREE MINT</button>}
          { (mintNum < 6000 && <Toaster/>)}
          { (mintNum >= 6000) && <h3 className="sm:text-lg lg:text-3xl pt-1 text-white font-semibold ">End of sale</h3>}
          <div className="py-4"><Image src="/OP_ETH_masks_GIF.gif" alt="Main Image" width={100} height={100}/></div>
          <a className="text-sm lg:text-2xl pt-1 text-white underline" href="https://quixotic.io/collection/0x735439E0b73001E578243A310Fe870e50Fb06b57" >market palace</a>
      </div>
    </div>
    </>
  }

  return (
    <>
      <div className="">
      <Header />
      <Seo
        pageTitle={'Witch Verse Labs'}
        pageDescription={'Witch Verse Labs'}
        pageImg={'https://witchverselabs-opti.vercel.app/_next/image?url=%2Fhezder_title.png&w=384&q=75'}
        pageImgWidth={1920}
        pageImgHeight={1005}
      />
      <Image className="min-w-full" src="/mainWitchVerseLabs.gif" alt="Main Image" width={1920} height={400}/>
      <MintButton />
      <Footer />
    </div></>
  )
} 

export default Home
