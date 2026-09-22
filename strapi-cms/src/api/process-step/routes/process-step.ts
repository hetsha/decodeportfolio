import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::process-step.process-step', {
  config: {
    find: { auth: false },
    findOne: { auth: false },
    create: { auth: false },
  },
});
