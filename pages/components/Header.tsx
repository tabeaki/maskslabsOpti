/* eslint-disable @next/next/no-html-link-for-pages */
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'

 function Header() {
    
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
                    <Image className="" src="/Discover Feed-logo.png" alt="chara1"  width={150} height={50} objectFit="contain"/>
                </div>
                <div className='justify-end flex'>
                    <button id="mintButton" className="px-4 py-2 my-1 sm:text-lg lg:text-2xl text-white font-semibold rounded hover:bg-[#767676]" onClick={addChain}>Wallet Conect</button>
                    <Toaster/>
                    <div className="bg-[url('/inst_icon.png')] px-2 text-center bg-center bg-no-repeat bg-cover"><a className="px-2 py-4" href="https://www.instagram.com/discoverfeednetwork"></a></div>
                    <div className="bg-[url('/twiter_icon.png')] px-4 text-center bg-center bg-no-repeat bg-cover"><a className="px-2 py-4" href="https://twitter.com/Discoverfeednet"></a></div>
                    <div className="bg-[url('/discode_icon.png')] px-2 mr-4 text-center bg-center bg-no-repeat bg-cover"><a className="px-2 py-4" href="https://discord.gg/discoverfeed"></a></div>
                </div>
                </div>
            </nav>
        </header>;
   }

   export default Header;