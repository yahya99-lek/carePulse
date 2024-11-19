import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointement.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointement request</span>{" "}
            has been successfully submitted!
          </h2>
          <p>we'll be in touch shortly</p>
        </section>

        <section className="request-details">
          <p>requested appointement details</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              height={100}
              width={100}
              alt="doctor"
              className="size-6"
            />
            <p className="whitespace-nowrap">
              Dr. {doctor?.name} <br />
            </p>
            <div className="flex gap-2">
              <Image
                src="/assets/icons/calendar.svg"
                height={20}
                width={20}
                alt="calendar"
              />
              <p>{formatDateTime(appointment.schedule).dateTime}</p>
            </div>
          </div>
        </section>
        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointement
          </Link>
        </Button>
        <p className="copyright">
          © 2024 Care Pulse
        </p>
      </div>
    </div>
  );
};

export default Success;
