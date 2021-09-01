import { BrowserRouter, Switch, Route } from "react-router-dom";

import Blocks from "./pages/Blocks";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/pages/:pageId" component={Blocks} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
