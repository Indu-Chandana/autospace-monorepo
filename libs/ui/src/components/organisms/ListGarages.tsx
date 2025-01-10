import { GaragesDocument, MyCompanyQuery } from "@autospace/network/src/gql/generated"
import { ShowData } from "./ShowData"
import { useTakeSkip } from '@autospace/util/hooks/pagination'
import { useQuery } from '@apollo/client'

export const ListGarages = ({
    companyId,
}: {
    companyId: MyCompanyQuery['myCompany']['id']
}) => {
    const { setSkip, setTake, skip, take } = useTakeSkip()

    const { data, loading, error } = useQuery(GaragesDocument, {
        variables: {
            skip,
            take,
            where: {
                companyId: { equals: companyId }
            }
        }
    })

    return (
        <ShowData
            error={error?.message}
            loading={loading}
            pagination={{
                skip,
                take,
                resultCount: data?.garages.length,
                totalCount: data?.garagesCount.count,
                setSkip,
                setTake
            }}
        >
            {data?.garages.map((garage) => (
                <div key={garage.id}>{garage.id}</div>
            ))}

        </ShowData>)
}