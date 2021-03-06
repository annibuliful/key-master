import { Permission } from '@prisma/client';
import { prismaClient } from '../client';

export const permissions: Pick<
  Permission,
  'id' | 'permission' | 'allowOnlyInternalAdmin'
>[] = [
  {
    id: 'afc553ac-654e-4796-b106-1c8c815c0e7a',
    permission: 'USER_WRITE',
    allowOnlyInternalAdmin: false,
  },
  {
    id: '4ad29fb3-1291-4d3d-a17a-24cc60af7142',
    permission: 'USER_READ',
    allowOnlyInternalAdmin: false,
  },
  {
    id: 'cca0ec98-c572-4bdd-b353-08e60f8937cb',
    permission: 'PROJECT_READ',
    allowOnlyInternalAdmin: false,
  },
  {
    id: '98a1749e-171f-4cf7-a060-b4d4912da96e',
    permission: 'PROJECT_WRITE',
    allowOnlyInternalAdmin: false,
  },
  {
    id: '4159ac61-9ed6-4a47-a4fd-9cbdae938b11',
    permission: 'ROLE_READ',
    allowOnlyInternalAdmin: false,
  },
  {
    id: '37906c51-4509-4419-b71c-40fd083659b9',
    permission: 'ROLE_WRITE',
    allowOnlyInternalAdmin: false,
  },
  {
    id: 'e161c02b-a2cd-4460-8005-3389f716475b',
    permission: 'PROJECT_ROLE_READ',
    allowOnlyInternalAdmin: false,
  },
  {
    id: 'c224b62c-0d52-4c21-8c17-bf6ead487328',
    permission: 'PROJECT_ROLE_WRITE',
    allowOnlyInternalAdmin: false,
  },
  {
    id: 'ed409ce5-11a4-44e0-990a-7dd9cf9154e9',
    permission: 'PROJECT_USER_READ',
    allowOnlyInternalAdmin: false,
  },
  {
    id: '65ca3188-e54a-4b31-9dd8-ba388f9d4e5a',
    permission: 'PROJECT_USER_WRITE',
    allowOnlyInternalAdmin: false,
  },
  {
    id: '1e113c99-79df-4cec-ba87-6e9b2f6aa1aa',
    permission: 'PERMISSION_WRITE',
    allowOnlyInternalAdmin: true,
  },
  {
    id: 'ff7ac44e-2887-4002-8698-65cbf8fb139e',
    permission: 'PERMISSION_READ',
    allowOnlyInternalAdmin: false,
  },
  {
    id: '7131df8e-3e19-45fa-ad14-9739164bf993',
    permission: 'PROJECT_DELETE',
    allowOnlyInternalAdmin: false,
  },
  {
    id: 'ddb28368-857c-4eae-93f2-175863aa9c89',
    permission: 'PROJECT_ROLE_USER_WRITE',
    allowOnlyInternalAdmin: false,
  },
  {
    id: 'd744c386-2bd8-427a-8e96-9edbf3a53aa1',
    permission: 'PROJECT_ROLE_USER_READ',
    allowOnlyInternalAdmin: false,
  },
  {
    id: 'edab10aa-24ff-4e7a-90aa-cc595e584335',
    permission: 'PROJECT_ORGANIZATION_USER_READ',
    allowOnlyInternalAdmin: false,
  },
  {
    id: 'b683f546-df05-4ca7-a618-d960ef3789cb',
    permission: 'PROJECT_ORGANIZATION_USER_WRITE',
    allowOnlyInternalAdmin: false,
  },
  {
    id: '351386cf-63ff-403c-bc8b-2cb53f94c553',
    permission: 'PROJECT_ORGANIZATION_WRITE',
    allowOnlyInternalAdmin: false,
  },
  {
    id: '2df5d799-d713-45b3-9fec-f090ffd83d51',
    permission: 'PROJECT_ORGANIZATION_READ',
    allowOnlyInternalAdmin: false,
  },
  {
    id: '5fbbcf14-f431-4a80-adc8-a473f996d8a1',
    permission: 'PROJECT_ROLE_PERMISSION_WRITE',
    allowOnlyInternalAdmin: false,
  },
  {
    id: '6d51f0f6-772e-4c7c-a408-1182e16dd5e6',
    permission: 'PROJECT_ROLE_PERMISSION_READ',
    allowOnlyInternalAdmin: false,
  },
  {
    id: 'dd82f777-3670-4bef-a076-d4247496bf4b',
    permission: 'ORGANIZATION_KEY_MANAGEMENT_WRITE',
    allowOnlyInternalAdmin: false,
  },
  {
    id: '318e4d2e-309c-405a-87c8-b71c29c59b29',
    permission: 'ORGANIZATION_KEY_MANAGEMENT_READ',
    allowOnlyInternalAdmin: false,
  },
  {
    id: 'acbdcace-7dff-4f49-b5f3-81d661475a61',
    permission: 'KEY_MANAGEMENT_WRITE',
    allowOnlyInternalAdmin: false,
  },
  {
    id: '8d566c37-98e2-426a-9920-b41578f36d69',
    permission: 'KEY_MANAGEMENT_READ',
    allowOnlyInternalAdmin: false,
  },
  {
    id: '14659ed6-ed73-4eba-8e3c-49d768d5513f',
    permission: 'KEY_MANAGEMENT_UPDATE_PIN',
    allowOnlyInternalAdmin: false,
  },
  {
    id: '35d17d49-6f9f-4fcf-b856-0356b6ed2eba',
    permission: 'USER_ACTIVITY_READ',
    allowOnlyInternalAdmin: false,
  },
  {
    id: '74434d65-2763-466b-8e26-2324f27a2420',
    permission: 'USER_ACTIVITY_WRITE',
    allowOnlyInternalAdmin: true,
  },
];

export const createPermissions = async () => {
  const listCreatePermissions = permissions.map((data) =>
    prismaClient.permission.upsert({
      where: {
        id: data.id,
      },
      update: {},
      create: data,
    })
  );
  const result = await prismaClient.$transaction(listCreatePermissions);
  console.log('Created permissions', { permissions: result });
};
