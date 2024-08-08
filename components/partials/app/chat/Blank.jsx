import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import { toggleMobileChatSidebar } from "./store";

const Blank = () => {
  const { width, breakpoints } = useWidth();
  const dispatch = useDispatch();
  return (
    <div className="h-full flex flex-col items-center justify-center xl:space-y-2 space-y-6">
      <img src="/assets/images/svg/blank.svg" alt="" />
      <h4 className="text-2xl text-slate-600 dark:text-slate-300 font-medium">
        Chcesz porozmawiać z Frodo A.I.
      </h4>

      <p className="text-sm text-slate-500 lg:pt-0 pt-4">
        {width > breakpoints.lg ? (
          <span>
             wybierz Frodo Asystenta po lewej stronie i po prostu napisz: {"Cześć!"}
          </span>
        ) : (
          <span
            className="btn btn-dark cursor-pointer"
            onClick={() => dispatch(toggleMobileChatSidebar(true))}
          >
            Start Conversation
          </span>
        )}
      </p>
    </div>
  );
};

export default Blank;
