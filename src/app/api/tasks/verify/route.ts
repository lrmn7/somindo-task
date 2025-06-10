import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getGuildMember } from "@/lib/discord-service";

export async function POST(request: Request) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { taskId } = await request.json();
  if (!taskId) {
    return new NextResponse("Task ID is required", { status: 400 });
  }
  if (taskId === 'joinedDiscord') {
    const { DISCORD_PREREQUISITE_ROLE_ID } = process.env;
    if (!DISCORD_PREREQUISITE_ROLE_ID) {
      return NextResponse.json({ message: "Server prerequisite role not configured." }, { status: 500 });
    }

    const member = await getGuildMember(session.user.id);
    if (!member) {
      return NextResponse.json({ message: "You are not in the Discord server." }, { status: 400 });
    }

    const hasPrerequisiteRole = member.roles.includes(DISCORD_PREREQUISITE_ROLE_ID);
    if (!hasPrerequisiteRole) {
      return NextResponse.json({ message: "Please Verify first on the Discord Server." }, { status: 400 });
    }
  }
  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { [taskId]: true },
    });
    return NextResponse.json({ message: "Task verified successfully!" });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}