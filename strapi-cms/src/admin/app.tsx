import type { StrapiApp } from '@strapi/strapi/admin';
import type { ContentManagerPlugin } from '@strapi/content-manager/strapi-admin';
import { VideoCoverPanel } from './components/VideoCoverPanel';

export default {
  config: {
    locales: [],
  },
  bootstrap(app: StrapiApp) {
    // NOTE: project-level bootstrap only receives a limited API
    // (addFields/addComponents/getPlugin/...), NOT app.library —
    // so the picker is registered as an edit-view side panel.
    const contentManager = app.getPlugin('content-manager') as unknown as {
      apis: ContentManagerPlugin['config']['apis'];
    };
    contentManager.apis.addEditViewSidePanel([VideoCoverPanel]);
  },
};
