import { queryField } from 'nexus';

export const meQuery = queryField('me', {
  type: 'UserData',
  resolve(_parent, _args, ctx) {
    if (!ctx.currentUserData) throw new Error('You must signIn');
    return ctx.currentUserData;
  },
});
