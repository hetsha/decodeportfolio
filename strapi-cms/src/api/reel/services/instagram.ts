/**
 * Instagram Graph API Service
 *
 * Handles publishing reels to Instagram via the Graph API.
 * Requires: Instagram Business/Creator account linked to a Facebook Page.
 *
 * Flow: Create Container → Poll Status → Publish
 */

interface InstagramConfig {
  accessToken: string;
  userId: string;
}

interface MediaContainer {
  id: string;
}

interface ContainerStatus {
  status_code: 'FINISHED' | 'IN_PROGRESS' | 'ERROR' | 'EXPIRED';
}

const GRAPH_API_VERSION = 'v21.0';
const BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

function getConfig(): InstagramConfig {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !userId) {
    throw new Error('INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID must be set in .env');
  }

  return { accessToken, userId };
}

export async function createReelContainer(videoUrl: string, caption: string): Promise<MediaContainer> {
  const { accessToken, userId } = getConfig();

  const response = await fetch(`${BASE_URL}/${userId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      media_type: 'REELS',
      video_url: videoUrl,
      caption: caption,
      access_token: accessToken,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to create reel container: ${JSON.stringify(error)}`);
  }

  return response.json() as Promise<MediaContainer>;
}

export async function pollContainerStatus(
  containerId: string,
  maxAttempts: number = 30,
  intervalMs: number = 5000
): Promise<ContainerStatus> {
  const { accessToken } = getConfig();

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const response = await fetch(
      `${BASE_URL}/${containerId}?fields=status_code&access_token=${accessToken}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to poll container status: ${JSON.stringify(error)}`);
    }

    const status = await response.json() as ContainerStatus;

    if (status.status_code === 'FINISHED') {
      return status;
    }

    if (status.status_code === 'ERROR' || status.status_code === 'EXPIRED') {
      throw new Error(`Container processing ${status.status_code}`);
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error('Container processing timed out');
}

export async function publishContainer(containerId: string): Promise<{ id: string }> {
  const { accessToken, userId } = getConfig();

  const response = await fetch(`${BASE_URL}/${userId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      creation_id: containerId,
      access_token: accessToken,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to publish container: ${JSON.stringify(error)}`);
  }

  return response.json() as Promise<{ id: string }>;
}

export async function publishReel(
  videoUrl: string,
  caption: string
): Promise<{ mediaId: string; instagramUrl: string }> {
  const container = await createReelContainer(videoUrl, caption);
  await pollContainerStatus(container.id);
  const published = await publishContainer(container.id);

  return {
    mediaId: published.id,
    instagramUrl: `https://www.instagram.com/p/${published.id}`,
  };
}

export async function fetchRecentMedia(limit: number = 25) {
  const { accessToken, userId } = getConfig();

  const response = await fetch(
    `${BASE_URL}/${userId}/media?fields=id,caption,media_type,media_url,permalink,timestamp,like_count&limit=${limit}&access_token=${accessToken}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to fetch media: ${JSON.stringify(error)}`);
  }

  return response.json();
}

export async function getPublishingLimit() {
  const { accessToken, userId } = getConfig();

  const response = await fetch(
    `${BASE_URL}/${userId}/content_publishing_limit?fields=config,quota_usage&access_token=${accessToken}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to get publishing limit: ${JSON.stringify(error)}`);
  }

  return response.json();
}
