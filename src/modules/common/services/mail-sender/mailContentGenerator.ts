import * as path from 'path';
import * as fs from 'fs';
import * as htmlToText from 'html-to-text';
import { template } from 'lodash';

type TplNameType = 'active-account';

interface ActiveAccount {
  username: string;
  activeLink: string;
}

export const mailContentGenerator = (tplName: TplNameType, tplData: ActiveAccount): {html: string, text: string} => {
  const tplDir = path.resolve(__dirname, './templates');
  const tplFileName = path.join(tplDir, tplName + '.html');

  const tplContent = fs.readFileSync(tplFileName, 'utf8');
  const compiledTplContent = template(tplContent);
  const htmlContent = compiledTplContent(tplData);
  const textContent = htmlToText.fromString(htmlContent);

  return {
    html: htmlContent,
    text: textContent
  };
};