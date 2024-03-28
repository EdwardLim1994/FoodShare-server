import CloudinaryClient from "./client/CloudinaryClient";

//TODO: encrypt and decrypt token
export const encryptToken = (token: string) => {};

export const decryptToken = (token: string) => {};

//TODO: upload to cloudinary
export const uploadImage = async (files: File[]): Promise<string[]> => {
	const cloudinary = CloudinaryClient.instance();

	return [""];
};
