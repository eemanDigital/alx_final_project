"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signUp } from "next-auth-sanity/client";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const defaultFormData = {
  email: "",
  name: "",
  password: "",
};
const Auth = () => {
  const [formData, setFormData] = useState(defaultFormData);

  const inputStyle =
    "border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5 focus:outline-none ";
  const handleInpuChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const { data: session } = useSession();
  // console.log(session);
  const router = useRouter();

  useEffect(() => {
    if (session) return router.push("/");
  }, [router, session]);

  const loginHandler = async () => {
    try {
      await signIn();
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = await signUp(formData);
      if (user) {
        return toast.success("Success. Please sing in");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      // reset for data
      setFormData(defaultFormData);
    }
  };

  return (
    <section className="container mx-auto">
      <div className="p-6 space-y-4 sm:p-8 w-80 md:w-[70%] mx-auto">
        <div className="flex mb-8  flex-col md:flex-row items-center justify-between ">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2x">
            Create an Account
          </h1>
          <p>OR</p>
          <span className=" inline-flex items-center">
            <AiFillGithub
              onClick={loginHandler}
              className="mr-3 text-4xl cursor-pointer text-black dark:text-white"
            />{" "}
            |
            <FcGoogle
              onClick={loginHandler}
              className="ml-3   text-4xl cursor-pointer"
            />
          </span>
        </div>

        <form
          action=""
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            required
            className={inputStyle}
            value={formData.email}
            onChange={handleInpuChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Asinmi Lukman"
            required
            className={inputStyle}
            value={formData.name}
            onChange={handleInpuChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            minLength={6}
            className={inputStyle}
            value={formData.password}
            onChange={handleInpuChange}
          />

          <button
            type="submit"
            className="w-full bg-tertiary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Sign Up
          </button>
          <button onClick={loginHandler} className="text-blue-700 underline">
            {" "}
            login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
