'use client'
import { SearchPage } from '@autospace/ui/src/components/templates/SearchPage'
import { FormProviderSearchGarage } from '@autospace/forms/src/searchGarages'

export default function Page() {
  return (
    // why we use it like a context Provider -
    // u can use it, in the different components. eg: 'GarageMarker.tsx', 'template/SearchPage.tsx'
    <FormProviderSearchGarage>
      <SearchPage />
    </FormProviderSearchGarage>
  )
}
