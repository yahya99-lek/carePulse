import { Button } from "@/components/ui/button";
import PatientForm from "@/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP Verification | PasskeyModal */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[406px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="Care Pulse logo"
            className="mb-12 h-10 w-fit"
          />
          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 Care Pulse
            </p>
            <Link href="/admin=true">
              <span className="text-green-500">Admin</span>
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="Onboarding patient illustration"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
