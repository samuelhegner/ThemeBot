// import entire SDK
import AWS from 'aws-sdk';
import fetch from 'node-fetch';

const S3 = new AWS.S3({
	region: process.env.AWS_S3_REGION,
	accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
});

/**
 *  Save image to S3 bucket
 * @param name name of picture
 * @param folder folder to place picture
 * @param discordUrl discord cdn url
 * @returns new s3 picture url if created or the discord url if failed
 */
export async function saveImageToBucket(name: string, folder: 'entry-pictures' | 'theme-picures', discordUrl: string) {
	const buffer = await downloadImage(discordUrl);

	if (buffer == null) {
		return discordUrl;
	}

	const s3Url = await uploadImage(name, folder, buffer);
	return s3Url != null ? s3Url : discordUrl;
}

export function getImageName(userId: string, themeName: string): string {
	let key = userId + '_' + themeName;
	key = key.replace(/ /g, '-');
	return key;
}

async function downloadImage(url: string) {
	try {
		const pic = await fetch(url);
		return Buffer.from(await pic.arrayBuffer());
	} catch (error) {
		return null;
	}
}

async function uploadImage(name: string, folder: 'entry-pictures' | 'theme-picures', buffer: Buffer) {
	try {
		const fullKey = folder + '/' + name + '.webp';
		const bucket = process.env.AWS_S3_BUCKET_NAME;
		const prefix = process.env.AWS_S3_OBJECT_URL_PREFIX;

		if (bucket == null || prefix == null) {
			return null;
		}

		await S3.putObject({
			Body: buffer,
			Bucket: bucket,
			Key: fullKey
		}).promise();

		return prefix + fullKey;
	} catch (error) {
		return null;
	}
}
