import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";

function MemberCard({
  memberData,
}: {
  memberData: {
    id: string;
    name: string;
    email: string;
  };
}) {
  return (
    <div className="w-full h-20 flex justify-between  bg-white px-2 rounded-md">
      <div className="w-[80%] h-20 flex items-center gap-3">
        <div>
          <Avatar className="h-12 w-12">
            <AvatarFallback className="text-xl font-semibold bg-zinc-200">
              {memberData.name.split("")[0]}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col">
          <span className="text-md font-semibold">{memberData.name}</span>
          <span className="text-sm text-zinc-500">{memberData.email}</span>
        </div>
      </div>
      <div className="w-10 h-20 flex items-center ">
        <Button
          variant="secondary"
          className="bg-zinc-200 hover:bg-zinc-300 h-10 w-10"
        >
          <EllipsisVertical />
        </Button>
      </div>
    </div>
  );
}

export default MemberCard;
