import React from 'react';

import Aux from './../../HOC/Auxilary';
import classes from './Layout.module.scss'

const layout = (props) => {
  return (
    <Aux>
      {/* <div>Toolbar, SideDrawer, BackDrop</div> */}
      <main className={classes.mainLayout} >
        {props.children}
      </main>
    </Aux>
  );
}

export default layout;