"use client";

import React, { useState } from "react";

import FormWrapper from "../../../_components/form-wrapper/FormWrapper";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { TextField, Button, Link } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
type FormLabel =
  | "firstName"
  | "lastName"
  | "email"
  | "password"
  | "confirmPassword";

const Register = () => {
  const {
    control,
    formState: { errors, defaultValues },
    setError,
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const [customError, setCustomError] = useState<string>("");
  const { replace } = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URI}/register`;
      const { data } = await axios.post(url, values);
      replace("/login");
      if (customError) {
        setCustomError("");
      }
    } catch (e: any) {
      const errorMessage = e?.response?.data?.error?.message;
      // if (errorMessage.toLowerCase().includes("email")) {
      //   return setError("email", { type: "custom", message: errorMessage });
      // }
      setCustomError(errorMessage);
      console.error(e);
    }
  };

  // @ts-ignore
  const formLabels: FormLabel[] = Object.keys(defaultValues) as FormLabel[];

  const splitAndCapitalizeWords = (item: string) => {
    const words = item.split(/(?=[A-Z])/);

    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <FormWrapper label={"Register"}>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Box display={"flex"} flexDirection={"column"} gap={4}>
          {formLabels.map((item) => (
            <Controller
              key={item}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id={item}
                  label={splitAndCapitalizeWords(item)}
                  helperText={errors[item]?.message}
                  error={!!errors[item]?.message}
                  type={
                    item.toLowerCase().includes("password")
                      ? "password"
                      : "text"
                  }
                />
              )}
              name={item}
            />
          ))}

          <span style={{ color: "red", fontSize: 14 }}>{customError}</span>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Button
              type={"submit"}
              variant={"contained"}
              size={"medium"}
              sx={{ width: 120, textTransform: "capitalize" }}
            >
              Register
            </Button>

            <Link href={"/login"}>Log in</Link>
          </Box>
        </Box>
      </form>
    </FormWrapper>
  );
};

export default Register;
