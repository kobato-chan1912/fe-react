import axios from "axios";

const CONTENT_TYPE = "application/json";
const CONTENT_TYPE_FILE = "multipart/form-data";

interface headersInterface {
  "Content-Type": string,
  "Authorization"?: string
}

export const upload = async ({ url, file, files }:{url: string, file: any, files: any[]}) => {
  const headers: headersInterface = {
    "Content-Type": CONTENT_TYPE_FILE
  };
  const token = localStorage.getItem('token')
  if (token != null) headers["Authorization"] = "Bearer " + token;

  const body = new FormData();
  if (file) body.append("file", file);
  else if (files)
    for (const f of files) {
      body.append("files", f);
    }

  try {
    const { data } = await axios.post(process.env.REACT_APP_API + url, body, {
      headers
    });
    return data;
  } catch (e) {
    const { data } = e.response || {
      data: { code: 500, message: e.toString() }
    };
    return data;
  }
};

export const post = async ({url, body}:{url: string, body: any}) => {
  const headers: headersInterface = {
    "Content-Type": CONTENT_TYPE
  };
  const token = localStorage.getItem('token')
  if (token != null) headers["Authorization"] = "Bearer " + token;
  try {
    const { data } = await axios.post(
      process.env.REACT_APP_API + url,
      body,
      { headers }
    );
    return data;
  } catch (e) {
    console.dir(e.message);
    if(e.message === 'Request failed with status code 403'){
      return {
        code: 403
      }
    }
    const { data } = e.response || {
      data: { code: 500, message: e.toString() }
    };
    return data;
  }
};

export const put = async ({ url, body }:{url: string, body: any}) => {
  const headers: headersInterface = {
    "Content-Type": CONTENT_TYPE
  };
  const token = localStorage.getItem('token')
  if (token != null) headers["Authorization"] = "Bearer " + token;
  try {
    const { data } = await axios.put(process.env.REACT_APP_API + url, body, {
      headers
    });
    return data;
  } catch (e) {
    const { data } = e.response || {
      data: { code: 500, message: e.toString() }
    };
    return data;
  }
};

export const get = async ({ url }:{url: string}) => {
  const headers:headersInterface = {
    "Content-Type": CONTENT_TYPE
  };
  const token = localStorage.getItem('token')
  if (token != null) headers["Authorization"] = "Bearer " + token;
  try {
    const { data } = await axios.get(process.env.REACT_APP_API + url, {
      headers
    });
    return data;
  } catch (e) {
    const { data } = e.response || {
      data: { code: 500, message: e.toString() }
    };
    return data;
  }
};

export const del = async ({ url }:{url: string}) => {
  const headers: headersInterface = {
    "Content-Type": CONTENT_TYPE
  };
  const token = localStorage.getItem('token')
  if (token != null) headers["Authorization"] = "Bearer " + token;
  try {
    const { data } = await axios.delete(process.env.REACT_APP_API + url, {
      headers
    });
    return data;
  } catch (e) {
    const { data } = e.response || {
      data: { code: 500, message: e.toString() }
    };
    return data;
  }
};
