import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { assignRole } from "@/lib/discord-service";

export async function POST() {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }
  const allTasksCompleted = user.followedTwitter && user.retweetedPost && user.likedPost && user.joinedDiscord;
  if (!allTasksCompleted) {
    return NextResponse.json({ message: "Please complete all prerequisite tasks first." }, { status: 400 });
  }
  
  const roleId = process.env.DISCORD_REWARD_ROLE_ID;
  if (!roleId) {
    return new NextResponse("Server reward role ID is not configured.", { status: 500 });
  }

  const roleAssigned = await assignRole(session.user.id, roleId);

  if (roleAssigned) {
    return NextResponse.json({ message: "Reward role claimed successfully!" });
  } else {
    return new NextResponse("An error occurred while claiming the reward role.", { status: 500 });
  }
}