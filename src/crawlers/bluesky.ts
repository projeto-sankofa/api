import { env } from "@/config";
import { BskyAgent } from "@atproto/api";
import { sendToQueue } from "./send-to-queue";

const feeds = [
  "at://did:plc:vus7jwirwtonzyy7kuv3lkni/app.bsky.feed.generator/aaaceuipyppyu",
  "at://did:plc:gpunjjgvlyb4racypz3yfiq4/app.bsky.feed.generator/aaaooavxeutum",
];

const LIMIT = 100;

async function fetchCommentsByFeed(agent: BskyAgent, feedUri: string) {
  const comments: string[] = [];
  const { data } = await agent.app.bsky.feed.getFeed(
    {
      feed: feedUri,
      limit: LIMIT,
    },
    {
      headers: {
        "Accept-Language": "pt-BR,pt",
      },
    }
  );

  const feed = data.feed;

  for (const postView of feed) {
    const post = postView.post;

    const { data: threadData } = await agent.getPostThread({
      uri: post.uri,
      depth: 3,
    });

    const replies = (threadData.thread as any).replies || [];

    for (const reply of replies) {
      if (reply.post && reply.post.record && reply.post.record.text) {
        const replyText = (reply.post.record.text as string).replace(
          /\n/g,
          " "
        );
        console.log(`- Comentário: ${replyText}`);
        comments.push(replyText);
      } else {
        console.log(`- Comentário: [conteúdo indisponível]`);
      }
    }
  }
  return comments;
}

export async function fetchBlueskyFeed() {
  const agent = new BskyAgent({
    service: "https://bsky.social",
  });

  await agent.login({
    identifier: env.BLUESKY_IDENTIFIER,
    password: env.BLUESKY_PASSWORD,
  });

  const commentsSet = new Set<string>();

  for (const feedUri of feeds) {
    const fetchedComments = await fetchCommentsByFeed(agent, feedUri);
    fetchedComments.forEach((comment) => commentsSet.add(comment));
  }

  const comments = Array.from(commentsSet);
  await sendToQueue(comments, "bluesky");
}

fetchBlueskyFeed();
