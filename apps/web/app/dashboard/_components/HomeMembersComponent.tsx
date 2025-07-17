import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings } from "lucide-react";

import { iMembersData, tMembersData } from "../home/page";

const HomeMembersComponent = ({ data }: { data: tMembersData }) => {
  return (
    <div className="w-[96%] min-h-45  ">
      <div className="w-full h-15 flex justify-between border-dotted border-b-2 ">
        <div className="w-[75%] h-full  p-4 flex items-center">
          <span className=" text-xl font-semibold">Members (3)</span>
        </div>
        <div className=" w-[10%] h-full flex items-center justify-center ">
          <Button variant="secondary" className="bg-zinc-200 hover:bg-zinc-300">
            <Settings />
          </Button>
        </div>
      </div>
      <div className="w-full  min-h-30 flex items-center flex-wrap gap-2 py-2">
        {data.map((member: iMembersData) => {
          return (
            <div
              key={member.email}
              className="min-w-35 h-30 border-dotted border-4 flex flex-col items-center justify-center gap-0.5 px-2"
            >
              <div>
                <Avatar className=" h-10 w-10 ">
                  <AvatarFallback className="bg-zinc-300 text-zinc-800">
                    {member.name.split(" ")[0]?.split("")[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="font-semibold">{member.name}</div>
              <div className="text-zinc-600">{member.email}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeMembersComponent;
