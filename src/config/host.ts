const internalDockerHosts = ['localhost:13007', 'localhost:13000'];
const externalDockerHosts = ['localhost:23007', 'localhost:23000'];

export function getHost(): string {
  if (process.env.REACT_APP_LOCAL_ENV) {
    return 'people-test.sphinx.chat';
  }

  const host = window.location.host.includes('localhost')
    ? window.location.host.includes('localhost:3007')
      ? 'localhost:13000'
      : 'localhost:5002'
    : window.location.host;
  return host;
}

export function getHostIncludingDockerHosts() {
  if (externalDockerHosts.includes(window.location.host)) {
    return 'tribes.sphinx:5002';
  } else if (internalDockerHosts.includes(window.location.host)) {
    return window.location.host;
  } else {
    return getHost();
  }
}

export const TribesURL = getHost().startsWith('localhost')
  ? `http://${getHost()}`
  : getHost().startsWith('http')
  ? getHost()
  : `https://${getHost()}`;
