import axios, { AxiosInstance } from "axios";

export class HttpClient {
    private axiosInstance: AxiosInstance;

    constructor(baseUrl: string) {
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
        })
    }

    async post<T, B>(url: string, data: B): Promise<T> {
        try {
            const response = await this.axiosInstance.post<T>(url, data);
            return response.data;
        } catch (error) {
            console.error("Error posting data:", error);
            throw error;
        }
    }

    async put<T, B>(url: string, data: B): Promise<T> {
        try {
            const response = await this.axiosInstance.put<T>(url, data);
            return response.data;
        } catch (error) {
            console.error("Error putting data:", error);
            throw error;
        }
    }

    async patch<T, B>(url: string, data: B): Promise<T> {
        try {
            const response = await this.axiosInstance.patch<T>(url, data);
            return response.data;
        } catch (error) {
            console.error("Error patching data:", error);
            throw error;
        }
    }

    async get<T>(url: string): Promise<T> {
        try {
            const response = await this.axiosInstance.get<T>(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }

    async delete<T>(url: string): Promise<T> {
        try {
            const response = await this.axiosInstance.delete<T>(url);
            return response.data;
        } catch (error) {
            console.error("Error deleting data:", error);
            throw error;
        }
    }
}