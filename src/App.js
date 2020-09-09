import React from 'react';

import classes from './App.module.scss';
import Layout from './components/Layout/Layout';
import CollageMaker from './containers/CollageMaker/CollageMaker';

function App() {
  return (
    <div className={classes.LayOutContainer}>
      <Layout>
        <CollageMaker />
      </Layout>
    </div>
  );
}

export default App;
