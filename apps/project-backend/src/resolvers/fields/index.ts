import { resolvers as ProjectRolePermissionFieldsResolvers } from './project-role-permission.field';
import { resolvers as ProjectOrganizationFieldsResolvers } from './project-organization.field';
import { resolvers as ProjectRoleUserFieldsResolvers } from './project-role-user.field';
import { resolvers as OrganizationUserFieldsResolvers } from './organization-user.field';
import { resolvers as OrganizationKeyManagementUserBookmarkFieldsResolvers } from './organization-user-key-bookmark.field';
import { resolvers as ProjectFieldsResolvers } from './project.field';

import { Resolvers } from '../../codegen-generated';

export const fieldResolvers: Resolvers = {
  ...ProjectRolePermissionFieldsResolvers,
  ...ProjectOrganizationFieldsResolvers,
  ...ProjectRoleUserFieldsResolvers,
  ...OrganizationUserFieldsResolvers,
  ...OrganizationKeyManagementUserBookmarkFieldsResolvers,
  ...ProjectFieldsResolvers,
};
