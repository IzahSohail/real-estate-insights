"use client"

import type { PropertyDetailsType } from "@/types/property"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

interface PropertyDetailsProps {
  details: PropertyDetailsType
}

export function PropertyDetails({ details }: PropertyDetailsProps) {
  // Extract amenities from the details object
  const amenities = Object.entries(details)
    .filter(([key, value]) => key.startsWith("has_") || key === "is_pet_friendly")
    .map(([key, value]) => ({
      name: key.replace("has_", "").replace(/_/g, " "),
      value: Boolean(value),
    }))

  // Format the property name for display
  const formatPropertyName = (name: string) => {
    return name || "Property Details"
  }

  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start flex-wrap">
          <div>
            <CardTitle className="text-2xl font-bold">{formatPropertyName(details.property_name)}</CardTitle>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {details.property_type && (
                <Badge variant="outline" className="text-sm">
                  {details.property_type}
                </Badge>
              )}
              {details.location && (
                <Badge variant="outline" className="text-sm">
                  {details.location}
                </Badge>
              )}
              {details.city && (
                <Badge variant="outline" className="text-sm">
                  {details.city}, {details.country}
                </Badge>
              )}
            </div>
          </div>
          {details.price && (
            <div className="text-right mt-2 md:mt-0">
              <div className="text-2xl font-bold">{details.price}</div>
              {details.average_price_per_sqft && (
                <div className="text-sm text-gray-500">{details.average_price_per_sqft} per sqft</div>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="payment">Payment Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {details.description && (
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-700">{details.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {details.bedrooms && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Bedrooms</div>
                  <div className="font-medium">{details.bedrooms}</div>
                </div>
              )}

              {details.bathroom && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Bathrooms</div>
                  <div className="font-medium">{details.bathroom}</div>
                </div>
              )}

              {details.area && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Area</div>
                  <div className="font-medium">{details.area}</div>
                </div>
              )}

              {details.handover && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Handover</div>
                  <div className="font-medium">{details.handover}</div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {details.developer && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Developer</span>
                  <span className="font-medium">{details.developer}</span>
                </div>
              )}

              {details.property_type && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Property Type</span>
                  <span className="font-medium">{details.property_type}</span>
                </div>
              )}

              {details.location && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{details.location}</span>
                </div>
              )}

              {details.city && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">City</span>
                  <span className="font-medium">{details.city}</span>
                </div>
              )}

              {details.country && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Country</span>
                  <span className="font-medium">{details.country}</span>
                </div>
              )}

              {details.bedrooms && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Bedrooms</span>
                  <span className="font-medium">{details.bedrooms}</span>
                </div>
              )}

              {details.bathroom && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Bathrooms</span>
                  <span className="font-medium">{details.bathroom}</span>
                </div>
              )}

              {details.area && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Area</span>
                  <span className="font-medium">{details.area}</span>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="amenities">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {amenities.map((amenity) => (
                <div key={amenity.name} className="flex items-center gap-2 p-2 rounded-md border">
                  {amenity.value ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                  <span className="capitalize">{amenity.name}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payment">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {details.payment_plan && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Payment Plan</span>
                  <span className="font-medium">{details.payment_plan}</span>
                </div>
              )}

              {details.down_payment && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Down Payment</span>
                  <span className="font-medium">{details.down_payment}</span>
                </div>
              )}

              {details.handover && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Handover Date</span>
                  <span className="font-medium">{details.handover}</span>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
