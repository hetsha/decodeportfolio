import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::social-link.social-link', {
  config: {
    find: { auth: false },
    findOne: { auth: false },
    create: { auth: false },
  },
});
