import InventoryTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";
import React from "react";

const page = async() => {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  return (
    <>
      {user ? (
        <div className="lg:col-span-full">
            <InventoryTable/>
        </div>
      ) : (
        <div className="flex justify-center mt-20 items-center">
            <SignUp/>
        </div>
      )}
    </>
  );
};

export default page;
