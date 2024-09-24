"use client";

import React from 'react';
import AddItem from '../AddItem/AddItem';
import { Button } from "@/components/ui/button"

const Main = () => {
  return (
    <main>
    <div>
      <Button>Click me</Button>
    </div>
        <AddItem />
    </main>
  );
};

export default Main;