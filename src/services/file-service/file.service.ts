import { accessApi } from "@/$api/axios.api";
import { FileResponse } from "@/shared/types/file.type";

class FileService {
  async uploadFile(file: Blob, folder: string): Promise<FileResponse> {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await accessApi<FileResponse>({
      method: "POST",
      url: `/upload/${folder}`,
      data: formData,
			headers: {
				"Content-Type": "multipart/form-data", // Устанавливаем заголовок для загрузки файла
			},
    });
    return data;
  }
}

export default new FileService();