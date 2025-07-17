"use client";

import Image from "next/image";

import { Button } from './ui/button'
import Link from "next/link";

const HeroSection = () => {

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl">
            AI-driven coaching 
            <br></br>tailored for your career advancement
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Get career-ready with personalized support, intelligent prep tools, and AI insights for job success.
          </p>
        </div>

        <div>
          <Link href="/dashboard">
            <Button size="lg" className="px-8">Get Started</Button>
          </Link>
          {/* <Link href="/dashboard">
            <Button size="lg" className="px-8">Get Started</Button>
          </Link> */}
        </div>
        <div className="mt-5 md:mt-0">
          <div>
            <Image src={"/logo2.jpg"} width={1100}
            height={650}
            alt="dashboard"
            className="rounded-lg shadow-2xl border mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
