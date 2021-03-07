import { extname } from 'path';
import * as fs from 'fs';

// eslint-disable-next-line consistent-return
export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');

    callback(null, `${name}-${randomName}${extname(file.originalname)}`);
};

export const removeFile = (path: string) => {
    fs.exists(path, (exists) => {
        if (exists) {
            fs.unlink(path, (err) => {
                if (err) throw err;
            });
        }
    });
};

export const createDir = (path: string) => {
    if (!fs.existsSync(path)) fs.mkdirSync(path);
};
