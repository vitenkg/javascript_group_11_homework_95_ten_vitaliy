import Layout from "./components/UI/Layout/Layout";
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import {useSelector} from "react-redux";

const App = () => {
  const user = useSelector(state => state.users.user);

  const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
      <Route {...props}/> :
      <Redirect to={redirectTo}/>
  };

  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Register}/>
        {/*<ProtectedRoute*/}
        {/*  path="/"*/}
        {/*  component={}*/}
        {/*  isAllowed={user?.role === 'admin'}*/}
        {/*  redirectTo="/login"*/}
        {/*/>*/}
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </Layout>
  );
};

export default App;
