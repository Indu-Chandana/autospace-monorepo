import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { formDefaultValuesSearchGarages, FormTypeSearchGarage } from '@autospace/forms/src/searchGarages'
import { Button } from "../../atoms/Button"
import { IconFilter } from "@tabler/icons-react"
import { PulsingDot } from "../../atoms/Dot"
import { Sidebar } from "../Sidebar"
import { RangeSlider } from "../../molecules/RangeSlider"
import { ToggleButton, ToggleButtonGroup } from "../../molecules/ToggleButtonGroup"
import { FilterHeading } from "../../molecules/FilterHeading"
import { IconTypes } from "../../molecules/IconTypes"

export const FilterSidebar = () => {
    const [open, setOpen] = useState(false)
    const {
        control,
        reset,
        getValues, // gives values of the form. alternative to the watch and use watch
        formState: { dirtyFields }
    } = useFormContext<FormTypeSearchGarage>()


    return (
        <>
            <Button
                size="sm"
                variant="text"
                onClick={() => setOpen(true)}
                className="hover:bg-gray-200"
            >
                <IconFilter className="stroke-1.5 text-black" />
                {Object.values(dirtyFields).length ? <PulsingDot /> : null}
            </Button>

            <Sidebar open={open} setOpen={setOpen}>
                <div className="flex flex-col items-start gap-3">
                    {' '}
                    <Controller
                        name="types"
                        control={control}
                        render={({
                            field: { value = [], onChange },
                            fieldState: { isDirty },
                            formState: { defaultValues,
                                // errors
                            }
                        }) => {
                            return (
                                <div>
                                    <FilterHeading dirty={isDirty} title="Vehicle type" />
                                    <ToggleButtonGroup
                                        value={value}
                                        onChange={(event, value) => {
                                            onChange(value.sort())
                                        }}
                                        aria-label="text formatting"
                                    >
                                        {defaultValues?.types?.map((val) => {
                                            if (!val) return null
                                            return (
                                                <ToggleButton
                                                    key={val}
                                                    value={val}
                                                    selected={value.includes(val)}
                                                >
                                                    {IconTypes[val]}
                                                </ToggleButton>
                                            )
                                        })}

                                    </ToggleButtonGroup>
                                </div>
                            )
                        }}

                    />

                    <Controller
                        name="pricePerHour"
                        control={control}
                        render={({
                            field: { value, onChange },
                            fieldState: { isDirty },
                            formState: { defaultValues }
                        }) => {
                            return (
                                <div className="w-full">
                                    <FilterHeading dirty={isDirty} title="Price per hour" />
                                    <RangeSlider
                                        min={defaultValues?.pricePerHour?.[0]}
                                        max={defaultValues?.pricePerHour?.[1]}
                                        value={value}
                                        onChange={onChange}
                                        valueLabelFormat={(sliderValue) =>
                                            `RS. ${sliderValue.toLocaleString()}`
                                        }
                                        step={5}
                                    />
                                </div>
                            )
                        }}
                    />

                    <Controller
                        name="width"
                        control={control}
                        render={({
                            field: { value, onChange },
                            fieldState: { isDirty },
                            formState: { defaultValues }
                        }) => {
                            return (
                                <div className="w-full">
                                    <FilterHeading dirty={isDirty} title="Width" />
                                    <RangeSlider
                                        min={defaultValues?.width?.[0]}
                                        max={defaultValues?.width?.[1]}
                                        value={value}
                                        onChange={onChange}
                                        valueLabelFormat={(sliderValue) => `${sliderValue.toLocaleString()} ft`}
                                        step={2}
                                    />
                                </div>
                            )
                        }}
                    />

                    <Controller
                        name="height"
                        control={control}
                        render={({
                            field: { value, onChange },
                            fieldState: { isDirty },
                            formState: { defaultValues }
                        }) => {
                            return (
                                <div className="w-full">
                                    <FilterHeading dirty={isDirty} title="Height" />
                                    <RangeSlider
                                        min={defaultValues?.height?.[0]}
                                        max={defaultValues?.width?.[1]}
                                        value={value}
                                        onChange={onChange}
                                        valueLabelFormat={(sliderValue) =>
                                            `${sliderValue.toLocaleString()} ft`
                                        }
                                        step={2}
                                    />
                                </div>
                            )
                        }}
                    />

                    <Controller
                        name="length"
                        control={control}
                        render={({
                            field: { value, onChange },
                            fieldState: { isDirty },
                            formState: { defaultValues }
                        }) => {
                            return (
                                <div className="w-full">
                                    <FilterHeading dirty={isDirty} title="Length" />
                                    <RangeSlider
                                        min={defaultValues?.length?.[0]}
                                        max={defaultValues?.length?.[1]}
                                        value={value}
                                        onChange={onChange}
                                        valueLabelFormat={(sliderValue) =>
                                            `${sliderValue.toLocaleString()} ft`
                                        }
                                        step={5}
                                    />
                                </div>
                            )
                        }}
                    />


                    <Button
                        onClick={() =>
                            reset({
                                ...getValues(), // we do not want to reset location, start Time and endtime. because these fields nothing to do with form. 
                                ...formDefaultValuesSearchGarages
                            }) // reset to default state
                        }
                        disabled={!Object.values(dirtyFields).length}
                    >
                        Reset
                    </Button>


                </div>
            </Sidebar>
        </>
    )
}