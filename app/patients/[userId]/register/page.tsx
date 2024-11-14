import RegisterForm from "@/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Register = async ({ params}: SearchParamProps) => {
  const { userId } = params;
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-cole py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="Care Pulse logo"
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user} />
          <p className="copyright py-12">© 2024 Care Pulse</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="Onboarding patient illustration"
        className="side-img max-w-[40%]"
      />
    </div>
  );
};

export default Register;
