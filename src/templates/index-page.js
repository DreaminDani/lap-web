import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import { Grid, Typography, withStyles, Button } from '@material-ui/core';

export const IndexPageTemplate = withStyles(theme => ({
  root: {
    margin: '40px auto',
    maxWidth: 1200,
    height: '100%',
    backgroundSize: '0 0',
    '@media (min-width: 1280px)': {
      margin: '40px auto',
    },
    [theme.breakpoints.down('sm')]: {
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'rgba(48, 48, 48, 0.81) !important',
      backgroundBlendMode: 'color',
    }
  },
  header: {
    width: 100,
    '@media (max-width: 700px)': {
        fontSize: 42
    },
  },
  image: {
    marginTop: 16,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  }
}))(({
  classes,
  image,
  title,
  body,
}) => (
  <div className={classes.root} style={{
    backgroundImage: `url(${
      !!image.childImageSharp ? image.childImageSharp.fluid.src : image
    })`
  }}>
    
    <Grid container spacing={8}>
      <Grid item xs={12} md={6}>
        <Typography className={classes.header} variant="h1" gutterBottom>
          {title}
        </Typography>
        {body}
        <Link to="/about"><Button>Meet the Band</Button></Link>
        &nbsp;|&nbsp;
        <Link to="/blog"><Button>Latest Updates</Button></Link>
        </Grid>
      <Grid item className={classes.image} md={6} style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`
      }}>
      </Grid>
    </Grid>
  </div>
))

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  body: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark
  console.log(data.markdownRemark);

  return (
    <IndexPageTemplate
      image={frontmatter.image}
      title={frontmatter.title}
      body={html}
    />
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
