import React from 'react';

import Portal from '../Portal/Portal.js';
import SidePanelContents from './SidePanelContents.js';

/**
 * Wrapper for the SidePanel, to put it inside of a Portal.
 * The SidePanel needs its own lifecycle and therefore this wrapper is necessary
 */

module.exports = class SidePanel extends React.Component {
  render() {
    return (
      <Portal>
        <SidePanelContents {...this.props} />
      </Portal>
    );
  }
};