
"use client";
import Lottie from "lottie-react";
import loaderAnimation from "@/public/animation/loader.json";

export const Loader = () => (
  <div className="flex justify-center items-center h-20">
    <Lottie 
      animationData={loaderAnimation} 
      loop={true} 
      style={{ width: 80, height: 80 }}
    />
  </div>
);