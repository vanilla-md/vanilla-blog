import { outputFile } from 'fs-extra';
import { resolveSiteData } from '@/lib/siteData';

async function saveJsonObj(jsonObj: {}, filePath: string) {
  await outputFile(filePath, JSON.stringify(jsonObj, undefined, 2));
}

const siteData = await resolveSiteData();
await saveJsonObj(siteData, './generated/siteData.json');
