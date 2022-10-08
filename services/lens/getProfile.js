import { gql } from '@apollo/client/core';
import { apolloClient } from '../..services/apollo-client';
import { login } from './login';
import { PROFILE_ID } from '../../config';
import { getAddressFromSigner } from '../ethers.service';
import { prettyJSON } from '../helpers';

const GET_PROFILE = `
  query($request: SingleProfileQueryRequest!) {
    profile(request: $request) {
        id
        name
        bio
        attributes {
          displayType
          traitType
          key
          value
        }
        followNftAddress
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          ... on ProfileFollowModuleSettings {
            type
          }
          ... on RevertFollowModuleSettings {
            type
          }
        }
    }
  }
`;

const getProfileRequest = (profileId, handle) => {
  let request = null;

  if(profileId) {
    request = {
      profileId: profileId
    };
  }

  if(handle) {
    request = {
      handle: handle
    };
  }

  return apolloClient.query({
    query: gql(GET_PROFILE),
    variables: {
      request,
    },
  });
};

export const getProfile = async (profileId, handle) => {
  const address = await getAddressFromSigner();
  console.log('profile from address', address);

  await login();
  const profile = await getProfileRequest(request);

  prettyJSON('profile: result', profile.data);

  return profile.data;
};