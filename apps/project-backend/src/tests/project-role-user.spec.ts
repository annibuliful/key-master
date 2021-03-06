import {
  Client,
  createProjectRoleUser,
  createUser,
  expectForbiddenError,
  expectNotFoundError,
  projectOwnerAClient,
} from '@key-master/test';
import { nanoid } from 'nanoid';

const ROLE_ID = 'ROLE_USER_ID';
const ROLE_ADMIN_ID = 'ROLE_ADMIN_ID';

describe('Project Role User', () => {
  let client: Client = null;

  beforeAll(() => {
    client = projectOwnerAClient;
  });

  describe('Mutation', () => {
    it('creates correctly', async () => {
      const user = await createUser({});
      const projectRoleUser = await client.chain.mutation
        .createProjectRoleUser({
          input: {
            userId: user.id,
            roleId: ROLE_ID,
          },
        })
        .get({
          roleId: true,
          userId: true,
        });

      expect(projectRoleUser.roleId).toEqual(ROLE_ID),
        expect(projectRoleUser.userId).toEqual(user.id);
    });

    it('throws error when create with role id not found', async () => {
      const user = await createUser({});

      expectNotFoundError(
        client.chain.mutation
          .createProjectRoleUser({
            input: {
              userId: user.id,
              roleId: `MOCK_WRONG_ROLE_ID_${nanoid()}`,
            },
          })
          .get({
            roleId: true,
            userId: true,
          })
      );
    });

    it('throws error when user id not found', () => {
      expectForbiddenError(
        client.chain.mutation
          .createProjectRoleUser({
            input: {
              userId: `MOCK_USER_ID_${nanoid()}`,
              roleId: ROLE_ID,
            },
          })
          .get({
            roleId: true,
            userId: true,
          })
      );
    });
  });

  it('updates an existing completely', async () => {
    const projectRoleUser = await createProjectRoleUser({ client });
    const updated = await client.chain.mutation
      .updateProjectRoleUser({
        id: projectRoleUser.id,
        input: {
          active: false,
          roleId: ROLE_ADMIN_ID,
        },
      })
      .get({
        id: true,
        active: true,
        roleId: true,
      });

    expect(updated.id).toEqual(projectRoleUser.id);
    expect(updated.roleId).toEqual(ROLE_ADMIN_ID);
    expect(updated.active).toBeFalsy();
  });

  it('it throws error with wrong id', () => {
    expectNotFoundError(
      client.chain.mutation
        .updateProjectRoleUser({
          id: `MOCK_WRONG_PROJECT_ROLE_USER_ID_${nanoid()}`,
          input: {
            active: false,
            roleId: ROLE_ADMIN_ID,
          },
        })
        .get({
          id: true,
          active: true,
          roleId: true,
        })
    );
  });

  it('deletes with correct id', async () => {
    const projectRoleUser = await createProjectRoleUser({ client });
    const getBeforeDelete = await client.chain.query
      .getProjectRoleUserById({
        id: projectRoleUser.id,
      })
      .id.get();

    expect(getBeforeDelete).toEqual(projectRoleUser.id);

    expect(
      await client.chain.mutation
        .deleteProjectRoleUser({
          id: projectRoleUser.id,
        })
        .success.get()
    ).toBeTruthy();

    expect(
      client.chain.query
        .getProjectRoleUserById({
          id: projectRoleUser.id,
        })
        .id.get()
    ).rejects.toBeTruthy();
  });

  it('throws error when delete with wrong id', () => {
    expectNotFoundError(
      client.chain.mutation
        .deleteProjectRoleUser({
          id: `MOCK_WRONG_PROJECT_ROLE_${nanoid()}`,
        })
        .success.get()
    );
  });

  describe('Query', () => {
    it('gets with correct id', async () => {
      const projectRoleUser = await createProjectRoleUser({ client });
      const result = await client.chain.query
        .getProjectRoleUserById({
          id: projectRoleUser.id,
        })
        .id.get();
      expect(result).toEqual(projectRoleUser.id);
    });

    it('throws error when get with wrong id', async () => {
      expectNotFoundError(
        client.chain.query
          .getProjectRoleUserById({
            id: `MOCK_WRONG_PROJECT_ROLE_USER_${nanoid()}`,
          })
          .id.get()
      );
    });

    it('throws error when get deleted id', async () => {
      const projectRoleUser = await createProjectRoleUser({ client });
      await client.chain.mutation
        .deleteProjectRoleUser({
          id: projectRoleUser.id,
        })
        .success.get();

      expectNotFoundError(
        client.chain.query
          .getProjectRoleUserById({
            id: projectRoleUser.id,
          })
          .id.get()
      );
    });

    it('returns project role users', async () => {
      await Promise.all([
        createProjectRoleUser({ client }),
        createProjectRoleUser({ client }),
      ]);

      const projectRoleUsers = await client.chain.query
        .getProjectRoleUsers({ filter: {} })
        .get({ id: true, userId: true, roleId: true });
      expect(projectRoleUsers.length).toBeGreaterThanOrEqual(2);
    });

    it('returns project role users with limit', async () => {
      await Promise.all([
        createProjectRoleUser({ client }),
        createProjectRoleUser({ client }),
      ]);
      const projectRoleUsers = await client.chain.query
        .getProjectRoleUsers({ filter: { take: 1 } })
        .get({ id: true, userId: true, roleId: true });

      expect(projectRoleUsers).toHaveLength(1);
    });

    it('returns with search text', async () => {
      await Promise.all([
        createProjectRoleUser({
          client,
          customFullname: `SEARCH_USER_${nanoid()}`,
        }),
        createProjectRoleUser({
          client,
          customFullname: `SEARCH_USER_${nanoid()}`,
        }),
      ]);

      const projectRoleUsers = await client.chain.query
        .getProjectRoleUsers({ filter: { search: 'search_user' } })
        .get({
          id: true,
          userId: true,
          roleId: true,
          user: {
            fullname: true,
          },
          role: {
            role: true,
          },
        });

      expect(
        projectRoleUsers.every((roleUser) =>
          roleUser.user.fullname.includes('SEARCH_USER_')
        )
      ).toBeTruthy();

      expect(
        projectRoleUsers.every((roleUser) => roleUser.role.role === 'USER')
      ).toBeTruthy();

      expect(projectRoleUsers.length).toBeGreaterThanOrEqual(2);
    });
  });
});
