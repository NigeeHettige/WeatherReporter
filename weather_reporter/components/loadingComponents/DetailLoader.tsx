
"use client";
import Lottie from "lottie-react";
import loaderAnimation from "@/public/animation/loader.json";

export const DetailLoader = () => (
  <div className="flex justify-center items-center h-20">
    <Lottie 
      animationData={loaderAnimation} 
      loop={true} 
      style={{ width: 30, height: 30 }}
    />
  </div>
);