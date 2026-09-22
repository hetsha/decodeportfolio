/**
 * Custom routes for Instagram publishing
 */
export default {
  routes: [
    {
      method: 'POST',
      path: '/reels/publish-to-instagram',
      handler: 'reel.publishToInstagram',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/reels/instagram-media',
      handler: 'reel.getInstagramMedia',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/reels/instagram-limit',
      handler: 'reel.getInstagramLimit',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
