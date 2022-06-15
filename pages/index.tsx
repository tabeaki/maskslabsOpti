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
const contractAddress = "0x0D0d8d120526623f38BA3aB77344585ef219461e"
const notify = () => toast('Starting to execute a transaction')

const Home: NextPage = () => {
  
  //const tokenPrice = "450";

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
            chainId: '0x4',
            chainName: 'Rinkeby',
            nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 4,
            },
            rpcUrls: ['https://rinkeby.infura.io/v3/Qs9JnJoxhd2_LYTM8hL_mpFabw0anMZE'],
          }],
        })
        console.log("try");
        setSaleInfo();
      }catch(Exeption){
        console.log("Optimism Network alleady Connected");
        console.log("catch");
      }finally{
        console.log("finally");
      }
    }
    addChain();
    setSaleInfo();

  }, []);
  // ミントボタン用
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
          toast('Not on the whitelist Or Connect to Astar NetWork Or Out of Fund')
        }
    };
    
    return <>
    <div className="flex flex-wrap buttom justify-center bg-black bg-center bg-cover">
      <div className="m-16 px-2 py-20 lg:px-20 lg:py-4 border-double border-8 rounded-md bg-black text-center bg-center bg-contain bg-no-repeat">
          <h3 className="text-xs lg:text-4xl text-white font-semibold ">Optimism Mask NFT</h3>
          <h1 className="text-sm lg:text-2xl pt-1 text-white font-semibold ">FREE MINT : Up to 5 in the wallet</h1>
          <h1 className="text-base lg:text-5xl pt-1 pb-2 text-white font-semibold "> {mintNum} / 6000</h1>        
          { paused && <h3 className="text-lg lg:text-3xl pt-1 text-white font-semibold ">Wait until the sale</h3>}
          { (mintNum <6000) && <button id="mintButton" className="px-4 py-2 my-1 sm:text-lg lg:text-2xl text-white font-semibold rounded bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900" onClick={MetaMuskConnect}>FREE MINT</button>}
          <div className="py-4"><Image src="/OP_ETH_masks_GIF.gif" alt="Main Image" width={100} height={100}/></div>
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
        pageImg={'https://maskslabs-opti.vercel.app/_next/image?url=%2Fmain_grap.png&w=3840&q=75'}
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
