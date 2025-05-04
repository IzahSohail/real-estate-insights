import fs from "fs"
import path from "path"

// Create tmp directory if it doesn't exist
const tmpDir = path.join(process.cwd(), "tmp")
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true })
}
