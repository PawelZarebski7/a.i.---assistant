import React from "react";
import SimpleBar from "simplebar-react";
import { useSelector } from "react-redux";
import Icon from "@/components/ui/Icon";

const socials = [
  // {
  //   name: "Strona WWW",
  //   icon: "bi:facebook",
  //   link: "https://frodo.poznan.pl/",
  // },
  // {
  //   name: "twitter",
  //   link: "#",
  //   icon: "bi:twitter",
  // },
  // {
  //   name: "instagram",
  //   link: "#",
  //   icon: "bi:instagram",
  // },
];

const Info = () => {
  const { activechat, user } = useSelector((state) => state.chat);
  return (
    <SimpleBar className="h-full p-6">
      <h4 className="text-xl text-slate-900 font-medium mb-8">O Modelu Frodo A.I.</h4>
      {/* <div className="h-[100px] w-[100px] rounded-full mx-auto mb-4">
        <img
          src={user.avatar}
          alt=""
          className="block w-full h-full object-cover rounded-full"
        />
      </div> */}
      <div className="text-center">
        <h5 className="text-base text-slate-600 dark:text-slate-300 font-medium mb-1">
          {user.fullName}
        </h5>
        <h6 className="text-xs text-slate-600 dark:text-slate-300 font-normal">
          {user.role}
        </h6>
      </div>
      <ul className="list-item mt-5 space-y-4 border-b border-slate-100 dark:border-slate-700 pb-5 -mx-6 px-6">
        <li className="flex justify-between text-sm text-slate-600 dark:text-slate-300 leading-[1]">
          <div className="flex space-x-2 items-start rtl:space-x-reverse">
            <Icon
              icon="heroicons-outline:location-marker"
              className="text-base"
            />
            <span>Siedziba</span>
          </div>
          <div className="font-medium">Poznań</div>
        </li>
        {/* <li className="flex justify-between text-sm text-slate-600 dark:text-slate-300 leading-[1]">
          <div className="flex space-x-2 items-start rtl:space-x-reverse">
            <Icon icon="heroicons-outline:user" className="text-base" />
            <span>Members since</span>
          </div>
          <div className="font-medium">June 2024</div>
        </li> */}
        <li className="flex justify-between text-sm text-slate-600 dark:text-slate-300 leading-[1]">
          <div className="flex space-x-2 items-start rtl:space-x-reverse">
            <Icon icon="heroicons-outline:translate" className="text-base" />
            <span>Język</span>
          </div>
          <div className="font-medium">Dowolny</div>
        </li>
      </ul>
      <ul className="list-item space-y-3 border-b border-slate-100 dark:border-slate-700 pb-5 -mx-6 px-6 mt-5">
        {socials?.map((slink, sindex) => (
          <li
            key={sindex}
            className="text-sm text-slate-600 dark:text-slate-300 leading-[1]"
          >
            <button className="flex space-x-2 rtl:space-x-reverse">
              <Icon icon={slink.icon} className="text-base" />
              <span className="capitalize font-normal text-slate-600 dark:text-slate-300">
                {slink.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </SimpleBar>
  );
};

export default Info;
