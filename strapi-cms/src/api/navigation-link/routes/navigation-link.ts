import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::navigation-link.navigation-link', {
  config: {
    find: { auth: false },
    findOne: { auth: false },
    create: { auth: false },
  },
});
