"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const SettingHeader = () => {
  return (
    <div className="w-[100%] h-30  flex justify-center items-center ">
      <div className="w-[90%] h-25  flex  items-center justify-between border-b-3 border-dotted ">
        <div>
          <h1 className="text-3xl font-semibold">Flow Inc</h1>
        </div>
        <div>
          <Button variant="secondary" className="bg-zinc-200 hover:bg-zinc-300">
            <ArrowLeft /> Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingHeader;
