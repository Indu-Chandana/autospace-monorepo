import { AssignValetDocument, BookingStatus, namedOperations } from "@autospace/network/src/gql/generated"
import { ReactNode } from "react"
import { useMutation } from '@apollo/client'
import { toast } from "../molecules/Toast"
import { Button } from "../atoms/Button"

export const AssignValetButton = ({
    bookingId,
    status,
    children
}: {
    bookingId: number
    status: BookingStatus
    children: ReactNode
}) => {
    const [assignPickup, { data, loading }] = useMutation(AssignValetDocument, {
        awaitRefetchQueries: true,
        refetchQueries: [
            namedOperations.Query.ValetDrops,
            namedOperations.Query.ValetPickups
        ],
        onCompleted(data) {
            toast(`Action successful. ID: ${data.assignValet.id}`) // actually it is booking ID, (BE return Booking data)
        }
    })

    return (
        <Button
            loading={loading}
            variant="outlined"
            fullWidth
            onClick={async () => {
                await assignPickup({
                    variables: {
                        bookingId,
                        status
                    }
                })
            }}
        >
            {children}
        </Button>
    )
}