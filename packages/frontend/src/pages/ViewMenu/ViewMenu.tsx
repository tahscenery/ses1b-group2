import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

import NavBar from 'components/NavBar';

class ViewMenu extends Component {
  componentDidMount() {
    document.title = 'Menu – Sapori Unici';
  }

  render() {
    return (
      <div>
        <NavBar/>
        <div className="component-container">
          <Typography variant="h2">Entrée & Salads</Typography>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue
            odio id consectetur pellentesque. Nam pellentesque ante id risus
            consectetur, at aliquam augue convallis. Suspendisse nec urna eu
            arcu imperdiet hendrerit. Duis eget est pharetra, commodo nibh sit
            amet, imperdiet ipsum. Aenean laoreet, nulla eu vestibulum porta,
            nulla nunc elementum elit, in placerat nunc mi id diam. In nec
            sapien ut diam viverra efficitur. Duis in congue lectus, et mattis
            tellus. In accumsan maximus lacus id tincidunt. Suspendisse vitae
            nibh scelerisque velit luctus porta ac vel erat. Pellentesque
            facilisis facilisis mi quis tristique. Cras sit amet mi viverra,
            molestie est id, aliquet dui.</p>
          <Typography variant="h2">Mains</Typography>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue
            odio id consectetur pellentesque. Nam pellentesque ante id risus
            consectetur, at aliquam augue convallis. Suspendisse nec urna eu
            arcu imperdiet hendrerit. Duis eget est pharetra, commodo nibh sit
            amet, imperdiet ipsum. Aenean laoreet, nulla eu vestibulum porta,
            nulla nunc elementum elit, in placerat nunc mi id diam. In nec
            sapien ut diam viverra efficitur. Duis in congue lectus, et mattis
            tellus. In accumsan maximus lacus id tincidunt. Suspendisse vitae
            nibh scelerisque velit luctus porta ac vel erat. Pellentesque
            facilisis facilisis mi quis tristique. Cras sit amet mi viverra,
            molestie est id, aliquet dui.</p>
          <Typography variant="h2">Desserts & Drinks</Typography>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue
            odio id consectetur pellentesque. Nam pellentesque ante id risus
            consectetur, at aliquam augue convallis. Suspendisse nec urna eu
            arcu imperdiet hendrerit. Duis eget est pharetra, commodo nibh sit
            amet, imperdiet ipsum. Aenean laoreet, nulla eu vestibulum porta,
            nulla nunc elementum elit, in placerat nunc mi id diam. In nec
            sapien ut diam viverra efficitur. Duis in congue lectus, et mattis
            tellus. In accumsan maximus lacus id tincidunt. Suspendisse vitae
            nibh scelerisque velit luctus porta ac vel erat. Pellentesque
            facilisis facilisis mi quis tristique. Cras sit amet mi viverra,
            molestie est id, aliquet dui.</p>
        </div>
      </div>
    );
  }
}

export default ViewMenu;
