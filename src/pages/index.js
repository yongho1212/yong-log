import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

import './index.css'

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      {/* <Bio /> */}
      <ol className="list-none space-y-8">
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug} >
              <article
                className="post-list-item group p-6 border border-gray-200 hover:shadow-lg rounded-lg transition-shadow"
                itemScope
                itemType="http://schema.org/Article"
              >
                <Link to={post.fields.slug} itemProp="url" className="block">
                  <header>
                    <h2 className="text-2xl font-semibold highlight">
                      <span itemProp="headline">{title}</span>
                    </h2>
                  </header>
                  <section className="mt-2">
                    <p
                      className="text-gray-700 mb-3"
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                  <div className="flex justify-between items-center mt-10">
                    <div>
                      {post.frontmatter.tags && (
                          <div className="flex flex-wrap mb-3 items-center">
                            {post.frontmatter.tags.map(tag => (
                              <span
                                key={tag}
                                className="mr-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                    </div>
                    <div className="text-right text-gray-500">
                      <small>{post.frontmatter.date}</small>
                    </div>
                  </div>
                </Link>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`