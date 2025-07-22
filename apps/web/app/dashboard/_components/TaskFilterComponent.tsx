import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, ListChecks } from "lucide-react";

import { LucideIcon } from "lucide-react";

const TaskFilterComponent = ({
  filter,
}: {
  filter: {
    name: string;
    defaultValue: string;
    values: string[];
    leftIcon: LucideIcon;
    rightIcon?: LucideIcon;
  };
}) => {
  // console.log(filter);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <filter.leftIcon className="mr-2" /> {filter.name}{" "}
          {filter.rightIcon ? <filter.rightIcon className="ml-2" /> : ""}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>{filter.defaultValue}</DropdownMenuItem>
          <DropdownMenuSeparator />
          {filter.values.map((value, i) => (
            <DropdownMenuItem key={i}>{value}</DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskFilterComponent;
