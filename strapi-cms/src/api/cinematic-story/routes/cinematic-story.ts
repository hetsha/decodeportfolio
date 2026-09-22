/**
 * cinematic-story router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::cinematic-story.cinematic-story', {
  only: ['find', 'findOne', 'create'],
  config: {
    find: { auth: false },
    findOne: { auth: false },
    create: { auth: false },
  },
});
