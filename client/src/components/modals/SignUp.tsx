import { TbX } from "react-icons/tb";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { restrictedUsernames } from "../../../../api/src/utils/restricted";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/lib/api";
import Spinner from "../Spinner";

export type SignUpFormData = {
  name: string;
  username: string;
  password: string;
};

interface SignUpProps {
  isModalOpen: boolean;
  close: () => void;
}

const SignUp = ({ isModalOpen, close }: SignUpProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    mode: "all",
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: async () => {
      navigate("/", {
        replace: true,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "That username has been taken.",
      });
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    mutate(data);
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      reset();
    }, 200);
  };

  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="w-full h-full md:max-w-[600px]">
        {isPending && (
          <div className="bg-custom-white z-50 absolute w-full h-full grid place-items-center">
            <div className="w-[38px]">
              <Spinner />
            </div>
          </div>
        )}
        <div className="py-[28px] relative">
          <button
            onClick={handleClose}
            className="absolute left-2 top-[50%] translate-y-[-50%] p-[6px] hover:bg-custom-gray-1 rounded-full"
          >
            <TbX className="w-[22px] h-[22px]" />
          </button>
          <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
            <svg
              viewBox="0 0 800 800"
              className="w-[35px] fill-custom-blue-3 dark:fill-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                transform="translate(776,19)"
                d="m0 0 4 1v13l-5 47-8 53-9 47-9 40-11 42-12 39-14 41-10 24-4 4-126 63-19 10-6 3h116l-2 5-10 18-14 22-10 14-8 11-9 4-81 27-41 14-54 18-23 8h-2v2l2-1h138v3l-16 13-19 13-16 10-16 9-25 12-27 10-25 7-29 6-40 5-42 4-43 3-46 2-40 1-25 25-4 5-7 6-5 6-7 6-5 6-7 6-5 6-7 6-5 6-8 7-9 6-10 3h-11l-10-3-8-5-7-8-4-8-1-4v-16l4-10 8-10 178-178h2l2-4h2l2-4h2l2-4h2l2-4h2l2-4h2l2-4 6-5 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 105-105 4-8 1-9-3-9-6-7-9-4h-10l-8 4-10 9-258 258h-2l1-31 4-57 4-35 5-31 7-30 11-32 12-27 13-24 14-21 10-14 10-12 7-9h2l2-4 10-10 6-7h2v-2l8-7 15-14 14-11 13-10 17-12 23-15 24-14 28-15 34-16 32-13 26-10 43-14 42-12 36-9 42-9 39-7 46-7 47-5z"
              />
            </svg>
          </div>
        </div>

        <div className="overflow-y-auto py-2 px-4 w-full">
          <h1 className="text-[1.75rem] font-bold max-w-[450px] mx-auto mt-2 mb-8">
            Create your account
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-[450px] mx-auto"
          >
            <div>
              <input
                type="text"
                placeholder="Name"
                autoComplete="off"
                maxLength={50}
                {...register("name", {
                  required: "What's your name?",
                  validate: (value) => {
                    const trimmedValue = value.trim();
                    if (trimmedValue === "") {
                      return "What's your name?";
                    }
                    return true;
                  },
                })}
                className={`bg-custom-white py-[16px] px-4 w-full rounded-[5px] border ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-custom-gray-3 focus:border-custom-blue-3 focus:ring-custom-blue-3"
                } focus:outline-none focus:ring-1 placeholder:text-custom-gray-3`}
              />
              {errors.name && (
                <p className="text-red-500 text-[0.83rem] ml-2 mt-[2px]">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Username"
                autoComplete="off"
                maxLength={15}
                {...register("username", {
                  required: "Your username must be longer than 4 characters.",
                  validate: (value) => {
                    const trimmedValue = value.trim();
                    if (trimmedValue.length < 4) {
                      return "Your username must be longer than 4 characters.";
                    }
                    if (!/^[a-zA-Z0-9_]+$/.test(trimmedValue)) {
                      return "Your username can only contain letters, numbers, and '_'.";
                    }
                    if (
                      restrictedUsernames.includes(trimmedValue.toLowerCase())
                    ) {
                      return "This username is unavailable. Please try another.";
                    }
                    return true;
                  },
                })}
                className={`bg-custom-white py-[16px] px-4 w-full rounded-[5px] border ${
                  errors.username
                    ? "border-red-500 focus:ring-red-500"
                    : "border-custom-gray-3 focus:border-custom-blue-3 focus:ring-custom-blue-3"
                } focus:outline-none focus:ring-1 placeholder:text-custom-gray-3`}
              />
              {errors.username && (
                <p className="text-red-500 text-[0.83rem] ml-2 mt-[2px]">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                autoComplete="off"
                maxLength={128}
                {...register("password", {
                  required: "Password is required",
                  validate: (value) => {
                    if (value.trim() === "") {
                      return "Password is required";
                    }

                    if (value.length < 6) {
                      return "Password must be at least 6 characters.";
                    }

                    return true;
                  },
                })}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.value = target.value.replace(/\s/g, "");
                }}
                className={`bg-custom-white py-[16px] px-4 w-full rounded-[5px] border ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-custom-gray-3 focus:border-custom-blue-3 focus:ring-custom-blue-3"
                } focus:outline-none focus:ring-1 placeholder:text-custom-gray-3`}
              />
              {errors.password && (
                <p className="text-red-500 text-[0.83rem] ml-2 mt-[2px]">
                  {errors.password.message}
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="py-[20px] px-4 mt-auto grid place-items-center shadow-[0_-8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_-8px_30px_rgb(180,180,180,0.12)]">
          <Button
            variant="secondary"
            size="lg"
            className="w-full max-w-[450px]"
            onClick={handleSubmit(onSubmit)}
          >
            Next
          </Button>
        </div>

        <div className="hidden">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUp;
