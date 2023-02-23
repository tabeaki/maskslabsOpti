/* eslint-disable @next/next/no-html-link-for-pages */
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'
import { ethers } from "ethers"

 function Header() {
    
        // add Network
        const addChain = async() => {
            await (window as any).ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0xA' }],
            });
            const provider = await new ethers.providers.Web3Provider((window as any).ethereum);
            await provider.send('eth_requestAccounts', []);
  
            try{
              await (window as any).ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0xA',
                  chainName: 'Optimistic Ethereum',
                  nativeCurrency: {
                      name: 'ETH',
                      symbol: 'ETH',
                      decimals: 4,
                  },
                  rpcUrls: ['https://mainnet.optimism.io'],
                }],
              })
              toast('OK Connected')
              console.log("try");
            }catch(Exeption){
              toast('Optimism Network alleady Connected')
              console.log("Optimism Network alleady Connected");
              console.log("catch");
            }finally{
              console.log("finally");
            }
        }


     return <header>
            <nav className="max-w-full bg-black">
                <div className="grid grid-rows-12 grid-flow-col gap-4">
                <div className="col-span-8 text-slate-100 font-medium">
                    <Image className="" src="/hezder_title.png" alt="chara1"  width={150} height={50} objectFit="contain"/>
                </div>
                <div className='justify-end flex'>
                    <button id="mintButton" className="px-4 py-2 my-1 sm:text-lg lg:text-2xl text-white font-semibold rounded bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900" onClick={addChain}>Wallet Conect</button>
                    <Toaster/>
                    <div className="bg-[url('/twiter_icon.png')] px-4 text-center bg-center bg-no-repeat bg-cover"><a className="px-2 py-4" href="https://twitter.com/WitchVerseLabs"></a></div>
                    <div className="bg-[url('/discode_icon.png')] px-2 mr-4 text-center bg-center bg-no-repeat bg-cover"><a className="px-2 py-4" href="https://discord.gg/WjcEhwf89Z"></a></div>
                </div>
                </div>
            </nav>
        </header>;
   }

   export default Header;