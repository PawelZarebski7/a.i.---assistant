"use client"

import Link from "next/link";

const ImageBlock1 = () => {
  return (
   
    <div
      className="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"
      style={{
        backgroundImage: `url(/assets/images/all-img/widget-bg-1.png)`,
      }}
    >
      <div className="max-w-[169px]">
        <div className="text-xl font-medium text-slate-900 mb-2">
          Skorzystaj z aplikacji MOBI
        </div>
        <p className="text-sm text-slate-800">Plany subskrypcyjne</p>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 ltr:right-6 rtl:left-6 mt-2 h-12 w-12 bg-white text-slate-900 rounded-full text-xs font-medium flex flex-col items-center justify-center">
      <a to="https://mobipest.eu/cennik/" target="_blank" rel="noopener noreferrer">  Now </a>
      </div>
    </div>
    
  );
};

export default ImageBlock1;
