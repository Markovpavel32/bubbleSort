async function connectionToServer(url) {
  let data; let
    status;
  const response = await fetch(url);
  status = response.statusText;
  if (status !== 'OK') {
    return {
      status,
    };
  }
  const json = await response.json();
  data = json.result.join('');

  return {
    data,
    status,
  };
}

export default connectionToServer;
