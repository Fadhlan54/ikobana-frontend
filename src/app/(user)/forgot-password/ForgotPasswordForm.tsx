import Button from "@/components/elements/Button";
import TextInput from "@/components/elements/inputs/TextInput";
import LoadingSpinner from "@/components/elements/loading/LoadingSpinner";
import { requestResetPassword } from "@/service/auth.service";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormValues = {
  email: string;
};

export default function ForgotPasswordForm({
  setIsSubmitted,
}: {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: requestResetPassword,
    onSuccess: () => {
      setIsSubmitted(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    mutate(data.email);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <TextInput
        register={register}
        id="email"
        label="Email address"
        type="email"
        placeholder="your.email@example.com"
        error={errors.email?.message}
        required
      />

      <div>
        <Button
          type="submit"
          variant="primary"
          className="w-full justify-center"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <LoadingSpinner className="mr-2" />
              Sending...
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </div>
    </form>
  );
}
