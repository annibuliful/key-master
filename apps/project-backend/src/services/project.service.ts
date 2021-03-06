import { Repository } from '@key-master/db';
import {
  DuplicateResource,
  IAppContext,
  ResourceNotFound,
} from '@key-master/graphql';
import { ForbiddenError } from 'apollo-server-core';
import { CreateProjectInput, UpdateProjectInput } from '../codegen-generated';

export class ProjectService extends Repository<IAppContext> {
  async create(input: CreateProjectInput) {
    const duplicatedProjectName = await this.db.project.findFirst({
      select: {
        id: true,
      },
      where: {
        name: input.name,
        ownerId: this.context.userId,
        deletedAt: null,
      },
    });

    if (duplicatedProjectName) {
      throw new DuplicateResource(
        `create project: duplicated project name ${input.name}`
      );
    }

    return this.db.project.create({
      data: {
        ...input,
        ownerId: this.context.userId,
      },
    });
  }

  async update(id: string, data: UpdateProjectInput) {
    const project = await this.db.project.findFirst({
      select: { id: true, ownerId: true },
      where: {
        deletedAt: null,
        id,
      },
    });

    if (!project) {
      throw new ResourceNotFound(`update project: id ${id} not found`);
    }

    if (project.ownerId !== this.context.userId) {
      throw new ForbiddenError('update project: forbidden operation');
    }

    return this.db.project.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    const project = await this.db.project.findFirst({
      select: { id: true, ownerId: true },
      where: {
        deletedAt: null,
        id,
      },
    });

    if (!project) {
      throw new ResourceNotFound(`delete project: id ${id} not found`);
    }

    if (project.ownerId !== this.context.userId) {
      throw new ForbiddenError('update project: forbidden operation');
    }

    await this.db.project.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      success: true,
    };
  }

  async findById(id: string) {
    const project = await this.db.project.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!project) {
      throw new ResourceNotFound(`get project by id ${id} not found`);
    }

    const projectRoleUser = await this.db.projectRoleUser.findFirst({
      where: {
        projectId: this.context.userId,
        deletedAt: null,
      },
    });

    if (project.ownerId !== this.context.userId || !!projectRoleUser) {
      throw new ForbiddenError('you are not in this project');
    }

    return project;
  }

  async findManyByOwner() {
    return this.db.project.findMany({
      where: {
        ownerId: this.context.userId,
      },
    });
  }
}
