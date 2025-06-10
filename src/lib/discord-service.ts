import prisma from "./prisma";

async function getDiscordAccountId(userId: string): Promise<string | null> {
  const account = await prisma.account.findFirst({
    where: { userId, provider: 'discord' },
  });
  return account?.providerAccountId || null;
}

export async function getGuildMember(userId: string): Promise<any | null> {
  const discordUserId = await getDiscordAccountId(userId);
  if (!discordUserId) return null;
  
  const { DISCORD_GUILD_ID, DISCORD_BOT_TOKEN } = process.env;
  if (!DISCORD_GUILD_ID || !DISCORD_BOT_TOKEN) {
    console.error("Discord env vars for guild check are missing.");
    return null;
  }

  const url = `https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/members/${discordUserId}`;
  try {
    const response = await fetch(url, { headers: { 'Authorization': `Bot ${DISCORD_BOT_TOKEN}` }});
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching guild member:", error);
    return null;
  }
}

export async function assignRole(userId: string, roleId: string): Promise<boolean> {
   const discordUserId = await getDiscordAccountId(userId);
   if (!discordUserId) {
     console.error("Failed to assign role: Could not find the Discord Account ID for the user", userId);
     return false;
   }

   const { DISCORD_GUILD_ID, DISCORD_BOT_TOKEN } = process.env;
    if (!DISCORD_GUILD_ID || !DISCORD_BOT_TOKEN || !roleId) {
        console.error("Failed to assign roles: Incomplete environmental variables.");
        return false;
    }

   const url = `https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/members/${discordUserId}/roles/${roleId}`;
   try {
     const response = await fetch(url, {
       method: 'PUT',
       headers: { 
         'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
         'Content-Type': 'application/json' 
       }
     });
     if (response.status !== 204 && response.body) {
       const responseBody = await response.text();
       console.log(`[DISCORD API] Respons Body: ${responseBody}`);
     }
     return response.ok;

   } catch (error) {
     console.error("[DISCORD API] Error saat fetch:", error);
     return false;
   }
}