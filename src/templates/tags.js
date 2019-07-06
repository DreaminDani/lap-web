import React from 'react'
import Helmet from 'react-helmet'
import { withStyles, Button } from '@material-ui/core';
import { Link, graphql } from 'gatsby'

const styles = {
  root: {
    margin: '40px auto',
    maxWidth: 1200,
    height: '100%',
  },
  taglist: {
    listStyle: 'none',
  }
}

class TagRoute extends React.Component {
  render() {
    const { classes } = this.props;
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map(post => (
      <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>
          <h3>{post.node.frontmatter.title}</h3>
        </Link>
      </li>
    ))
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with “${tag}”`

    return (
      <section className={classes.root}>
        <Helmet title={`${tag} | ${title}`} />
        <h2>{tagHeader}</h2>
        <ul className={classes.taglist}>{postLinks}</ul>
        <p>
          <Link to="/tags/"><Button>Browse all tags</Button></Link>
        </p>
      </section>
    )
  }
}

export default withStyles(styles)(TagRoute);

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
