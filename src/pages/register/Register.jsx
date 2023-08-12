import React, { useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
// import { signIn } from "next-auth/react";
// import { toast } from "react-hot-toast";
// import {
//   FieldValues,
//   useForm
// } from "react-hook-form";

import Modal from "./Modal";

import Heading from "./Heading";


const RegisterModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FieldValues>({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   });

  const onSubmit = (data) => {
    // setIsLoading(true);

    // axios
    //   .post("/api/register", data)
    //   .then(() => {
    //     toast.success("Registered!");
    //     onClose();
    //   })
    //   .catch((error) => {
    //     toast.error(error.message || "An error occurred");
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <input
      className="form__input "
        id="email"
        label="Email"
        type="email"
        // disabled={isLoading}
        // register={register}
        // errors={errors}
        // required
      />
      <input
         className="form__input "
        id="name"
        label="Name"
        type="password"
        // disabled={isLoading}
        // register={register}
        // errors={errors}
        // required
      />
      <input
        className="form__input "
        id="password"
        label="Password"
        type="password"
        // disabled={isLoading}
        // register={register}
        // errors={errors}
        // required
      />
      
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <button className=" relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full bg-white border-black text-black text-sm py-2 font-light border-[1px] flex items-center justify-center gap-2"
         // onClick={() => signIn("google")}
      >
        <span className="text-xl"><FcGoogle /></span> 
        Continue with Google
        </button>
      {/* <button className=""
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      /> */}
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          Already have an account?
          <span
            onClick={onClose}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {" "}
            Close
          </span>
        </p>
      </div>
    </div>
  );

  return (
            <Modal
            disabled={isLoading}
            isOpen={isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={onClose}
            onSubmit={onSubmit} // Đã không cần () ở đây
            body={bodyContent}
            footer={footerContent}
            // secondaryAction={onSubmit} // (tuỳ chọn) Thêm secondaryAction và secondaryActionLabel nếu bạn muốn
            // secondaryActionLabel="Secondary Action"
            />

  );
};

export default RegisterModal;
