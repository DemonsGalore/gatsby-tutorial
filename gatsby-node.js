const path = require('path')

exports.createPages = ({actions, graphql}) => {
  const { createPage } = actions

  const postTemplate = path.resolve('./src/templates/blog-post.js')

  return graphql(`
    {
    	allMarkdownRemark {
        edges {
          node {
            id
            html
            frontmatter {
              path
              title
              date
              author
            }
            excerpt
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const path = node.frontmatter.path
      createPage({
        path,
        component: postTemplate,
        context: {
          path,
        },
      })
    })
  })
}
