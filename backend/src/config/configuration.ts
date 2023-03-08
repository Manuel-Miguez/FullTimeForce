export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  http: {
    timeout: parseInt(process.env.HTTP_TIMEOUT, 10) || 1000,
    redirect: parseInt(process.env.HTTP_MAX_REDIRECTS, 10) || 2,
  },
});
