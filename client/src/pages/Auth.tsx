import { Button } from "@/components/ui/button";
import { useState } from "react";
import SignUp from "@/components/modals/SignUp";
import Login from "@/components/modals/Login";

const Auth = () => {
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row mx-auto max-w-[600px] lg:max-w-full w-full min-h-screen p-8">
      <div className="w-full flex justify-start lg:justify-center lg:px-8">
        <svg
          viewBox="0 0 800 800"
          className="max-w-[50px] lg:max-w-[350px] fill-custom-blue-3 dark:fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            transform="translate(776,19)"
            d="m0 0 4 1v13l-5 47-8 53-9 47-9 40-11 42-12 39-14 41-10 24-4 4-126 63-19 10-6 3h116l-2 5-10 18-14 22-10 14-8 11-9 4-81 27-41 14-54 18-23 8h-2v2l2-1h138v3l-16 13-19 13-16 10-16 9-25 12-27 10-25 7-29 6-40 5-42 4-43 3-46 2-40 1-25 25-4 5-7 6-5 6-7 6-5 6-7 6-5 6-7 6-5 6-8 7-9 6-10 3h-11l-10-3-8-5-7-8-4-8-1-4v-16l4-10 8-10 178-178h2l2-4h2l2-4h2l2-4h2l2-4h2l2-4h2l2-4 6-5 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 105-105 4-8 1-9-3-9-6-7-9-4h-10l-8 4-10 9-258 258h-2l1-31 4-57 4-35 5-31 7-30 11-32 12-27 13-24 14-21 10-14 10-12 7-9h2l2-4 10-10 6-7h2v-2l8-7 15-14 14-11 13-10 17-12 23-15 24-14 28-15 34-16 32-13 26-10 43-14 42-12 36-9 42-9 39-7 46-7 47-5z"
          />
        </svg>
      </div>
      <div className="w-full flex flex-col justify-center mt-12 lg:mt-0 lg:px-8">
        <h1 className="text-[2.7rem] sm:text-[4.25rem] leading-[3.4rem] sm:leading-[5.25rem] font-extrabold">
          Happening Now
        </h1>
        <p className="text-[1.85rem] font-bold mt-5 sm:mt-7">Join today.</p>
        <div className="flex flex-col space-y-3 max-w-[350px] mt-10">
          <Button onClick={() => setSignUpOpen(true)}>Create account</Button>
          <Button onClick={() => setLoginOpen(true)} variant="outline">
            Sign In
          </Button>
        </div>
        <p className="text-sm max-w-[350px] mt-6">
          By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use.
        </p>
      </div>
      <SignUp isModalOpen={isSignUpOpen} close={() => setSignUpOpen(false)} />
      <Login
        isModalOpen={isLoginOpen}
        close={() => setLoginOpen(false)}
        openSignUp={() => setSignUpOpen(true)}
      />
    </div>
  );
};

export default Auth;
