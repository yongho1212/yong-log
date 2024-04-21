/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */

// import * as React from 'react'

exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `ko` })
}

// exports.onRenderBody = ({ setHeadComponents }) => {
//   setHeadComponents([
//     <link
//       rel="preload"
//       href="/fonts/Pretendard-Medium.woff2"
//       as="font"
//       type="font/woff2"
//       crossOrigin="anonymous"
//       key="interFont"
//     />,
//   ])
// }