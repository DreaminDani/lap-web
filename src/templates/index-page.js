import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import { Grid, Typography, withStyles, Button } from '@material-ui/core';

export const IndexPageTemplate = withStyles(theme => ({
  root: {
    margin: 40,
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
  image: {
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
  description,
}) => (
  <div className={classes.root} style={{
    backgroundImage: `url(${
      !!image.childImageSharp ? image.childImageSharp.fluid.src : image
    })`
  }}>
    <Typography variant="h1" gutterBottom>
      {title}
    </Typography>
    <Grid container spacing={8}>
      <Grid item xs={12} md={6}>
        <Typography gutterBottom>
          {description}
        </Typography>
        <Link to="/about"><Button>About</Button></Link>
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
  description: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <IndexPageTemplate
      image={frontmatter.image}
      title={frontmatter.title}
      description={frontmatter.description}
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
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        description
      }
    }
  }
`
