import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Template({ data }) {
  const post = data.markdownRemark

  return (
    <Layout>
      <SEO title="About" keywords={[`gatsby`, `application`, `react`]} />
      <Link to="/blog">Go back</Link>
      <hr />
      <h1>{post.frontmatter.title}</h1>
      <h4>Posted by {post.frontmatter.author}&nbsp;on&nbsp;{post.frontmatter.date}</h4>
      <div dangerouslySetInnerHTML={{ __html: post.html  }} />
    </Layout>
  )
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        date
        author
      }
    }
  }
`
