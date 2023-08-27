import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineShoppingCart } from 'react-icons/ai'
const Header = () => {
    return (
        <>
            <div className='main-div grid tablet:grid-cols-2 tablet:w-[1100px]  tablet:mx-auto mobile:mx-5 grid-cols-1   tablet:mt-5 mobile:mt-5'>
                <div className="left-side mt-16">
                    <button className='bg-[#e1edff] text-blue-600 font-bold py-2 px-4 rounded-md'>Sale 70%</button>
                    <h1 className='tablet:text-6xl mobile:text-5xl font-bold text-gray-950 tabletw-[40vw] mt-5'>An Industrial Take on Streetwear</h1>
                    <p className='text-gray-500 tablet:w-80 w-[50vw] mt-10'>Anyone can beat you but no one can beat your outfit as long as you wear Dine outfits.</p>
                    <button className='bg-gray-950 text-white font-semibold tablet:justify-evenly justify-center flex  py-2 mt-8 w-72 tablet:w-36 px-4'><AiOutlineShoppingCart className=' mr-3 text-4xl tablet:mt-3'/> <Link href="/allproducts">Start Shopping</Link></button>
                </div>
                <div className="right-side tablet:block hidden bg-[#ffece3] rounded-full h-[550px] w-[550px]">
                    <Image alt='headerImage'
                     width={600}
                     height={650}
                      className=' top-[14%] w-[600px] ' 
                      src='https://full-stack-ecommerce-clothing-web.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fheader.a3d3ccd9.png&w=750&q=75' />
                </div>
            </div>
        </>
    )
}

export default Header
