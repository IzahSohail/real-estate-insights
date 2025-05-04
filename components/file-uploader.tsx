"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Loader2 } from "lucide-react"
import { PropertyDetails } from "@/components/property-details"
import { LoadingState } from "@/components/loading-state"
import type { PropertyDetailsType } from "@/types/property"

export function FileUploader() {
  const [brochure, setBrochure] = useState<File | null>(null)
  const [floorPlan, setFloorPlan] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetailsType | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleBrochureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBrochure(e.target.files[0])
    }
  }

  const handleFloorPlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFloorPlan(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!brochure || !floorPlan) {
      setError("Please upload both brochure and floor plan")
      return
    }

    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("brochure", brochure)
    formData.append("floorPlan", floorPlan)

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process files")
      }

      const data = await response.json()
      setPropertyDetails(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <LoadingState />
  }

  return (
    <div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload Property Documents</CardTitle>
          <CardDescription>Upload your property brochure and floor plan to extract details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="brochure" className="block text-sm font-medium">
                  Property Brochure (PDF)
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("brochure")?.click()}
                    className="w-full h-24 flex flex-col items-center justify-center border-dashed"
                  >
                    <Upload className="h-6 w-6 mb-2" />
                    <span>{brochure ? brochure.name : "Select Brochure"}</span>
                  </Button>
                  <input id="brochure" type="file" accept=".pdf" onChange={handleBrochureChange} className="hidden" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="floorPlan" className="block text-sm font-medium">
                  Floor Plan (PDF)
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("floorPlan")?.click()}
                    className="w-full h-24 flex flex-col items-center justify-center border-dashed"
                  >
                    <FileText className="h-6 w-6 mb-2" />
                    <span>{floorPlan ? floorPlan.name : "Select Floor Plan"}</span>
                  </Button>
                  <input id="floorPlan" type="file" accept=".pdf" onChange={handleFloorPlanChange} className="hidden" />
                </div>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <Button type="submit" className="w-full" disabled={isLoading || !brochure || !floorPlan}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Extract Property Details"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {propertyDetails && <PropertyDetails details={propertyDetails} />}
    </div>
  )
}
