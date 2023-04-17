import { RouteObject, useRoutes  } from "react-router-dom";
import Wizard from './pages/Wizard/index';

function App() {

  let routes: RouteObject[] = [
    {
      path: "/",
      element: <Wizard />,
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