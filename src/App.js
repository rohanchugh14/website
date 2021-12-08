// import React from 'react';
import './App.css';

import Search from './Search';
import {Dropdown, Option} from "./Dropdown";
function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <Search />
      <Dropdown 
        formLabel="Choose a service"
        buttonText="Send form"
        action="/"
        >
          <Option selected value="Click to see options"></Option>
          <Option value="1" text="Option 1"></Option>
          <Option value="2" text="Option 2"></Option>
          <Option value="3" text="Option 3"></Option>

      </Dropdown>
    </div>
  );
}

export default App;
