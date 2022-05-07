import { Repository } from '@key-master/db';
import {
  DuplicateResouce,
  IAppContext,
  ResourceNotFound,
} from '@key-master/graphql';
import {
  CreateProjectRoleInput,
  UpdateProjectRoleInput,
} from '../codegen-generated';

export class ProjectRoleService extends Repository<IAppContext> {
  async create(data: CreateProjectRoleInput) {
    const projectRole = await this.db.projectRole.findFirst({
      where: {
        role: data.role,
        deletedAt: null,
      },
    });

    if (projectRole) {
      throw new DuplicateResouce(`create duplicate project role ${data.role}`);
    }

    return this.db.projectRole.create({
      data: {
        ...data,
        projectId: this.context.projectId,
      },
    });
  }

  async update(id: string, data: UpdateProjectRoleInput) {
    const projectRole = await this.db.projectRole.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!projectRole) {
      throw new ResourceNotFound(`update project role id ${id} not found`);
    }

    return this.db.projectRole.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    const projectRole = await this.db.projectRole.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
    if (!projectRole) {
      throw new ResourceNotFound(`delete project role id ${id} not found`);
    }

    await this.db.projectRole.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return { success: true };
  }
}
