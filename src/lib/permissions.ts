import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  caption: ["generate", "view-history"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  caption: ["generate", "view-history"],
});

export const superadmin = ac.newRole({
  ...adminAc.statements,
  caption: ["generate", "view-history"],
});
