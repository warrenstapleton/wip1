import { GraphQLError } from 'graphql';
import { AppConstants } from '../constants/app.constants.js';
import { ErrorConstants } from '../constants/errors.constants.js';

export function VerifyAuthorization(
  _target: any,
  _propertyKey: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<void>>
) {
  const fn = descriptor.value!;
  descriptor.value = async function DescriptorValue(...args: any[]) {
    try {
      if (!args[1][AppConstants.IS_USER_LOGGED]) {
        throw new GraphQLError(ErrorConstants.USER_NOT_AUTHORIZED);
      }
      return await fn.apply(this, args);
    } catch (e) {
      throw new GraphQLError((e as Error).message);
    }
  };
  return descriptor;
}
