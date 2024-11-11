"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import CustomForm from "@/components/CustomForm";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants";
import Image from "next/image";
import { SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);
      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about your self</p>
        </section>

        <section className="space-y-6">
          <div className="mb-12 space-y-1">
            <h2 className="sub-header">Personnal information</h2>
          </div>
          {/* name*/}
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="full name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="User icon"
          />
          {/* phone and email */}
          <div className="flex flex-col gap-2 xl:flex-row">
            <CustomForm
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="email"
              placeholder="johndoe@email.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="Email icon"
            />
            <CustomForm
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="phone number"
              placeholder="+212-661343323"
            />
          </div>
          {/*  Date of birth and Gender*/}
          <div className="flex flex-col gap-2 xl:flex-row">
            <CustomForm
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of birth"
            />
            <CustomForm
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          {/*  Addres and occupation*/}
          <div className="flex flex-col gap-2 xl:flex-row">
            <CustomForm
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="adress"
              label="Adress"
              placeholder="44 rue de la paix"
            />
            <CustomForm
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="occupation"
              placeholder="Software Engineer"
            />
          </div>
          {/*  Emergency contact name and number*/}
          <div className="flex flex-col gap-2 xl:flex-row">
            <CustomForm
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
              iconSrc="/assets/icons/email.svg"
              iconAlt="Email icon"
            />
            <CustomForm
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="+212-661343323"
            />
          </div>
        </section>

        {/*  Medical information*/}
        <section className="space-y-6 mt-2">
          <div className="mb-12 space-y-1">
            <h2 className="sub-header">Medical information</h2>
          </div>

          {/* PRIMARY CARE PHYSICIAN */}
          <CustomForm
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomForm>
          {/* INSURANCE PROVIDER */}
          <div className="flex flex-col gap-2 xl:flex-row">
            <CustomForm
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="BlueCross BlueShield"
            />
            <CustomForm
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance Policy Number"
              placeholder="ABC123456789"
            />
          </div>
          {/* ALERGIES */}
          <div className="flex flex-col gap-2 xl:flex-row">
            <CustomForm
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, pollen, etc."
            />
            <CustomForm
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current Medication (if any)"
              placeholder="Ibuprofen, Dorlipran, etc."
            />
          </div>
          {/* Family medical history */}
          <div className="flex flex-col gap-2 xl:flex-row">
            <CustomForm
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Family Medical History"
              placeholder="Mother breast cancer, Father diabetes, etc."
            />
            <CustomForm
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past Medical History"
              placeholder="Broken leg, appendicitis, etc."
            />
          </div>
        </section>

        {/*  Identification and verification*/}
        <section className="space-y-6 mt-2">
          <div className="mb-12 space-y-1">
            <h2 className="sub-header">Identification and verification</h2>
          </div>
        </section>

        <CustomForm
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Identification Type"
          placeholder="Select an identification type"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomForm>

        <CustomForm
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Identification Number"
          placeholder="123456789"
        />

        <CustomForm
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Scanned Identification Document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className="space-y-6 mt-2">
          <div className="mb-12 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>

        <CustomForm
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to treatment"
        />
        <CustomForm
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to disclosure"
        />
        <CustomForm
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I consent to privacy policy"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
export default RegisterForm;
