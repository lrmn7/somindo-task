import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import TaskClient from "./TaskClient";

export default async function TaskPage() {
  const session = await auth();
  if (!session || !session.user) {
    return <TaskClient user={null} isDiscordConnected={false} />;
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      image: true,
      followedTwitter: true,
      retweetedPost: true,
      likedPost: true,
      joinedDiscord: true,
    },
  });
  if (!user) {
    return <TaskClient user={null} isDiscordConnected={false} />;
  }
  
  const discordAccount = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      provider: 'discord',
    },
  });

  const isDiscordConnected = !!discordAccount;
  return <TaskClient user={user} isDiscordConnected={isDiscordConnected} />;
}