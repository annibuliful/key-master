import { createClient } from './generated';
import * as dotenv from 'dotenv';

dotenv.config();

export const graphqlClient = createClient({
  url: process.env.GRAPHQL_ENDPOINT,
});

export const unAuthorizationClient = graphqlClient;

interface IProjectOwnerParam {
  projectId: string;
  userId: string;
  options?: Record<string, string>;
}
export const projectOwnerGraphqlClient = ({
  projectId,
  userId,
  options,
}: IProjectOwnerParam) => {
  return createClient({
    url: process.env.GRAPHQL_ENDPOINT,
    headers: {
      Authorization: `TEST-AUTH ${projectId}`,
      'x-allow-test': process.env.SKIP_AUTH_SECRET,
      'x-project-id': projectId,
      'x-user-id': userId,
      ...options,
    },
  });
};

interface IProjectOwnerAClientWithOrganizationClientParam {
  orgId: string;
  userId?: string;
}
export const projectOwnerAClientWithOrganizationClient = ({
  userId,
  orgId,
}: IProjectOwnerAClientWithOrganizationClientParam) =>
  projectOwnerGraphqlClient({
    projectId: 'TEST_PROJECT_ID',
    userId: userId ?? 'TEST_USER_A_ID',
    options: {
      'x-org-id': orgId,
    },
  });

export const projectOwnerAClient = projectOwnerGraphqlClient({
  projectId: 'TEST_PROJECT_ID',
  userId: 'TEST_USER_A_ID',
});

export const adminOwnerClient = projectOwnerGraphqlClient({
  projectId: 'TEST_PROJECT_ID',
  userId: 'TEST_USER_A_ID',
  options: {
    'x-user-permissions': [
      'PERMISSION_WRITE',
      'PERMISSION_READ',
      'USER_ACTIVITY_WRITE',
      'KEY_MANAGEMENT_WRITE',
    ].join(','),
  },
});

export const userBClient = (orgId: string) =>
  projectOwnerGraphqlClient({
    projectId: 'TEST_PROJECT_ID',
    userId: 'TEST_USER_B_ID',
    options: {
      'x-org-id': orgId,
    },
  });

export const testUserPermissionsClient = (permission: string[] = []) =>
  createClient({
    url: process.env.GRAPHQL_ENDPOINT,
    headers: {
      Authorization: `TEST-AUTH TEST_PROJECT_ID`,
      'x-allow-test': process.env.SKIP_AUTH_SECRET,
      'x-project-id': 'TEST_PROJECT_ID',
      'x-user-id': 'TEST_USER_A_ID',
      'x-user-permissions': permission.join(','),
    },
  });
