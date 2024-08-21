interface FetchOptions {
    path: string;
    method?: RequestMethod;
    formData?: Record<string, any>;
    headers?: Record<string, string>;
    additionalOptions?: RequestInit;
}

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function fetchData(options: FetchOptions): Promise<Response> {
    const {
        path,
        method = "GET",
        formData = {},
        headers = {},
        additionalOptions = {},
    } = options;

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`;

    const defaultHeaders = {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
    };

    const mergedHeaders: Record<string, string> = {
        ...defaultHeaders,
        ...headers,
    };

    const requestOptions: RequestInit = {
        method,
        headers: mergedHeaders,
        ...additionalOptions,
    };

    if (method !== "GET" && Object.keys(formData).length > 0) {
        const isFileUpload = Object.values(formData).some(
            (value) => value instanceof File
        );

        if (isFileUpload) {
            const formDataObj = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataObj.append(key, value);
            });
            requestOptions.body = formDataObj;
            delete mergedHeaders["Content-Type"];
        } else {
            requestOptions.body = JSON.stringify(formData);
            mergedHeaders["Content-Type"] = "application/json";
        }
    }

    const res = await fetch(url, requestOptions);

    if (res.ok) {
        const data = await res.json();
        return Response.json(data);
    }

    return res;
}
