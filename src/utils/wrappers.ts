import { promisify } from "util";
import { exec, execSync as syncExec } from "child_process";
import { promises as fs, existsSync as syncExists } from "fs";

const asyncExec = promisify(exec);
const asyncExists = async (path: string) => !!(await fs.stat(path).catch(() => false));

export { asyncExec, asyncExists, syncExists, syncExec };
