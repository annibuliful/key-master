import { Resolvers } from '../../codegen-generated';
import { query as UserQuery } from './user.query';
export const queries: Resolvers['Query'] = {
  ...UserQuery,
};
