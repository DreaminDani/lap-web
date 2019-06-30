import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { create } from "jss";
import { jssPreset, StylesProvider } from "@material-ui/styles";
import theme from '../../theme';
import { IndexPageTemplate } from '../../templates/index-page'

class IndexPagePreview extends React.Component {
  state = {
    ready: false
  };

  handleRef = ref => {
    const ownerDocument = ref ? ref.ownerDocument : null;
    this.setState({
      ready: true,
      jss: create({
        ...jssPreset(),
        insertionPoint: ownerDocument ? ownerDocument.querySelector("#demo-frame-jss") : null
      }),
      sheetsManager: new Map()
    });
  };

  render() {
    const { entry, getAsset } = this.props;
    const data = entry.getIn(['data']).toJS()

    if (data) {
      return (
        <React.Fragment>
          <div id="demo-frame-jss" ref={this.handleRef} />
          {this.state.ready ? (
          <StylesProvider
            jss={this.state.jss}
            sheetsManager={this.state.sheetsManager}
          >
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <IndexPageTemplate
                image={data.image}
                title={data.title}
                description={data.description}
              />
           </ThemeProvider>
          </StylesProvider>
        ) : null}
        </React.Fragment>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
