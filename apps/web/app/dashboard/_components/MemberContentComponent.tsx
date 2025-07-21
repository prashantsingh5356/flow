"use client";

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

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import MemberCard from "./MemberCard";

import { type member } from "@repo/validation";

function MemberContentComponent() {
  const session = useSession();
  const [membersInWorkspace, setMembersInWorkspace] = useState([]);
  const [addMemberData, setAddMemberData] = useState<member>({
    name: "",
    email: "",
    role: "member",
    workspaceId: "",
    password: "",
  });
  const selectedWorkspace = useAppSelector(
    (state: RootState) => state.sidebar.workspace
  );

  const getMembersInWorkspace = async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/member?workspace=${selectedWorkspace}`
    );

    const result = await response.json();
    setMembersInWorkspace(result.data);
  };

  const addMemberInWorkspace = async () => {
    const repsonse = await fetch("http://localhost:3000/api/v1/member", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...addMemberData,
        workspaceId: selectedWorkspace,
      }),
    });

    const result = await repsonse.json();

    if (result.status === "fail") alert(result.message);
    getMembersInWorkspace();
  };

  useEffect(() => {
    if (!session) return;
    getMembersInWorkspace();
  }, [session, selectedWorkspace]);

  return (
    <div className="flex w-full  flex-col gap-6">
      <Tabs defaultValue="view">
        <TabsList className=" w-full">
          <TabsTrigger value="view">View Members</TabsTrigger>
          <TabsTrigger value="add">Add Member</TabsTrigger>
        </TabsList>
        <TabsContent value="view">
          <div className="w-full min-h-[50vh] flex flex-col gap-2 ">
            {membersInWorkspace?.length > 0 &&
              membersInWorkspace.map((member, i) => {
                return <MemberCard memberData={member} key={i} />;
              })}
            {!(membersInWorkspace?.length > 0) && (
              <div className="w-full h-10 flex justify-center  bg-white px-2 rounded-md items-center ">
                NO Members found in This Workspace
              </div>
            )}
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
                <Input
                  onChange={(e) =>
                    setAddMemberData((prev) => {
                      return { ...prev, name: e.target.value };
                    })
                  }
                  id="name"
                  type="text"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) =>
                    setAddMemberData((prev) => {
                      return { ...prev, email: e.target.value };
                    })
                  }
                  id="email"
                  type="email"
                />
              </div>
              {/* <div className="grid gap-3">
                <Label htmlFor="role">Role</Label>
                <Input
                  onChange={(e) =>
                    setAddMemberData((prev) => {
                      return { ...prev, role: "member" };
                    })
                  }
                  id="role"
                  type="text"
                />
              </div> */}
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) =>
                    setAddMemberData((prev) => {
                      return { ...prev, password: e.target.value };
                    })
                  }
                  id="password"
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={addMemberInWorkspace}>Add Member</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MemberContentComponent;
