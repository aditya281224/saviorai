import { getUserOnboardingStatus } from '@/actions/user'
import { industries } from '@/data/industries'
import { redirect } from "next/navigation";
import OnboardingForm from "@/app/(main)/onboarding/_components/onboarding-form";





const OnboardingPage = async () => {
  // const {isOnboarded} = await getUserOnboardingStatus();
  // if(isOnboarded){
  //   redirect("/dashboard");
  // }
  return (
    <main>
      <OnboardingForm industires={industries}/>
    </main>
  )
}

export default OnboardingPage
