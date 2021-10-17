import { BrowserRouter, Switch, Route } from "react-router-dom";

import Blocks from "./pages/Blocks";
import Pages from "./pages/Pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/pages/:pageId" component={Blocks} />
        <Route path="/pages" component={Pages} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
