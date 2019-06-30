import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    textDecoration: 'none',
  },
  paper: {
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(2),
  }
}));

function BlogRoll(props) {
    const { data } = props;
    const { edges: posts } = data.allMarkdownRemark;

    const classes = useStyles();

    return (
      <div>
        {posts &&
          posts.map(({ node: post }) => (
            <Link to={post.fields.slug} key={post.id} className={classes.root}>
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item xs={3}>
                  {post.frontmatter.featuredimage ? (
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${
                            post.title
                          }`,
                          height: 150,
                        }}
                      />
                  ) : null}
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h5" component="h3">
                      {post.frontmatter.title}
                    </Typography>
                    <Typography variant="subtitle2">
                    {post.frontmatter.date}
                    </Typography>
                    <Typography component="p">
                      {post.excerpt}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Link>
            // <div className="is-parent column is-6" key={post.id}>
            //   <article
            //     className={`blog-list-item tile is-child box notification ${
            //       post.frontmatter.featuredpost ? 'is-featured' : ''
            //     }`}
            //   >
            //     <header>
            //       {post.frontmatter.featuredimage ? (
            //         <div className="featured-thumbnail">
            //           <PreviewCompatibleImage
            //             imageInfo={{
            //               image: post.frontmatter.featuredimage,
            //               alt: `featured image thumbnail for post ${
            //                 post.title
            //               }`,
            //             }}
            //           />
            //         </div>
            //       ) : null}
            //       <p className="post-meta">
            //         <Link
            //           className="title has-text-primary is-size-4"
            //           to={post.fields.slug}
            //         >
            //           {post.frontmatter.title}
            //         </Link>
            //         <span> &bull; </span>
            //         <span className="subtitle is-size-5 is-block">
            //           {post.frontmatter.date}
            //         </span>
            //       </p>
            //     </header>
            //     <p>
            //       {post.excerpt}
            //       <br />
            //       <br />
            //       <Link className="button" to={post.fields.slug}>
            //         Keep Reading →
            //       </Link>
            //     </p>
            //   </article>
            // </div>
          ))}
      </div>
    )
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
