import React from "react";
import Radio from "@/components/ui/Radio";
import useNavbarType from "@/hooks/useNavbarType";

const NavType = () => {
  const [navbarType, setNavbarType] = useNavbarType();
  const handleChange = (e) => {
    setNavbarType(e.target.value);
  };
  const navTypes = [
    {
      label: "Przyklejony",
      value: "sticky",
    },
    {
      label: "Statyczny",
      value: "static",
    },
    {
      label: "Pływający",
      value: "floating",
    },
    {
      label: "Ukryty",
      value: "hidden",
    },
  ];

  return (
    <div>
      <h4 className="text-slate-600 text-base dark:text-slate-300 mb-2 font-normal">
      Typ paska nawigacyjnego
      </h4>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-3">
        {navTypes?.map((item, index) => (
          <Radio
            key={index}
            label={item.label}
            name="navbarType"
            value={item.value}
            checked={navbarType === item.value}
            onChange={handleChange}
            className="h-4 w-4"
          />
        ))}
      </div>
    </div>
  );
};

export default NavType;
