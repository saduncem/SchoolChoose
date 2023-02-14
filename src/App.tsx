import { RouteObject, useRoutes  } from "react-router-dom";
import Wizard from './pages/Wizard/index';
import Login from './pages/Login/index';

function App() {

  let routes: RouteObject[] = [
    {
      path: "/",
      // element: <Layout />,
      children: [
        { index: false, element: <Wizard/>, path: "/main", },
        {
          path: "/",
          index: true,
          element: <Login />
        }
      ]
    }
  ];
  let element = useRoutes(routes);
  return (
    <div className='App'>
      {element}
    </div>
  );
}

export default App;