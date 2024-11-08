import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full mt-3"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="Loading spinner"
            width={24}
            height={24}
          />
          Laoding...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
