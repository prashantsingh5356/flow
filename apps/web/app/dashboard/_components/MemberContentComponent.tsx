"use client";

import { EllipsisVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useSession } from "next-auth/react";

function MemberContentComponent() {
  const session = useSession();

  return (
    <div className="flex w-full  flex-col gap-6">
      <Tabs defaultValue="view">
        <TabsList className=" w-full">
          <TabsTrigger value="view">View Members</TabsTrigger>
          <TabsTrigger value="add">Add Member</TabsTrigger>
        </TabsList>
        <TabsContent value="view">
          <div className="w-full min-h-[50vh] flex flex-col gap-2 ">
            <div className="w-full h-20 flex justify-between  bg-white px-2 rounded-md">
              <div className="w-[80%] h-20 flex items-center gap-3">
                <div>
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="text-xl font-semibold bg-zinc-200">
                      P
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col">
                  <span className="text-md font-semibold">Prashant</span>
                  <span className="text-sm text-zinc-500">
                    prashantsingh5356@gmail.com
                  </span>
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
            <div className="w-full h-20 flex justify-between  bg-white px-2 rounded-md">
              <div className="w-[80%] h-20 flex items-center gap-3">
                <div>
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="text-xl font-semibold bg-zinc-200">
                      P
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col">
                  <span className="text-md font-semibold">Prashant</span>
                  <span className="text-sm text-zinc-500">
                    prashantsingh5356@gmail.com
                  </span>
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
          </div>
        </TabsContent>
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add Member</CardTitle>
              <CardDescription>
                Add Member to your workspace by providing there information.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="role">Role</Label>
                <Input id="role" type="text" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Add Member</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MemberContentComponent;
