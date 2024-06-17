import { Routes, Route } from "react-router-dom";

import { BulletinBoard } from "../features/helloworld";

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<BulletinBoard />} />
    </Routes>
  );
};
