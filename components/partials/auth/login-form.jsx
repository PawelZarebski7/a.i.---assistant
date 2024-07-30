// import React, { useState } from "react";
// import Textinput from "@/components/ui/Textinput";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useRouter } from "next/navigation";
// import Checkbox from "@/components/ui/Checkbox";
// import Link from "next/link";
// import { useDispatch } from "react-redux";
// import { handleLogin } from "./store";
// import { toast } from "react-toastify";

// const schema = yup
//   .object({
//     email: yup.string().email("Nieprawidłowy email").required("Email jest wymagany"),
//     password: yup.string().required("Hasło jest wymagane"),
//   })
//   .required();

// const LoginForm = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm({
//     resolver: yupResolver(schema),
//     mode: "all",
//   });

//   const onSubmit = async (data) => {
//     try {
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         dispatch(handleLogin(true));
//         toast.success("Zalogowano pomyślnie", {
//           position: "top-right",
//           autoClose: 1500,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//         setTimeout(() => {
//           router.push("/chat");
//         }, 1500);
//       } else {
//         const error = await response.json();
//         toast.error(error.message || "Nieprawidłowe dane logowania", {
//           position: "top-right",
//           autoClose: 1500,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//       }
//     } catch (error) {
//       console.error('Błąd logowania:', error);
//       toast.error("Wystąpił błąd podczas logowania", {
//         position: "top-right",
//         autoClose: 1500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//   };

//   const [checked, setChecked] = useState(false);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
//       <Textinput
//         name="email"
//         label="Email"
//         type="email"
//         register={register}
//         error={errors?.email}
//       />
//       <Textinput
//         name="password"
//         label="Hasło"
//         type="password"
//         register={register}
//         error={errors.password}
//       />
//       <div className="flex justify-between">
//         <Checkbox
//           value={checked}
//           onChange={() => setChecked(!checked)}
//           label="Pozostaw mnie zalogowanego"
//         />
//         <Link
//           href="/forgot-password"
//           className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
//         >
//           Zapomniałeś hasła?{" "}
//         </Link>
//       </div>

//       <button className="btn btn-dark block w-full text-center">Zaloguj się</button>
//     </form>
//   );
// };

// export default LoginForm;

import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";

const schema = yup
  .object({
    email: yup.string().email("Nieprawidłowy email").required("Email jest wymagany"),
    password: yup.string().required("Hasło jest wymagane"),
  })
  .required();

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    // Tymczasowo pomijamy logikę logowania
    dispatch(handleLogin(true));
    toast.success("Zalogowano pomyślnie (tryb tymczasowy)", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      router.push("/chat");
    }, 1500);
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="email"
        label="Email"
        type="email"
        register={register}
        error={errors?.email}
      />
      <Textinput
        name="password"
        label="Hasło"
        type="password"
        register={register}
        error={errors.password}
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Pozostaw mnie zalogowanego"
        />
        <Link
          href="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Zapomniałeś hasła?{" "}
        </Link>
      </div>

      <button className="btn btn-dark block w-full text-center">Zaloguj się</button>
    </form>
  );
};

export default LoginForm;