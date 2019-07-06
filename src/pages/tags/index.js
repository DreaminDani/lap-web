import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    margin: '40px auto',
    maxWidth: 1200,
    height: '100%',
  },
  taglist: {
    listStyle: 'none',
  }
});

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  const classes = useStyles();

  return (
  <React.Fragment>
    <section className={classes.root}>
      <Helmet title={`Tags | ${title}`} />
      <h1>Tags</h1>
      <ul className={classes.taglist}>
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              <h3>{tag.fieldValue} ({tag.totalCount})</h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </React.Fragment>
)}

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
