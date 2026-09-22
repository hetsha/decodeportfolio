/**
 * form-option router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::form-option.form-option', {
  only: ['find', 'findOne', 'create'],
  config: {
    find: { auth: false },
    findOne: { auth: false },
    create: { auth: false },
  },
});
