import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import Header from '@/components/Header'
import Section1 from '@/components/section1'
import Section2 from '@/components/section2'
import Section3 from '@/components/section3'
import { auth } from '@clerk/nextjs';
import { useAuth } from "@clerk/nextjs";
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

export default function Home({ req, res }: any) {
  console.log("reqest are", req, "response are", res);
  const { userId } = auth();
  console.log("is user is available or not",userId)
  setCookie('useriid', `${userId}`, { req, res, maxAge: 60 * 60 * 24 });
  console.log("userid is got ", userId);

  return (
    <div>
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  )
}
