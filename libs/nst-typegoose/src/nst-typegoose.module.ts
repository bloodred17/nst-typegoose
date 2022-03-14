import { DynamicModule, Module } from '@nestjs/common';
import {
  TypegooseClass,
  TypegooseClassWithOptions,
} from '@nst-typegoose/nst-typegoose/typegoose-class.interface';
import { TypegooseCoreModule } from '@nst-typegoose/nst-typegoose/typegoose-core.module';
import {
  TypegooseConnectionOptions,
  TypegooseModuleAsyncOptions,
} from '@nst-typegoose/nst-typegoose/typegoose-options.interface';
import {
  convertToTypegooseClassWithOptions,
  createTypegooseProviders,
} from '@nst-typegoose/nst-typegoose/typegoose.providers';
import { NstTypegooseService } from './nst-typegoose.service';

@Module({
  providers: [NstTypegooseService],
  exports: [NstTypegooseService],
})
export class NstTypegooseModule {
  /**
   * Creates the connection to the mongo database for all the models to use.
   * @param uri the uri for the mongoose connection (example: mongodb://mongodb0.example.com:27017/admin). Read more [here](https://docs.mongodb.com/manual/reference/connection-string/).
   * @param options the options for the Typegoose connection. You may provide a custom connection name, via `connectionName`, for multiple connections (Read more about [multiple connections here](https://mongoosejs.com/docs/connections.html#options)). Read more about mongoose options [here](https://mongoosejs.com/docs/connections.html#options).
   */
  static forRoot(
    uri: string,
    options: TypegooseConnectionOptions = {},
  ): DynamicModule {
    return {
      module: NstTypegooseModule,
      imports: [TypegooseCoreModule.forRoot(uri, options)],
    };
  }

  /**
   * Similar to `forRoot` but is asynchronous instead. Read more [here](https://github.com/kpfromer/nestjs-typegoose#async-mongoose-schema-options).
   * @param options the options for the Typegoose connection. You may provide a custom connection name, via `connectionName`, for multiple connections (Read more about [multiple connections here](https://mongoosejs.com/docs/connections.html#options)). Read more about mongoose options [here](https://mongoosejs.com/docs/connections.html#options).
   */
  static forRootAsync(options: TypegooseModuleAsyncOptions): DynamicModule {
    return {
      module: NstTypegooseModule,
      imports: [TypegooseCoreModule.forRootAsync(options)],
    };
  }

  /**
   * Provides models for injection into services.
   * @param models the list of models to provide to service.
   * @param connectionName the connection name for use with multiple connections.
   */
  static forFeature(
    models: (TypegooseClass | TypegooseClassWithOptions)[],
    connectionName?: string,
  ): DynamicModule {
    const convertedModels = models.map((model) =>
      convertToTypegooseClassWithOptions(model),
    );
    const providers = createTypegooseProviders(connectionName, convertedModels);
    return {
      module: NstTypegooseModule,
      providers,
      exports: providers,
    };
  }
}
