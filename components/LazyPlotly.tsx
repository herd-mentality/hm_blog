// Sourced from https://janosh.dev/posts/gatsby-interactive-plots

import React from 'react'
import Loadable from 'react-loadable'
// import { FoldingSpinner } from './Spinners'

// TODO: Implement spinners as in blog post
// TODO: Implement a way to pass a title in, ways tried haven't worked so far

const Plotly = Loadable({
  loader: () => import(`react-plotly.js`),
  loading: ({ timedOut }) =>
    timedOut ? <blockquote>Error: Loading Plotly timed out.</blockquote> : <div />,
  timeout: 10000,
})

const LazyPlot = ({ layout = {}, style, config, ...rest }) => {
  const defaultLayout = {
    // title: {
    //   text: 'hello world',
    //   font: { size: 24 },
    //   color: 'lightgrey',
    //   xref: 'paper',
    //   x: 0.05,
    // },
    margin: { t: 0, r: 0, b: 0, l: 0 },
    paper_bgcolor: `rgba(0, 0, 0, 0)`,
    plot_bgcolor: `rgba(0, 0, 0, 0)`,
    font: {
      color: `#737373`,
      size: 16,
    },
    xaxis: {
      linecolor: `#737373`,
      gridcolor: `#c2c2c2b0`,
    },
    yaxis: {
      linecolor: `#737373`,
      gridcolor: `#c2c2c2b0`,
    },
    // The next 3 options make the plot responsive.
    autosize: true,
  }

  return (
    <Plotly
      layout={{
        ...defaultLayout,
        ...layout,
      }}
      style={{ width: `100%`, ...style }}
      useResizeHandler
      config={{
        displayModeBar: false,
        showTips: false,
        ...config,
      }}
      {...rest}
    />
  )
}

export default LazyPlot
