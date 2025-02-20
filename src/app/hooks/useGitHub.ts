import useSWR from 'swr';

export function useGitHub(username: string, repoName: string) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: repositories, error: repoError } = useSWR(
    username ? `https://api.github.com/users/${username}/repos` : null,
    fetcher
  );

  const { data: starred, error: starError } = useSWR(
    username ? `https://api.github.com/users/${username}/starred` : null,
    fetcher
  );

  const { data: owner, error: ownerError } = useSWR(
    username ? `https://api.github.com/users/${username}` : null,
    fetcher
  );

  // Passando o repoName junto com o username
  const { data: pulls, error: pullError } = useSWR(
    username && repoName ? `https://api.github.com/repos/${username}/${repoName}/pulls` : null,
    fetcher
  );
  const { data: issues, error: issueError } = useSWR(
    username && repoName ? `https://api.github.com/repos/${username}/${repoName}/issues` : null,
    fetcher
  );
  const { data: forks, error: forkError } = useSWR(
    username && repoName ? `https://api.github.com/repos/${username}/${repoName}/forks` : null,
    fetcher
  );

  return { repositories, starred, owner, repoError, starError, ownerError, pulls, issues, forks, pullError, issueError, forkError, repoName };
}

