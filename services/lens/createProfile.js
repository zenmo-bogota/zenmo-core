import { gql } from '@apollo/client/core';
//import { BigNumber, utils } from 'ethers';
import { apolloClient } from '../apolloClient';
import { getAddressFromSigner } from '../ethers.service';
import { prettyJSON } from '../helpers';
import { login } from './login';

const CREATE_PROFILE = `
  mutation($request: CreateProfileRequest!) { 
    createProfile(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
			__typename
    }
 }
`;

const createProfileRequest = (handle, profilePictureUri) => {
  let profileRequest = {
    handle: handle,
    profilePictureUri: profilePictureUri
  };

  return apolloClient.mutate({
    mutation: gql(CREATE_PROFILE),
    variables: {
      request: profileRequest,
    },
  });
};

export const createProfile = async (handle, profilePictureUri) => {
  const address = await getAddressFromSigner();
  console.log('create profile: address', address);

  await login(address);

  const createProfileResult = await createProfileRequest(handle, profilePictureUri);
  prettyJSON('create profile: result', createProfileResult.data);
  return createProfileResult.data;
};