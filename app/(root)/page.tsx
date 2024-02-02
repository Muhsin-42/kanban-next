import React from "react";
import Header from "@/components/Header/Header";
import Board from "@/components/Board/Board";
import AddFloatingBtn from "@/components/shared/AddFloatingBtn";
import CreateTask from "@/components/CreateTask/CreateTask";
// import { Toaster } from "@/components/ui/toaster"
export default async function Home() {
  return (
    <main className="">
      <Header />
      <Board />
      <CreateTask />
      {/* <Toaster/>      */}
    </main>
  );
}
