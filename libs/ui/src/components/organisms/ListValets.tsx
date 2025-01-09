import { useQuery } from "@apollo/client"
import { CompanyValetsDocument } from "@autospace/network/src/gql/generated"
import { ShowData } from "./ShowData"
import { useTakeSkip } from "@autospace/util/hooks/pagination"
import { ValetCard } from "./ValetCard"

export const ListValets = () => {
    const { take, skip, setSkip, setTake } = useTakeSkip()
    const { data, loading } = useQuery(CompanyValetsDocument)

    return (
        <ShowData
            pagination={{
                resultCount: data?.companyValets.length,
                totalCount: data?.companyValetsTotal,
                skip,
                take,
                setSkip,
                setTake
            }}
            title={undefined}
        >
            {data?.companyValets.map((valet) => (
                <ValetCard key={valet.uid} valet={valet} />
            ))}
        </ShowData>
    )
}