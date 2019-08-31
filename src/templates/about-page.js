import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '40px auto',
    maxWidth: 1200,
    height: '100%',
  },
  header: {
    maxWidth: 'calc(100% - 80px)', // to account for width of nav button
    '@media (max-width: 700px)': {
        fontSize: 42
    },
  },
}))

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const classes = useStyles();
  const PageContent = contentComponent || Content

  return (
    <section className={classes.root}>
      <Typography className={classes.header} variant="h1" gutterBottom>{title}</Typography>
      <PageContent className="content about-page" content={content} />
    </section>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <AboutPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
    />
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
