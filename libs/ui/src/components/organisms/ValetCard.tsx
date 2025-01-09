import { CompanyValetsQuery } from "@autospace/network/src/gql/generated"
import { formatDateCustom } from "@autospace/util/date"
import Image from "next/image"

export interface IValetCardProps {
    valet: CompanyValetsQuery['companyValets'][0]
}

export const ValetCard = ({ valet }: IValetCardProps) => {
    return (
        <div className="space-y-2">
            <div className="p-1 border-2 shadow-lg border-primary">
                <Image
                    className="object-cover w-full aspect-square"
                    alt="valet photo"
                    width={200}
                    height={300}
                    src={valet.image || '/valet.jpeg'}
                />
            </div>
            <div>
                <div className="font-semibold">{valet.displayName}</div>
                <div className="mb-1 text-xs">{valet.uid}</div>
                <div className="mb-1 text-xs">{valet.licenceID}</div>
                <div className="text-xs text-gray">
                    {formatDateCustom(valet.createdAt, 'PP')}
                </div>
            </div>
        </div>
    )
}