import { useFormCreateValet } from '@autospace/forms/src/createValet'
import { Button } from '../atoms/Button'
import { useState } from 'react'
import { Dialog } from '../atoms/Dialog'
import { Form } from '../atoms/Form'
import { ImagePreview } from './ImagePreview'
import { Controller } from 'react-hook-form'
import { HtmlInput } from '../atoms/HtmlInput'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { useMutation } from '@apollo/client'
import { useCloudinaryUpload } from '@autospace/util/hooks/cloudinary'
import { CreateValetDocument } from '@autospace/network/src/gql/generated'
import { toast } from '../molecules/Toast'

export const AddValet = () => {
    const { register, reset, handleSubmit, resetField, watch, control, formState: { errors } } = useFormCreateValet()
    const { uploading, upload } = useCloudinaryUpload()

    const [createValet, { data, loading }] = useMutation(CreateValetDocument, {
        onCompleted() {
            toast('Valet created.')
            reset()
            setOpen(false)
        }
    })
    const [open, setOpen] = useState(false)
    const { image } = watch()

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Create Valet</Button>
            <Dialog
                open={open}
                setOpen={setOpen}
                title='Create Valet'
                widthClassName='max-w-xl'
            >
                <Form
                    onSubmit={handleSubmit(async ({ image, ...data }) => {
                        const images = image ? await upload(image) : ''
                        await createValet({ variables: { createValetInput: { ...data, image: images[0] } } })
                    })}
                >
                    {/* input - UID */}
                    <HtmlLabel title='UID' error={errors.uid?.message}>
                        <HtmlInput placeholder='uid of the valet' {...register('uid')} />
                    </HtmlLabel>

                    {/* input - Display name */}
                    <HtmlLabel title='Display Name' error={errors.displayName?.message}>
                        <HtmlInput placeholder='Name of the valet' {...register('displayName')} />
                    </HtmlLabel>

                    {/* input - LicenceID */}
                    <HtmlLabel title='Licence ID' error={errors.licenceID?.message}>
                        <HtmlInput placeholder='Liscence ID of the valet' {...register('licenceID')} />
                    </HtmlLabel>

                    <ImagePreview srcs={image} clearImage={() => resetField("image")}>
                        <Controller
                            control={control}
                            name='image'
                            render={({ field }) => (
                                <HtmlInput
                                    type='file'
                                    accept='image/*'
                                    multiple={false}
                                    onChange={(e) => field.onChange(e?.target?.files)}
                                />
                            )}
                        />
                    </ImagePreview>

                    <Button loading={uploading || loading} type='submit'>
                        Create valet
                    </Button>
                </Form>
            </Dialog>
        </div>
    )
}