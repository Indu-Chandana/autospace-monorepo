import { ReactNode } from "react";
import { useQuery } from '@apollo/client'
import { ValetMeDocument } from "@autospace/network/src/gql/generated";
import { LoaderPanel } from "../molecules/Loader";
import { AlertSection } from "../molecules/AlertSection";
// import { useSession } from "next-auth/react";

type ReanderPropsChild = (id: number) => ReactNode

export const IsValet = ({ children, uid }: { children: ReanderPropsChild | ReactNode, uid: string }) => {
    const { data, loading } = useQuery(ValetMeDocument)
    // const session = useSession()

    if (loading) {
        return <LoaderPanel text="Loading company..." />
    }

    if (!data?.valetMe?.companyId) {
        return (
            <AlertSection>
                <div>You are not a valet.</div>
                <div>Please contact the company&apos;s managers with your ID: {uid}</div>
            </AlertSection>
        )
    }

    return (
        <>
            {typeof children === 'function'
                ? (children as ReanderPropsChild)(data.valetMe.companyId)
                : children
            }
        </>
    )
}