import type { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Providers } from "./providers";

export const App: FC = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;
