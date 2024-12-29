import { BookingStatus, CreateBookingTimelineDocument, namedOperations } from "@autospace/network/src/gql/generated"
import { Button } from "../atoms/Button"
import { useMutation } from "@apollo/client"

// export const CheckInButton = ({ bookingId }: { bookingId: number }) => {
//     const [checkIn, { data, loading }] = useMutation(CreateBookingTimelineDocument)

//     return (
//         <Button
//             loading={loading}
//             onClick={() => {
//                 checkIn({
//                     variables: {
//                         createBookingTimelineInput: {
//                             bookingId,
//                             status: BookingStatus.CheckedIn
//                         }
//                     },
//                     awaitRefetchQueries: true,
//                     refetchQueries: [namedOperations.Query.BookingsForGarage]
//                 })
//             }}
//             color="white"
//             fullWidth
//         >
//             Check In
//         </Button>
//     )
// }

export const CheckInOutButton = ({
    bookingId,
    buttonText,
    status
}: {
    bookingId: number
    status: BookingStatus
    buttonText: string
}) => {
    const [checkInAndOut, { data, loading }] = useMutation(CreateBookingTimelineDocument)
    console.log('CreateBookingTimelineDocument data ::', data)

    return (
        <Button
            loading={loading}
            onClick={() => {
                checkInAndOut({
                    variables: {
                        createBookingTimelineInput: {
                            bookingId,
                            status: status
                        }
                    },
                    awaitRefetchQueries: true,
                    refetchQueries: [namedOperations.Query.BookingsForGarage]
                })
            }}
            color="white"
            className="mt-1"
            fullWidth
        >
            {buttonText}
        </Button>
    )
}