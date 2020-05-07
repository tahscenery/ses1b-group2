import React, { Component } from 'react';
import NavBar from 'components/NavBar';
import { Typography } from '@material-ui/core';

class ViewMenu extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="component-container">
          <Typography variant="h1">Entry & Salads</Typography>
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
          <Typography variant="h1">Mains</Typography>
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
          <Typography variant="h1">Deserts</Typography>
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
