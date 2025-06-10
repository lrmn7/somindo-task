export const TASKS = {
  FOLLOW_TWITTER: {
    id: "followedTwitter", 
    title: "Follow Somindo",
    description: "Follow our official account to get the latest updates.",
    link: "https://x.com/Somnia_Network",
    check: () => Promise.resolve(true)
  },
  RETWEET_POST: {
    id: "retweetedPost",
    title: "Retweet",
    description: "Help spread the word by retweeting this post.",
    link: "https://twitter.com/Somnia_Network/status/1925744451193876644",
    check: () => Promise.resolve(true)
  },
  LIKE_POST: {
    id: "likedPost",
    title: "Like",
    description: "Show your support by liking this post.",
    link: "https://twitter.com/Somnia_Network/status/1925744451193876644",
    check: () => Promise.resolve(true)
  },
  JOIN_DISCORD: {
    id: "joinedDiscord",
    title: "Join Discord Server",
    description: "Join our community on Discord.",
    link: "https://discord.gg/f2cE6tqy",
    check: () => Promise.resolve(true)
  }
};