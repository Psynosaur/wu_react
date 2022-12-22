import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Charts from "./components/Charts";
import Day from "./components/Day";

const AppRoutes = [
  {
    index: true,
    element: <Day />
  },
  // {
  //   path: '/counter',
  //   element: <Counter />
  // },
  {
    path: '/day',
    element: <Day />
  },
  // {
  //   path: '/charts',
  //   element: <Charts />
  // }
];

export default AppRoutes;
