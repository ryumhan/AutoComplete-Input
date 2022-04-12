export interface autoDataSet {
  text: string;
  id: number;
}

export const fetchItems = async (uri: string): Promise<Array<autoDataSet>> => {
  const response = await request({
    url: uri,
    method: "GET",
  });

  return response.data;
};

const parseResponse = async (response: Response) => {
  const { status } = response;
  let data;
  if (status !== 204) {
    data = await response.json();
  }

  return {
    status,
    data,
  };
};

const request = async (params: any) => {
  const { method = "GET", url, headers = {}, body } = params;

  const config = {
    method,
    headers: new window.Headers(headers),
    body,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);
  return parseResponse(response);
};
