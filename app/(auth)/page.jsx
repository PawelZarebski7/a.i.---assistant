"use client";
import Link from "next/link";
import LoginForm from "@/components/partials/auth/login-form";
import Social from "@/components/partials/auth/social";
import useDarkMode from "@/hooks/useDarkMode";

// image import

const Login = () => {
  const [isDark] = useDarkMode();
  return (
    <>
      <div className="loginwrapper">
        <div className="lg-inner-column">
          <div className="left-column relative z-[1]">
            <div className="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
              {/* <Link href="/">
                <img
                  src={
                    isDark
                      ? "/assets/images/logo/logo-white.svg"
                      : "/assets/images/logo/logo.svg"
                  }
                  alt=""
                  className="mb-10"
                />
              </Link> */}
              <h4>
                {" "}
                <span className="text-slate-800 dark:text-slate-400 font-bold">
                  
                </span>
              </h4>
            </div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 mx-12 z-[-1]">
              <img
                  src="/assets/images/logo/logo_white-1.webp"
                  alt=""
                  className="w-full object-contain"
              />
</div>
          </div>
          <div className="right-column relative">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                {/* <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link href="/">
                    <img
                      src={
                        isDark
                          ? "/assets/images/logo/logo-white.svg"
                          : "/assets/images/logo/logo.svg"
                      }
                      alt=""
                      className="mx-auto"
                    />
                  </Link>
                </div> */}
                <div className="text-center 2xl:mb-10 mb-4">
                  <h4 className="font-medium">Zaloguj</h4>
                  <div className="text-slate-500 text-base">
                    Zaloguj się do panelu A.I. BEZ REJESTRACJI i skomunikuj się z naszym asystentem
                  </div>
                </div>
                <LoginForm />
                {/* <div className="relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6">
                  <div className="absolute inline-block bg-white dark:bg-slate-800 dark:text-slate-400 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm text-slate-500 font-normal">
                    Kontynuuj z
                  </div>
                </div>
                <div className="max-w-[242px] mx-auto mt-8 w-full">
                  <Social />
                </div> */}
                {/* <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm">
                  Nie masz konta{" "}
                  <Link
                    href="/register"
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >
                    Zarejestruj się
                  </Link>
                </div> */}
              </div>
              <div className="auth-footer text-center">
                Copyright 2024, NovaTech All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
