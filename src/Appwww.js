import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useState} from 'react';
import 'bulma/css/bulma.min.css';
import './assets/fontawesome/css/all.min.css'
import 'line-awesome/dist/line-awesome/css/line-awesome.css'
import './index.css';
import SearchContext from './context/SearchContext';
import AuthContext from './context/AuthContext';
 import Layout from './pages/Layout';

 
let MyComponent = (props) => {
  return (<span >{Object.values(props).join(" ")}</span>);
};



function App() {

  const [searchData, setSearchData] = useState({
    jobTitle: '',
    jobLocation:''
  })

  // const [userData, setUserData] = useState({
  //   token: 'xx',
  //   user: ''
  // })
 
  return (
    <BrowserRouter>
      
          <SearchContext.Provider value = {{searchData, setSearchData}}>
            <Switch>
                <Layout/>
            </Switch>      
          </SearchContext.Provider> 
      
    </BrowserRouter>      
  )
}
 

export default App;
