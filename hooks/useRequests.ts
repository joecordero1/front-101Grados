import { useState, useEffect, use } from 'react';

import { useApiAuth } from '~/hooks';
import { GroupedRequest, Request } from 'utils/types';

export const useRequests = (parseToGrouped = false) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [groupedRequests, setGroupedRequests] = useState<GroupedRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { get } = useApiAuth();

  const getRequests = async () => {
    try {
      setLoading(true);
      const data = await get<Request[]>('/requests/mine');
      setRequests(data);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const groupAndSortRequests = () => {
    setLoading(true);

    // Create an object to store grouped requests
    const groupedRequests = {};

    // // Iterate through the requests
    // requests.forEach((request) => {
    //   const {
    //     award: { id: awardId },
    //     ...rest
    //   } = request;

    //   // Check if the awardId is already a key in groupedRequests
    //   if (groupedRequests[awardId]) {
    //     // Add the request to the existing array
    //     groupedRequests[awardId].requests.push(rest);
    //   } else {
    //     // Create a new entry for the awardId
    //     groupedRequests[awardId] = {
    //       // awardId,
    //       requests: [rest],
    //     };
    //   }
    // });

    // Iterate through the requests
    requests.forEach((request) => {
      const {
        // award: { id: awardId },
        award,
        ...rest
      } = request;

      const awardId = award.id;

      // Check if the awardId is already a key in groupedRequests
      if (groupedRequests[awardId]) {
        // Add the request to the existing array
        groupedRequests[awardId].requests.push(rest);
      } else {
        // Create a new entry for the awardId
        groupedRequests[awardId] = {
          // awardId,
          award,
          requests: [rest],
        };
      }
    });

    // Convert the object values to an array and sort each group in descending order
    const result = Object.values(groupedRequests).map(
      (group: GroupedRequest) => ({
        ...group,
        requests: group.requests.sort(
          (a, b) =>
            new Date(b.requestedAt).getTime() -
            new Date(a.requestedAt).getTime()
        ),
      })
    );

    // Sort the entire array in descending order based on the first element's requestedAt
    const sortedResult = result.sort(
      (a, b) =>
        new Date(b.requests[0].requestedAt).getTime() -
        new Date(a.requests[0].requestedAt).getTime()
    );

    setGroupedRequests(sortedResult);
    setLoading(false);
  };

  useEffect(() => {
    if (parseToGrouped) groupAndSortRequests();
  }, [requests]);

  return {
    requests,
    loading,
    error,
    groupedRequests,
  };
};
