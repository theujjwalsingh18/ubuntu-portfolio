import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  const targetUrl = Array.isArray(url) ? url.join('/') : url;

  const proxy = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    followRedirects: true,
    pathRewrite: (path, req) => {
      return new URL(targetUrl).pathname;
    },
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.removeHeader('Referer');
      proxyReq.removeHeader('Origin');
    },
    onProxyRes: (proxyRes, req, res) => {
      delete proxyRes.headers['x-frame-options'];
      delete proxyRes.headers['content-security-policy'];
      proxyRes.headers['x-frame-options'] = 'ALLOWALL';
    },
    logger: console,
  });


  return proxy(req, res);
}