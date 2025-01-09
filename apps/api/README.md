pnpm prisma migrate dev
pnpm prisma studio

docker compose up -d

test User ----
    ** manager **
   1) "email": "user101@gmail.com",
    "password": "1234"
   2) "email": "manager@gmail.com"
    "password": "1234"
    -----------------------------
    ** user **
    1) "email": "test@gmail.com",
    "password": "1234"

      -----------------------------
    ** valet **
    1) "email": "valet1@gmail.com",
    "password": "1234"

    ----


    <!-- http://localhost:3000/stripe/success?session_id=cs_test_a1AqfvASg6dN6w7j2VpGJdq1Nk9EDQiY8KFLKwnubWfLEv596F1QOT3sGf -->