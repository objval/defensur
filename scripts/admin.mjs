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
//   convex-tables                       List all Convex tables + counts
//   convex-query <table> [limit]        Query rows from a Convex table
//   help                                Show this help

import { createClerkClient } from "@clerk/backend"

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL

if (!CLERK_SECRET_KEY) {
  console.error("❌ CLERK_SECRET_KEY not set in environment")
  process.exit(1)
}

const clerk = createClerkClient({ secretKey: CLERK_SECRET_KEY })

// ── Commands ────────────────────────────────────────────────────────────────

async function setRole(userId, role) {
  const validRoles = ["admin", "client", "staff"]
  if (!validRoles.includes(role)) {
    console.error(`❌ Invalid role "${role}". Valid: ${validRoles.join(", ")}`)
    process.exit(1)
  }

  try {
    await clerk.users.updateUser(userId, {
      publicMetadata: { role },
    })
    console.log(`✅ Set role "${role}" for user ${userId}`)
    console.log(`   User must sign out and back in for the change to take effect.`)
  } catch (e) {
    console.error(`❌ Failed to set role: ${e.message}`)
    process.exit(1)
  }
}

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
    console.log(`\n📋 Clerk Users (${response.data.length} total)\n`)
    console.log("─".repeat(80))
    for (const user of response.data) {
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

async function banUser(userId) {
  try {
    await clerk.users.updateUser(userId, { banned: true })
    console.log(`✅ Banned user ${userId}`)
  } catch (e) {
    console.error(`❌ Failed to ban user: ${e.message}`)
    process.exit(1)
  }
}

async function unbanUser(userId) {
  try {
    await clerk.users.updateUser(userId, { banned: false })
    console.log(`✅ Unbanned user ${userId}`)
  } catch (e) {
    console.error(`❌ Failed to unban user: ${e.message}`)
    process.exit(1)
  }
}

async function whoami(userId) {
  await getUser(userId)
}

async function convexQuery(table, limit = 20) {
  if (!CONVEX_URL) {
    console.error("❌ NEXT_PUBLIC_CONVEX_URL not set in environment")
    process.exit(1)
  }

  // Use Convex HTTP API for direct queries
  const url = `${CONVEX_URL}/api/query`
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "admin/listAll",
        args: {},
        format: "json",
      }),
    })
    if (!resp.ok) {
      console.error(`❌ Convex query failed: ${resp.status} ${resp.statusText}`)
      process.exit(1)
    }
    const data = await resp.json()
    const rows = Array.isArray(data) ? data.slice(0, limit) : data
    console.log(`\n📊 Convex query result (${Array.isArray(data) ? data.length : 1} rows, showing ${Array.isArray(rows) ? rows.length : 1}):\n`)
    console.log(JSON.stringify(rows, null, 2))
  } catch (e) {
    console.error(`❌ Convex query error: ${e.message}`)
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
║  convex-query [limit]         Query consultas from Convex         ║
║  help                         Show this help                      ║
╚══════════════════════════════════════════════════════════════╝

Usage: node scripts/admin.mjs <command> [args]

Environment required:
  CLERK_SECRET_KEY=sk_test_xxx
  NEXT_PUBLIC_CONVEX_URL=https://xxx.convex.cloud
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
    await whoami(args[0])
    break
  case "convex-query":
    await convexQuery("consultas", parseInt(args[0] || "20"))
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
