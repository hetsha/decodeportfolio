/**
 * reel controller - extended with Instagram publishing
 */
import { factories } from '@strapi/strapi';
import { publishReel, fetchRecentMedia, getPublishingLimit } from '../services/instagram';

export default factories.createCoreController('api::reel.reel', ({ strapi }) => ({
  async publishToInstagram(ctx) {
    try {
      const { reelId, caption } = ctx.request.body;

      if (!reelId) {
        return ctx.badRequest('reelId is required');
      }

      const reel = await strapi.documents('api::reel.reel').findOne({
        documentId: reelId,
        populate: ['video'],
      });

      if (!reel) {
        return ctx.notFound('Reel not found');
      }

      if (!reel.video) {
        return ctx.badRequest('Reel has no video uploaded');
      }

      const videoUrl = reel.video.url.startsWith('http')
        ? reel.video.url
        : `${process.env.APP_URL || 'http://localhost:1337'}${reel.video.url}`;

      const result = await publishReel(
        videoUrl,
        caption || `${reel.title} - ${reel.subtitle || ''} #DecodingMoments #WeddingFilmmaker`
      );

      await strapi.documents('api::reel.reel').update({
        documentId: reelId,
        data: {
          instagramPostId: result.mediaId,
          instagramUrl: result.instagramUrl,
        },
      });

      return ctx.send({
        success: true,
        instagramUrl: result.instagramUrl,
        mediaId: result.mediaId,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to publish to Instagram';
      strapi.log.error('Instagram publish error:', error);
      return ctx.internalServerError(message);
    }
  },

  async getInstagramMedia(ctx) {
    try {
      const limit = Number(ctx.query.limit) || 25;
      const media = await fetchRecentMedia(limit);
      return ctx.send(media);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch Instagram media';
      strapi.log.error('Instagram fetch error:', error);
      return ctx.internalServerError(message);
    }
  },

  async getInstagramLimit(ctx) {
    try {
      const limit = await getPublishingLimit();
      return ctx.send(limit);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to check publishing limit';
      strapi.log.error('Instagram limit check error:', error);
      return ctx.internalServerError(message);
    }
  },
}));
