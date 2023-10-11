// migrate axios to fetch
import { rawUrl } from "../constants";

export class ResponseError extends Error {
  private res: Response;
  constructor(public response: Response) {
    super(response.statusText);
    this.res = response;
  }

  get status() {
    return this.res.status;
  }

  get statusText() {
    return this.res.statusText;
  }

  get body() {
    return this.res.json();
  }

  get headers() {
    return this.res.headers;
  }

  toString() {
    return `${this.status} - ${this.statusText}`;
  }

  [Symbol.toStringTag]() {
    return `${this.status} - ${this.statusText}`;
  }
}

interface MyResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

async function thenHandler<T = any>(res: Response): Promise<MyResponse<T>> {
  try {
    console.log({ res });
    if (res.ok) {
      const data = await res.json();
      return {
        data,
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
      };
    } else throw new ResponseError(res);
  } catch (error) {
    console.log({ error });
    throw new ResponseError(res);
  }
}

export const request = {
  get: async <T = any>(path: string) => {
    const pathValidated = path.startsWith("/") ? path.slice(1) : path;

    const res = await fetch(`${rawUrl}${pathValidated}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return thenHandler<T>(res);
  },
  post: async <T = any>(path: string, body: any) => {
    const pathValidated = path.startsWith("/") ? path.slice(1) : path;

    const res = await fetch(`${rawUrl}${pathValidated}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return thenHandler<T>(res);
  },

  put: async <T = any>(path: string, body: any) => {
    const pathValidated = path.startsWith("/") ? path.slice(1) : path;

    const res = await fetch(`${rawUrl}${pathValidated}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return thenHandler<T>(res);
  },

  delete: async <T = any>(path: string) => {
    const pathValidated = path.startsWith("/") ? path.slice(1) : path;

    const res = await fetch(`${rawUrl}${pathValidated}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return thenHandler<T>(res);
  },
};
