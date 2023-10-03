import * as esbuild from 'esbuild'
import pkg from 'esbuild-plugin-external-global';
const { externalGlobalPlugin } = pkg;

let ctx = await esbuild.context({
  entryPoints: ['./src/index.jsx'],
  outfile: './dist/plugin.js',
  sourcemap: 'linked',
  bundle: true,
  format: 'esm',
  loader: {
    '.png': 'dataurl',
    '.svg': 'dataurl',
  },
  external: [
    'react',
    'react/jsx-runtime',
    'react-dom',
    'antd',
    '@ant-design/pro-components',
    'react-query',
    '@veramo-community/veramo-react',
    '@veramo-community/agent-explorer-plugin',
    'react-router-dom',
    'uuid',
    'date-fns',
  ],
  plugins: [
    externalGlobalPlugin({
      'react': 'window.React',
      'react/jsx-runtime': 'window.reactjsxruntime',
      'react-dom': 'window.ReactDOM',
      'antd': 'window.antd',
      '@ant-design/pro-components': 'window.antdPro',
      'react-query': 'window.reactquery',
      '@veramo-community/veramo-react': 'window.veramoreact',
      '@veramo-community/agent-explorer-plugin': 'window.agentexplorerplugin',
      'react-router-dom': 'window.reactrouterdom',
      'uuid': 'window.uuid',
      'date-fns': 'window.datefns',
    })

  ]
})

if (process.argv.includes('--serve')) {
  await ctx.watch()
  let { port } = await ctx.serve({ servedir: './dist', port: 8080 })
  console.log(`Plugin available at http://localhost:${port}/plugin.js`)
} else {
  await ctx.rebuild().finally(() => process.exit(0))
}
