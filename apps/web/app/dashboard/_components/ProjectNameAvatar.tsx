import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ProjectNameAvatar = ({ projName }: { projName: string }) => {
  return (
    <Avatar className="rounded-md bg-blue-600 h-6 w-6">
      <AvatarFallback className="bg-blue-600 text-white">
        {projName.split("").splice(0, 1)[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProjectNameAvatar;
