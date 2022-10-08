import { gql } from '@apollo/client/core';
import { apolloClient } from '../apolloClient';
import { prettyJSON } from '../helpers';

const SEARCH = `
  query($request: SearchQueryRequest!) {
    search(request: $request) {
      ... on ProfileSearchResult {
        __typename 
        items {
          ... on Profile {
            ...ProfileFields
          }
        }
        pageInfo {
          prev
          totalCount
          next
        }
      }
    }
  }

  fragment MediaFields on Media {
    url
    mimeType
  }

  fragment ProfileFields on Profile {
    profileId: id,
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
    }
    isFollowedByMe
    isFollowing(who: null)
    followNftAddress
    metadata
    isDefault
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
      }
    }
    ownedBy
    dispatcher {
      address
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
            name
            symbol
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
`;

const searchRequest = (handle) => {
  return apolloClient.query({
    query: gql(SEARCH),
    variables: {
      request: {
        query: handle,
        type: "PROFILE"
      }
    },
  });
};

export const searchProfile = async (handle) => {
  const result = await searchRequest(handle);
  prettyJSON('search: result', result.data);

  return result.data;
};
