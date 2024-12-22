'use client'
import { FormProviderCreateGarage, FormTypeCreateGarage } from '@autospace/forms/src/createGarage'
// import { useMutation } from '@apollo/client'
// import { CreateGarageDocument, namedOperations } from '@autospace/network/src/gql/generated'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import { Form } from '../atoms/Form'
import { Button } from '../atoms/Button'
import { HtmlTextArea } from '../atoms/HtmlTextArea'
import { ImagePreview } from '../organisms/ImagePreview'
import { Controller, useFormContext } from "react-hook-form"
import { useCloudinaryUpload } from '@autospace/util/hooks/cloudinary'
import { Map } from '../organisms/map/Map'
import { initialViewState } from '@autospace/util/constants'
import { Panel } from '../organisms/map/Panel'
import { SearchPlaceBox } from '../organisms/map/SearchPlacesBox'
import { ViewState } from '@autospace/util/types'
import { CenterOfMap, DefaultZoomControls } from '../organisms/map/ZoomControls'
import { GarageMapMarker } from '../organisms/CreateGarageComponents'

export const CreateGarageContent = () => {
    const {
        register,
        handleSubmit,
        setValue,
        // reset,
        control,
        formState: { errors },
        resetField,
        watch
    } = useFormContext<FormTypeCreateGarage>()
    const { uploading,
        //  upload
    } = useCloudinaryUpload();
    const { images } = watch()

    // const [ -------------- make sure to unComment submit button loarding --------------
    //     createGarage,
    //      { data, error, loading }] = useMutation(
    //     CreateGarageDocument,
    //     { refetchQueries: [namedOperations.Query.Garages] }
    // )

    return <div className='grid md:grid-cols-2 gap-2 mt-2'>
        <div>
            <Form
                onSubmit={handleSubmit((data) => {
                    console.log('create garage form ::', data)
                })}
            >
                <HtmlLabel error={errors.displayName?.message} title='Display Name'>
                    <HtmlInput  {...register('displayName')} placeholder='Garage name' />
                </HtmlLabel>
                <HtmlLabel title='Description' error={errors.description?.message}>
                    <HtmlTextArea
                        cols={5}
                        {...register('description')}
                        placeholder='Describe...'
                    />
                </HtmlLabel>
                <HtmlLabel title='Address' error={errors.location?.address?.message}>
                    <HtmlTextArea
                        cols={10}
                        {...register('location.address')}
                        placeholder='123, street name ...'
                    />
                </HtmlLabel>
                <ImagePreview
                    srcs={images}
                    clearImage={() => resetField('images')}
                >
                    <Controller
                        control={control}
                        name='images'
                        render={({ field }) => (
                            <HtmlInput
                                type='file'
                                accept='image/*'
                                multiple={true}
                                onChange={(e) => field.onChange(e?.target?.files)}
                                className='border-0'
                            />
                        )}
                    />
                </ImagePreview>
                <Button loading={uploading
                    //  || loading
                } type="submit">Submit</Button>
            </Form>
        </div>
        {/* /------------------------------------------------------------------------------------------------------------------/ */}
        <Map
            initialViewState={initialViewState}
            onLoad={(e) => {
                const { lat, lng } = e.target.getCenter() // from that we can show the marker
                setValue('location.lat', lat)
                setValue('location.lng', lng)
            }}
            onMoveEnd={(e) => {
                const { lat, lng } = e.target.getCenter() // when user search and need to change the marker position
                setValue('location.lat', lat)
                setValue('location.lng', lng)
            }}
        >
            <GarageMapMarker />
            <Panel position='left-top'>
                <SearchPlaceBox
                    onLocationChange={(location: ViewState) => {
                        setValue('location.lat', location.latitude)
                        setValue('location.lng', location.latitude)
                    }}
                />
                <DefaultZoomControls>
                    <CenterOfMap
                        onClick={(latLng) => {
                            const lat = parseFloat(latLng.lat.toFixed(8))
                            const lng = parseFloat(latLng.lng.toFixed(8))

                            setValue('location.lat', lat, {
                                shouldValidate: true
                            })
                            setValue('location.lng', lng, {
                                shouldValidate: true
                            })
                        }}
                    />
                </DefaultZoomControls>
            </Panel>
        </Map>
    </div>
}

export const CreateGarage = () => {
    return (
        <FormProviderCreateGarage>
            <CreateGarageContent />
        </FormProviderCreateGarage>
    )
}