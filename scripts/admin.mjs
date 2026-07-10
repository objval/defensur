#!/usr/bin/env node
// scripts/admin.mjs — Defensur Admin CLI Toolkit
// Run with: node scripts/admin.mjs <command> [args]
//
// Commands:
//   set-role <clerk_user_id> <role>     Set user role in Clerk publicMetadata
//   get-user <clerk_user_id>            Get user info from Clerk
//   list-users                          List all Clerk users
//   ban-user <clerk_user_id>            Ban user in Clerk
//   unban-user <clerk_user_id>          Unban user in Clerk
//   whoami <clerk_user_id>              Show user's current metadata + role
//   help                                Show this help

import { createClerkClient } from "@clerk/backend"
import { execFileSync } from "node:child_process"

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY
if (!CLERK_SECRET_KEY) {
  console.error("❌ CLERK_SECRET_KEY not set in environment")
  console.error("   Create a .env.local file with CLERK_SECRET_KEY=sk_test_xxx")
  console.error("   Or run: CLERK_SECRET_KEY=sk_test_xxx node scripts/admin.mjs <command>")
  process.exit(1)
}

/** @type {import('@clerk/backend').ClerkClient} */
const clerk = createClerkClient({ secretKey: CLERK_SECRET_KEY })

function convexCommand() {
  return process.platform === "win32" ? "node_modules/.bin/convex.cmd" : "node_modules/.bin/convex"
}

function userSnapshot(user) {
  const metadataRole = user.publicMetadata?.role
  return {
    userId: user.id,
    email: user.emailAddresses?.[0]?.emailAddress || "",
    name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    role: ["admin", "staff", "client"].includes(metadataRole) ? metadataRole : "client",
    banned: user.banned,
  }
}

function syncUserToConvex(user) {
  const snapshot = userSnapshot(user)
  execFileSync(convexCommand(), ["run", "admin:syncUser", JSON.stringify(snapshot)], {
    stdio: "inherit",
  })
}

// ── Commands ────────────────────────────────────────────────────────────────

/**
 * @param {string} userId
 * @param {string} role
 */
async function setRole(userId, role) {
  const validRoles = ["admin", "client", "staff"]
  if (!validRoles.includes(role)) {
    console.error(`❌ Invalid role "${role}". Valid: ${validRoles.join(", ")}`)
    process.exit(1)
  }

  try {
    const currentUser = await clerk.users.getUser(userId)
    const user = await clerk.users.updateUser(userId, {
      publicMetadata: { ...currentUser.publicMetadata, role },
    })
    syncUserToConvex(user)
    console.log(`✅ Set role "${role}" for user ${userId} in Clerk and Convex`)
    console.log(`   Convex permissions update immediately; re-authenticate to refresh Clerk metadata.`)
  } catch (e) {
    console.error(`❌ Failed to set role: ${e.message}`)
    process.exit(1)
  }
}

/**
 * @param {string} userId
 */
async function getUser(userId) {
  try {
    const user = await clerk.users.getUser(userId)
    console.log("─".repeat(60))
    console.log(`ID:            ${user.id}`)
    console.log(`Email:         ${user.emailAddresses?.[0]?.emailAddress || "N/A"}`)
    console.log(`Name:          ${user.firstName || ""} ${user.lastName || ""}`.trim())
    console.log(`Created:       ${user.createdAt}`)
    console.log(`Last sign-in:  ${user.lastSignInAt || "Never"}`)
    console.log(`Public metadata: ${JSON.stringify(user.publicMetadata)}`)
    console.log(`Banned:        ${user.banned}`)
    console.log("─".repeat(60))
  } catch (e) {
    console.error(`❌ Failed to get user: ${e.message}`)
    process.exit(1)
  }
}

async function listUsers() {
  try {
    const response = await clerk.users.getUserList({ limit: 100 })
    const users = response.data
    console.log(`\n📋 Clerk Users (${users.length} total)\n`)
    console.log("─".repeat(80))
    for (const user of users) {
      const email = user.emailAddresses?.[0]?.emailAddress || "N/A"
      const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "N/A"
      const role = user.publicMetadata?.role || "client"
      const banned = user.banned ? "⛔ BANNED" : ""
      console.log(`${user.id}  ${email.padEnd(35)}  ${name.padEnd(20)}  ${role.padEnd(8)}  ${banned}`)
    }
    console.log("─".repeat(80))
  } catch (e) {
    console.error(`❌ Failed to list users: ${e.message}`)
    process.exit(1)
  }
}

/**
 * @param {string} userId
 */
async function banUser(userId) {
  try {
    const user = await clerk.users.banUser(userId)
    syncUserToConvex(user)
    console.log(`✅ Banned user ${userId} in Clerk and Convex`)
  } catch (e) {
    console.error(`❌ Failed to ban user: ${e.message}`)
    process.exit(1)
  }
}

/**
 * @param {string} userId
 */
async function unbanUser(userId) {
  try {
    const user = await clerk.users.unbanUser(userId)
    syncUserToConvex(user)
    console.log(`✅ Unbanned user ${userId} in Clerk and Convex`)
  } catch (e) {
    console.error(`❌ Failed to unban user: ${e.message}`)
    process.exit(1)
  }
}

function help() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║          Defensur Admin CLI Toolkit                          ║
╠══════════════════════════════════════════════════════════════╣
║  set-role <user_id> <role>    Set user role (admin/client/staff)  ║
║  get-user <user_id>           Get user info from Clerk            ║
║  list-users                   List all Clerk users                ║
║  ban-user <user_id>           Ban user in Clerk                   ║
║  unban-user <user_id>         Unban user in Clerk                 ║
║  whoami <user_id>             Show user's metadata + role         ║
║  help                         Show this help                      ║
╚══════════════════════════════════════════════════════════════╝

Usage: node scripts/admin.mjs <command> [args]

Environment required:
  CLERK_SECRET_KEY=sk_test_xxx
  NEXT_PUBLIC_CONVEX_URL=https://xxx.convex.cloud (optional, for convex queries)
`)
}

// ── CLI entry point ──────────────────────────────────────────────────────────

const [cmd, ...args] = process.argv.slice(2)

switch (cmd) {
  case "set-role":
    if (!args[0] || !args[1]) { console.error("Usage: set-role <user_id> <role>"); process.exit(1) }
    await setRole(args[0], args[1])
    break
  case "get-user":
    if (!args[0]) { console.error("Usage: get-user <user_id>"); process.exit(1) }
    await getUser(args[0])
    break
  case "list-users":
    await listUsers()
    break
  case "ban-user":
    if (!args[0]) { console.error("Usage: ban-user <user_id>"); process.exit(1) }
    await banUser(args[0])
    break
  case "unban-user":
    if (!args[0]) { console.error("Usage: unban-user <user_id>"); process.exit(1) }
    await unbanUser(args[0])
    break
  case "whoami":
    if (!args[0]) { console.error("Usage: whoami <user_id>"); process.exit(1) }
    await getUser(args[0])
    break
  case "help":
  case "--help":
  case "-h":
  case undefined:
    help()
    break
  default:
    console.error(`❌ Unknown command "${cmd}". Run "node scripts/admin.mjs help"`)
    process.exit(1)
}
