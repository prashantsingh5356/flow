"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import FileUpload from "./FileUpload";

const SettingComponent = () => {
  const [workspaceName, setWorkspaceName] = useState("Test");

  return (
    <div className=" w-[100%] py-3 flex flex-col items-center gap-5 ">
      <div className="w-[90%] min-h-[30vh] bg-white rounded-md overflow-hidden">
        <div className="w-full min-h-[20vh] border-b-2 border-dotted flex flex-col gap-2  p-4">
          <div className="grid w-full  items-center gap-3">
            <Label
              htmlFor="workspaceName"
              className="text-md text-zinc-800 font-medium"
            >
              Workspace Name
            </Label>
            <Input
              onChange={(e) => {
                return setWorkspaceName(e.target.value);
              }}
              className="text-md"
              type="text"
              id="workspaceName"
              placeholder="Flow Inc"
              value={workspaceName}
            />
          </div>
          <div className="w-full">
            <FileUpload />
          </div>
        </div>
        <div className="w-full min-h-[10vh]  flex items-center justify-end px-2">
          <Button
            variant="secondary"
            className="bg-zinc-300 font-bold h-12 w-40 hover:bg-zinc-200"
          >
            Save Changes
          </Button>
        </div>
      </div>
      <div className="w-[90%] min-h-[30vh] bg-white rounded-md overflow-hidden "></div>
    </div>
  );
};

export default SettingComponent;
