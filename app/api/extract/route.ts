import { type NextRequest, NextResponse } from "next/server"
import { exec } from "child_process"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"
import type { PropertyDetailsType } from "@/types/property"

// Ensure tmp directory exists
const ensureTmpDir = async () => {
  const tmpDir = path.join(process.cwd(), "tmp")
  try {
    await fs.promises.access(tmpDir)
  } catch {
    await mkdir(tmpDir, { recursive: true })
  }
  return tmpDir
}

export async function POST(request: NextRequest) {
  try {
    const tmpDir = await ensureTmpDir()

    const formData = await request.formData()
    const brochure = formData.get("brochure") as File
    const floorPlan = formData.get("floorPlan") as File

    if (!brochure || !floorPlan) {
      return NextResponse.json({ error: "Brochure and floor plan are required" }, { status: 400 })
    }

    // Create unique IDs for the files
    const brochureId = uuidv4()
    const floorPlanId = uuidv4()
    const outputId = uuidv4()

    // Create file paths
    const brochurePath = path.join(tmpDir, `${brochureId}.pdf`)
    const floorPlanPath = path.join(tmpDir, `${floorPlanId}.pdf`)
    const outputPath = path.join(tmpDir, `${outputId}.json`)

    // Convert files to buffers
    const brochureBuffer = Buffer.from(await brochure.arrayBuffer())
    const floorPlanBuffer = Buffer.from(await floorPlan.arrayBuffer())

    // Write files to disk
    await writeFile(brochurePath, brochureBuffer)
    await writeFile(floorPlanPath, floorPlanBuffer)

    // Execute the Python script
    const result = await new Promise<PropertyDetailsType>((resolve, reject) => {
      exec(
        `python extract.py --brochure "${brochurePath}" --floorplan "${floorPlanPath}" --output "${outputPath}"`,
        async (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`)
            return reject(new Error("Failed to process files"))
          }

          if (stderr) {
            console.error(`stderr: ${stderr}`)
          }

          try {
            // Read the output file
            const data = fs.readFileSync(outputPath, "utf8")
            const parsedData = JSON.parse(data)

            // Clean up temporary files
            try {
              fs.unlinkSync(brochurePath)
              fs.unlinkSync(floorPlanPath)
              fs.unlinkSync(outputPath)
            } catch (cleanupError) {
              console.error("Error cleaning up files:", cleanupError)
            }

            resolve(parsedData)
          } catch (readError) {
            reject(new Error("Failed to read output file"))
          }
        },
      )
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Failed to process files" }, { status: 500 })
  }
}
