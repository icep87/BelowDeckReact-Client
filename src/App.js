import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
//import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout'
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import AdminLayout from './admin/AdminLayout'
import Login from './components/Login'
import Logout from './components/Logout'
import PrivateRoute from './services/PrivateRoute'
import Main from './layouts/Main'
import ArticleList from './layouts/Content/ArticleList'



function App() {

  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Header />
            <Main />
            <Footer />
          </Route>
          <Route path="/postlist/">
            <Header />
            <ArticleList />
            <Footer />
          </Route>
          <Route path="/posts/:postId">
            <Header />
            <Main />
            <Footer />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <PrivateRoute path="/admin/">
            <AdminLayout />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
