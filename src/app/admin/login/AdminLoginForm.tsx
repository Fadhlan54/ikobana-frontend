"use client";

import Button from "@/components/elements/Button";
import PasswordInput from "@/components/elements/inputs/PasswordInput";
import TextInput from "@/components/elements/inputs/TextInput";
import LoadingSpinner from "@/components/elements/loading/LoadingSpinner";
import { AddressResponse } from "@/interface/address";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/user";
import { login } from "@/service/auth.service";
import { setCookie } from "@/utils/cookies";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type FormValues = {
  email: string;
  password: string;
};

export default function AdminLoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.result.user.role !== "admin") {
        toast.error("You are not an admin");
        return;
      }
      const result = data.result;
      setCookie({
        key: "at",
        value: result.access_token,
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: false,
      });
      setCookie({
        key: "rt",
        value: result.refresh_token,
        maxAge: 60 * 60 * 24 * 7,
      });

      const userData = data.result.user;
      const userAddresses = userData.addresses.map(
        (address: AddressResponse) => ({
          id: address.id,
          label: address.label,
          city: address.city,
          district: address.district,
          subDistrict: address.sub_district,
          street: address.street,
          postalCode: address.postal_code,
        })
      );

      console.log(userData);

      dispatch(
        setUser({
          id: userData.id,
          name: userData.fullname,
          email: userData.email,
          phone: userData.phone_number,
          addresses: userAddresses,
          role: userData.role,
        })
      );
      toast.success("Login successful! Redirecting...");
      router.push("/admin/dashboard");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 401:
            toast.error("Invalid email or password");
            return;
          case 403:
            toast.error("Email not verified");
            return;
        }
      }
      toast.error("An unexpected error occurred");
    },
  });

  const handleLogin = (data: FormValues) => {
    mutate(data);
  };
  return (
    <form action="" onSubmit={handleSubmit(handleLogin)}>
      <div className="space-y-4">
        <TextInput
          id="email"
          label="Email Address"
          placeholder="admin@example.com"
          type="email"
          error={errors.email?.message}
          register={register}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="••••••••"
          error={errors.password?.message}
          register={register}
          validation={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
        />
      </div>

      <Button
        variant="primary"
        type="submit"
        disabled={isPending}
        size="lg"
        full
        className="mt-6"
      >
        {isPending ? (
          <span className="flex items-center justify-center">
            <LoadingSpinner className="mr-2" />
            Signing in...
          </span>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
