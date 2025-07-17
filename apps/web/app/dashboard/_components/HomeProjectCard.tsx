import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { iProjectData } from "../home/page";

const HomeProjectCard = ({ project }: { project: iProjectData }) => {
  return (
    <div className="w-[48%] min-w-70 h-25 bg-white flex items-center justify-center">
      <div className="w-[90%] h-20 ">
        <div className=" h-full flex items-center gap-4">
          <Avatar className="rounded-md bg-blue-600  h-13 w-13">
            <AvatarFallback className="bg-blue-600  text-white font-semibold text-2xl">
              {project?.projectName.split(" ")[0]?.split("")[0]}
            </AvatarFallback>
          </Avatar>
          <span>
            <p className="text-lg font-semibold">{project.projectName}</p>
          </span>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default HomeProjectCard;
