import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as ProjectSchema } from './project.schema';
import { typeDefs as ProjectRoleSchema } from './project-role.schema';
import { typeDefs as ProjectRolePermissionSchema } from './project-role-permission.schema';
import { typeDefs as ProjectOrganizationSchema } from './project-organization.schema';
import { typeDefs as ProjectRoleUserSchema } from './project-role-user.schema';
import { typeDefs as OrganizationUserSchema } from './organization-user.schema';
import { typeDefs as OrganizationUserKeyBookmarkSchema } from './organization-user-key-bookmark.schema';
import { typeDefs as ProjectTagSchema } from './project-tag.schema';

export const typeDefs = mergeTypeDefs([
  ProjectOrganizationSchema,
  ProjectSchema,
  ProjectRoleSchema,
  ProjectRolePermissionSchema,
  ProjectRoleUserSchema,
  OrganizationUserSchema,
  OrganizationUserKeyBookmarkSchema,
  ProjectTagSchema,
]);
