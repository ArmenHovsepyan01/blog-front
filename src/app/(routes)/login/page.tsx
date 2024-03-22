"use client";

import React, { useState } from "react";

import { signIn, useSession } from "next-auth/react";

import { Button, Link, TextField, Box } from "@mui/material";

import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";

import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import axios from "axios";

import FormWrapper from "../../../_components/form-wrapper/FormWrapper";

import { setUser } from "@/lib/store/actions/user.actions";

import Cookies from "js-cookie";

const schema = yup
  .object({
    email: yup.string().email("Please enter a valid email address").required(),
    password: yup.string().min(6).required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const [customError, setCustomError] = useState<string>("");

  const router = useRouter();
  const { data } = useSession();

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      // const url = `${process.env.NEXT_PUBLIC_API_URI}/login`;
      // if (values.email && values.password) {
      //   const { data } = await axios.post(url, values);
      //
      //   Cookies.set("token", data.data.access_token);
      //   Cookies.set("id", data.data.user.id);
      //
      //   dispatch(setUser(data.data.user));
      //
      //   if (customError) {
      //     setCustomError("");
      //   }
      //
      //   router.replace("/");
      // }

      const res = await signIn("login", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      router.replace("/");
    } catch (e: any) {
      const errorMessage = e.response.data.error.message;

      if (errorMessage.toLowerCase().includes("password")) {
        return setError(
          "password",
          { type: "custom", message: e.response.data.error.message },
          { shouldFocus: true },
        );
      }

      if (errorMessage.toLowerCase().includes("email")) {
        return setError(
          "email",
          { type: "custom", message: e.response.data.error.message },
          { shouldFocus: true },
        );
      }

      setCustomError(errorMessage);
    }
  };

  return (
    <FormWrapper label={"Login"}>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Box display={"flex"} gap={4} flexDirection={"column"}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id={"email"}
                label="Email address"
                required
                placeholder={"example@gmail.com"}
                helperText={errors.email?.message}
                error={!!errors.email?.message}
              />
            )}
          />

          <Controller
            name={"password"}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id={"password"}
                type={"password"}
                label="Password"
                helperText={errors.password?.message}
                error={!!errors.password?.message}
                required
              />
            )}
          />
          <p style={{ color: "red" }}>{customError}</p>

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              type={"submit"}
              variant={"contained"}
              size={"medium"}
              sx={{ width: 120, textTransform: "capitalize" }}
            >
              Log in
            </Button>

            <Link href={"/register"}>Reigster now</Link>
          </Box>
        </Box>
      </form>
    </FormWrapper>
  );
};

export default Login;
