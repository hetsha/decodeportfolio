import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::service.service', {
  config: {
    find: { auth: false },
    findOne: { auth: false },
    create: { auth: false },
  },
});
