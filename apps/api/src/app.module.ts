import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './common/prisma/prisma.module'
import { UsersModule } from './models/users/users.module'
import { JwtModule } from '@nestjs/jwt'

// Todo: move this to util lib because this val also need to access in FE
const MAX_AGE = 24 * 60 * 60

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: MAX_AGE },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      introspection: true, // some times client may want to get schema info.
      fieldResolverEnhancers: ['guards'], // to protect resolvers- we have to enable this.
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // from the current dir -> we are going to 'src/schema.gql'.
      // when ever nest server runs, It will generate graphQl schema
      buildSchemaOptions: {
        numberScalarMode: 'integer', // by default it is float. we modifing into int
      },
    }),
    PrismaModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
